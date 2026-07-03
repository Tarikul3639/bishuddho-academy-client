// client/src/app/(public)/teachers/components/TeacherCard.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe } from "lucide-react";

import { Facebook, Github, Linkedin } from "@/components/icons";
import type { TeacherListItem } from "@/types/teacher";

interface TeacherCardProps {
  teacher: TeacherListItem;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  const profileImg = teacher.profileImage
    ? teacher.profileImage.startsWith("http")
      ? teacher.profileImage
      : `${process.env.NEXT_PUBLIC_API_URL}${teacher.profileImage}`
    : "/avatar-placeholder.png";

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#e5e7eb] bg-white transition-transform duration-300 hover:-translate-y-1">
      {/* Photo — fills the top of the card */}
      <div className="relative aspect-9/6 w-full overflow-hidden bg-slate-50">
        <Image
          src={profileImg}
          alt={teacher.fullName}
          fill
          sizes="(max-width:640px) 100vw, (max-width:768px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
          loading="eager"
        />

        {teacher.featured && (
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-amber-50/95 px-2.5 py-0.5 text-[10px] font-semibold text-amber-700">
              Featured
            </span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-1 bg-primary/90" />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-4">
        <span className="text-[9px] font-bold uppercase tracking-wider text-primary">
          Academy Instructor
        </span>

        <h3 className="mt-1 line-clamp-1 text-sm font-bold text-[#0d1b3e]">
          {teacher.fullName}
        </h3>

        <p className="mt-0.5 line-clamp-1 text-[11px] text-gray-500">
          {teacher.designation}
        </p>

        {teacher.shortBio && (
          <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-gray-500">
            {teacher.shortBio}
          </p>
        )}

        <div className="mt-3 flex flex-wrap gap-1">
          {teacher.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="rounded-sm bg-[#1a56db]/6 px-2 py-0.5 text-[10px] font-medium text-primary"
            >
              {skill}
            </span>
          ))}

          {teacher.skills.length > 3 && (
            <span className="rounded-sm bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
              +{teacher.skills.length - 3}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-2.5">
            {teacher.socialLinks?.linkedin && (
              <a
                href={teacher.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
            )}
            {teacher.socialLinks?.github && (
              <a
                href={teacher.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-black"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            )}
            {teacher.socialLinks?.facebook && (
              <a
                href={teacher.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary"
              >
                <Facebook className="h-3.5 w-3.5" />
              </a>
            )}
            {teacher.socialLinks?.website && (
              <a
                href={teacher.socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#1a56db]"
              >
                <Globe className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

          <Link href={`/teachers/${teacher.slug}`}>
            <button className="cursor-pointer whitespace-nowrap rounded-sm bg-primary px-3 py-1.5 text-[11px] font-bold text-white transition-colors duration-200 hover:bg-primary/80">
              View Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}