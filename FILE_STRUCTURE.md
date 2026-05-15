```bash
client/
├── app/
│   │
│   ├── (public)/                           # Auth লাগবে না এই routes এ
│   │   ├── layout.tsx                      # Public layout (Navbar, Footer)
│   │   ├── page.tsx                        # Landing page
│   │   ├── courses/
│   │   │   ├── page.tsx                    # সব courses browse করা
│   │   │   └── [slug]/
│   │   │       └── page.tsx                # Course details + buy button
│   │   ├── login/
│   │   │   └── page.tsx                    # Login form
│   │   └── register/
│   │       └── page.tsx                    # Student registration form
│   │
│   ├── (student)/                          # শুধু logged-in students
│   │   ├── layout.tsx                      # Student layout + auth check
│   │   ├── dashboard/
│   │   │   └── page.tsx                    # Welcome, stats, continue learning
│   │   ├── my-courses/
│   │   │   ├── page.tsx                    # Enrolled courses list
│   │   │   └── [courseId]/
│   │   │       └── page.tsx                # Course content (video/pdf viewer)
│   │   └── profile/
│   │       └── page.tsx                    # Profile view + edit
│   │
│   ├── (admin)/                            # শুধু admin
│   │   ├── layout.tsx                      # Admin layout + role check
│   │   ├── dashboard/
│   │   │   └── page.tsx                    # Stats overview (users, revenue, courses)
│   │   ├── courses/
│   │   │   ├── page.tsx                    # All courses table
│   │   │   ├── create/
│   │   │   │   └── page.tsx                # New course form (type: recorded | physical)
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx            # Edit existing course
│   │   ├── users/
│   │   │   └── page.tsx                    # Student list, search, details
│   │   └── payments/
│   │       └── page.tsx                    # Payment list, verify manual payments
│   │
│   └── api/                                # Next.js route handlers
│       └── payment/
│           ├── success/
│           │   └── route.ts                # SSLCommerz success callback
│           ├── fail/
│           │   └── route.ts                # SSLCommerz fail callback
│           └── cancel/
│               └── route.ts                # SSLCommerz cancel callback
│
├── components/
│   ├── ui/                                 # shadcn/ui components
│   ├── shared/
│   │   ├── Navbar.tsx                      # Public navbar (logo, courses, login)
│   │   ├── Footer.tsx                      # Footer
│   │   └── StudentNav.tsx                  # Student dashboard sidebar/topbar
│   ├── courses/
│   │   ├── CourseCard.tsx                  # Single course card (thumbnail, price, type)
│   │   ├── CourseGrid.tsx                  # Course cards grid layout
│   │   └── CourseTypeBadge.tsx             # "Recorded" / "Physical" badge
│   ├── payment/
│   │   └── PaymentModal.tsx                # Payment method select + initiate
│   └── admin/
│       ├── CourseForm.tsx                  # Create/edit course form (type aware)
│       ├── UserTable.tsx                   # Students data table
│       └── PaymentTable.tsx                # Payments data table with verify button
│
├── lib/
│   ├── axios.ts                            # Axios instance with baseURL + interceptors
│   └── utils.ts                            # Helper functions (cn, formatDate, etc.)
│
├── store/
│   ├── index.ts                            # Redux store setup
│   └── slices/
│       ├── authSlice.ts                    # User info, token, login/logout actions
│       ├── courseSlice.ts                  # Course list, selected course state
│       └── paymentSlice.ts                 # Payment status, initiate flow
│
├── types/
│   └── index.ts                            # Shared TS types (User, Course, Payment, Enrollment)
│
├── middleware.ts                           # Route protection (auth + role check)
├── .env.local                              # API URL, payment keys
└── package.json
```


