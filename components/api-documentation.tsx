'use client'

import { useState } from 'react'
import { Menu, X, ChevronRight, FileText, BookOpen, Bug, History, Lock, Code, Users, Shield } from 'lucide-react'
import { Button } from '@/components/simple-button'
import { cn } from '@/lib/utils'

interface NavItem {
  id: string
  title: string
  icon: React.ElementType
  children?: { id: string; title: string }[]
}

const navigationItems: NavItem[] = [
  { id: 'overview', title: 'Overview', icon: FileText },
  { id: 'first-steps', title: 'First Steps', icon: BookOpen },
  { id: 'reporting', title: 'Reporting a Problem', icon: Bug },
  { id: 'changelog', title: 'Change Log', icon: History },
  {
    id: 'authentication',
    title: 'Authentication',
    icon: Lock,
    children: [
      { id: 'auth-placeholder-1', title: 'OAuth 2.0 Flow' },
      { id: 'auth-placeholder-2', title: 'API Keys' },
    ],
  },
  {
    id: 'api-basics',
    title: 'API Basics',
    icon: Code,
    children: [
      { id: 'basics-placeholder-1', title: 'Request Format' },
      { id: 'basics-placeholder-2', title: 'Response Format' },
    ],
  },
  {
    id: 'experts',
    title: 'Experts',
    icon: Users,
    children: [
      { id: 'experts-placeholder-1', title: 'List Experts' },
      { id: 'experts-placeholder-2', title: 'Create Expert' },
    ],
  },
  {
    id: 'insurer',
    title: 'Insurer',
    icon: Shield,
    children: [
      { id: 'insurer-placeholder-1', title: 'List Insurers' },
      { id: 'insurer-placeholder-2', title: 'Create Insurer' },
    ],
  },
]

export function ApiDocumentation() {
  const [activeSection, setActiveSection] = useState('overview')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>(['authentication', 'api-basics'])

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
            <h1 className="text-xl font-semibold tracking-tight">API Documentation</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              v3.0.0
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 top-16 z-40 w-64 border-r border-border bg-sidebar transition-transform lg:translate-x-0',
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
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
                        setActiveSection(item.id)
                        setIsMobileMenuOpen(false)
                      }
                    }}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      activeSection === item.id
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 text-left text-balance">{item.title}</span>
                    {item.children && (
                      <ChevronRight
                        className={cn(
                          'h-4 w-4 shrink-0 transition-transform',
                          expandedItems.includes(item.id) && 'rotate-90'
                        )}
                      />
                    )}
                  </button>
                  {item.children && expandedItems.includes(item.id) && (
                    <div className="ml-7 mt-1 space-y-1 border-l border-border pl-4">
                      {item.children.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => {
                            setActiveSection(child.id)
                            setIsMobileMenuOpen(false)
                          }}
                          className={cn(
                            'flex w-full items-center rounded-md px-3 py-1.5 text-sm transition-colors',
                            activeSection === child.id
                              ? 'font-medium text-sidebar-accent-foreground'
                              : 'text-muted-foreground hover:text-sidebar-foreground'
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

        {/* Main Content */}
        <main className="flex-1 lg:pl-64">
          <div className="mx-auto max-w-4xl px-6 py-12">
            {activeSection === 'overview' && <OverviewSection />}
            {activeSection === 'first-steps' && <FirstStepsSection />}
            {activeSection === 'reporting' && <ReportingSection />}
            {activeSection === 'changelog' && <ChangeLogSection />}
            {activeSection === 'authentication' && <AuthenticationSection />}
            {activeSection === 'api-basics' && <ApiBasicsSection />}
            {activeSection === 'experts' && <ExpertsSection />}
            {activeSection === 'insurer' && <InsurerSection />}
            {activeSection === 'auth-placeholder-1' && <PlaceholderSection title="OAuth 2.0 Flow" />}
            {activeSection === 'auth-placeholder-2' && <PlaceholderSection title="API Keys" />}
            {activeSection === 'basics-placeholder-1' && <PlaceholderSection title="Request Format" />}
            {activeSection === 'basics-placeholder-2' && <PlaceholderSection title="Response Format" />}
            {activeSection === 'experts-placeholder-1' && <PlaceholderSection title="List Experts" />}
            {activeSection === 'experts-placeholder-2' && <PlaceholderSection title="Create Expert" />}
            {activeSection === 'insurer-placeholder-1' && <PlaceholderSection title="List Insurers" />}
            {activeSection === 'insurer-placeholder-2' && <PlaceholderSection title="Create Insurer" />}
          </div>
        </main>
      </div>
    </div>
  )
}

function OverviewSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Overview</h2>
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
          The API uses HTTPS methods and RESTful endpoints to create, edit, and manage resources in the system. JSON is used as the data interchange format.
        </p>
      </div>
      
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-3 text-xl font-semibold">Getting Started</h3>
        <p className="leading-relaxed text-muted-foreground text-pretty">
          This API provides comprehensive access to all core functionalities. Whether you're building integrations, automating workflows, or creating custom applications, our API offers the flexibility and power you need.
        </p>
      </div>

      <div className="rounded-lg border border-[#2a8289] p-6" style={{ backgroundColor: '#2a8289' }}>
        <h3 className="mb-3 text-xl font-semibold text-white">Stay Up-to-Date</h3>
        <ul className="space-y-2 text-white">
          <li className="flex gap-2">
            <span className="text-white">•</span>
            <span className="text-pretty">Subscribe to our status page to get informed about short term issues with the API.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-white">•</span>
            <span className="text-pretty">Subscribe to our API developer newsletter to get the latest news and updates around our API platform.</span>
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
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">First Steps</h2>
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
          Follow these steps to get started with the API:
        </p>
      </div>

      <div className="space-y-4">
        {[
          {
            step: '1',
            title: 'Create an Account',
            description: 'Sign up for a claimity account (app.claimity.ch) and complete the account setup. If you already have an account, you can skip this step.',
          },
          {
            step: '2',
            title: 'Get API Credentials',
            description: 'Navigate to the developer portal and create a new application to receive your API credentials.',
          },
          {
            step: '3',
            title: 'Authenticate',
            description: 'Use the authentication flow to obtain an access token for your requests.',
          },
          {
            step: '4',
            title: 'Make Your First Request',
            description: 'Use your access token to make authenticated requests to the API endpoints.',
          },
        ].map((item) => (
          <div key={item.step} className="flex gap-4 rounded-lg border border-border bg-card p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white" style={{ backgroundColor: '#2a8289' }}>
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
        <h3 className="mb-3 font-mono text-sm font-semibold">Example Request</h3>
        <pre className="overflow-x-auto rounded bg-background p-4 text-sm">
          <code className="font-mono text-foreground">
{`curl -X GET \\
  https://api.example.com/v1/experts \\
  -H 'Accept: application/json' \\
  -H 'Authorization: Bearer {access-token}'`}
          </code>
        </pre>
      </div>
    </div>
  )
}

function ReportingSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Reporting a Problem</h2>
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
          If you've encountered a bug, we're here to help. Before you begin, ensure you can reproduce the issue.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Before Reporting</h3>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-primary">✓</span>
            <span className="text-pretty">Ensure you can reproduce the issue consistently</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary">✓</span>
            <span className="text-pretty">Test using a tool for testing APIs, such as Postman or Insomnia</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary">✓</span>
            <span className="text-pretty">Gather detailed information about the request and response</span>
          </li>
          <li className="flex gap-3">
            <span className="text-destructive">✗</span>
            <span className="text-pretty">Do not include any credentials in your report</span>
          </li>
        </ul>
      </div>

      <div className="rounded-lg border border-[#2a8289] p-6" style={{ backgroundColor: '#2a8289' }}>
        <h3 className="mb-3 text-lg font-semibold text-white">Submit a Report</h3>
        <p className="mb-4 text-sm leading-relaxed text-white text-pretty">
          Please include detailed steps allowing us to reproduce the issue. Our support team will investigate and respond as soon as possible.
        </p>
        <Button className="bg-white text-black hover:bg-white/90">
          Report a Problem
        </Button>
      </div>

      <div className="rounded-lg bg-muted p-6">
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          <strong className="text-foreground">Note:</strong> The API is provided as-is based on this documentation. There is no guided implementation or code support available.
        </p>
      </div>
    </div>
  )
}

function ChangeLogSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Change Log</h2>
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
          Track all changes and updates to the current version of the API.
        </p>
      </div>

      <div className="space-y-4">
        {[
          {
            date: '2025-01-15',
            changes: 'Added new filtering options to Experts and Insurer endpoints',
          },
          {
            date: '2025-01-10',
            changes: 'Improved error messages for authentication failures',
          },
          {
            date: '2024-12-20',
            changes: 'Added pagination support to all list endpoints',
          },
          {
            date: '2024-12-15',
            changes: 'Initial API version released',
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex gap-6 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50"
          >
            <div className="shrink-0">
              <div className="rounded-md bg-muted px-3 py-1.5 font-mono text-sm font-medium">
                {item.date}
              </div>
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
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Authentication</h2>
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
          All API requests require authentication using OAuth 2.0 or API keys.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">OAuth 2.0</h3>
        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">
          OAuth 2.0 is the recommended authentication method for applications that need to access user data. The authorization code flow provides secure access with refresh tokens.
        </p>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p className="text-pretty">
            Navigate to the sub-sections to learn more about the authentication flows and how to implement them.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">API Keys</h3>
        <p className="leading-relaxed text-muted-foreground text-pretty">
          For server-to-server integrations, you can use API keys. These provide direct access without requiring user consent.
        </p>
      </div>

      <div className="rounded-lg bg-muted p-6">
        <h3 className="mb-3 font-mono text-sm font-semibold">Authentication Header</h3>
        <pre className="overflow-x-auto rounded bg-background p-4 text-sm">
          <code className="font-mono text-foreground">
{`Authorization: Bearer {your-access-token}`}
          </code>
        </pre>
      </div>
    </div>
  )
}

function ApiBasicsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">API Basics</h2>
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
          Learn about the fundamental concepts and conventions used throughout the API.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-3 text-lg font-semibold">Base URL</h3>
          <code className="block rounded bg-muted px-3 py-2 font-mono text-sm">
            https://api.example.com/v1
          </code>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-3 text-lg font-semibold">Content Type</h3>
          <code className="block rounded bg-muted px-3 py-2 font-mono text-sm">
            application/json
          </code>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">HTTP Methods</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="w-20 rounded bg-primary/10 px-3 py-1 font-mono text-sm font-medium text-primary">
              GET
            </span>
            <span className="text-sm text-muted-foreground">Retrieve resources</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 rounded bg-accent/10 px-3 py-1 font-mono text-sm font-medium text-accent">
              POST
            </span>
            <span className="text-sm text-muted-foreground">Create new resources</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 rounded bg-primary/10 px-3 py-1 font-mono text-sm font-medium text-primary">
              PUT
            </span>
            <span className="text-sm text-muted-foreground">Update existing resources</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 rounded bg-destructive/10 px-3 py-1 font-mono text-sm font-medium text-destructive">
              DELETE
            </span>
            <span className="text-sm text-muted-foreground">Remove resources</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Rate Limiting</h3>
        <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">
          API requests are rate limited to ensure fair usage. The current limits are:
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span className="text-pretty">1000 requests per hour for authenticated requests</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span className="text-pretty">100 requests per hour for unauthenticated requests</span>
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
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Experts</h2>
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
          The Experts endpoint allows you to manage expert profiles and their associated data.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Overview</h3>
        <p className="mb-6 leading-relaxed text-muted-foreground text-pretty">
          Use these endpoints to create, retrieve, update, and delete expert profiles. Each expert can have associated specializations, contact information, and availability.
        </p>
        
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-sm font-semibold">GET /experts</span>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                List
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-pretty">
              Retrieve a paginated list of all experts
            </p>
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-sm font-semibold">POST /experts</span>
              <span className="rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
                Create
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-pretty">
              Create a new expert profile
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-muted p-6">
        <h3 className="mb-3 font-mono text-sm font-semibold">Example Response</h3>
        <pre className="overflow-x-auto rounded bg-background p-4 text-sm">
          <code className="font-mono text-foreground">
{`{
  "id": "exp_123456",
  "name": "Dr. Jane Smith",
  "specialization": "Medical Expert",
  "email": "jane.smith@example.com",
  "status": "active"
}`}
          </code>
        </pre>
      </div>
    </div>
  )
}

function InsurerSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance">Insurer</h2>
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
          The Insurer endpoint provides access to insurance company data and related operations.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">Overview</h3>
        <p className="mb-6 leading-relaxed text-muted-foreground text-pretty">
          Manage insurance company profiles, including company details, coverage types, and contact information. These endpoints support full CRUD operations.
        </p>
        
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-sm font-semibold">GET /insurers</span>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                List
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-pretty">
              Retrieve a paginated list of all insurance companies
            </p>
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-sm font-semibold">POST /insurers</span>
              <span className="rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
                Create
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-pretty">
              Create a new insurer profile
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-muted p-6">
        <h3 className="mb-3 font-mono text-sm font-semibold">Example Response</h3>
        <pre className="overflow-x-auto rounded bg-background p-4 text-sm">
          <code className="font-mono text-foreground">
{`{
  "id": "ins_789012",
  "name": "Global Insurance Co.",
  "coverage_types": ["health", "liability"],
  "contact_email": "contact@globalinsurance.com",
  "status": "active"
}`}
          </code>
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
          Detailed documentation for {title} will be available here.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-xl font-semibold">Coming Soon</h3>
        <p className="text-muted-foreground text-pretty">
          This section is currently under development. Check back soon for comprehensive documentation.
        </p>
      </div>
    </div>
  )
}
