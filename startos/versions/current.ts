import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.1.0:0',
  releaseNotes: {
    en_US: 'Initial release of Readstr for StartOS.',
    es_ES: 'Versión inicial de Readstr para StartOS.',
    de_DE: 'Erste Veröffentlichung von Readstr für StartOS.',
    pl_PL: 'Pierwsze wydanie Readstr dla StartOS.',
    fr_FR: 'Version initiale de Readstr pour StartOS.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
