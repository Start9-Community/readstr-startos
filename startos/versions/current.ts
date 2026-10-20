import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.1.0:6',
  releaseNotes: {
    en_US: `Fixes signed-in requests being rejected as replays when several tabs or devices use Readstr at once. StartOS package improvements.`,
    es_ES: `Corrige que las solicitudes con sesión iniciada se rechazaran como repeticiones al usar Readstr en varias pestañas o dispositivos a la vez. Mejoras en el paquete de StartOS.`,
    de_DE: `Behebt, dass angemeldete Anfragen als Wiederholungen abgelehnt wurden, wenn Readstr in mehreren Tabs oder auf mehreren Geräten gleichzeitig genutzt wird. Verbesserungen am StartOS-Paket.`,
    pl_PL: `Naprawia odrzucanie żądań zalogowanego użytkownika jako powtórzeń, gdy Readstr jest używany jednocześnie w kilku kartach lub na kilku urządzeniach. Ulepszenia pakietu StartOS.`,
    fr_FR: `Corrige le rejet des requêtes authentifiées comme rejeux lorsque Readstr est utilisé dans plusieurs onglets ou sur plusieurs appareils à la fois. Améliorations du paquet StartOS.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
