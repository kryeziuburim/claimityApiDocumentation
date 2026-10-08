import type { Locale } from "@/lib/i18n"

const de = {
  meta: {
    title: "Support",
    description: "Support, Hilfe und Kontakt rund um die Claimity Plattform.",
  },
  badge: "Claimity Support",
  eyebrow: "Claimity Support",
  title: "Wie können wir helfen?",
  intro: "Schnelle Antworten in den FAQs oder senden Sie uns Ihr Anliegen direkt über das Formular.",
  faqTitle: "Häufige Fragen (FAQ)",
  faqIntro: "Antworten auf die am häufigsten gestellten Fragen zur Nutzung von Claimity.",
  faqs: [
    {
      question:
        "Es gibt sehr viele Fälle in meiner Organisation, wie behalte ich die Übersicht über meine Verantwortlichkeiten?",
      answer:
        "Sie können in der Fallliste neben dem Suchfeld nach Fällen filtern, die Ihnen zugewiesen sind. So behalten Sie den Überblick über Ihre Verantwortlichkeiten.",
    },
    {
      question: "Wie füge ich weitere Nutzer zu Claimity hinzu?",
      answer:
        "Als Organisationsadmin können Sie neue Nutzer in den Organisationseinstellungen hinzufügen. Diese erhalten dann automatisch eine E-Mail mit einem Einladungslink.",
    },
    {
      question: "Wie entferne ich Nutzer aus meiner Claimity-Organisation?",
      answer:
        "Als Organisationsadmin können Sie bestehende Nutzer in den Organisationseinstellungen entfernen. Diese haben dann keinen Zugriff mehr auf Ihre Daten. Allerdings muss es immer mindestens einen Admin-Nutzer geben, der die Organisation verwalten kann.",
    },
    {
      question: "Wie erhalte ich Benachrichtigungen zu wesentlichen Aktivitäten?",
      answer:
        "Als Organisationsadmin können Sie E-Mail-Benachrichtigungen in den Organisationseinstellungen aktivieren. Für Integrationen stehen zusätzlich Webhooks in der API zur Verfügung.",
    },
    {
      question: "Gibt es eine API und Beispiel-Integrationen?",
      answer:
        "Ja. Die API-Dokumentation beschreibt Endpunkte, Datenmodelle und Webhooks. Beispiel-Snippets helfen beim schnellen Einstieg.",
    },
    {
      question: "An wen kann ich mich bei technischen Problemen wenden?",
      answer:
        "Nutzen Sie das Support-Formular unten. Bei kritischen Störungen bitte zusätzlich den Statushinweis in Ihrer Meldung vermerken.",
    },
  ],
  contactTitle: "Kontakt",
  contactIntro: "Sie erreichen uns über folgende Kanäle.",
  email: "E-Mail",
  phone: "Telefon",
  address: "Adresse",
  country: "Schweiz",
  ticketTitle: "Support-Ticket",
  ticketIntro: "Keine passende Antwort gefunden? Senden Sie uns die Details – wir melden uns zeitnah zurück.",
}

export const supportMessages: Record<Locale, typeof de> = {
  de,
  en: {
    meta: {
      title: "Support",
      description: "Support, help, and contact for the Claimity platform.",
    },
    badge: "Claimity Support",
    eyebrow: "Claimity Support",
    title: "How can we help?",
    intro: "Quick answers in the FAQs or send us your request directly via the form.",
    faqTitle: "Frequently Asked Questions (FAQ)",
    faqIntro: "Answers to the most frequently asked questions about using Claimity.",
    faqs: [
      {
        question: "There are many cases in my organization, how do I keep track of my responsibilities?",
        answer:
          "You can filter by cases assigned to you in the case list next to the search field. This allows you to keep track of your responsibilities.",
      },
      {
        question: "How do I add more users to Claimity?",
        answer:
          "As an organization admin, you can add new users in the organization settings. They will automatically receive an email with an invitation link.",
      },
      {
        question: "How do I remove users from my Claimity organization?",
        answer:
          "As an organization admin, you can remove existing users in the organization settings. They will then no longer have access to your data. However, there must always be at least one admin user who can manage the organization.",
      },
      {
        question: "How do I receive notifications about significant activities?",
        answer:
          "As an organization admin, you can enable email notifications in the organization settings. For integrations, webhooks are also available in the API.",
      },
      {
        question: "Is there an API and example integrations?",
        answer:
          "Yes. The API documentation describes endpoints, data models, and webhooks. Example snippets help with a quick start.",
      },
      {
        question: "Who can I contact for technical problems?",
        answer:
          "Use the support form below. For critical disruptions, please also note the status indication in your report.",
      },
    ],
    contactTitle: "Contact",
    contactIntro: "You can reach us via the following channels.",
    email: "Email",
    phone: "Phone",
    address: "Address",
    country: "Switzerland",
    ticketTitle: "Support Ticket",
    ticketIntro: "Didn't find a suitable answer? Send us the details – we will get back to you promptly.",
  },
  fr: {
    meta: {
      title: "Support",
      description: "Support, aide et contact pour la plateforme Claimity.",
    },
    badge: "Support Claimity",
    eyebrow: "Assistance Claimity",
    title: "Comment pouvons-nous aider ?",
    intro: "Réponses rapides dans la FAQ ou envoyez-nous votre demande directement via le formulaire.",
    faqTitle: "Foire aux questions (FAQ)",
    faqIntro: "Réponses aux questions les plus fréquentes sur l'utilisation de Claimity.",
    faqs: [
      {
        question:
          "Il y a beaucoup de dossiers dans mon organisation, comment garder une vue d'ensemble de mes responsabilités ?",
        answer:
          "Vous pouvez filtrer les dossiers qui vous sont attribués dans la liste des dossiers à côté du champ de recherche. Cela vous permet de garder une vue d'ensemble de vos responsabilités.",
      },
      {
        question: "Comment ajouter d'autres utilisateurs à Claimity ?",
        answer:
          "En tant qu'administrateur de l'organisation, vous pouvez ajouter de nouveaux utilisateurs dans les paramètres de l'organisation. Ils recevront automatiquement un e-mail avec un lien d'invitation.",
      },
      {
        question: "Comment supprimer des utilisateurs de mon organisation Claimity ?",
        answer:
          "En tant qu'administrateur de l'organisation, vous pouvez supprimer des utilisateurs existants dans les paramètres de l'organisation. Ils n'auront alors plus accès à vos données. Cependant, il doit toujours y avoir au moins un utilisateur administrateur pouvant gérer l'organisation.",
      },
      {
        question: "Comment recevoir des notifications sur les activités importantes ?",
        answer:
          "En tant qu'administrateur de l'organisation, vous pouvez activer les notifications par e-mail dans les paramètres de l'organisation. Pour les intégrations, des webhooks sont également disponibles dans l'API.",
      },
      {
        question: "Existe-t-il une API et des exemples d'intégrations ?",
        answer:
          "Oui. La documentation API décrit les points de terminaison, les modèles de données et les webhooks. Des extraits d'exemples aident à un démarrage rapide.",
      },
      {
        question: "Qui puis-je contacter en cas de problèmes techniques ?",
        answer:
          "Utilisez le formulaire de support ci-dessous. En cas de perturbations critiques, veuillez également noter l'indication de statut dans votre rapport.",
      },
    ],
    contactTitle: "Contact",
    contactIntro: "Vous pouvez nous joindre via les canaux suivants.",
    email: "E-mail",
    phone: "Téléphone",
    address: "Adresse",
    country: "Suisse",
    ticketTitle: "Ticket de support",
    ticketIntro: "Pas trouvé de réponse appropriée ? Envoyez-nous les détails – nous vous répondrons rapidement.",
  },
  it: {
    meta: {
      title: "Supporto",
      description: "Supporto, aiuto e contatti per la piattaforma Claimity.",
    },
    badge: "Supporto Claimity",
    eyebrow: "Supporto Claimity",
    title: "Come possiamo aiutarLa?",
    intro: "Risposte rapide nelle FAQ, oppure ci invii la Sua richiesta direttamente tramite il modulo.",
    faqTitle: "Domande frequenti (FAQ)",
    faqIntro: "Risposte alle domande più frequenti sull'utilizzo di Claimity.",
    faqs: [
      {
        question:
          "Nella mia organizzazione ci sono moltissimi casi: come mantengo la panoramica sulle mie responsabilità?",
        answer:
          "Nell'elenco dei casi, accanto al campo di ricerca, può filtrare i casi assegnati a Lei. In questo modo mantiene la panoramica sulle Sue responsabilità.",
      },
      {
        question: "Come aggiungo altri utenti a Claimity?",
        answer:
          "In qualità di amministratore dell'organizzazione, può aggiungere nuovi utenti nelle impostazioni dell'organizzazione. Questi riceveranno automaticamente un'e-mail con un link di invito.",
      },
      {
        question: "Come rimuovo utenti dalla mia organizzazione Claimity?",
        answer:
          "In qualità di amministratore dell'organizzazione, può rimuovere gli utenti esistenti nelle impostazioni dell'organizzazione. Questi non avranno più accesso ai Suoi dati. Deve tuttavia esserci sempre almeno un utente amministratore in grado di gestire l'organizzazione.",
      },
      {
        question: "Come ricevo notifiche sulle attività importanti?",
        answer:
          "In qualità di amministratore dell'organizzazione, può attivare le notifiche via e-mail nelle impostazioni dell'organizzazione. Per le integrazioni sono inoltre disponibili webhook nell'API.",
      },
      {
        question: "Esistono un'API ed esempi di integrazione?",
        answer:
          "Sì. La documentazione API descrive endpoint, modelli di dati e webhook. Gli snippet di esempio facilitano un avvio rapido.",
      },
      {
        question: "A chi posso rivolgermi in caso di problemi tecnici?",
        answer:
          "Utilizzi il modulo di supporto qui sotto. In caso di guasti critici, indichi inoltre lo stato nella Sua segnalazione.",
      },
    ],
    contactTitle: "Contatto",
    contactIntro: "Può raggiungerci attraverso i seguenti canali.",
    email: "E-mail",
    phone: "Telefono",
    address: "Indirizzo",
    country: "Svizzera",
    ticketTitle: "Ticket di supporto",
    ticketIntro: "Non ha trovato una risposta adatta? Ci invii i dettagli – La ricontatteremo al più presto.",
  },
}
