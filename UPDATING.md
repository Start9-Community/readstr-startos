# Updating the upstream version

This package builds its image from the [`readstr`](https://github.com/privkeyio/readstr)
upstream source, pinned as a git submodule at `readstr/`. "Upstream" here means that source
repo. The bundled database is the stock `postgres` image, pinned by tag in the manifest.

## Determining the upstream version

- **readstr** ([privkeyio/readstr](https://github.com/privkeyio/readstr)) — fetch the latest
  release tag:

  ```sh
  gh release view -R privkeyio/readstr --json tagName -q .tagName
  ```

  If upstream publishes no releases, track the default branch (`main`) and pin to a specific
  commit instead.

## Applying the bump

1. Move the submodule to the desired upstream commit or tag:

   ```sh
   cd readstr
   git fetch origin
   git checkout <tag-or-commit>
   cd ..
   git add readstr
   ```

2. Bump `version` in `startos/versions/current.ts` (and add a migration file only if the
   upgrade needs one) and update its `releaseNotes`.

3. Rebuild and test (`make`, then install on a StartOS box) before opening a PR — confirm
   Prisma migrations still apply against the bundled PostgreSQL.

## Bumping PostgreSQL

The database image is pinned at `images.postgres.source.dockerTag` in
`startos/manifest/index.ts`. Bump it only across a PostgreSQL **major** version with care:
`Backups.withPgDump()` restores a logical dump, so a major bump is tolerated, but verify a
backup/restore round-trip before publishing.
