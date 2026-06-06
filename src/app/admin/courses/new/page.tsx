import { Suspense } from "react";
import AddNewCoursesPage from "./AddNewCoursesPage";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AddNewCoursesPage />
        </Suspense>
    );
}