import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.1.0:1',
  releaseNotes: {
    en_US:
      'Update Readstr: OPML import/export, keyword filters, smart views, reading history with offline search, AI summaries and translation, on-device WebLLM, Nostr sync for saved views and prefs, new reading layouts, typography controls, a privacy policy page, and Chrome extension fixes.',
    es_ES:
      'Actualización de Readstr: importación/exportación OPML, filtros por palabras clave, vistas inteligentes, historial de lectura con búsqueda sin conexión, resúmenes y traducción con IA, WebLLM en el dispositivo, sincronización Nostr de vistas guardadas y preferencias, nuevos diseños de lectura, controles tipográficos, página de política de privacidad y correcciones de la extensión de Chrome.',
    de_DE:
      'Readstr-Update: OPML-Import/-Export, Schlüsselwortfilter, intelligente Ansichten, Leseverlauf mit Offline-Suche, KI-Zusammenfassungen und -Übersetzung, WebLLM auf dem Gerät, Nostr-Synchronisierung gespeicherter Ansichten und Einstellungen, neue Lese-Layouts, Typografiesteuerung, eine Datenschutzseite und Korrekturen der Chrome-Erweiterung.',
    pl_PL:
      'Aktualizacja Readstr: import/eksport OPML, filtry słów kluczowych, widoki inteligentne, historia czytania z wyszukiwaniem offline, podsumowania i tłumaczenia AI, WebLLM na urządzeniu, synchronizacja Nostr zapisanych widoków i preferencji, nowe układy czytania, sterowanie typografią, strona polityki prywatności oraz poprawki rozszerzenia Chrome.',
    fr_FR:
      'Mise à jour de Readstr : import/export OPML, filtres par mots-clés, vues intelligentes, historique de lecture avec recherche hors ligne, résumés et traduction par IA, WebLLM sur l’appareil, synchronisation Nostr des vues enregistrées et des préférences, nouvelles mises en page de lecture, contrôles typographiques, page de politique de confidentialité et corrections de l’extension Chrome.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
