# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **The app image runs its own migrations.** Upstream's entrypoint does `prisma migrate deploy` before starting the server — don't add a migration oneshot, and expect a failed migration to present as the daemon not starting.
- **The app subcontainer mounts nothing** and must stay that way; all state belongs in PostgreSQL.
- **Default branch is `main`, not `master`.** Its CI workflows reference `main`; leave them.
