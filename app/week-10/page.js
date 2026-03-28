"use client";
import { useUserAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const { user, gitHubSignIn, googleSignIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      router.push("/week-10/shopping-list");
    }
  }, [user, router]);

  // GitHub sign in
  const handleGitHubSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Login failed:", error);
      setError("Failed to sign in with GitHub. Please try again.");
    }
  };

  // Google sign in
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error("Google Login failed:", error);
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-stone-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Shopping List App
        </h1>
        <p className="text-slate-500 mb-8">
          Please sign in to access your dashboard.
        </p>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm font-medium rounded-xl">
            {error}
          </div>
        )}

        {user ? (
          <div className="space-y-6">
            <div className="bg-stone-50 p-4 rounded-xl border border-slate-200">
              <p className="text-lg text-slate-700">
                Welcome back, <br />
                <span className="font-bold text-slate-900">
                  {user.displayName || user.email}
                </span>
                !
              </p>
            </div>

            <Link
              href="/week-10/shopping-list"
              className="block w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors shadow-md"
            >
              Go to Shopping List &rarr;
            </Link>

            <button
              onClick={handleSignOut}
              className="w-full py-3 mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-xl transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="pt-4">
            {/* GitHub  */}
            <button
              onClick={handleGitHubSignIn}
              className="w-full flex items-center justify-center gap-3 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors shadow-md"
            >
              <svg
                height="24"
                width="24"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              Sign in with GitHub
            </button>

            <br />

            {/* Google */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-colors shadow-sm"
            >
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
