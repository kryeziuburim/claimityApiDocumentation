"use client"

import { useState, useEffect, useCallback } from "react"
import { Menu, X, ChevronRight, FileText, BookOpen, Bug, History, Lock, Code, Users, Shield } from "lucide-react"
import { Button } from "@/components/simple-button"
import { cn } from "@/lib/utils"

interface NavItem {
  id: string
  title: string
  icon: React.ElementType
  children?: { id: string; title: string }[]
}

const navigationItems: NavItem[] = [
  { id: "overview", title: "Aperçu", icon: FileText },
  { id: "first-steps", title: "Premiers pas", icon: BookOpen },
  { id: "reporting", title: "Signaler un problème", icon: Bug },
  { id: "changelog", title: "Journal des modifications", icon: History },
  {
    id: "authentication",
    title: "Authentification",
    icon: Lock,
    children: [
      { id: "auth-placeholder-1", title: "Flux OAuth 2.0" },
      { id: "auth-placeholder-2", title: "Clés API" },
    ],
  },
  {
    id: "api-basics",
    title: "Principes de base de l’API",
    icon: Code,
    children: [
      { id: "basics-placeholder-1", title: "Format des requêtes" },
      { id: "basics-placeholder-2", title: "Format des réponses" },
    ],
  },
  {
    id: "experts",
    title: "Expert·e·s",
    icon: Users,
    children: [
      { id: "experts-placeholder-1", title: "Lister les expert·e·s" },
      { id: "experts-placeholder-2", title: "Créer un·e expert·e" },
    ],
  },
  {
    id: "insurer",
    title: "Assureurs",
    icon: Shield,
    children: [
      { id: "insurer-placeholder-1", title: "Lister les assureurs" },
      { id: "insurer-placeholder-2", title: "Créer un assureur" },
    ],
  },
]

export default function Page() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>(["authentication", "api-basics"])

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  // Détection de section active via IntersectionObserver
  const [activeId, setActiveId] = useState<string>("overview")

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setIsMobileMenuOpen(false)
  }, [])

  useEffect(() => {
    const ids = [
      ...navigationItems.map((i) => i.id),
      ...navigationItems.flatMap((i) => (i.children ? i.children.map((c) => c.id) : [])),
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) {
          setActiveId(visible.target.id)
        }
      },
      {
        root: null,
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* En-tête */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="text-xl font-semibold tracking-tight">Documentation de l’API</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">v3.0.0</Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Navigation latérale */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 top-16 z-40 w-64 border-r border-border bg-sidebar transition-transform lg:translate-x-0",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="h-[calc(100vh-4rem)] overflow-y-auto py-6">
            <nav className="space-y-1 px-3">
              {navigationItems.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      if (item.children) {
                        toggleExpanded(item.id)
                      } else {
                        handleNavigate(item.id)
                      }
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      activeId === item.id
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 text-left text-balance">{item.title}</span>
                    {item.children && (
                      <ChevronRight
                        className={cn("h-4 w-4 shrink-0 transition-transform", expandedItems.includes(item.id) && "rotate-90")}
                      />
                    )}
                  </button>
                  {item.children && expandedItems.includes(item.id) && (
                    <div className="ml-7 mt-1 space-y-1 border-l border-border pl-4">
                      {item.children.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => {
                            handleNavigate(child.id)
                          }}
                          className={cn(
                            "flex w-full items-center rounded-md px-3 py-1.5 text-sm transition-colors",
                            activeId === child.id
                              ? "font-medium text-sidebar-accent-foreground"
                              : "text-muted-foreground hover:text-sidebar-foreground",
                          )}
                        >
                          <span className="text-balance">{child.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Contenu principal */}
        <main className="flex-1 lg:pl-64">
          <div className="mx-auto max-w-4xl px-6 py-12">
            <Section id="overview"><OverviewSection /></Section>
            <Section id="first-steps"><FirstStepsSection /></Section>
            <Section id="reporting"><ReportingSection /></Section>
            <Section id="changelog"><ChangeLogSection /></Section>
            <Section id="authentication"><AuthenticationSection /></Section>
            <Section id="api-basics"><ApiBasicsSection /></Section>
            <Section id="experts"><ExpertsSection /></Section>
            <Section id="insurer"><InsurerSection /></Section>
          </div>
        </main>
      </div>
    </div>
  )
}

const Section = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24 py-2">
    {children}
  </section>
)

function OverviewSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Aperçu</h2>
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
          L’API utilise des méthodes HTTPS et des endpoints REST pour créer, modifier et gérer les ressources du système.
          Le format d’échange est JSON.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-3 text-xl font-semibold">Bien démarrer</h3>
        <p className="leading-relaxed text-muted-foreground text-pretty">
          Cette API donne un accès complet aux fonctionnalités clés. Intégrations, automatisation, applications sur‑mesure :
          elle offre la flexibilité et la puissance nécessaires.
        </p>
      </div>

      <div className="rounded-lg border border-[#2a8289] p-6" style={{ backgroundColor: "#2a8289" }}>
        <h3 className="mb-3 text-xl font-semibold text-white">Rester informé·e</h3>
        <ul className="space-y-2 text-white">
          <li className="flex gap-2">
            <span className="text-white">•</span>
            <span className="text-pretty">Abonnez‑vous à notre page de statut pour être informé·e des incidents à court terme.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-white">•</span>
            <span className="text-pretty">Abonnez‑vous à la newsletter développeur API pour les actualités et mises à jour.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

function FirstStepsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Premiers pas</h2>
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
          Suivez ces étapes pour commencer avec l’API :
        </p>
      </div>

      <div className="space-y-4">
        {[
          {
            step: "1",
            title: "Créer un compte",
            description:
              "Créez un compte Claimity (app.claimity.ch) et terminez la configuration. Si vous avez déjà un compte, passez à l’étape suivante.",
          },
          {
            step: "2",
            title: "Obtenir des identifiants API",
            description:
              "Accédez au portail développeur et créez une nouvelle application pour obtenir vos identifiants API.",
          },
          {
            step: "3",
            title: "S’authentifier",
            description:
              "Utilisez le flux d’authentification pour obtenir un jeton d’accès (access token) pour vos requêtes.",
          },
          {
            step: "4",
            title: "Effectuer votre première requête",
            description:
              "Utilisez votre jeton d’accès pour envoyer des requêtes authentifiées vers les endpoints de l’API.",
          },
        ].map((item) => (
          <div key={item.step} className="flex gap-4 rounded-lg border border-border bg-card p-5">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white"
              style={{ backgroundColor: "#2a8289" }}
            >
              {item.step}
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-balance">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-muted p-6">
        <h3 className="mb-3 font-mono text-sm font-semibold">Exemple de requête</h3>
        <pre className="overflow-x-auto rounded bg-background p-4 text-sm">
          <code className="font-mono text-foreground">{`curl -X GET \\
  https://api.example.com/v1/experts \\
  -H 'Accept: application/json' \\
  -H 'Authorization: Bearer {access-token}'`}</code>
        </pre>
      </div>
    </div>
  )
}

function ReportingSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Signaler un problème</h2>
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
          Si vous avez rencontré un bug, nous sommes là pour vous aider. Assurez‑vous d’abord que le problème est
          reproductible.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Avant de signaler</h3>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-primary">✓</span>
            <span className="text-pretty">Vérifiez que le problème est reproductible</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary">✓</span>
            <span className="text-pretty">Testez avec un outil d’API (Postman, Insomnia, …)</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary">✓</span>
            <span className="text-pretty">Rassemblez les informations détaillées de requête et de réponse</span>
          </li>
          <li className="flex gap-3">
            <span className="text-destructive">✗</span>
            <span className="text-pretty">N’incluez aucun identifiant/secret dans votre signalement</span>
          </li>
        </ul>
      </div>

      <div className="rounded-lg border border-[#2a8289] p-6" style={{ backgroundColor: "#2a8289" }}>
        <h3 className="mb-3 text-lg font-semibold text-white">Soumettre un signalement</h3>
        <p className="mb-4 text-sm leading-relaxed text-white text-pretty">
          Merci d’inclure des étapes détaillées permettant de reproduire le problème. Notre support analysera et répondra
          dès que possible.
        </p>
        <Button className="bg-white text-black hover:bg-white/90">Signaler un problème</Button>
      </div>

      <div className="rounded-lg bg-muted p-6">
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          <strong className="text-foreground">Remarque :</strong> L’API est fournie telle quelle sur la base de cette
          documentation. Il n’y a pas d’accompagnement d’implémentation ni de support code.
        </p>
      </div>
    </div>
  )
}

function ChangeLogSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Journal des modifications</h2>
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
          Suivez tous les changements et mises à jour de la version actuelle de l’API.
        </p>
      </div>

      <div className="space-y-4">
        {[
          {
            date: "2025-01-15",
            changes: "Ajout d’options de filtrage pour les endpoints Expert·e·s et Assureurs",
          },
          {
            date: "2025-01-10",
            changes: "Amélioration des messages d’erreur pour les échecs d’authentification",
          },
          {
            date: "2024-12-20",
            changes: "Ajout de la pagination à tous les endpoints de liste",
          },
          {
            date: "2024-12-15",
            changes: "Première version de l’API publiée",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex gap-6 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50"
          >
            <div className="shrink-0">
              <div className="rounded-md bg-muted px-3 py-1.5 font-mono text-sm font-medium">{item.date}</div>
            </div>
            <div className="flex-1">
              <p className="leading-relaxed text-pretty">{item.changes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AuthenticationSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Authentification</h2>
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
          Toutes les requêtes API nécessitent une authentification via OAuth 2.0 ou clés API.
        </p>
      </div>

      <div id="auth-placeholder-1" className="api-anchor h-0 scroll-mt-24" />
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">OAuth 2.0</h3>
        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">
          OAuth 2.0 est la méthode recommandée pour les applications qui doivent accéder à des données utilisateur.
          Le flux Authorization Code offre un accès sécurisé avec des jetons d’actualisation.
        </p>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p className="text-pretty">
            Consultez les sous-sections pour en savoir plus sur les flux et leur implémentation.
          </p>
        </div>
      </div>

      <div id="auth-placeholder-2" className="api-anchor h-0 scroll-mt-24" />
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Clés API</h3>
        <p className="leading-relaxed text-muted-foreground text-pretty">
          Pour les intégrations serveur‑à‑serveur, vous pouvez utiliser des clés API. Elles offrent un accès direct sans
          consentement utilisateur.
        </p>
      </div>

      <div className="rounded-lg bg-muted p-6">
        <h3 className="mb-3 font-mono text-sm font-semibold">En‑tête d’authentification</h3>
        <pre className="overflow-x-auto rounded bg-background p-4 text-sm">
          <code className="font-mono text-foreground">{`Authorization: Bearer {your-access-token}`}</code>
        </pre>
      </div>
    </div>
  )
}

function ApiBasicsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Principes de base de l’API</h2>
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
          Concepts et conventions essentiels utilisés dans toute l’API.
        </p>
      </div>
      <div id="basics-placeholder-1" className="api-anchor h-0 scroll-mt-24" />
      <div id="basics-placeholder-2" className="api-anchor h-0 scroll-mt-24" />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-3 text-lg font-semibold">URL de base</h3>
          <code className="block rounded bg-muted px-3 py-2 font-mono text-sm">https://api.example.com/v1</code>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-3 text-lg font-semibold">Type de contenu</h3>
          <code className="block rounded bg-muted px-3 py-2 font-mono text-sm">application/json</code>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Méthodes HTTP</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="w-20 rounded bg-primary/10 px-3 py-1 font-mono text-sm font-medium text-primary">GET</span>
            <span className="text-sm text-muted-foreground">Récupérer des ressources</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 rounded bg-accent/10 px-3 py-1 font-mono text-sm font-medium text-accent">POST</span>
            <span className="text-sm text-muted-foreground">Créer de nouvelles ressources</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 rounded bg-primary/10 px-3 py-1 font-mono text-sm font-medium text-primary">PUT</span>
            <span className="text-sm text-muted-foreground">Mettre à jour des ressources</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 rounded bg-destructive/10 px-3 py-1 font-mono text-sm font-medium text-destructive">
              DELETE
            </span>
            <span className="text-sm text-muted-foreground">Supprimer des ressources</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Limitation de débit (Rate limiting)</h3>
        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">
          Les requêtes API sont limitées pour assurer une utilisation équitable. Limites actuelles :
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span className="text-pretty">1000 requêtes/heure pour les requêtes authentifiées</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span className="text-pretty">100 requêtes/heure pour les requêtes non authentifiées</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

function ExpertsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Expert·e·s</h2>
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
          L’endpoint Expert·e·s vous permet de gérer les profils d’expert·e·s et leurs données associées.
        </p>
      </div>

      <div id="experts-placeholder-1" className="api-anchor h-0 scroll-mt-24" />
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Aperçu</h3>
        <p className="mb-6 leading-relaxed text-muted-foreground text-pretty">
          Utilisez ces endpoints pour créer, récupérer, mettre à jour et supprimer des profils. Chaque expert·e peut avoir des
          spécialisations, des coordonnées et une disponibilité associées.
        </p>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-sm font-semibold">GET /experts</span>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">List</span>
            </div>
            <p className="text-sm text-muted-foreground text-pretty">Récupérer une liste paginée de tous les expert·e·s</p>
          </div>

          <div id="experts-placeholder-2" className="api-anchor h-0 scroll-mt-24" />
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-sm font-semibold">POST /experts</span>
              <span className="rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">Create</span>
            </div>
            <p className="text-sm text-muted-foreground text-pretty">Créer un nouveau profil d’expert·e</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-muted p-6">
        <h3 className="mb-3 font-mono text-sm font-semibold">Exemple de réponse</h3>
        <pre className="overflow-x-auto rounded bg-background p-4 text-sm">
          <code className="font-mono text-foreground">{`{
  "id": "exp_123456",
  "name": "Dr. Jane Smith",
  "specialization": "Medical Expert",
  "email": "jane.smith@example.com",
  "status": "active"
}`}</code>
        </pre>
      </div>
    </div>
  )
}

function InsurerSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Assureurs</h2>
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
          L’endpoint Assureurs donne accès aux données des compagnies d’assurance et opérations associées.
        </p>
      </div>

      <div id="insurer-placeholder-1" className="api-anchor h-0 scroll-mt-24" />
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Aperçu</h3>
        <p className="mb-6 leading-relaxed text-muted-foreground text-pretty">
          Gérez les profils d’assureurs : détails de la société, types de couverture et coordonnées. Ces endpoints prennent en
          charge l’ensemble des opérations CRUD.
        </p>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-sm font-semibold">GET /insurers</span>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">List</span>
            </div>
            <p className="text-sm text-muted-foreground text-pretty">Récupérer une liste paginée de tous les assureurs</p>
          </div>

          <div id="insurer-placeholder-2" className="api-anchor h-0 scroll-mt-24" />
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-sm font-semibold">POST /insurers</span>
              <span className="rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">Create</span>
            </div>
            <p className="text-sm text-muted-foreground text-pretty">Créer un nouveau profil d’assureur</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-muted p-6">
        <h3 className="mb-3 font-mono text-sm font-semibold">Exemple de réponse</h3>
        <pre className="overflow-x-auto rounded bg-background p-4 text-sm">
          <code className="font-mono text-foreground">{`{
  "id": "ins_789012",
  "name": "Global Insurance Co.",
  "coverage_types": ["health", "liability"],
  "contact_email": "contact@globalinsurance.com",
  "status": "active"
}`}</code>
        </pre>
      </div>
    </div>
  )
}

function PlaceholderSection({ title }: { title: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">{title}</h2>
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
          La documentation détaillée pour « {title} » sera disponible ici.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-xl font-semibold">Bientôt disponible</h3>
        <p className="text-muted-foreground text-pretty">
          Cette section est en cours de préparation. Revenez prochainement pour une documentation complète.
        </p>
      </div>
    </div>
  )
}