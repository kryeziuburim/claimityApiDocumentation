import type { Locale } from "@/lib/i18n"

const de = {
  title: "Impressum",
  legalBasis: "Angaben gemäss Art. 3 lit. s Nr. 1 UWG",
  addressTitle: "Anschrift",
  country: "Schweiz",
  contactTitle: "Kontakt",
  phoneLabel: "Telefon:",
  emailLabel: "E-Mail:",
  registerTitle: "Handelsregister",
  registerLabel: "Handelsregister:",
  registerOffice: "Handelsregisteramt des Kanton Zürich",
  uidLabel: "UID:",
  representativesTitle: "Vertretungsberechtigte Personen",
  management: "Geschäftsführung: Burim Kryeziu",
  disclaimerTitle: "Haftungsausschluss",
  disclaimerText:
    "Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen.",
  linksTitle: "Haftung für Links",
  linksText:
    "Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es wird jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten erfolgen auf eigene Gefahr des Nutzers oder der Nutzerin.",
  copyrightTitle: "Urheberrechte",
  copyrightText:
    "Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website gehören ausschliesslich der Claimity AG oder den speziell genannten Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.",
}

export const legalNoticeMessages: Record<Locale, typeof de> = {
  de,
  en: {
    title: "Legal Notice",
    legalBasis: "Information according to Art. 3 lit. s Nr. 1 UWG",
    addressTitle: "Address",
    country: "Switzerland",
    contactTitle: "Contact",
    phoneLabel: "Phone:",
    emailLabel: "Email:",
    registerTitle: "Commercial Register",
    registerLabel: "Commercial Register:",
    registerOffice: "Commercial Register Office of the Canton of Zurich",
    uidLabel: "UID:",
    representativesTitle: "Authorized Representatives",
    management: "Management: Burim Kryeziu",
    disclaimerTitle: "Disclaimer",
    disclaimerText:
      "The author assumes no liability for the correctness, accuracy, timeliness, reliability, and completeness of the information. Liability claims against the author for material or immaterial damage resulting from access to or use or non-use of the published information, misuse of the connection, or technical faults are excluded.",
    linksTitle: "Liability for Links",
    linksText:
      "References and links to third-party websites are outside our area of responsibility. Any responsibility for such websites is rejected. Access to and use of such websites is at the user's own risk.",
    copyrightTitle: "Copyrights",
    copyrightText:
      "The copyright and all other rights to content, images, photos, or other files on the website belong exclusively to Claimity AG or the specifically named rights holders. For the reproduction of any elements, the written consent of the copyright holders must be obtained in advance.",
  },
  fr: {
    title: "Mentions Légales",
    legalBasis: "Informations selon l'art. 3 lit. s Nr. 1 LCD",
    addressTitle: "Adresse",
    country: "Suisse",
    contactTitle: "Contact",
    phoneLabel: "Téléphone :",
    emailLabel: "E-mail :",
    registerTitle: "Registre du commerce",
    registerLabel: "Registre du commerce :",
    registerOffice: "Office du registre du commerce du canton de Zurich",
    uidLabel: "IDE :",
    representativesTitle: "Personnes autorisées à représenter",
    management: "Direction : Burim Kryeziu",
    disclaimerTitle: "Exclusion de responsabilité",
    disclaimerText:
      "L'auteur n'assume aucune responsabilité quant à l'exactitude, la précision, l'actualité, la fiabilité et l'exhaustivité des informations. Les recours en responsabilité contre l'auteur pour des dommages matériels ou immatériels résultant de l'accès ou de l'utilisation ou de la non-utilisation des informations publiées, d'une mauvaise utilisation de la connexion ou de problèmes techniques sont exclus.",
    linksTitle: "Responsabilité pour les liens",
    linksText:
      "Les renvois et liens vers des sites web de tiers ne relèvent pas de notre responsabilité. Toute responsabilité pour de tels sites web est rejetée. L'accès et l'utilisation de ces sites web se font aux risques et périls de l'utilisateur.",
    copyrightTitle: "Droits d'auteur",
    copyrightText:
      "Les droits d'auteur et tous les autres droits sur le contenu, les images, les photos ou autres fichiers du site web appartiennent exclusivement à Claimity AG ou aux détenteurs de droits spécifiquement nommés. Pour la reproduction de tout élément, le consentement écrit des détenteurs des droits d'auteur doit être obtenu au préalable.",
  },
}
