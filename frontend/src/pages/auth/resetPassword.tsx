import { motion } from "framer-motion";
import { ResetPasswordForm } from "../../components/auth/reset-password";

export default function ResetPassword() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
    <div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500 via-transparent to-black opacity-30 blur-5xl pointer-events-none"></div>
      <div className="mb-6 text-center">
        <h1 className="text-3xl mb-2 font-bold bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
          Join CoreFitness
        </h1>
        <p>Reset your password</p>
      </div>
      <div className="w-full max-w-sm">
        <ResetPasswordForm />
      </div>
      </div>
    </motion.div>
  );
}
