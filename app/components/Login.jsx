"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter(); // Changed variable name
  const { data, status } = useSession();

  // If the user is authenticated, navigate to the homepage
  if (status === "authenticated") {
    router.push("/"); // Changed navigate.push() to router.push()
    return null;
  }

  // If the session is loading, don't render anything yet
  if (status === "loading") {
    return null;
  }

  // If the user is not authenticated, show the login options
  return (
    <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800">
      <h2 className="mb-3 text-3xl font-semibold text-center">
        Login to your account
      </h2>
      <p className="text-sm text-center dark:text-gray-600">
        Login to your account to start using our services
      </p>
      <div className="my-6 space-y-4">
        {/* Google Login */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/auth" })}
          aria-label="Login with Google"
          type="button"
          className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-5 h-5 fill-current"
          >
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
          </svg>
          <p>Login with Google</p>
        </button>

       
      </div>
    </div>
  );
}

export default Login;
