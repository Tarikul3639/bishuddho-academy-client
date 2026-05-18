export const Clock = ({ className }: { className?: string }) => {
    return (
        <svg
            className={className}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
            <g>
                <circle cx="41.5" cy="22.5" r="21.5" fill="#e5efef" />

                <line x1="54" y1="9.463" x2="54" y2="10.878" stroke="#4c241d" strokeWidth="2" strokeLinecap="round" />
                <line x1="54" y1="15.122" x2="54" y2="16.537" stroke="#4c241d" strokeWidth="2" strokeLinecap="round" />

                <line x1="50.463" y1="13" x2="51.878" y2="13" stroke="#4c241d" strokeWidth="2" strokeLinecap="round" />
                <line x1="56.122" y1="13" x2="57.537" y2="13" stroke="#4c241d" strokeWidth="2" strokeLinecap="round" />

                <circle cx="50.5" cy="31.5" r="2.5" stroke="#4c241d" strokeWidth="2" fill="none" />

                <line x1="8.837" y1="15.663" x2="5.163" y2="19.337" stroke="#4c241d" strokeWidth="2" strokeLinecap="round" />
                <line x1="5.163" y1="15.663" x2="8.837" y2="19.337" stroke="#4c241d" strokeWidth="2" strokeLinecap="round" />

                <circle cx="42" cy="10" r="1" fill="#4c241d" />
                <circle cx="61" cy="36" r="1" fill="#4c241d" />
                <circle cx="54" cy="46" r="1" fill="#4c241d" />
                <circle cx="7" cy="37" r="1" fill="#4c241d" />

                <rect x="16" y="33" width="22" height="29" fill="#ffce56" stroke="#4c241d" strokeWidth="2" />

                <path
                    d="M27 11a3 3 0 0 1 3 3v3h-6v-3a3 3 0 0 1 3-3z"
                    fill="#e66353"
                    stroke="#4c241d"
                    strokeWidth="2"
                />

                <path
                    d="M38.639 32.909A10 10 0 0 0 41 26.545c0-6.326-14-11.454-14-11.454S13 20.219 13 26.545a10 10 0 0 0 2.361 6.364z"
                    fill="#e66353"
                    stroke="#4c241d"
                    strokeWidth="2"
                />

                <circle
                    cx="27.056"
                    cy="45.809"
                    r="12.208"
                    fill="#ffffff"
                    stroke="#4c241d"
                    strokeWidth="2"
                />

                <polyline
                    points="27 41 27 46 30 49"
                    stroke="#4c241d"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
            </g>
        </svg>
    );
};