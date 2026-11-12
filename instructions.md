# Readstr

## Documentation

- [Readstr on GitHub](https://github.com/privkeyio/readstr) — the upstream project's README and source.

## What you get on StartOS

A private, always-on reader running on your own server. Readstr exposes a single **Web UI** interface — a three-panel reader for RSS/Atom feeds, Nostr long-form content (NIP-23), and YouTube/Rumble video subscriptions. Your subscriptions and reading state live in a database that ships with the package, so nothing leaves hardware you control. You sign in with your own Nostr key, so there is no separate account to create.

## Getting set up

1. Open the **Web UI** from this service's page.
2. Click **Connect with Nostr** and authorize with a browser extension (NIP-07, such as nos2x or Alby) on desktop, or pair a remote signer (NIP-46, such as Amber) with a `bunker://` string on mobile. Your npub is your identity.
3. Use **Add Feed** to subscribe to RSS feeds, Nostr authors (npub or NIP-05), or YouTube/Rumble channels.

## Using Readstr

### Connecting on a custom address

Readstr checks the host in your NIP-98 login token. Every address StartOS assigns this service — its `.onion`, `.local`, and LAN IP — is accepted automatically, so login works over Tor and on your LAN with no setup. If you reach the server at a **custom domain you added yourself**, add that hostname under **Allowed Hosts** in the **Configure** action, or login at that address may be rejected.

### Configure action

Use **Configure** to set:

- **Default Relays** — the Nostr relays Readstr uses to fetch long-form content and profiles; you can also manage relays from within the app. Defaults to `wss://relay.damus.io`, `wss://nos.lol`, and `wss://relay.nostr.band`.
- **Allowed Hosts** — extra hostnames to accept for NIP-98 login, for custom domains you added yourself.
- **Flash Checkout URL** — optional. Your Flash plan signup URL (`https://…`); Readstr adds `?ref=<pubkey>` so the subscribing reader can be identified.
- **Flash Webhook Secret** — optional. The signing secret (`whsec_…`) of your Flash webhook endpoint; Readstr uses it to check that subscription notifications really come from Flash.
- **Flash API Key** — optional, masked. A key with only the **View Subscriptions** scope. Together with **Flash Checkout URL**, it lets Readstr recover from missed or out-of-order subscription notifications by checking Flash directly.
- **Flash Service ID** — the UUID of the Flash service for Readstr. Set it when your Flash account has multiple services to prevent subscriptions to another service granting Readstr access.

Saving restarts the service so the new settings take effect.

### Accepting Flash subscriptions

1. In your Flash dashboard, create a plan and copy its signup URL into **Flash Checkout URL**.
2. Add a webhook endpoint in Flash pointing at `https://<your domain>/api/webhooks/flash`, where `<your domain>` is an address of this service that Flash can reach.
3. Copy that endpoint's signing secret (`whsec_…`) into **Flash Webhook Secret**.
4. Recommended: create an API key under **Settings → API & Webhooks → API Keys** with only **View Subscriptions** and enter it in **Flash API Key**. Keep both the API key and webhook secret private.
5. If your Flash account has multiple services, enter Readstr's service UUID in **Flash Service ID**. Find it in the checkout URL: `/subscriptions/signup/<serviceId>/<planId>`. Without this filter, reconciliation can grant access for subscriptions to other services in your account.
6. Save to restart the service with these settings.

Without the webhook secret, Readstr rejects every Flash notification. With the API key and checkout URL set, it can still recover subscription state when checking a reader's denied or near-expiry access.
