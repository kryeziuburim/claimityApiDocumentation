"use client"

import { useCallback, useMemo, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import emailjs from "@emailjs/browser"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

type Lang = "de" | "en" | "fr"

const i18n: Record<
  Lang,
  {
    labels: {
      name: string
      email: string
      subject: string
      category: string
      message: string
      submit: string
      sending: string
    }
    placeholders: {
      name: string
      email: string
      subject: string
      message: string
    }
    categories: {
      general: string
      technical: string
      billing: string
      other: string
    }
    feedback: {
      success: string
      errorGeneric: string
      errorConfig: string
      hint: string
    }
    validation: {
      nameMin: string
      emailInvalid: string
      subjectMin: string
      messageMin: string
    }
  }
> = {
  de: {
    labels: {
      name: "Name",
      email: "E-Mail",
      subject: "Betreff",
      category: "Kategorie",
      message: "Nachricht",
      submit: "Ticket absenden",
      sending: "Wird gesendet …",
    },
    placeholders: {
      name: "Max Muster",
      email: "name@unternehmen.ch",
      subject: "Kurzer Titel für Ihr Anliegen",
      message: "Beschreiben Sie Ihr Anliegen möglichst konkret …",
    },
    categories: {
      general: "Allgemein",
      technical: "Technisch",
      billing: "Abrechnung",
      other: "Sonstiges",
    },
    feedback: {
      success: "Vielen Dank! Ihr Ticket wurde versendet.",
      errorGeneric:
        "Versand fehlgeschlagen. Bitte versuchen Sie es erneut oder kontaktieren Sie uns per E-Mail.",
      errorConfig:
        "E-Mail-Service ist nicht konfiguriert. Bitte hinterlegen Sie die EmailJS-Umgebungsvariablen.",
      hint:
        "Hinweis: Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zum Zweck der Support-Bearbeitung zu.",
    },
    validation: {
      nameMin: "Bitte geben Sie Ihren Namen an.",
      emailInvalid: "Bitte eine gültige E-Mail-Adresse angeben.",
      subjectMin: "Bitte ein aussagekräftiges Betreff angeben.",
      messageMin:
        "Bitte beschreiben Sie Ihr Anliegen (mindestens 10 Zeichen).",
    },
  },
  en: {
    labels: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      category: "Category",
      message: "Message",
      submit: "Submit ticket",
      sending: "Sending …",
    },
    placeholders: {
      name: "John Smith",
      email: "name@company.com",
      subject: "Short title for your request",
      message: "Describe your request as specifically as possible …",
    },
    categories: {
      general: "General",
      technical: "Technical",
      billing: "Billing",
      other: "Other",
    },
    feedback: {
      success: "Thank you! Your ticket has been sent.",
      errorGeneric:
        "Sending failed. Please try again or contact us via email.",
      errorConfig:
        "Email service is not configured. Please set the EmailJS environment variables.",
      hint:
        "Note: By submitting, you agree to the processing of your data for support purposes.",
    },
    validation: {
      nameMin: "Please provide your name.",
      emailInvalid: "Please enter a valid email address.",
      subjectMin: "Please enter a meaningful subject.",
      messageMin:
        "Please describe your request (at least 10 characters).",
    },
  },
  fr: {
    labels: {
      name: "Nom",
      email: "E-mail",
      subject: "Objet",
      category: "Catégorie",
      message: "Message",
      submit: "Envoyer le ticket",
      sending: "Envoi…",
    },
    placeholders: {
      name: "Jean Dupont",
      email: "nom@entreprise.ch",
      subject: "Titre court pour votre demande",
      message: "Décrivez votre demande le plus précisément possible…",
    },
    categories: {
      general: "Général",
      technical: "Technique",
      billing: "Facturation",
      other: "Autre",
    },
    feedback: {
      success: "Merci ! Votre ticket a été envoyé.",
      errorGeneric:
        "Échec de l’envoi. Veuillez réessayer ou nous contacter par e-mail.",
      errorConfig:
        "Le service e-mail n’est pas configuré. Veuillez définir les variables d’environnement EmailJS.",
      hint:
        "Remarque : En envoyant, vous acceptez le traitement de vos données à des fins de support.",
    },
    validation: {
      nameMin: "Veuillez indiquer votre nom.",
      emailInvalid: "Veuillez saisir une adresse e-mail valide.",
      subjectMin: "Veuillez saisir un objet pertinent.",
      messageMin:
        "Veuillez décrire votre demande (au moins 10 caractères).",
    },
  },
}

function makeSchema(t: (typeof i18n)[Lang]) {
  return z.object({
    name: z.string().min(2, t.validation.nameMin),
    email: z.string().email(t.validation.emailInvalid),
    subject: z.string().min(3, t.validation.subjectMin),
    message: z.string().min(10, t.validation.messageMin),
    category: z.enum(["general", "technical", "billing", "other"]).optional(),
  })
}

type TicketValues = {
  name: string
  email: string
  subject: string
  message: string
  category?: "general" | "technical" | "billing" | "other"
}

function getEmailJsEnv() {
  // EmailJS benötigt Public Key clientseitig – daher NEXT_PUBLIC_*
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ""
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ""
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
  return { serviceId, templateId, publicKey }
}

export function SupportTicketForm({ locale = "de" }: { locale?: Lang }) {
  const t = i18n[locale] ?? i18n.de
  const schema = useMemo(() => makeSchema(t), [t])
  const { serviceId, templateId, publicKey } = useMemo(getEmailJsEnv, [])
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TicketValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      category: "general",
    },
  })

  const onSubmit = useCallback(
    async (values: TicketValues) => {
      setStatus("sending")
      setErrorMsg(null)

      if (!serviceId || !templateId || !publicKey) {
        setStatus("error")
        setErrorMsg(t.feedback.errorConfig)
        return
      }

      try {
        const templateParams = {
          // Passen Sie diese Keys an Ihr EmailJS-Template an
          from_name: values.name,
          from_email: values.email,
          subject: values.subject,
          message: values.message,
          category: values.category || "general",
          app_path: typeof window !== "undefined" ? window.location.pathname : "",
          app_lang: locale,
        }

        await emailjs.send(serviceId, templateId, templateParams, { publicKey })
        setStatus("success")
        reset()
      } catch (_err: unknown) {
        setStatus("error")
        setErrorMsg(t.feedback.errorGeneric)
      }
    },
    [locale, publicKey, reset, serviceId, t.feedback.errorGeneric, t.feedback.errorConfig, templateId]
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900" htmlFor="name">
            {t.labels.name}
          </label>
          <Input
            id="name"
            placeholder={t.placeholders.name}
            aria-invalid={!!errors.name}
            {...register("name")}
            className="bg-white"
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900" htmlFor="email">
            {t.labels.email}
          </label>
          <Input
            id="email"
            type="email"
            placeholder={t.placeholders.email}
            aria-invalid={!!errors.email}
            {...register("email")}
            className="bg-white"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900" htmlFor="subject">
            {t.labels.subject}
          </label>
          <Input
            id="subject"
            placeholder={t.placeholders.subject}
            aria-invalid={!!errors.subject}
            {...register("subject")}
            className="bg-white"
          />
          {errors.subject && (
            <p className="text-sm text-red-600">{errors.subject.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900" htmlFor="category">
            {t.labels.category}
          </label>
          <select
            id="category"
            className="h-9 w-full rounded-md border border-gray-300 bg-white px-3 text-sm font-sans shadow-xs outline-none appearance-none focus-visible:ring-[3px] focus-visible:ring-teal-500/20 focus-visible:border-teal-500"
            {...register("category")}
            defaultValue="general"
          >
            <option value="general">{t.categories.general}</option>
            <option value="technical">{t.categories.technical}</option>
            <option value="billing">{t.categories.billing}</option>
            <option value="other">{t.categories.other}</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900" htmlFor="message">
          {t.labels.message}
        </label>
        <Textarea
          id="message"
          rows={6}
          placeholder={t.placeholders.message}
          aria-invalid={!!errors.message}
          {...register("message")}
          className="bg-white"
        />
        {errors.message && (
          <p className="text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          className="rounded-lg bg-teal-600 px-6 text-white hover:bg-teal-700"
          disabled={isSubmitting || status === "sending"}
        >
          {status === "sending" ? t.labels.sending : t.labels.submit}
        </Button>
        {status === "success" && (
          <span className="text-sm text-teal-700">{t.feedback.success}</span>
        )}
        {status === "error" && (
          <span className="text-sm text-red-600">{errorMsg}</span>
        )}
      </div>

      <p className="text-xs text-gray-500">{t.feedback.hint}</p>
    </form>
  )
}