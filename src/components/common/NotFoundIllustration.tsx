export default function NotFoundIllustration() {
  return (
    <svg
      viewBox="0 0 400 260"
      width="100%"
      style={{ maxWidth: 380 }}
      role="img"
      aria-label="Illustration of mountains and a winding trail leading off the page"
    >
      <defs>
        <linearGradient id="notfound-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eef4f0" />
          <stop offset="100%" stopColor="#f8f7f2" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="260" rx="16" fill="url(#notfound-sky)" />

      {/* Sun */}
      <circle cx="330" cy="60" r="26" fill="#e8772e" opacity="0.85" />

      {/* Back mountain range */}
      <path d="M0 190 L60 120 L110 165 L170 100 L230 190 Z" fill="#a9744f" opacity="0.55" />

      {/* Front mountain range */}
      <path d="M0 210 L80 110 L140 175 L210 90 L280 210 Z" fill="#2d6a4f" />
      <path d="M80 110 L100 140 L60 150 Z" fill="#eef4f0" opacity="0.7" />
      <path d="M210 90 L230 120 L188 128 Z" fill="#eef4f0" opacity="0.7" />

      {/* Ground */}
      <rect x="0" y="205" width="400" height="55" fill="#1b4332" opacity="0.12" />

      {/* Winding dotted trail */}
      <path
        d="M40 250 C 100 230, 120 215, 160 220 S 230 245, 270 225 S 330 195, 380 200"
        fill="none"
        stroke="#e8772e"
        strokeWidth="3"
        strokeDasharray="2 10"
        strokeLinecap="round"
      />

      {/* Signpost */}
      <g transform="translate(180 150)">
        <rect x="-3" y="0" width="6" height="60" fill="#7c4a2d" rx="2" />
        <rect x="-38" y="6" width="42" height="16" rx="3" fill="#ffffff" stroke="#2d6a4f" strokeWidth="2" />
        <rect x="-2" y="26" width="46" height="16" rx="3" fill="#ffffff" stroke="#2d6a4f" strokeWidth="2" />
        <text x="-17" y="17" fontSize="9" fontWeight="700" fill="#10251f" textAnchor="middle">
          TRAIL
        </text>
        <text x="21" y="37" fontSize="9" fontWeight="700" fill="#10251f" textAnchor="middle">
          404
        </text>
      </g>
    </svg>
  );
}
