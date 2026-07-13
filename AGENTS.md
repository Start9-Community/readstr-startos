# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `readstr`.** Bundles its own PostgreSQL as a sidecar subcontainer (`postgres-sub`) alongside the app subcontainer (`readstr-sub`); the two share a network namespace, so the app reaches the database over `127.0.0.1`. The database is captured via `pg_dump` (`Backups.withPgDump`), not raw volume rsync.
- **Exports a single `ui` interface** on host `ui-multi`. `main.ts` reads every hostname StartOS assigns that interface (`sdk.host.getOwn(... 'ui-multi')` → `addressInfo.nonLocal`) and passes them as `NIP98_ALLOWED_HOSTS` so Readstr's NIP-98 login accepts logins over Tor, `.local`, and LAN out of the box; extra hostnames can be added via the Configure action.

## Inspecting a running install

To run a command inside the service's container (read its generated config, grep app logs), use `start-cli package attach readstr -n readstr-sub -- <cmd>`. This package has two subcontainers (`readstr-sub`, `postgres-sub`), so a selector is **required** — select by **name** with `-n` (the name passed to `SubContainer.of` in `main.ts`, e.g. `-n readstr-sub`) or by image with `-i`. Note: `-s/--subcontainer` matches the internal **Guid**, not the name, so passing a name to `-s` fails with "no matching subcontainers".
