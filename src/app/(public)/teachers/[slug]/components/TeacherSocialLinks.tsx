"use client";

import { Globe } from "lucide-react";
import { Facebook, Github, Linkedin } from "@/components/icons";
import { TeacherSocialLinks as TeacherSocialLinksType } from "@/types/teacher";

interface Props {
    socialLinks?: TeacherSocialLinksType;
    iconClassName?: string;
}

export default function TeacherSocialLinks({
    socialLinks,
    iconClassName = "h-5 w-5",
}: Props) {
    if (!socialLinks) return null;

    return (
        <div className="flex items-center gap-3">
            {socialLinks.linkedin && (
                <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-primary"
                >
                    <Linkedin className={iconClassName} />
                </a>
            )}

            {socialLinks.github && (
                <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-black"
                >
                    <Github className={iconClassName} />
                </a>
            )}

            {socialLinks.facebook && (
                <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-blue-600"
                >
                    <Facebook className={iconClassName} />
                </a>
            )}

            {socialLinks.website && (
                <a
                    href={socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-primary"
                >
                    <Globe className={iconClassName} />
                </a>
            )}
        </div>
    );
}