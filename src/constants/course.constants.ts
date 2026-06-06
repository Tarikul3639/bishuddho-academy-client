import { CourseStatus } from "@/types/course-list-item";

export const STATUS_CONFIG: Record<CourseStatus, { label: string; bg: string; color: string }> = {
    active: { label: "Active", bg: "#dcfce7", color: "#16a34a" },
    upcoming: { label: "Upcoming", bg: "#eef3ff", color: "#1a56db" },
    completed: { label: "Completed", bg: "#f3f4f6", color: "#6b7280" },
};

export const STATUS_OPTIONS: { label: string; value: string }[] = [
    {
        label: "Upcoming",
        value: "upcoming",
    },
    {
        label: "Active",
        value: "active",
    },
    {
        label: "Completed",
        value: "completed",
    },
];