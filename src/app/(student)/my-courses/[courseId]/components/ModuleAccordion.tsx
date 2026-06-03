"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ChevronDown, PlayCircle, Lock } from "lucide-react";
import type { CourseModule } from "./courseTypes";
import { getClassStatus } from "./curriculumUtils";

function ModuleAccordion({
    mod, currentSession, defaultOpen,
}: {
    mod: CourseModule; currentSession: number; defaultOpen: boolean;
}) {
    const [open, setOpen] = useState(defaultOpen);

    const statuses   = mod.classes.map((c) => getClassStatus(c.session, currentSession));
    const moduleDone = statuses.every((s) => s === "done");
    const moduleActive = !moduleDone && statuses.some((s) => s === "done" || s === "active");

    return (
        <div className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
            >
                <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-[13px] font-bold"
                    style={{
                        background: moduleDone ? "#dcfce7" : moduleActive ? "#eef3ff" : "#f3f4f6",
                        color:      moduleDone ? "#16a34a" : moduleActive ? "#1a56db"  : "#9ca3af",
                    }}
                >
                    {moduleDone ? "✓" : mod.id}
                </div>
                <div className="flex-1">
                    <p className="text-[14px] font-bold text-[#0d1b3e]">{mod.title}</p>
                    <p className="mt-0.5 text-[11px] text-[#9ca3af] capitalize">
                        {mod.sessions} sessions &bull; {mod.duration}
                    </p>
                </div>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: [0.0, 0.0, 0.2, 1] }}
                >
                    <ChevronDown className="h-4 w-4 text-[#9ca3af]" />
                </motion.div>
            </button>

            <motion.div
                initial={false}
                animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.0, 0.0, 0.2, 1] }}
                className="overflow-hidden"
            >
                <div className="border-t border-[#f3f4f6] px-5 pb-4 pt-3">
                    <div className="flex flex-col gap-2">
                        {mod.classes.map((cls, i) => {
                            const s = getClassStatus(cls.session, currentSession);
                            return (
                                <div
                                    key={i}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${
                                        s === "done"   ? "bg-[#f0fdf4]" :
                                        s === "active" ? "border border-[#c7d7fd] bg-[#eef3ff]" :
                                        "bg-[#f9fafb]"
                                    }`}
                                >
                                    <div
                                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm"
                                        style={{
                                            background:
                                                s === "done"   ? "#dcfce7" :
                                                s === "active" ? "#1a56db" :
                                                "#e5e7eb",
                                        }}
                                    >
                                        {s === "done"   ? <CheckCircle className="h-3.5 w-3.5 text-[#16a34a]" /> :
                                         s === "active" ? <PlayCircle  className="h-3.5 w-3.5 text-white"    /> :
                                                          <Lock        className="h-3 w-3 text-[#9ca3af]"     />}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-[13px] font-medium ${s === "locked" ? "text-[#9ca3af]" : "text-[#374151]"}`}>
                                            {cls.title}
                                        </p>
                                        <p className="text-[11px] text-[#9ca3af]">{cls.session}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default ModuleAccordion;