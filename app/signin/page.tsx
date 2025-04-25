import { auth, signIn } from '@/auth';
import { GoogleSignInButton } from '@/components/ui/googleButton';
import { redirect } from 'next/navigation';

async function handleSignIn(formData: FormData) {
  'use server';
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    throw new Error("All fields are required.");
  }

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    return redirect('/dashboard');
  } catch (error) {
    if ((error as Error).message.includes('NEXT_REDIRECT')) {
      throw error;
    }
    console.error(error);
    throw new Error("Sign-in failed. Please try again.");
  }
}

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Sign In
        </h1>
        
        <form action={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="moetez@email.com"
              required
              className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-800 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="123"
              required
              className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-800 text-white placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition duration-150 ease-in-out"
          >
            Sign In
          </button>
        </form>
        <br></br>
        <div className="mb-6">
          <GoogleSignInButton />
        </div>

        <div className="mt-4 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <a href="/signup" className="text-indigo-400 hover:text-indigo-300 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
