import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.1.0:14',
  releaseNotes: {
    en_US:
      'Connections that send a request too slowly are now closed after 30 seconds instead of five minutes, so slow or stalled clients can no longer tie up the server. The server also refuses unexpected kinds of input it cannot check, instead of passing them along.',
    es_ES:
      'Las conexiones que envían una solicitud demasiado despacio ahora se cierran a los 30 segundos en lugar de a los cinco minutos, así que los clientes lentos o bloqueados ya no pueden acaparar el servidor. El servidor también rechaza tipos de entrada inesperados que no puede comprobar, en lugar de dejarlos pasar.',
    de_DE:
      'Verbindungen, die eine Anfrage zu langsam senden, werden jetzt nach 30 Sekunden statt nach fünf Minuten geschlossen, sodass langsame oder hängende Clients den Server nicht mehr blockieren können. Außerdem lehnt der Server unerwartete Eingabearten ab, die er nicht prüfen kann, statt sie weiterzureichen.',
    pl_PL:
      'Połączenia, które wysyłają żądanie zbyt wolno, są teraz zamykane po 30 sekundach zamiast po pięciu minutach, więc wolni lub zawieszeni klienci nie mogą już blokować serwera. Serwer odrzuca też nieoczekiwane rodzaje danych wejściowych, których nie potrafi sprawdzić, zamiast je przepuszczać.',
    fr_FR:
      'Les connexions qui envoient une requête trop lentement sont désormais fermées au bout de 30 secondes au lieu de cinq minutes, si bien que les clients lents ou bloqués ne peuvent plus accaparer le serveur. Le serveur refuse aussi les types d’entrée inattendus qu’il ne peut pas vérifier, au lieu de les laisser passer.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
