<p align="center">
  <img src="icon.png" alt="Readstr Logo" width="21%">
</p>

# Readstr on StartOS

> **Upstream docs:** <https://github.com/privkeyio/readstr>
>
> Everything not listed in this document should behave the same as upstream
> Readstr. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable.

[Readstr](https://github.com/privkeyio/readstr) is a self-hosted, Google Reader-style feed aggregator for RSS/Atom, Nostr, and video. This package runs its Next.js standalone server alongside its own PostgreSQL database, so your subscriptions and reading state live entirely on your own server. You sign in with your own Nostr key (NIP-07 or NIP-46), organize subscriptions with tags or categories, and sync them across devices over Nostr.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Dependencies](#dependencies)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

The service runs two containers:

| Image      | Source                                                                                 | Runtime                                                  |
| ---------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `readstr`  | Built from source via the upstream `Dockerfile` in the `readstr` git submodule         | Next.js standalone server (Node Alpine)                  |
| `postgres` | Stock PostgreSQL Alpine image (pinned in the manifest), run as a sidecar               | The database the app connects to over localhost          |

- **Architectures:** x86_64, aarch64
- **App entrypoint:** upstream's — runs Prisma `migrate deploy`, then `node server.js`. The database container uses the stock PostgreSQL entrypoint, which initializes the data directory and creates the role and database on first start.

---

## Volume and Data Layout

| Volume | Mount Point          | Purpose                                                                 |
| ------ | -------------------- | ---------------------------------------------------------------------- |
| `main` | —                    | StartOS settings: the database password, default relays, allowed hosts |
| `db`   | `/var/lib/postgresql` | PostgreSQL data directory — all feeds, subscriptions, and reading state |

**Key paths:**

- `db:/var/lib/postgresql/data`: the PostgreSQL data directory (`PGDATA`).
- `main:start9/store.json`: StartOS persistent settings.

---

## Installation and First-Run Flow

| Step       | Upstream                           | StartOS                                                       |
| ---------- | ---------------------------------- | ------------------------------------------------------------ |
| Database   | Manual (docker-compose PostgreSQL) | Stock PostgreSQL sidecar, initialized automatically on first start |
| DB password | User-supplied (`.env`)            | Auto-generated internal secret (never shown)                 |
| Migrations | Run manually                       | Run automatically by the app entrypoint (`prisma migrate deploy`) |
| Sign-in    | Nostr key (NIP-07 / NIP-46)        | Same                                                         |

**First-run steps:**

1. Open the **Web UI** from this service's page in StartOS.
2. Click **Connect with Nostr** and authorize with a browser extension (NIP-07, e.g. nos2x or Alby) on desktop, or pair a remote signer (NIP-46, e.g. Amber) on mobile. Your npub is your identity, so there is no separate account.
3. Use **Add Feed** to subscribe to RSS feeds, Nostr authors (npub or NIP-05), or YouTube/Rumble channels.
4. If you reach this server at a non-default address, set **Allowed Hosts** in the **Configure** action so NIP-98 login is accepted.

See [instructions.md](instructions.md) for the user-facing walkthrough.

---

## Configuration Management

| StartOS-Managed                                    | Upstream-Managed (in-app)        |
| -------------------------------------------------- | -------------------------------- |
| Database password (auto-generated internal secret) | Feed subscriptions and tags/categories |
| Default relays (Configure action)                  | Nostr identity (your key)        |
| Allowed hosts for NIP-98 login (Configure action)  | Reading state                    |

**Environment variables set by StartOS** (`startos/main.ts`):

| Variable                  | Value         | Purpose                                                                                                                       |
| ------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`            | (composed)    | Connection string to the PostgreSQL sidecar at `127.0.0.1:5432`, built from the auto-generated password                       |
| `DEFAULT_RELAYS`          | (Configure)   | Nostr relays for long-form content and profiles, comma-separated                                                             |
| `NIP98_ALLOWED_HOSTS`     | (auto + Configure) | Hostnames allowed in NIP-98 auth: the interface's StartOS-assigned addresses (Tor, `.local`, LAN IP), plus custom hosts from Configure |
| `NEXT_TELEMETRY_DISABLED` | `1`           | Disables Next.js telemetry                                                                                                   |

The PostgreSQL sidecar receives the matching `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB`.

Default relays are `wss://relay.damus.io`, `wss://nos.lol`, and `wss://relay.nostr.band`. The Configure action accepts any number of `wss://` relays; saving restarts the service to apply. Readstr also lets users manage relays from within the app — these are the defaults it ships with.

---

## Network Access and Interfaces

| Interface     | Port | Protocol | Purpose                                       |
| ------------- | ---- | -------- | --------------------------------------------- |
| Web UI (`ui`) | 3000 | HTTP     | Three-panel reader and NIP-98-authenticated app |

The Web UI is unmasked and carries no StartOS-level auth, because Readstr authenticates you with your own Nostr key (NIP-07 / NIP-46) and NIP-98 verifies the request host (see Allowed Hosts).

**Access methods:**

- LAN IP with unique port
- `<hostname>.local` with unique port
- Tor `.onion` address (if added)
- Custom domains (if configured)

---

## Actions (StartOS UI)

### Configure

Set the Nostr relays and allowed hosts Readstr uses, then restart to apply.

| Property     | Value                                  |
| ------------ | -------------------------------------- |
| Availability | Any status                             |
| Visibility   | Always visible                         |
| Inputs       | Default Relays, Allowed Hosts (optional) |
| Outputs      | Confirmation; restarts the service     |

---

## Backups and Restore

**Included in backup:**

- A logical `pg_dump` of the `readstr` database (taken via the PostgreSQL sidecar)
- The `main` volume — `store.json`, holding the database password, default relays, and allowed hosts

**Restore behavior:**

- The dump is replayed into a freshly initialized database, so the restore is tolerant of PostgreSQL patch/minor differences. The database password is restored alongside it in `store.json`, so the app's credentials match the restored database with no re-import or reconfiguration. Init regenerates the database password only on a fresh install, never on restore.

---

## Health Checks

| Check      | Display Name | Method                              | Messages                                                                       |
| ---------- | ------------ | ----------------------------------- | ------------------------------------------------------------------------------ |
| `postgres` | Database     | `pg_isready`                        | "PostgreSQL is ready" / "Waiting for PostgreSQL to be ready"                    |
| `primary`  | Web UI       | Port-listening on 3000 (60s grace)  | "The Readstr web UI is ready" / "The Readstr web UI is not responding"          |

The app daemon `requires` the database, so it starts only once `pg_isready` passes.

---

## Dependencies

None.

---

## Limitations and Differences

1. **Custom domains require Allowed Hosts.** Readstr verifies the host in the NIP-98 auth token. The package auto-allows every address StartOS assigns the interface (Tor `.onion`, `.local`, LAN IP), so Tor and LAN work out of the box; for a custom domain you added yourself, set it in **Allowed Hosts** in Configure or login at that address may be rejected.
2. **Single-node PostgreSQL sidecar.** The database runs as a sidecar container within this service, not as a separate StartOS service you manage, and is initialized and migrated automatically on first start.
3. **Nostr sign-in required.** There is no separate account system; your npub is your identity.

---

## What Is Unchanged from Upstream

- RSS/Atom feed aggregation in a three-panel reader
- Nostr long-form content (NIP-23) alongside RSS
- YouTube and Rumble video subscriptions
- Tag- and category-based organization with cross-device sync over Nostr
- Nostr sign-in via NIP-07 and NIP-46 remote signers
- The Next.js standalone server, tRPC API, and Prisma schema

---

## Quick Reference for AI Consumers

```yaml
package_id: readstr
architectures: [x86_64, aarch64]
images:
  - readstr (Next.js app, built from source)
  - postgres (sidecar)
volumes:
  main: StartOS settings (store.json)
  db: /var/lib/postgresql
ports:
  ui: 3000
dependencies: none
startos_managed_env_vars:
  - DATABASE_URL
  - DEFAULT_RELAYS
  - NIP98_ALLOWED_HOSTS
  - NEXT_TELEMETRY_DISABLED
actions:
  - configure
health_checks:
  - postgres: pg_isready
  - primary: port_check 3000
backups:
  - pg_dump (readstr database)
  - main volume (store.json)
```
