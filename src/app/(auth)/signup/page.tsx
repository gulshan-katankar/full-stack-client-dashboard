import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const { message } = await searchParams

  const signUp = async (formData: FormData) => {
    'use server'

    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      console.error("Signup Error:", error);
      return redirect(`/signup?message=${encodeURIComponent(error.message)}`)
    }

    return redirect('/signup?message=Check email to continue sign in process')
  }

  return (
    <div className="w-full rounded-2xl bg-white p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-[#09090b]">Create an account</h1>
        <p className="text-sm text-gray-500 mt-2">Get started with your client dashboard</p>
      </div>

      <form className="space-y-5" action={signUp}>
        <div className="space-y-2 text-left">
          <Label htmlFor="email" className="text-gray-600 font-medium">Email Address</Label>
          <Input id="email" name="email" type="email" placeholder="hello@example.com" required className="h-11" />
        </div>
        <div className="space-y-2 text-left">
          <Label htmlFor="password" className="text-gray-600 font-medium">Password</Label>
          <Input id="password" name="password" type="password" required className="h-11" />
        </div>

        <Button type="submit" className="w-full h-11 bg-black hover:bg-gray-800 text-md">
          Create Account
        </Button>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-indigo-600 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
            {message}
          </p>
        )}
      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-gray-500">Already have an account? </span>
        <Link href="/login" className="font-semibold text-black hover:text-gray-700 transition-colors">
          Sign in
        </Link>
      </div>
    </div>
  );
}
