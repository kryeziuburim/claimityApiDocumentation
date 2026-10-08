import type { Locale } from "@/lib/i18n"

const de = {
  meta: {
    title: "Claimity - Bedienungsanleitung",
    description: "Anleitungen und Hilfen zur Nutzung der Claimity Plattform.",
  },
  badge: "Claimity Bedienungsanleitung",
  title: "Unterstützung und Anleitungen",
  intro: "Schrittweise Anleitungen und Best Practices zur Nutzung von Claimity.",
  downloadTitle: "Bedienungsanleitungen herunterladen",
  downloadText: "Hier finden Sie die vollständigen PDF-Handbücher für Experten und Versicherer.",
  downloadButton: "PDF herunterladen",
  experts: {
    title: "Für Experten",
    description: "Claimity Bedienungsanleitung (PDF) – Rollen, Workflows und Best Practices für Experten.",
    pdf: "/assets/de/Claimity_Guide_Experten_de.pdf",
  },
  insurers: {
    title: "Für Versicherer",
    description: "Claimity Bedienungsanleitung (PDF) – Rollen, Workflows und Best Practices für Versicherer.",
    pdf: "/assets/de/Claimity_Guide_Versicherungen_de.pdf",
  },
  helpTitle: "Sie benötigen weitere Informationen oder zusätzliche Hilfe?",
  helpText: "Kontaktieren Sie uns oder vereinbaren Sie einen Termin – wir unterstützen Sie gerne.",
  contactForm: "Kontaktformular",
}

export const manualMessages: Record<Locale, typeof de> = {
  de,
  en: {
    meta: {
      title: "Claimity - User Manual",
      description: "Instructions and help for using the Claimity platform.",
    },
    badge: "Claimity User Manual",
    title: "Support and Instructions",
    intro: "Step-by-step instructions and best practices for using Claimity.",
    downloadTitle: "Download User Manuals",
    downloadText: "Here you can find the complete PDF manuals for experts and insurers.",
    downloadButton: "Download PDF",
    experts: {
      title: "For Experts",
      description: "Claimity User Manual (PDF) – Roles, workflows, and best practices for experts.",
      pdf: "/assets/en/Claimity_Guide_Experts_en.pdf",
    },
    insurers: {
      title: "For Insurers",
      description: "Claimity User Manual (PDF) – Roles, workflows, and best practices for insurers.",
      pdf: "/assets/en/Claimity_Guide_Insurer_en.pdf",
    },
    helpTitle: "Need more information or additional help?",
    helpText: "Contact us or schedule an appointment – we are happy to support you.",
    contactForm: "Contact Form",
  },
  fr: {
    meta: {
      title: "Claimity - Manuel d'utilisation",
      description: "Instructions et aide pour l'utilisation de la plateforme Claimity.",
    },
    badge: "Manuel d'utilisation Claimity",
    title: "Support et Instructions",
    intro: "Instructions étape par étape et meilleures pratiques pour l'utilisation de Claimity.",
    downloadTitle: "Télécharger les manuels d'utilisation",
    downloadText: "Vous trouverez ici les manuels PDF complets pour les experts et les assureurs.",
    downloadButton: "Télécharger le PDF",
    experts: {
      title: "Pour les Experts",
      description:
        "Manuel d'utilisation Claimity (PDF) – Rôles, flux de travail et meilleures pratiques pour les experts.",
      pdf: "/assets/fr/Claimity_Guide_Experts_fr.pdf",
    },
    insurers: {
      title: "Pour les Assureurs",
      description:
        "Manuel d'utilisation Claimity (PDF) – Rôles, flux de travail et meilleures pratiques pour les assureurs.",
      pdf: "/assets/fr/Claimity_Guide_Asurance_fr.pdf",
    },
    helpTitle: "Besoin de plus d'informations ou d'aide supplémentaire ?",
    helpText: "Contactez-nous ou prenez rendez-vous – nous sommes heureux de vous aider.",
    contactForm: "Formulaire de contact",
  },
  it: {
    meta: {
      title: "Claimity - Manuale d'uso",
      description: "Istruzioni e aiuti per l'utilizzo della piattaforma Claimity.",
    },
    badge: "Manuale d'uso Claimity",
    title: "Supporto e istruzioni",
    intro: "Istruzioni passo passo e best practice per l'utilizzo di Claimity.",
    downloadTitle: "Scarica i manuali d'uso",
    downloadText: "Qui trova i manuali completi in PDF per periti e assicuratori.",
    downloadButton: "Scarica PDF",
    experts: {
      title: "Per i periti",
      description: "Manuale d'uso Claimity (PDF) – Ruoli, flussi di lavoro e best practice per i periti.",
      pdf: "/assets/it/Claimity_Guida_Experti_it.pdf",
    },
    insurers: {
      title: "Per gli assicuratori",
      description: "Manuale d'uso Claimity (PDF) – Ruoli, flussi di lavoro e best practice per gli assicuratori.",
      pdf: "/assets/it/Claimity_Guida_Assicurazione_it.pdf",
    },
    helpTitle: "Le servono ulteriori informazioni o altro aiuto?",
    helpText: "Ci contatti o prenoti un appuntamento – saremo lieti di aiutarLa.",
    contactForm: "Modulo di contatto",
  },
}
