import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sun, Mail } from 'lucide-react'
import Link from 'next/link'

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-muted/30 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center gap-2 text-foreground">
            <Sun className="h-8 w-8 text-amber-500" />
            <span className="text-xl font-semibold">SolarVoice AI</span>
          </div>
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Check your email</CardTitle>
              <CardDescription>
                {"We've sent you a confirmation link. Please check your email to verify your account."}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link
                href="/auth/login"
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Back to sign in
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
