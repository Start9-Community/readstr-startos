import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.1.0:5',
  releaseNotes: {
    en_US: `StartOS package improvements; no change to Readstr.`,
    es_ES: `Mejoras en el paquete de StartOS; sin cambios en Readstr.`,
    de_DE: `Verbesserungen am StartOS-Paket; keine Änderungen an Readstr.`,
    pl_PL: `Ulepszenia pakietu StartOS; bez zmian w Readstr.`,
    fr_FR: `Améliorations du paquet StartOS ; aucun changement pour Readstr.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
