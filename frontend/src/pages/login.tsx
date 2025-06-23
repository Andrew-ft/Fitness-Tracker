import { LoginForm } from "../components/login-form";
export default function Login() {
  return (
    <div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="mb-6 text-center">
        <h1 className="text-3xl mb-2 font-bold bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p>Sign in to your CoreFitness account</p>
      </div>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
