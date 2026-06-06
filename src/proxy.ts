// src/proxy.ts

import {
    NextRequest,
    NextResponse,
} from "next/server";

type JwtPayload = {
    userId: string;
    email: string;
    role: "student" | "admin";
};

const PUBLIC_ROUTES = [
    "/",
    "/about",
    "/contact",
    "/courses",
];

const AUTH_ROUTES = [
    "/login",
    "/signup",
    "/forgot",
];

function getPayload(
    token: string,
): JwtPayload | null {
    try {
        return JSON.parse(
            atob(token.split(".")[1]),
        ) as JwtPayload;
    } catch {
        return null;
    }
}

function getDashboardByRole(
    role: string,
) {
    switch (role) {
        case "admin":
            return "/admin/dashboard";

        case "student":
            return "/student/dashboard";

        default:
            return "/";
    }
}

export function proxy(
    request: NextRequest,
) {
    const pathname =
        request.nextUrl.pathname;

    const token =
        request.cookies.get(
            "access_token",
        )?.value;

    /* ─────────────────────────────
       PUBLIC ROUTES
    ───────────────────────────── */

    const isPublicRoute =
        PUBLIC_ROUTES.includes(
            pathname,
        ) ||
        pathname.startsWith(
            "/courses/",
        );

    if (isPublicRoute) {
        return NextResponse.next();
    }

    /* ─────────────────────────────
       AUTH PAGES
    ───────────────────────────── */

    if (
        AUTH_ROUTES.includes(
            pathname,
        )
    ) {
        if (!token) {
            return NextResponse.next();
        }

        const payload =
            getPayload(token);

        if (!payload) {
            return NextResponse.next();
        }

        return NextResponse.redirect(
            new URL(
                getDashboardByRole(
                    payload.role,
                ),
                request.url,
            ),
        );
    }

    /* ─────────────────────────────
       NO TOKEN
    ───────────────────────────── */

    if (!token) {
        return NextResponse.redirect(
            new URL(
                "/login",
                request.url,
            ),
        );
    }

    /* ─────────────────────────────
       INVALID TOKEN
    ───────────────────────────── */

    const payload =
        getPayload(token);

    if (!payload) {
        const response =
            NextResponse.redirect(
                new URL(
                    "/login",
                    request.url,
                ),
            );

        response.cookies.delete(
            "access_token",
        );

        return response;
    }

    /* ─────────────────────────────
       UNKNOWN ROLE
    ───────────────────────────── */

    if (
        ![
            "admin",
            "student",
        ].includes(
            payload.role,
        )
    ) {
        return NextResponse.redirect(
            new URL(
                "/",
                request.url,
            ),
        );
    }

    /* ─────────────────────────────
       ADMIN AREA
    ───────────────────────────── */

    if (
        pathname.startsWith(
            "/admin",
        )
    ) {
        if (
            payload.role !==
            "admin"
        ) {
            return NextResponse.redirect(
                new URL(
                    getDashboardByRole(
                        payload.role,
                    ),
                    request.url,
                ),
            );
        }

        return NextResponse.next();
    }

    /* ─────────────────────────────
       STUDENT AREA
    ───────────────────────────── */

    if (
        pathname.startsWith(
            "/student",
        )
    ) {
        if (
            payload.role !==
            "student"
        ) {
            return NextResponse.redirect(
                new URL(
                    getDashboardByRole(
                        payload.role,
                    ),
                    request.url,
                ),
            );
        }

        return NextResponse.next();
    }

    /* ─────────────────────────────
       ANY OTHER PROTECTED ROUTE
    ───────────────────────────── */

    return NextResponse.redirect(
        new URL(
            getDashboardByRole(
                payload.role,
            ),
            request.url,
        ),
    );
}

export const config = {
    matcher: [
        "/login",
        "/signup",
        "/forgot",

        "/admin/:path*",

        "/student/:path*",
    ],
};