import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const { message } = await searchParams

  const signIn = async (formData: FormData) => {
    'use server'
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/dashboard')
  }

  return (
    <div className="w-full rounded-2xl bg-white p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-[#09090b]">Welcome back</h1>
        <p className="text-sm text-gray-500 mt-2">Sign in to your client dashboard</p>
      </div>

      <form className="space-y-5" action={signIn}>
        <div className="space-y-2 text-left">
          <Label htmlFor="email" className="text-gray-600 font-medium">Email Address</Label>
          <Input id="email" name="email" type="email" placeholder="hello@example.com" required className="h-11" />
        </div>
        <div className="space-y-2 text-left">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-gray-600 font-medium">Password</Label>
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
          <Input id="password" name="password" type="password" required className="h-11" />
        </div>

        <Button type="submit" className="w-full h-11 bg-black hover:bg-gray-800 text-md">
          Sign In
        </Button>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
            {message}
          </p>
        )}
      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-gray-500">Don't have an account? </span>
        <Link href="/signup" className="font-semibold text-black hover:text-gray-700 transition-colors">
          Create an account
        </Link>
      </div>
    </div>
  );
}
