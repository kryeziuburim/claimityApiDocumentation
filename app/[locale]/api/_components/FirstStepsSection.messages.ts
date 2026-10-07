import type { Locale } from "@/lib/i18n"

const de = {
  title: "Erste Schritte",
  intro: "So starten Sie mit der API:",
  steps: [
    {
      title: "Schlüsselpaar erstellen",
      description:
        "Als Organisationsadmin können Sie in den Organisationseinstellungen Ihres Claimity Kontos ein Schlüsselpaar erstellen. Laden Sie darauffolgend den Private Key herunter und bewahren Sie diesen sicher auf.",
    },
    {
      title: "Authentifizieren",
      description:
        "Mit Hilfe des erstellten Schlüsselpaars und Ihrer Client‑ID können Sie sich gegenüber der Claimity API authentifizieren und so einen Access Token für Ihre Requests erhalten.",
    },
    {
      title: "DPoP-Header vorbereiten",
      description:
        "Zum Senden einer Anfrage an die API ist es notwendig, einen DPoP-Header zu erstellen. Dieser Header wird mit dem Private Key signiert und sichert die Anfrage gegen potentiellen Sichereheitsrisiken.",
    },
    {
      title: "Erste Anfrage",
      description: "Senden Sie mit Ihrem Access Token und dem DPoP-Header eine authentifizierte Anfrage an einen Endpoint.",
    },
  ],
  exampleRequestTitle: "Beispiel‑Request",
  notebooksTitle: "Python Notebooks",
  notebooksText:
    "Für den schnellen Einstieg stellen wir Ihnen Python‑Notebooks zur Verfügung, mit denen Sie API‑Abfragen ausführen und die Responses direkt einsehen können.",
  notebooksLink: "Notebooks auf GitHub ansehen",
}

export const firstStepsMessages: Record<Locale, typeof de> = {
  de,
  en: {
    title: "First Steps",
    intro: "How to start with the API:",
    steps: [
      {
        title: "Create Key Pair",
        description:
          "As an organization admin, you can create a key pair in the organization settings of your Claimity account. Subsequently, download the Private Key and keep it safe.",
      },
      {
        title: "Authenticate",
        description:
          "Using the created key pair and your Client ID, you can authenticate yourself against the Claimity API and thus obtain an Access Token for your requests.",
      },
      {
        title: "Prepare DPoP Header",
        description:
          "To send a request to the API, it is necessary to create a DPoP header. This header is signed with the Private Key and secures the request against potential security risks.",
      },
      {
        title: "First Request",
        description: "Send an authenticated request to an endpoint with your Access Token and the DPoP header.",
      },
    ],
    exampleRequestTitle: "Example Request",
    notebooksTitle: "Python Notebooks",
    notebooksText:
      "For a quick start, we provide Python notebooks with which you can execute API queries and view the responses directly.",
    notebooksLink: "View Notebooks on GitHub",
  },
  fr: {
    title: "Premiers pas",
    intro: "Comment démarrer avec l'API :",
    steps: [
      {
        title: "Créer une paire de clés",
        description:
          "En tant qu'administrateur de l'organisation, vous pouvez créer une paire de clés dans les paramètres de l'organisation de votre compte Claimity. Ensuite, téléchargez la clé privée et conservez-la en lieu sûr.",
      },
      {
        title: "S'authentifier",
        description:
          "À l'aide de la paire de clés créée et de votre identifiant client, vous pouvez vous authentifier auprès de l'API Claimity et ainsi obtenir un jeton d'accès pour vos requêtes.",
      },
      {
        title: "Préparer l'en-tête DPoP",
        description:
          "Pour envoyer une requête à l'API, il est nécessaire de créer un en-tête DPoP. Cet en-tête est signé avec la clé privée et sécurise la requête contre les risques de sécurité potentiels.",
      },
      {
        title: "Première requête",
        description: "Envoyez une requête authentifiée à un point de terminaison avec votre jeton d'accès et l'en-tête DPoP.",
      },
    ],
    exampleRequestTitle: "Exemple de requête",
    notebooksTitle: "Notebooks Python",
    notebooksText:
      "Pour un démarrage rapide, nous mettons à votre disposition des notebooks Python avec lesquels vous pouvez exécuter des requêtes API et consulter directement les réponses.",
    notebooksLink: "Voir les notebooks sur GitHub",
  },
}
