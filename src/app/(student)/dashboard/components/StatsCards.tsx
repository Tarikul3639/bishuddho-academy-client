"use client";

import { motion, type Variants } from "framer-motion";
import { BookOpen, CheckCircle, Clock, CreditCard } from "lucide-react";

const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] } },
};

interface Stat {
  label:     string;
  value:     string | number;
  icon:      React.ElementType;
  iconBg:    string;
  iconColor: string;
  sub?:      string;
}

interface Props {
  enrolled:  number;
  completed: number;
  pending:   number;
  spent:     number;
}

export default function StatsCards({ enrolled, completed, pending, spent }: Props) {
  const STATS: Stat[] = [
    {
      label:      "Enrolled Courses",
      value:      enrolled,
      icon:       BookOpen,
      iconBg:     "bg-primary/10",
      iconColor:  "text-primary",
    },
    {
      label:      "Completed",
      value:      completed,
      icon:       CheckCircle,
      iconBg:     "bg-green-100",
      iconColor:  "text-green-600",
    },
    {
      label:      "Pending Payments",
      value:      pending,
      icon:       Clock,
      iconBg:     "bg-orange-100",
      iconColor:  "text-orange-500",
      sub:        pending > 0 ? "Needs attention" : "All clear",
    },
    {
      label:      "Total Spent",
      value:      `৳${spent.toLocaleString()}`,
      icon:       CreditCard,
      iconBg:     "bg-purple-100",
      iconColor:  "text-purple-600",
    },
  ];

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-4 md:grid-cols-4"
    >
      {STATS.map((s) => (
        <motion.div
          key={s.label}
          variants={fadeUp}
          className="rounded-2xl border border-border bg-white p-5 shadow-sm"
        >
          <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${s.iconBg}`}>
            <s.icon className={`h-5 w-5 ${s.iconColor}`} />
          </div>
          <p className="text-2xl font-bold text-[#111827]">{s.value}</p>
          <p className="mt-0.5 text-xs font-medium text-[#6b7280]">{s.label}</p>
          {s.sub && (
            <p className={`mt-1 text-[10px] font-medium ${
              s.label === "Pending Payments" && typeof s.value === "number" && s.value > 0
                ? "text-orange-500"
                : "text-green-600"
            }`}>
              {s.sub}
            </p>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}