```bash
client/
├── app/
│   ├── (public)/
│   │   ├── layout.tsx                      # Public layout (Navbar, Footer)
│   │   ├── page.tsx                        # Landing page
│   │   ├── components/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── StatsBar.tsx
│   │   │   ├── CourseTypesSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── SampleCoursesSection.tsx
│   │   │   ├── TrustedBySection.tsx
│   │   │   └── CTABanner.tsx
│   │   ├── courses/
│   │   │   ├── page.tsx                    # All courses browse
│   │   │   └── [slug]/
│   │   │       └── page.tsx                # Course details + buy button
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   │
│   ├── (student)/
│   │   ├── layout.tsx                      # Student layout + auth check
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── my-courses/
│   │   │   ├── page.tsx
│   │   │   └── [courseId]/
│   │   │       └── page.tsx                # Video/PDF viewer
│   │   └── profile/
│   │       └── page.tsx
│   │
│   ├── (admin)/
│   │   ├── layout.tsx                      # Admin layout + role check
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── courses/
│   │   │   ├── page.tsx
│   │   │   ├── create/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx
│   │   ├── users/
│   │   │   └── page.tsx
│   │   └── payments/
│   │       └── page.tsx
│   │
│   └── api/
│       └── payment/
│           ├── success/route.ts
│           ├── fail/route.ts
│           └── cancel/route.ts
│
├── components/
│   ├── ui/                                 # shadcn/ui components
│   │
│   ├── navbar/
│   │   ├── public/                         # Public navbar (landing, courses, login)
│   │   │   ├── index.tsx                   # Main Navbar — assembles everything
│   │   │   ├── NavLinks.tsx                # Desktop pill nav links
│   │   │   ├── AuthSection.tsx             # Login buttons or UserDropdown
│   │   │   ├── AuthSkeleton.tsx            # Loading skeleton
│   │   │   ├── MobileMenu.tsx              # Mobile drawer
│   │   │   └── UserDropdown.tsx            # Avatar dropdown (student/admin aware)
│   │   │
│   │   ├── student/                        # Student sidebar
│   │   │   ├── index.tsx                   # StudentNav — assembles everything
│   │   │   └── NavLinks.tsx                # Sidebar nav items
│   │   │
│   │   └── admin/                          # Admin sidebar
│   │       ├── index.tsx                   # AdminNav — assembles everything
│   │       └── NavLinks.tsx                # Sidebar nav items
│   │
│   ├── shared/                             # Genuinely shared across all layouts
│   │   ├── Logo.tsx
│   │   └── Footer.tsx
│   │
│   ├── courses/
│   │   ├── CourseCard.tsx
│   │   ├── CourseGrid.tsx
│   │   └── CourseTypeBadge.tsx
│   │
│   ├── payment/
│   │   └── PaymentModal.tsx
│   │
│   └── admin/
│       ├── CourseForm.tsx
│       ├── UserTable.tsx
│       └── PaymentTable.tsx
│
├── lib/
│   ├── axios.ts
│   └── utils.ts
│
├── store/
│   ├── index.ts
│   └── slices/
│       ├── authSlice.ts
│       ├── courseSlice.ts
│       └── paymentSlice.ts
│
├── types/
│   └── index.ts
│
├── assets/
│   ├── logo.jpg
│   ├── sketch.svg
│   └── thumbnails/
│
├── middleware.ts
├── .env.local
└── package.json
```


