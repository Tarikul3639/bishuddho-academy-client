// app/admin/_data/users.ts

export type UserStatus = "active" | "blocked";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  studentId: string;
  joinedDate: string;
  lastLogin: string;
  status: UserStatus;
  coursesCount: number;
  lastPurchase: string;
}

export const STATUS_CONFIG: Record<
  UserStatus,
  { label: string; bg: string; color: string }
> = {
  active: { label: "Active", bg: "#dcfce7", color: "#16a34a" },
  blocked: { label: "Blocked", bg: "#fee2e2", color: "#ef4444" },
};

export const USERS: AdminUser[] = [
  {
    id: "1",
    name: "Rafiq Islam",
    email: "rafiq@gmail.com",
    studentId: "BA-2026-0001",
    joinedDate: "Jan 12, 2026",
    lastLogin: "May 28, 2026",
    status: "active",
    coursesCount: 3,
    lastPurchase: "Web Development · May 28",
  },
  {
    id: "2",
    name: "Sadia Akter",
    email: "sadia@gmail.com",
    studentId: "BA-2026-0002",
    joinedDate: "Jan 15, 2026",
    lastLogin: "May 27, 2026",
    status: "active",
    coursesCount: 1,
    lastPurchase: "Graphic Design · May 27",
  },
  {
    id: "3",
    name: "Jahid Hasan",
    email: "jahid@gmail.com",
    studentId: "BA-2026-0003",
    joinedDate: "Feb 3, 2026",
    lastLogin: "May 26, 2026",
    status: "active",
    coursesCount: 2,
    lastPurchase: "Digital Marketing · May 26",
  },
  {
    id: "4",
    name: "Mitu Begum",
    email: "mitu@gmail.com",
    studentId: "BA-2026-0004",
    joinedDate: "Feb 10, 2026",
    lastLogin: "May 20, 2026",
    status: "active",
    coursesCount: 1,
    lastPurchase: "Web Development · May 25",
  },
  {
    id: "5",
    name: "Rubel Mia",
    email: "rubel@gmail.com",
    studentId: "BA-2026-0005",
    joinedDate: "Feb 18, 2026",
    lastLogin: "Apr 10, 2026",
    status: "blocked",
    coursesCount: 1,
    lastPurchase: "Graphic Design · Feb 20",
  },
  {
    id: "6",
    name: "Nasrin Akter",
    email: "nasrin@gmail.com",
    studentId: "BA-2026-0006",
    joinedDate: "Mar 1, 2026",
    lastLogin: "May 23, 2026",
    status: "active",
    coursesCount: 2,
    lastPurchase: "Digital Marketing · May 23",
  },
  {
    id: "7",
    name: "Arif Hossain",
    email: "arif@gmail.com",
    studentId: "BA-2026-0007",
    joinedDate: "Mar 5, 2026",
    lastLogin: "May 22, 2026",
    status: "active",
    coursesCount: 1,
    lastPurchase: "Web Development · May 22",
  },
  {
    id: "8",
    name: "Roksana Khatun",
    email: "roksana@gmail.com",
    studentId: "BA-2026-0008",
    joinedDate: "Mar 12, 2026",
    lastLogin: "May 21, 2026",
    status: "active",
    coursesCount: 2,
    lastPurchase: "Graphic Design · May 21",
  },
  {
    id: "9",
    name: "Karim Uddin",
    email: "karim@gmail.com",
    studentId: "BA-2026-0009",
    joinedDate: "Mar 20, 2026",
    lastLogin: "Mar 25, 2026",
    status: "blocked",
    coursesCount: 1,
    lastPurchase: "Digital Marketing · Mar 20",
  },
  {
    id: "10",
    name: "Poly Akter",
    email: "poly@gmail.com",
    studentId: "BA-2026-0010",
    joinedDate: "Apr 2, 2026",
    lastLogin: "May 19, 2026",
    status: "active",
    coursesCount: 1,
    lastPurchase: "Web Development · May 19",
  },
  {
    id: "11",
    name: "Sumon Ahmed",
    email: "sumon@gmail.com",
    studentId: "BA-2026-0011",
    joinedDate: "Apr 8, 2026",
    lastLogin: "May 18, 2026",
    status: "active",
    coursesCount: 2,
    lastPurchase: "Graphic Design · May 18",
  },
  {
    id: "12",
    name: "Rima Begum",
    email: "rima@gmail.com",
    studentId: "BA-2026-0012",
    joinedDate: "Apr 15, 2026",
    lastLogin: "May 17, 2026",
    status: "active",
    coursesCount: 1,
    lastPurchase: "Digital Marketing · May 17",
  },
];
