// CurriculumTab.tsx
"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    Trash2,
    Pencil,
    Check,
    X,
    ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { CourseModule, CourseClass } from "@/types/course-create";

// ── Helpers ───────────────────────────────────────────────────────────────────

function parseLast(s: string) {
    const n = s.match(/\d+/g);
    return n ? Math.max(...n.map(Number)) : 0;
}

// Calculate currentSession from completed classes
function calcCurrentSession(modules: CourseModule[]): number {
    let max = 0;
    for (const mod of modules) {
        for (const cls of mod.classes) {
            if (cls.completed) {
                const last = parseLast(cls.session);
                if (last > max) max = last;
            }
        }
    }
    return max;
}

// ── Inline Input ──────────────────────────────────────────────────────────────

function InlineInput({
    value,
    onSave,
    onCancel,
    placeholder = "",
}: {
    value: string;
    onSave: (v: string) => void;
    onCancel: () => void;
    placeholder?: string;
}) {
    const [draft, setDraft] = useState(value);

    useEffect(() => {
        setDraft(value);
    }, [value]);

    return (
        <div className="flex items-center gap-1.5">
            <input
                autoFocus
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && draft.trim()) onSave(draft.trim());
                    if (e.key === "Escape") onCancel();
                }}
                placeholder={placeholder}
                className="flex-1 rounded-sm border border-[#c7d7fd] bg-[#f8faff] px-2.5 py-1.5 text-[13px] text-[#0d1b3e] outline-none placeholder:text-[#9ca3af]"
            />
            <button
                onClick={() => draft.trim() && onSave(draft.trim())}
                className="rounded-sm bg-[#dcfce7] p-1.5 text-[#16a34a] hover:bg-[#bbf7d0]"
            >
                <Check className="h-3.5 w-3.5" />
            </button>
            <button
                onClick={onCancel}
                className="rounded-sm bg-[#fee2e2] p-1.5 text-[#ef4444] hover:bg-[#fecaca]"
            >
                <X className="h-3.5 w-3.5" />
            </button>
        </div>
    );
}

// ── Class Row ─────────────────────────────────────────────────────────────────

function ClassRow({
    cls,
    index,
    onUpdate,
    onDelete,
}: {
    cls: CourseClass;
    index: number;
    onUpdate: (cls: CourseClass) => void;
    onDelete: () => void;
}) {
    const [editing, setEditing] = useState(false);

    const toggleComplete = () => onUpdate({ ...cls, completed: !cls.completed });

    return (
        <div
            className={`flex items-center gap-3 rounded-sm px-3 py-2.5 transition-colors ${cls.completed ? "bg-[#f0fdf4]" : "bg-[#f9fafb]"
                }`}
        >
            {/* Complete toggle */}
            <button
                onClick={toggleComplete}
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border-2 transition-all ${cls.completed
                        ? "border-[#16a34a] bg-[#16a34a]"
                        : "border-[#d1d5db] bg-white hover:border-[#16a34a]"
                    }`}
            >
                {cls.completed && <Check className="h-3 w-3 text-white" />}
            </button>

            {editing ? (
                <div className="flex flex-1 flex-col gap-1.5">
                    <InlineInput
                        value={cls.title}
                        onSave={(v) => {
                            onUpdate({ ...cls, title: v });
                            setEditing(false);
                        }}
                        onCancel={() => setEditing(false)}
                        placeholder="Class title"
                    />
                </div>
            ) : (
                <>
                    <div className="flex-1 min-w-0">
                        <p
                            className={`flex items-center text-[13px] font-medium truncate ${cls.completed ? "text-[#374151]" : "text-[#374151]"
                                }`}
                        >
                            {cls.completed && (
                                <Check
                                    strokeWidth={2.5}
                                    className="size-3 mr-1.5 text-[#16a34a]"
                                />
                            )}
                            {cls.title}
                        </p>
                        <p className="text-[11px] text-[#9ca3af]">{cls.session}</p>
                    </div>

                    <button
                        onClick={() => setEditing(true)}
                        className="rounded-sm p-1 text-[#9ca3af] hover:bg-[#eef3ff] hover:text-[#1a56db]"
                    >
                        <Pencil className="h-3 w-3" />
                    </button>
                    <button
                        onClick={onDelete}
                        className="rounded-sm p-1 text-[#9ca3af] hover:bg-[#fee2e2] hover:text-[#ef4444]"
                    >
                        <Trash2 className="h-3 w-3" />
                    </button>
                </>
            )}
        </div>
    );
}

// ── Module Item ───────────────────────────────────────────────────────────────

function ModuleItem({
    serial,
    mod,
    onUpdate,
    onDelete,
}: {
    serial: number;
    mod: CourseModule;
    onUpdate: (m: CourseModule) => void;
    onDelete: () => void;
}) {
    const [open, setOpen] = useState(false);
    const [editingTitle, setEditingTitle] = useState(false);
    const [addingClass, setAddingClass] = useState(false);

    const completedCount = mod.classes.filter((c) => c.completed).length;
    const totalCount = mod.classes.length;
    const allDone = totalCount > 0 && completedCount === totalCount;
    const anyDone = completedCount > 0 && !allDone;

    const updateClass = (i: number, cls: CourseClass) => {
        const classes = [...mod.classes];
        classes[i] = cls;
        onUpdate({ ...mod, classes });
    };

    const deleteClass = (i: number) =>
        onUpdate({ ...mod, classes: mod.classes.filter((_, idx) => idx !== i) });

    const addClass = (title: string) =>
        onUpdate({
            ...mod,
            classes: [
                ...mod.classes,
                {
                    title,
                    session: `Session ${mod.classes.length + 1}`,
                    completed: false,
                },
            ],
        });

    return (
        <div className="overflow-hidden rounded-sm border border-[#e5e7eb] bg-white">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3">
                <div
                    onClick={() => setOpen(!open)}
                    className="flex flex-1 items-center gap-3 text-left"
                >
                    {/* Module status indicator */}
                    <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm text-[12px] font-bold"
                        style={{
                            background: allDone ? "#dcfce7" : anyDone ? "#eef3ff" : "#f3f4f6",
                            color: allDone ? "#16a34a" : anyDone ? "#1a56db" : "#9ca3af",
                        }}
                    >
                        {allDone ? (
                            <Check strokeWidth={3} className="size-4" />
                        ) : (
                            serial
                        )}
                    </div>

                    {editingTitle ? (
                        <div className="flex-1">
                            <InlineInput
                                value={mod.title}
                                onSave={(v) => {
                                    onUpdate({ ...mod, title: v });
                                    setEditingTitle(false);
                                }}
                                onCancel={() => setEditingTitle(false)}
                            />
                        </div>
                    ) : (
                        <div className="flex-1">
                            <p className="text-[14px] font-bold text-[#0d1b3e]">
                                {mod.title}
                            </p>
                            <div className="mt-0.5 flex items-center gap-2">
                                <p className="text-[11px] text-[#9ca3af]">
                                    {mod.classes.length} sessions
                                </p>
                                {totalCount > 0 && (
                                    <span
                                        className={`text-[10px] font-bold ${allDone
                                                ? "text-[#16a34a]"
                                                : anyDone
                                                    ? "text-[#1a56db]"
                                                    : "text-[#9ca3af]"
                                            }`}
                                    >
                                        {completedCount}/{totalCount} done
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Mini progress bar */}
                    {totalCount > 0 && (
                        <div className="hidden sm:block w-16 shrink-0">
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e5e7eb]">
                                <div
                                    className="h-full rounded-full transition-all duration-300"
                                    style={{
                                        width: `${Math.round((completedCount / totalCount) * 100)}%`,
                                        background: allDone ? "#16a34a" : "#1a56db",
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    <motion.div
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown className="h-4 w-4 text-[#9ca3af]" />
                    </motion.div>
                </div>

                <div
                    className="flex shrink-0 gap-1"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={() => setEditingTitle(true)}
                        className="rounded-sm p-1.5 text-[#9ca3af] hover:bg-[#eef3ff] hover:text-[#1a56db]"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                        onClick={onDelete}
                        className="rounded-sm p-1.5 text-[#9ca3af] hover:bg-[#fee2e2] hover:text-[#ef4444]"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>

            {/* Classes */}
            <motion.div
                initial={false}
                animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
                className="overflow-hidden"
            >
                <div className="border-t border-[#f3f4f6] px-4 pb-3 pt-2">
                    {/* Mark all button */}
                    {totalCount > 0 && (
                        <div className="mb-2 flex items-center justify-between">
                            <p className="text-[11px] text-[#9ca3af]">
                                {completedCount} of {totalCount} completed
                            </p>
                            <button
                                onClick={() =>
                                    onUpdate({
                                        ...mod,
                                        classes: mod.classes.map((c) => ({
                                            ...c,
                                            completed: !allDone,
                                        })),
                                    })
                                }
                                className={`text-[11px] font-semibold transition-colors ${allDone
                                        ? "text-[#9ca3af] hover:text-[#ef4444]"
                                        : "text-[#1a56db] hover:text-[#1346c4]"
                                    }`}
                            >
                                {allDone ? "Unmark All" : "Mark All Done"}
                            </button>
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        {mod.classes.map((cls, i) => (
                            <ClassRow
                                key={i}
                                cls={cls}
                                index={i}
                                onUpdate={(updated) => updateClass(i, updated)}
                                onDelete={() => deleteClass(i)}
                            />
                        ))}

                        {addingClass ? (
                            <InlineInput
                                value=""
                                onSave={(v) => {
                                    addClass(v);
                                    setAddingClass(false);
                                }}
                                onCancel={() => setAddingClass(false)}
                                placeholder="New class title..."
                            />
                        ) : (
                            <button
                                onClick={() => setAddingClass(true)}
                                className="flex items-center gap-1.5 rounded-sm border border-dashed border-[#c7d7fd] py-2 text-[12px] font-semibold text-[#1a56db] hover:bg-[#eef3ff]"
                            >
                                <Plus className="ml-3 h-3.5 w-3.5" /> Add Class
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// ── Overall Progress Bar ──────────────────────────────────────────────────────

function OverallProgress({ modules }: { modules: CourseModule[] }) {
    const total = modules.reduce((s, m) => s + m.classes.length, 0);
    const completed = modules.reduce(
        (s, m) => s + m.classes.filter((c) => c.completed).length,
        0,
    );
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    const current = calcCurrentSession(modules);

    return (
        <div className="rounded-sm border border-[#e5e7eb] bg-[#f9fafb] p-4">
            <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#9ca3af]">
                    Overall Progress
                </p>
                <span className="text-[11px] font-semibold text-[#6b7280]">
                    {completed}/{total} classes · Session {current}
                </span>
            </div>
            <div className="mb-1 h-2 w-full overflow-hidden rounded-full bg-[#e5e7eb]">
                <div
                    className="h-full rounded-full bg-linear-to-r from-[#1a56db] to-[#60a5fa] transition-all duration-500"
                    style={{ width: `${pct}%` }}
                />
            </div>
            <div className="flex justify-between text-[10px] text-[#9ca3af]">
                <span>{pct}% complete</span>
                <span>{total - completed} remaining</span>
            </div>
        </div>
    );
}

// ── Main Tab ──────────────────────────────────────────────────────────────────

export default function CurriculumTab({
    modules,
    onChange,
}: {
    modules: CourseModule[];
    onChange: (modules: CourseModule[]) => void;
}) {
    const [adding, setAdding] = useState(false);

    const handleModuleChange = (i: number, mod: CourseModule) => {
        const updated = [...modules];
        updated[i] = mod;
        onChange(updated);
    };

    const deleteModule = (i: number) => {
        const updated = modules.filter((_, idx) => idx !== i);
        onChange(updated);
    };

    const addModule = (title: string) => {
        const updated = [
            ...modules,
            {
                title,
                classes: [],
            },
        ];
        onChange(updated);
        setAdding(false);
    };

    return (
        <div className="space-y-4">
            {/* Overall progress */}
            <OverallProgress modules={modules} />

            {/* Modules */}
            <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#9ca3af]">
                        {modules.length} modules
                    </p>
                    <button
                        onClick={() => setAdding(true)}
                        className="flex items-center gap-1 rounded-sm bg-[#eef3ff] px-2.5 py-1 text-[11px] font-semibold text-[#1a56db] hover:bg-[#c7d7fd] cursor-pointer"
                    >
                        <Plus className="h-3 w-3" /> Add Module
                    </button>
                </div>

                {modules.map((mod, i) => (
                    <ModuleItem
                        key={i}
                        mod={mod}
                        serial={i + 1}
                        onUpdate={(m) => handleModuleChange(i, m)}
                        onDelete={() => deleteModule(i)}
                    />
                ))}

                {adding && (
                    <div className="rounded-sm border border-dashed border-[#c7d7fd] bg-[#f8faff] p-4">
                        <InlineInput
                            value=""
                            onSave={addModule}
                            onCancel={() => setAdding(false)}
                            placeholder="Module title..."
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
