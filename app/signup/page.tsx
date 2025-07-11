import { auth } from '@/auth';
import { GoogleSignInButton } from '@/components/ui/googleButton';
import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

async function handleSignUp(formData: FormData) {
  "use server";
  
  const url=process.env.BASE_URL ;
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const name = formData.get('name')?.toString();

  if (!email || !password || !name) {
    throw new Error("All fields are required.");
  }

  try {
    const res = await fetch(`${url}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await res.json();
    
    if (res.ok) {
      redirect('/signin');
    } else {
      let errorMessage = `Sign-up failed with status: ${res.status}`;
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
      } catch (jsonError) {
        try {
          const textError = await res.text();
          if (textError) {
            errorMessage = textError;
          }
        } catch (textParseError) {
          console.error("Failed to parse error response body:", textParseError);
        }
      }
      console.error("Sign-up API Error:", errorMessage);
      throw new Error(errorMessage || "Sign-up failed. Please try again.");
    }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error("Error in handleSignUp:", error);
    if (error instanceof Error) {
         if (error.message.includes('Failed to parse URL')) {
             throw new Error("Internal configuration error. Could not determine API endpoint.");
         }
         throw new Error(error.message || "An unexpected error occurred during sign-up.");
    }
    throw new Error("An unexpected error occurred during sign-up.");
}
}

export default async function SignUpPage() {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-white text-center mb-6">
            Create an Account
          </h1>
          
          <form action={handleSignUp} className="space-y-4">
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
                minLength={8}
                className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-800 text-white placeholder-gray-400"
              />
            </div>
  
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-800 text-white placeholder-gray-400"
              />
            </div>
  
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition duration-150 ease-in-out"
            >
              Sign Up
            </button>
          </form>
          <br></br>
          <div className="mb-6">
            <GoogleSignInButton />
          </div>
  
          <div className="mt-4 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <a href="/signin" className="text-indigo-400 hover:text-indigo-300 hover:underline">
              Log in
            </a>
          </div>
        </div>
      </div>
    );
  }