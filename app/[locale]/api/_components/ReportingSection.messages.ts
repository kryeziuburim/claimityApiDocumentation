import type { Locale } from "@/lib/i18n"

const de = {
  title: "Problem melden",
  intro:
    "Wenn Sie auf einen Fehler gestossen sind, helfen wir weiter. Stellen Sie vorab sicher, dass das Problem reproduzierbar ist.",
  beforeTitle: "Vor dem Melden",
  doItems: [
    "Reproduzierbarkeit prüfen",
    "API‑Tests mit Postman/Insomnia durchführen",
    "Details zu Request und Response sammeln",
  ],
  dontItem: "Keine Zugangsdaten im Report mitschicken",
  submitTitle: "Report einreichen",
  submitText:
    "Bitte beschreiben Sie Schritte zur Reproduktion. Unser Support prüft den Fall zeitnah und meldet sich schnellstmöglich bei Ihnen.",
  submitButton: "Problem melden",
  noteLabel: "Hinweis:",
  noteText:
    "Die API wird auf Basis dieser Dokumentation bereitgestellt. Es gibt keine geführte Implementierung oder Code‑Support.",
}

export const reportingMessages: Record<Locale, typeof de> = {
  de,
  en: {
    title: "Report Issue",
    intro: "If you have encountered an error, we will help. Ensure beforehand that the problem is reproducible.",
    beforeTitle: "Before Reporting",
    doItems: [
      "Check reproducibility",
      "Perform API tests with Postman/Insomnia",
      "Collect details on request and response",
    ],
    dontItem: "Do not send access data in the report",
    submitTitle: "Submit Report",
    submitText:
      "Please describe steps to reproduce. Our support will check the case promptly and get back to you as soon as possible.",
    submitButton: "Report Issue",
    noteLabel: "Note:",
    noteText: "The API is provided based on this documentation. There is no guided implementation or code support.",
  },
  fr: {
    title: "Signaler un problème",
    intro:
      "Si vous avez rencontré une erreur, nous vous aiderons. Assurez-vous au préalable que le problème est reproductible.",
    beforeTitle: "Avant de signaler",
    doItems: [
      "Vérifier la reproductibilité",
      "Effectuer des tests API avec Postman/Insomnia",
      "Recueillir des détails sur la requête et la réponse",
    ],
    dontItem: "Ne pas envoyer de données d'accès dans le rapport",
    submitTitle: "Soumettre un rapport",
    submitText:
      "Veuillez décrire les étapes pour reproduire. Notre support examinera le cas rapidement et vous répondra dès que possible.",
    submitButton: "Signaler un problème",
    noteLabel: "Remarque :",
    noteText:
      "L'API est fournie sur la base de cette documentation. Il n'y a pas d'implémentation guidée ou de support de code.",
  },
  it: {
    title: "Segnala un problema",
    intro: "Se ha riscontrato un errore, siamo qui per aiutarLa. Si assicuri prima che il problema sia riproducibile.",
    beforeTitle: "Prima della segnalazione",
    doItems: [
      "Verificare la riproducibilità",
      "Eseguire test dell'API con Postman/Insomnia",
      "Raccogliere i dettagli su richiesta e risposta",
    ],
    dontItem: "Non inviare dati di accesso nella segnalazione",
    submitTitle: "Invia segnalazione",
    submitText:
      "Descriva i passaggi per riprodurre il problema. Il nostro supporto esaminerà il caso tempestivamente e La contatterà il prima possibile.",
    submitButton: "Segnala un problema",
    noteLabel: "Nota:",
    noteText:
      "L'API viene messa a disposizione sulla base di questa documentazione. Non è previsto alcun supporto all'implementazione né supporto sul codice.",
  },
}
