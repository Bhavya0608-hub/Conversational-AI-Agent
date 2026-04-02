import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sun, Phone, BarChart3, Users, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Sun className="h-6 w-6 text-amber-500" />
            <span className="font-semibold">SolarVoice AI</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-24 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm">
              <Sun className="h-4 w-4 text-amber-500" />
              AI-Powered Voice Agent for Solar Sales
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Convert More Solar Leads with{' '}
              <span className="text-amber-500">AI Voice Agents</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Automate your solar lead outreach with intelligent voice agents. 
              Make thousands of calls, qualify leads, and book appointments 
              automatically while you focus on closing deals.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/sign-up">
                <Button size="lg" className="gap-2">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" size="lg">
                  Sign in to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/30 py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-bold tracking-tight">
              Everything you need to scale solar sales
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              Our AI voice agent handles the entire outbound calling process, 
              from initial contact to appointment scheduling.
            </p>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-6">
                <div className="mb-4 inline-flex rounded-lg bg-amber-500/10 p-3">
                  <Phone className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-lg font-semibold">Single Calls</h3>
                <p className="mt-2 text-muted-foreground">
                  Make individual outbound calls with personalized lead information 
                  including location, property type, and monthly bill.
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <div className="mb-4 inline-flex rounded-lg bg-amber-500/10 p-3">
                  <Users className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-lg font-semibold">Batch Campaigns</h3>
                <p className="mt-2 text-muted-foreground">
                  Upload hundreds of leads and let our AI call them automatically. 
                  Import via CSV or add leads manually.
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <div className="mb-4 inline-flex rounded-lg bg-amber-500/10 p-3">
                  <BarChart3 className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-lg font-semibold">Analytics & Insights</h3>
                <p className="mt-2 text-muted-foreground">
                  Track call performance, sentiment analysis, and conversion rates. 
                  Listen to recordings and read transcriptions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to transform your solar sales?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Join hundreds of solar companies using AI voice agents to 
              scale their outreach and close more deals.
            </p>
            <div className="mt-10">
              <Link href="/auth/sign-up">
                <Button size="lg" className="gap-2">
                  Get Started Today
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-medium">SolarVoice AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Powered by Retell AI
          </p>
        </div>
      </footer>
    </div>
  )
}
