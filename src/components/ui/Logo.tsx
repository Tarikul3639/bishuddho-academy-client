import Link from "next/link";
import Image from "next/image";
import LogoImg from "@/assets/logo.jpg";

interface LogoProps {
  className?: string;
  size?: "sm" | "lg";
}

export default function Logo({ className = "", size = "lg" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`}>
      {/* Logo Icon on the Left */}
      <div className="relative h-10 w-10 overflow-hidden rounded-md transition-transform group-hover:scale-105">
        <Image
          src={LogoImg}
          alt="Bishuddho Academy"
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          className="object-contain scale-150"
        />
      </div>

      {/* Text on the Right */}
      {size !== "sm" && (
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-bold tracking-tight text-[#111827] dark:text-white uppercase">
            Bishudd
            <span className="text-primary ml-0.5">HO</span>
          </span>
          <div className="flex items-center gap-1 text-[10px] font-medium text-primary uppercase tracking-[0.2em]">
            Academy

            <div className="h-px w-4 bg-primary" />
          </div>
        </div>
      )}
    </Link>
  );
}