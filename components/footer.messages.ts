import type { Locale } from "@/lib/i18n"

const de = {
  support: "Support",
  manual: "Bedienungsanleitung",
  api: "API Integration",
  website: "Website",
  booking: "Termin buchen",
  help: "Hilfe",
  company: "Unternehmen",
  contactSection: "Kontakt",
  rights: "Alle Rechte vorbehalten.",
  privacy: "Datenschutzerklärung",
  terms: "Nutzungsbedingungen",
  imprint: "Impressum",
  companyName: "Claimity AG",
  country: "Schweiz",
  companyBlurb: "Die digitale Plattform für effizientes Schadenmanagement. Automatisiert, transparent, sicher.",
}

export const footerMessages: Record<Locale, typeof de> = {
  de,
  en: {
    support: "Support",
    manual: "Manual",
    api: "API-Integration",
    website: "Website",
    booking: "Book a Meeting",
    help: "Help",
    company: "Company",
    contactSection: "Contact",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    imprint: "Legal Notice",
    companyName: "Claimity AG",
    country: "Switzerland",
    companyBlurb: "The digital platform for efficient claims management. Automated, transparent, secure.",
  },
  fr: {
    support: "Assistance",
    manual: "Mode d'emploi",
    api: "Intégration API",
    website: "Site Web",
    booking: "Prendre rendez-vous",
    help: "Aide",
    company: "Entreprise",
    contactSection: "Contact",
    rights: "Tous droits réservés.",
    privacy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    imprint: "Mentions légales",
    companyName: "Claimity SA",
    country: "Suisse",
    companyBlurb:
      "La plateforme numérique pour une gestion efficace des sinistres. Automatisée, transparente, sécurisée.",
  },
}

export const companyContact = {
  street: "Wisentalstrasse 7a",
  city: "8185 Winkel",
  email: "info@claimity.ch",
  phone: "+41 78 344 77 36",
  phoneHref: "tel:+41783447736",
}

/** Links to the marketing website (www.claimity.ch), which has the same locale prefixes. */
export function websiteLinks(locale: Locale) {
  const root = `https://www.claimity.ch/${locale}/`
  return { website: root, booking: `${root}#book`, privacy: `${root}privacy`, terms: `${root}terms` }
}
