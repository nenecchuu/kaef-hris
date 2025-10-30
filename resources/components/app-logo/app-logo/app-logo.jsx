/** @param {JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>} props */
export function AppLogo(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 180 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Kimia Farma Logo - Text */}
      <text
        x="60"
        y="20"
        fontSize="16"
        fontWeight="700"
        fill="#54361e"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        KIMIA FARMA
      </text>
      <text
        x="60"
        y="36"
        fontSize="10"
        fontWeight="500"
        fill="#54361e"
        fontFamily="system-ui, -apple-system, sans-serif"
        opacity="0.8"
      >
        Human Resources System
      </text>

      {/* Logo Icon - Simplified Pharmaceutical Symbol */}
      <g transform="translate(0, 0)">
        {/* Outer circle */}
        <circle cx="24" cy="24" r="22" fill="#54361e" opacity="0.1" />

        {/* Cross/Plus symbol (pharmaceutical symbol) */}
        <rect x="22" y="10" width="4" height="28" rx="1" fill="#54361e" />
        <rect x="10" y="22" width="28" height="4" rx="1" fill="#54361e" />

        {/* Accent circle */}
        <circle
          cx="24"
          cy="24"
          r="18"
          stroke="#f39200"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Center dot accent */}
        <circle cx="24" cy="24" r="3" fill="#fed235" />
      </g>
    </svg>
  );
}
