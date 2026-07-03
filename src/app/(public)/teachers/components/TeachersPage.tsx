"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { fadeUp, stagger } from "@/components/animations";

import TeacherCard from "./TeacherCard";
import TeacherCardSkeleton from "./TeacherCardSkeleton";
import TeachersFilters from "./TeachersFilters";
import TeachersEmptyState from "./TeachersEmptyState";
import TeachersErrorState from "./TeachersErrorState";

import { useGetPublicTeachersQuery } from "@/redux/features/teachers/teachers.api";

export default function TeachersPage() {
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useGetPublicTeachersQuery({
    limit: 50,
  });

  const teachers = data?.teachers ?? [];

  const featuredTeachers = teachers.filter((teacher) => teacher.featured);

  const regularTeachers = teachers.filter((teacher) => !teacher.featured);

  const filteredTeachers = regularTeachers.filter((teacher) => {
    if (!search) return true;

    const keyword = search.toLowerCase();

    return (
      teacher.fullName.toLowerCase().includes(keyword) ||
      teacher.designation.toLowerCase().includes(keyword) ||
      teacher.skills.some((skill) => skill.toLowerCase().includes(keyword))
    );
  });

  const isFiltered = search.trim().length > 0;

  return (
    <motion.section initial="hidden" animate="visible" variants={stagger}>
      <div className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        {/* Featured Teachers */}
        {featuredTeachers.length > 0 && !isFiltered && (
          <motion.section variants={fadeUp} className="mb-12">
            <h2 className="mb-6 text-lg font-bold text-[#0d1b3e]">
              Featured Teachers
            </h2>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
              {featuredTeachers.map((teacher) => (
                <motion.div key={teacher.teacherId} variants={fadeUp}>
                  <TeacherCard teacher={teacher} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* All Teachers */}
        <motion.h2
          variants={fadeUp}
          className="mb-6 text-lg font-bold text-[#0d1b3e]"
        >
          All Teachers
        </motion.h2>

        <TeachersFilters
          search={search}
          onSearch={setSearch}
          onReset={() => setSearch("")}
          isFiltered={isFiltered}
        />

        {isLoading ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <TeacherCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <TeachersErrorState />
        ) : filteredTeachers.length === 0 ? (
          <TeachersEmptyState />
        ) : (
          <motion.div
            variants={stagger}
            className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4"
          >
            {filteredTeachers.map((teacher) => (
              <motion.div key={teacher.teacherId} variants={fadeUp}>
                <TeacherCard teacher={teacher} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!isLoading && !error && (
          <motion.p
            variants={fadeUp}
            className="mt-6 text-center text-xs text-gray-400"
          >
            Showing {filteredTeachers.length} teacher
            {filteredTeachers.length !== 1 ? "s" : ""}
          </motion.p>
        )}
      </div>
    </motion.section>
  );
}