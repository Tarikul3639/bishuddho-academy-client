// app/admin/_data/enrollments.ts

export type EnrollStatus = "active" | "pending" | "completed";
export type PaymentMethod = "bkash" | "nagad" | "cash";

export interface Enrollment {
    id:       string;
    name:     string;
    email:    string;
    course:   string;
    method:   PaymentMethod;
    trxId?:   string;
    amount:   number;
    date:     string;
    status:   EnrollStatus;
}

export const STATUS_CONFIG: Record<EnrollStatus, { label: string; bg: string; color: string }> = {
    active:    { label: "Active",    bg: "#dcfce7", color: "#16a34a" },
    pending:   { label: "Pending",   bg: "#fff7ed", color: "#ea580c" },
    completed: { label: "Completed", bg: "#eef3ff", color: "#1a56db" },
};

export const METHOD_CONFIG: Record<PaymentMethod, { label: string; bg: string; color: string; border: string }> = {
    bkash: { label: "bKash", bg: "#FDF2F8", color: "#E2136E", border: "#FBCFE8" },
    nagad: { label: "Nagad", bg: "#FFF8F0", color: "#F7941D", border: "#FDE68A" },
    cash:  { label: "Cash",  bg: "#F0FDF4", color: "#059669", border: "#BBF7D0" },
};

export const ENROLLMENTS: Enrollment[] = [
    { id: "1",  name: "Rafiq Islam",    email: "rafiq@gmail.com",   course: "Complete Web Development", method: "bkash", trxId: "8N5A2K9XQ3", amount: 3500, date: "May 28, 2026", status: "active"    },
    { id: "2",  name: "Sadia Akter",    email: "sadia@gmail.com",   course: "Graphic Design with Figma", method: "nagad", trxId: "9K2L5M8NQ1", amount: 3500, date: "May 27, 2026", status: "pending"   },
    { id: "3",  name: "Jahid Hasan",    email: "jahid@gmail.com",   course: "Digital Marketing & SEO",   method: "cash",  trxId: undefined,    amount: 2500, date: "May 26, 2026", status: "active"    },
    { id: "4",  name: "Mitu Begum",     email: "mitu@gmail.com",    course: "Complete Web Development",  method: "bkash", trxId: "7B3C1D6EP4", amount: 3500, date: "May 25, 2026", status: "pending"   },
    { id: "5",  name: "Rubel Mia",      email: "rubel@gmail.com",   course: "Graphic Design with Figma", method: "nagad", trxId: "6A1B4C7DQ2", amount: 3500, date: "May 24, 2026", status: "completed" },
    { id: "6",  name: "Nasrin Akter",   email: "nasrin@gmail.com",  course: "Digital Marketing & SEO",   method: "bkash", trxId: "5D8E3F2GR9", amount: 2500, date: "May 23, 2026", status: "active"    },
    { id: "7",  name: "Arif Hossain",   email: "arif@gmail.com",    course: "Complete Web Development",  method: "cash",  trxId: undefined,    amount: 3500, date: "May 22, 2026", status: "pending"   },
    { id: "8",  name: "Roksana Khatun", email: "roksana@gmail.com", course: "Graphic Design with Figma", method: "bkash", trxId: "4F7G2H1IQ8", amount: 3500, date: "May 21, 2026", status: "active"    },
    { id: "9",  name: "Karim Uddin",    email: "karim@gmail.com",   course: "Digital Marketing & SEO",   method: "nagad", trxId: "3G6H1I4JR7", amount: 2500, date: "May 20, 2026", status: "completed" },
    { id: "10", name: "Poly Akter",     email: "poly@gmail.com",    course: "Complete Web Development",  method: "bkash", trxId: "2H5I8J3KQ6", amount: 3500, date: "May 19, 2026", status: "pending"   },
    { id: "11", name: "Sumon Ahmed",    email: "sumon@gmail.com",   course: "Graphic Design with Figma", method: "cash",  trxId: undefined,    amount: 3500, date: "May 18, 2026", status: "active"    },
    { id: "12", name: "Rima Begum",     email: "rima@gmail.com",    course: "Digital Marketing & SEO",   method: "nagad", trxId: "1I4J7K2LR5", amount: 2500, date: "May 17, 2026", status: "completed" },
];