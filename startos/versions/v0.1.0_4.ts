import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v0_1_0_4 = VersionInfo.of({
  version: '0.1.0:4',
  releaseNotes: {
    en_US:
      'Repackage Readstr on a PostgreSQL sidecar and conform to StartOS registry standards.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
