import type { Locale } from "@/lib/i18n"

const de = {
  meta: {
    title: "Claimity – Hilfe-Center",
    description:
      "Hilfe-Center der Claimity Plattform. Claimity vermittelt zertifizierte Experten automatisch – für schnellere Bearbeitung, weniger Aufwand und volle Transparenz.",
    socialDescription: "Hilfe-Center der Claimity Plattform.",
  },
  badge: "Claimity Hilfe-Center",
  title: "Alles, was Sie für Claimity brauchen – an einem Ort.",
  intro:
    "Ob erste Schritte, tiefere Produktfragen oder technische Integration: Wählen Sie den Bereich, der zu Ihrem aktuellen Bedarf passt.",
  cards: {
    manual: {
      ariaLabel: "Bedienungsanleitung",
      title: "Bedienungsanleitung",
      description: "Schritt-für-Schritt-Anleitungen für tägliche Workflows.",
      body: "Von den ersten Schritten bis zu komplexen Schadenvorgängen – perfekt für Onboarding und interne Schulungen.",
      items: [
        "Onboarding für Sachbearbeitung & Admins",
        "Schadenerfassung & Steuerung",
        "Rollen, Rechte & Prozesse verstehen",
      ],
      cta: "Zur Bedienungsanleitung",
    },
    api: {
      ariaLabel: "API Integration",
      title: "API Integration",
      description: "Technische Dokumentation, Beispiele und Best Practices.",
      body: "Für Teams, die Claimity nahtlos in Bestandssysteme, Portale oder Data Warehouse Systeme integrieren möchten.",
      items: [
        "REST-Endpoints & Datenmodelle",
        "Authentifizierung, Webhooks & Sicherheit",
        "Beispiel-Integrationen & Snippets",
      ],
      cta: "Zur API-Dokumentation",
    },
    support: {
      ariaLabel: "Support",
      title: "Support",
      description: "Direkter Draht zu Claimity - schnell Hilfe bekommen.",
      body: "Ideal, wenn im Tagesgeschäft etwas nicht wie erwartet funktioniert oder Sie konkrete Fragen zur Nutzung haben.",
      items: ["Häufig gestellte Fragen (FAQ)", "Tickets", "E-Mail & Kontaktwege"],
      cta: "Zum Support-Bereich",
    },
  },
}

export const homeMessages: Record<Locale, typeof de> = {
  de,
  en: {
    meta: {
      title: "Claimity – Help Center",
      description:
        "Claimity Platform Help Center. Claimity automatically connects certified experts – for faster processing, less effort, and full transparency.",
      socialDescription: "Claimity Platform Help Center.",
    },
    badge: "Claimity Help Center",
    title: "Everything you need for Claimity – in one place.",
    intro:
      "Whether first steps, deeper product questions, or technical integration: Choose the area that fits your current needs.",
    cards: {
      manual: {
        ariaLabel: "User Manual",
        title: "User Manual",
        description: "Step-by-step instructions for daily workflows.",
        body: "From first steps to complex claim processes – perfect for onboarding and internal training.",
        items: ["Onboarding for clerks & admins", "Claim entry & control", "Understanding roles, rights & processes"],
        cta: "Go to User Manual",
      },
      api: {
        ariaLabel: "API Integration",
        title: "API Integration",
        description: "Technical documentation, examples, and best practices.",
        body: "For teams wanting to seamlessly integrate Claimity into existing systems, portals, or data warehouse systems.",
        items: [
          "REST Endpoints & Data Models",
          "Authentication, Webhooks & Security",
          "Example Integrations & Snippets",
        ],
        cta: "Go to API Documentation",
      },
      support: {
        ariaLabel: "Support",
        title: "Support",
        description: "Direct line to Claimity – get help quickly.",
        body: "Ideal if something doesn't work as expected in daily business or you have specific usage questions.",
        items: ["Frequently Asked Questions (FAQ)", "Tickets", "Email & Contact Channels"],
        cta: "Go to Support Area",
      },
    },
  },
  fr: {
    meta: {
      title: "Claimity – Centre d'aide",
      description:
        "Centre d'aide de la plateforme Claimity. Claimity connecte automatiquement des experts certifiés – pour un traitement plus rapide, moins d'efforts et une transparence totale.",
      socialDescription: "Centre d'aide de la plateforme Claimity.",
    },
    badge: "Centre d'aide Claimity",
    title: "Tout ce dont vous avez besoin pour Claimity – au même endroit.",
    intro:
      "Que ce soit pour les premiers pas, des questions approfondies sur le produit ou l'intégration technique : choisissez le domaine qui correspond à vos besoins actuels.",
    cards: {
      manual: {
        ariaLabel: "Manuel d'utilisation",
        title: "Manuel d'utilisation",
        description: "Instructions étape par étape pour les flux de travail quotidiens.",
        body: "Des premiers pas aux processus de sinistres complexes – parfait pour l'intégration et la formation interne.",
        items: [
          "Intégration pour les gestionnaires et administrateurs",
          "Saisie et contrôle des sinistres",
          "Comprendre les rôles, droits et processus",
        ],
        cta: "Accéder au manuel",
      },
      api: {
        ariaLabel: "Intégration API",
        title: "Intégration API",
        description: "Documentation technique, exemples et meilleures pratiques.",
        body: "Pour les équipes souhaitant intégrer Claimity de manière transparente dans les systèmes existants, portails ou entrepôts de données.",
        items: [
          "Endpoints REST & Modèles de données",
          "Authentification, Webhooks & Sécurité",
          "Exemples d'intégrations & Snippets",
        ],
        cta: "Accéder à la documentation API",
      },
      support: {
        ariaLabel: "Support",
        title: "Support",
        description: "Ligne directe vers Claimity – obtenez de l'aide rapidement.",
        body: "Idéal si quelque chose ne fonctionne pas comme prévu au quotidien ou si vous avez des questions spécifiques sur l'utilisation.",
        items: ["Foire aux questions (FAQ)", "Tickets", "E-mail & Canaux de contact"],
        cta: "Accéder à l'espace support",
      },
    },
  },
}
