import type { Locale } from "@/lib/i18n"

const de = {
  title: "Übersicht",
  intro:
    "Die API nutzt HTTPS-Methoden und RESTful Endpoints, um Ressourcen im System zu erstellen, zu bearbeiten und zu verwalten. Als Austauschformat dient JSON.",
  firstStepsTitle: "Erste Schritte",
  firstStepsText:
    "Diese API bietet umfassenden Zugriff auf zentrale Funktionen. Ob Integrationen, Automatisierung oder eigene Anwendungen – die API liefert Flexibilität für die Anbindung von Claimity an Ihre Systeme.",
  extensionTitle: "Erweiterung der Schnittstellen",
  extensionItems: [
    "Prüfen Sie regelmässig das Änderungsprotokoll um auf dem Laufenden zu bleiben.",
    "Inkompatible Änderungen werden vorab angekündigt.",
    "Über wesentliche Änderungen werden Sie rechtzeitig informiert.",
  ],
}

export const overviewMessages: Record<Locale, typeof de> = {
  de,
  en: {
    title: "Overview",
    intro:
      "The API uses HTTPS methods and RESTful endpoints to create, edit, and manage resources in the system. JSON is used as the exchange format.",
    firstStepsTitle: "First Steps",
    firstStepsText:
      "This API offers comprehensive access to core functions. Whether integrations, automation, or custom applications – the API provides flexibility for connecting Claimity to your systems.",
    extensionTitle: "Interface Extension",
    extensionItems: [
      "Check the changelog regularly to stay up to date.",
      "Breaking changes are announced in advance.",
      "You will be informed in good time about significant changes.",
    ],
  },
  fr: {
    title: "Vue d'ensemble",
    intro:
      "L'API utilise des méthodes HTTPS et des points de terminaison RESTful pour créer, modifier et gérer des ressources dans le système. JSON est utilisé comme format d'échange.",
    firstStepsTitle: "Premiers pas",
    firstStepsText:
      "Cette API offre un accès complet aux fonctions principales. Qu'il s'agisse d'intégrations, d'automatisation ou d'applications personnalisées, l'API offre la flexibilité nécessaire pour connecter Claimity à vos systèmes.",
    extensionTitle: "Extension des interfaces",
    extensionItems: [
      "Consultez régulièrement le journal des modifications pour rester à jour.",
      "Les modifications incompatibles sont annoncées à l'avance.",
      "Vous serez informé à temps des changements importants.",
    ],
  },
  it: {
    title: "Panoramica",
    intro:
      "L'API utilizza metodi HTTPS ed endpoint RESTful per creare, modificare e gestire le risorse nel sistema. Come formato di scambio viene utilizzato JSON.",
    firstStepsTitle: "Primi passi",
    firstStepsText:
      "Questa API offre un accesso completo alle funzioni principali. Che si tratti di integrazioni, automazione o applicazioni proprie, l'API offre la flessibilità necessaria per collegare Claimity ai Suoi sistemi.",
    extensionTitle: "Estensione delle interfacce",
    extensionItems: [
      "Consulti regolarmente il registro delle modifiche per rimanere aggiornato.",
      "Le modifiche incompatibili vengono annunciate in anticipo.",
      "Sarà informato tempestivamente sulle modifiche sostanziali.",
    ],
  },
}
