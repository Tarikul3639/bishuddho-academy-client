export const Office = ({ className }: { className?: string }) => {
    return (
        <svg
            className={className}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
            <polyline points="36 52 50 62 14 62 28 52" fill="#838bc5" />
            <polygon points="57 51 43 51 43 15 56 19 57 51" fill="#838bc5" />
            <polygon points="9 51 23 51 23 15 10 19 9 51" fill="#838bc5" />

            <polyline points="25 11 25 1 41 1 41 11" fill="#838bc5" />
            <polyline points="31 11 31 7 35 7 35 11" fill="#65c8d0" />

            <polyline points="23 51 23 11 43 11 43 51" fill="#8f6c56" />

            <polyline points="30 51 30 41 36 41 36 51" fill="#65c8d0" />
            <polyline points="47 51 47 41 53 41 53 51" fill="#65c8d0" />
            <polyline points="13 51 13 41 19 41 19 51" fill="#65c8d0" />

            <rect x="3" y="50" width="60" height="2" fill="#ba9bc9" />

            {/* windows */}
            <rect x="27" y="15" width="4" height="4" fill="#f4ecce" />
            <rect x="35" y="15" width="4" height="4" fill="#f4ecce" />
            <rect x="27" y="23" width="4" height="4" fill="#f4ecce" />
            <rect x="35" y="23" width="4" height="4" fill="#f4ecce" />
            <rect x="27" y="31" width="4" height="4" fill="#f4ecce" />

            <rect x="14" y="23" width="4" height="4" fill="#f4ecce" />
            <rect x="14" y="31" width="4" height="4" fill="#f4ecce" />

            <rect x="48" y="23" width="4" height="4" fill="#f4ecce" />
            <rect x="48" y="31" width="4" height="4" fill="#f4ecce" />
            <rect x="35" y="31" width="4" height="4" fill="#f4ecce" />

            <rect x="29" y="54" width="6" height="2" fill="#f4ecce" />
            <rect x="26" y="58" width="12" height="2" fill="#f4ecce" />
        </svg>
    );
};