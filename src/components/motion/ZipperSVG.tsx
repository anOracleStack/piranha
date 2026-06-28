export default function ZipperSVG() {
  return (
    <svg
      viewBox="0 0 48 92"
      width={48}
      height={92}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        {/* Metallic gold gradient — highlight top-left, shadow bottom-right */}
        <linearGradient id="zg-body" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%"   stopColor="#705018" />
          <stop offset="18%"  stopColor="#C89A2C" />
          <stop offset="40%"  stopColor="#F0C84A" />
          <stop offset="62%"  stopColor="#D4AF37" />
          <stop offset="85%"  stopColor="#A07A20" />
          <stop offset="100%" stopColor="#604010" />
        </linearGradient>

        {/* Pendant face gradient */}
        <linearGradient id="zg-pend" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#C89A2C" />
          <stop offset="50%"  stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8D6820" />
        </linearGradient>

        {/* Inner inset shadow */}
        <linearGradient id="zg-inset" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#0a0a0a" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>
      </defs>

      {/* ── SLIDER BODY (diamond / rhombus shape with beveled top) ── */}
      <path
        d="M6,18 C6,7 21,2 24,2 C27,2 42,7 42,18 L44,28 C44,36 38,44 24,46 C10,44 4,36 4,28 Z"
        fill="url(#zg-body)"
      />

      {/* Top bevel highlight — catches light */}
      <path
        d="M8,17 C10,8 18,4 24,3 C30,4 38,8 40,17"
        fill="none"
        stroke="rgba(255,245,160,0.55)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Left face bevel — 3D depth illusion */}
      <path
        d="M6,18 L4,28"
        fill="none"
        stroke="rgba(255,245,160,0.25)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Central channel — the zipper tooth opening */}
      <ellipse cx="24" cy="14" rx="8" ry="5" fill="url(#zg-inset)" />
      <ellipse cx="24" cy="14" rx="6" ry="3.5" fill="#030303" />

      {/* Body groove lines — machined surface texture */}
      <path
        d="M10,24 Q24,26 38,24 M10,30 Q24,32 38,30 M10,36 Q24,38 38,36"
        fill="none"
        stroke="rgba(0,0,0,0.35)"
        strokeWidth="0.75"
      />

      {/* Rivet studs on body */}
      <circle cx="15" cy="28" r="2.2" fill="#A07A20" />
      <circle cx="15" cy="28" r="1.2" fill="#C89A2C" />
      <circle cx="33" cy="28" r="2.2" fill="#A07A20" />
      <circle cx="33" cy="28" r="1.2" fill="#C89A2C" />

      {/* Pull tab connector — where pendant attaches */}
      <rect x="20" y="44" width="8" height="9" rx="2" fill="#B08828" />
      <rect x="21" y="45" width="6" height="7" rx="1.5" fill="#D4AF37" />

      {/* ── PENDANT GROUP (animates with swing) ── */}
      <g className="zipper-pendant-group">
        {/* Ring */}
        <circle
          cx="24"
          cy="59"
          r="6.5"
          fill="none"
          stroke="url(#zg-pend)"
          strokeWidth="2.5"
        />
        <circle cx="24" cy="59" r="2.5" fill="#8D6820" />
        <circle cx="24" cy="59" r="1.2" fill="#C89A2C" />

        {/* Pendant plate — luxury key fob shape */}
        <rect
          x="8"
          y="66"
          width="32"
          height="24"
          rx="5"
          fill="#0d0f0e"
          stroke="url(#zg-pend)"
          strokeWidth="1.5"
        />

        {/* Inner border of pendant */}
        <rect
          x="11.5"
          y="69.5"
          width="25"
          height="17"
          rx="3"
          fill="none"
          stroke="rgba(212,175,55,0.35)"
          strokeWidth="0.75"
        />

        {/* "P" monogram — the piranha mark */}
        <text
          x="24"
          y="82"
          textAnchor="middle"
          fill="#D4AF37"
          fontFamily="Georgia, 'Playfair Display', serif"
          fontSize="11"
          fontWeight="700"
          letterSpacing="1"
        >
          P
        </text>

        {/* Subtle dot ornaments flanking P */}
        <circle cx="16" cy="79" r="1" fill="#D4AF37" opacity="0.5" />
        <circle cx="32" cy="79" r="1" fill="#D4AF37" opacity="0.5" />
      </g>
    </svg>
  );
}
