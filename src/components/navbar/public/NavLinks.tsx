import Link from "next/link";

const NAV_LINKS = [
  { label: "Home",     href: "/"          },
  { label: "Courses",  href: "/courses"   },
  { label: "Contact",  href: "/contact"  },
];

interface Props {
  pathname: string;
}

export default function NavLinks({ pathname }: Props) {
  return (
    <div className="hidden items-center gap-1 rounded-full border border-border/40 bg-gray-200/70 px-1.5 py-1.5 backdrop-blur-3xl md:flex">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
            pathname === link.href
              ? "bg-white text-primary shadow-sm dark:bg-background"
              : "text-[#374151] hover:bg-gray-300/50 hover:text-primary dark:text-muted-foreground dark:hover:bg-white/10"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}