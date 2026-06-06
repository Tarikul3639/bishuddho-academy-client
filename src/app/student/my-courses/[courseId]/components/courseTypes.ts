// Shared types for course details

export interface CourseClass {
    title:   string;
    session: string;
}

export interface CourseModule {
    id:       number;
    title:    string;
    sessions: number;
    duration: string;
    classes:  CourseClass[];
}

export interface EnrolledCourseDetail {
    title:          string;
    tagline:        string;
    description:    string;
    rating:         number;
    ratingCount:    number;
    students:       number;
    instructor:     string;
    duration:       string;
    lessons:        number;
    totalSeats:     number;
    bookedSeats:    number;
    schedule:       string;
    location:       string;
    startDate:      string;
    currentSession: number;
    includes:       string[];
    modules:        CourseModule[];
    paymentSummary: {
        method: "bkash" | "nagad" | "cash";
        trxId?: string;
        amount: number;
        paidAt: string;
        status: "verified" | "pending";
    };
}