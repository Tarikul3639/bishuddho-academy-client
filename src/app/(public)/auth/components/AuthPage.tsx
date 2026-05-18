"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import Logo from "@/components/ui/Logo";

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "register">("login");

  const isLogin = tab === "login";

  return (
    <div className="flex h-screen bg-white font-sans">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-10">
        {/* LOGO */}
        <div className="mb-10">
          <Logo />
        </div>

        <div className="w-full max-w-md">
          {/* ================= TABS ================= */}
          <div className="mb-8 flex rounded-xl bg-gray-100 p-1 relative">
            <motion.div
              className="absolute top-1 bottom-1 w-1/2 rounded-lg bg-white shadow-sm"
              animate={{ x: tab === "login" ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
            />

            {["login", "register"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t as "login" | "register")}
                className="group flex-1 relative z-10 py-2.5 text-sm font-semibold cursor-pointer transition-colors duration-300"
              >
                <span
                  className={
                    tab === t
                      ? "text-gray-900 group-hover:text-primary transition-colors duration-300"
                      : "text-gray-500 group-hover:text-primary/80 transition-colors duration-300"
                  }
                >
                  {t === "login" ? "Sign in" : "Register"}
                </span>
              </button>
            ))}
          </div>

          {/* ================= FORM SWITCH ================= */}
          <div className="relative w-full">
            {isLogin ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{
                  duration: 0.5,
                  damping: 10,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <LoginForm onSwitch={() => setTab("register")} />
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{
                  duration: 0.5,
                  damping: 10,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <RegisterForm onSwitch={() => setTab("login")} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
