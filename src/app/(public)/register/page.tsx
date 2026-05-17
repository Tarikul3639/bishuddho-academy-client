"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight,
  GraduationCap, BookOpen, Award, ShieldCheck, ChevronRight,
  CheckCircle2, AlertCircle
} from "lucide-react";

const FEATURES = [
  { icon: BookOpen, label: "100+ expert-led courses" },
  { icon: Award, label: "Certificates on completion" },
  { icon: ShieldCheck, label: "Secure bKash & card payments" },
  { icon: GraduationCap, label: "Learn at your own pace" },
];

function PasswordStrength({ password }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const colors = ["", "#ef4444", "#f97316", "#eab308", "#22c55e"];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="h-1 flex-1 rounded-full"
            animate={{ backgroundColor: i <= score ? colors[score] : "#e5e7eb" }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
      {password && (
        <p className="text-xs" style={{ color: colors[score] }}>
          {labels[score]}
        </p>
      )}
    </div>
  );
}

function InputField({ label, id, type = "text", placeholder, icon: Icon, value, onChange, hint, rightEl }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative group">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          <Icon className="h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-150" />
        </div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-10 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-150 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
        />
        {rightEl && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightEl}
          </div>
        )}
      </div>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

function Toast({ message, type }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium mb-5 ${
        type === "success"
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
          : "bg-red-50 text-red-700 border border-red-200"
      }`}
    >
      {type === "success" ? (
        <CheckCircle2 className="h-4 w-4 shrink-0" />
      ) : (
        <AlertCircle className="h-4 w-4 shrink-0" />
      )}
      {message}
    </motion.div>
  );
}

function LoginForm({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setToast({ message: "Please fill in all fields.", type: "error" });
      setTimeout(() => setToast(null), 3000);
      return;
    }
    setToast({ message: "Logged in successfully! Redirecting...", type: "success" });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome back</h2>
        <p className="mt-1 text-sm text-gray-500">Sign in to continue learning</p>
      </div>

      <AnimatePresence>{toast && <Toast {...toast} />}</AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Email or phone"
          id="login-email"
          placeholder="you@email.com"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          id="login-pass"
          type={showPass ? "text" : "password"}
          placeholder="••••••••"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          rightEl={
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Toggle password"
            >
              {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 accent-blue-600"
            />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>
          <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            Forgot password?
          </button>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign in <ArrowRight className="h-4 w-4" />
        </motion.button>
      </form>

      <div className="mt-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400">or</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-pink-300 hover:bg-pink-50 hover:text-pink-700"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E2136E] text-[10px] font-bold text-white">
          b
        </span>
        Continue with bKash
      </motion.button>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <button
          onClick={onSwitch}
          className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Create one free
        </button>
      </p>
    </motion.div>
  );
}

function RegisterForm({ onSwitch }) {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", password: "", confirm: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState(null);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.phone || !form.password || !form.confirm) {
      setToast({ message: "Please fill in all required fields.", type: "error" });
      setTimeout(() => setToast(null), 3000);
      return;
    }
    if (form.password !== form.confirm) {
      setToast({ message: "Passwords do not match.", type: "error" });
      setTimeout(() => setToast(null), 3000);
      return;
    }
    if (form.password.length < 8) {
      setToast({ message: "Password must be at least 8 characters.", type: "error" });
      setTimeout(() => setToast(null), 3000);
      return;
    }
    setToast({ message: "Account created! Please sign in.", type: "success" });
    setTimeout(() => { setToast(null); onSwitch(); }, 2500);
  };

  return (
    <motion.div
      key="register"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Create account</h2>
        <p className="mt-1 text-sm text-gray-500">Start learning in minutes — it's free</p>
      </div>

      <AnimatePresence>{toast && <Toast {...toast} />}</AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="grid grid-cols-2 gap-3">
          <InputField
            label="First name"
            id="reg-fname"
            placeholder="Rafi"
            icon={User}
            value={form.firstName}
            onChange={set("firstName")}
          />
          <InputField
            label="Last name"
            id="reg-lname"
            placeholder="Ahmed"
            icon={User}
            value={form.lastName}
            onChange={set("lastName")}
          />
        </div>

        <InputField
          label="Email address"
          id="reg-email"
          type="email"
          placeholder="you@email.com"
          icon={Mail}
          value={form.email}
          onChange={set("email")}
        />

        <InputField
          label="Phone number"
          id="reg-phone"
          type="tel"
          placeholder="01XXXXXXXXX"
          icon={Phone}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 11) })}
          hint="Used for bKash / Nagad payments"
        />

        <div className="space-y-1.5">
          <InputField
            label="Password"
            id="reg-pass"
            type={showPass ? "text" : "password"}
            placeholder="Min 8 characters"
            icon={Lock}
            value={form.password}
            onChange={set("password")}
            rightEl={
              <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Toggle">
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
          />
          {form.password && <PasswordStrength password={form.password} />}
        </div>

        <InputField
          label="Confirm password"
          id="reg-confirm"
          type={showConfirm ? "text" : "password"}
          placeholder="Repeat password"
          icon={Lock}
          value={form.confirm}
          onChange={set("confirm")}
          rightEl={
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Toggle">
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create account <ArrowRight className="h-4 w-4" />
        </motion.button>
      </form>

      <p className="mt-4 text-center text-xs text-gray-400">
        By registering, you agree to our{" "}
        <a href="#" className="text-blue-600 hover:underline">Terms</a> and{" "}
        <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
      </p>

      <p className="mt-3 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <button onClick={onSwitch} className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          Sign in
        </button>
      </p>
    </motion.div>
  );
}

export default function AuthPage() {
  const [tab, setTab] = useState("login");

  return (
    <div className="flex min-h-screen bg-white font-sans">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-[46%] xl:w-[42%] flex-col justify-between bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-12 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute bottom-10 -left-16 h-56 w-56 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute top-1/2 right-8 h-36 w-36 rounded-full bg-white/5" />

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 z-10"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">Bishuddho Academy</span>
        </motion.div>

        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="z-10"
        >
          <h1 className="text-4xl font-extrabold text-white leading-tight tracking-tight">
            Unlock your<br />
            <span className="text-blue-200">full potential</span>
          </h1>
          <p className="mt-4 text-blue-100/80 text-sm leading-relaxed max-w-xs">
            Join thousands of students learning in-demand skills with Bangladesh's most trusted online academy.
          </p>

          <div className="mt-10 space-y-4">
            {FEATURES.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-4 w-4 text-blue-100" />
                </div>
                <span className="text-sm text-blue-100/90">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="z-10"
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["bg-pink-400", "bg-amber-400", "bg-emerald-400", "bg-sky-400"].map((c, i) => (
                <div key={i} className={`h-8 w-8 rounded-full border-2 border-blue-700 ${c}`} />
              ))}
            </div>
            <p className="text-xs text-blue-200/80">
              <span className="font-semibold text-white">12,000+</span> students enrolled
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-10">

        {/* Mobile logo */}
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-base font-bold text-gray-900">Bishuddho Academy</span>
        </div>

        <div className="w-full max-w-[420px]">

          {/* Tab switcher */}
          <div className="mb-8 flex rounded-xl bg-gray-100 p-1">
            {["login", "register"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative flex-1 rounded-lg py-2.5 text-sm font-semibold capitalize transition-colors duration-150 ${
                  tab === t ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === t && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-lg bg-white shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                  />
                )}
                <span className="relative z-10">
                  {t === "login" ? "Sign in" : "Register"}
                </span>
              </button>
            ))}
          </div>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {tab === "login" ? (
              <LoginForm key="login" onSwitch={() => setTab("register")} />
            ) : (
              <RegisterForm key="register" onSwitch={() => setTab("login")} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}