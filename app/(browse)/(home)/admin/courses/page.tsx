import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { currentRole } from "@/lib/auth";

const CoursesPage = async () => {
    const role = await currentRole()
   

    if (role !== "ADMIN") {
        return redirect("/");
    }

    const courses = await db.course.findMany({

        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="p-6">
            <DataTable columns={columns} data={courses} />
        </div>
    );
}

export default CoursesPage;