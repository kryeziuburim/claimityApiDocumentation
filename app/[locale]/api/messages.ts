import type { Locale } from "@/lib/i18n"

const de = {
  meta: {
    title: "API-Dokumentation",
    description:
      "Technische Referenz der Claimity Partner API: Authentifizierung mit OAuth 2.0 und DPoP, Endpunkte für Experten und Versicherer, Payload-Schemas, Validierung und Änderungsprotokoll.",
    socialDescription: "Technische Referenz und Leitfäden für die Integration mit Claimity.",
  },
}

export const apiPageMessages: Record<Locale, typeof de> = {
  de,
  en: {
    meta: {
      title: "API Documentation",
      description:
        "Technical reference for the Claimity Partner API: authentication with OAuth 2.0 and DPoP, endpoints for experts and insurers, payload schemas, validation and changelog.",
      socialDescription: "Technical reference and guides for integrating with Claimity.",
    },
  },
  fr: {
    meta: {
      title: "Documentation API",
      description:
        "Référence technique de la Claimity Partner API : authentification OAuth 2.0 et DPoP, points de terminaison pour experts et assureurs, schémas de payload, validation et journal des modifications.",
      socialDescription: "Référence technique et guides pour l'intégration avec Claimity.",
    },
  },
  it: {
    meta: {
      title: "Documentazione API",
      description:
        "Riferimento tecnico della Claimity Partner API: autenticazione con OAuth 2.0 e DPoP, endpoint per periti e assicuratori, schemi dei payload, validazione e registro delle modifiche.",
      socialDescription: "Riferimento tecnico e guide per l'integrazione con Claimity.",
    },
  },
}
