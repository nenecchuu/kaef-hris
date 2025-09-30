/**
 * Kimia Farma HRIS Logo
 * @param {JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>} props
 */
export function AppLogo(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 200 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* KF Icon - Simplified medical cross with KF initials */}
      <g>
        {/* Medical Cross Background */}
        <path
          d="M15 5 H23 V15 H30 V23 H23 V30 H15 V23 H8 V15 H15 Z"
          fill="#00A651"
          opacity="0.2"
        />
        {/* KF Letters */}
        <text
          x="12"
          y="25"
          fontFamily="Arial, sans-serif"
          fontSize="18"
          fontWeight="bold"
          fill="#00A651"
        >
          KF
        </text>
      </g>

      {/* KIMIA FARMA Text */}
      <text
        x="42"
        y="20"
        fontFamily="Arial, sans-serif"
        fontSize="14"
        fontWeight="bold"
        fill="#00A651"
      >
        KIMIA FARMA
      </text>

      {/* HRIS Text */}
      <text
        x="42"
        y="33"
        fontFamily="Arial, sans-serif"
        fontSize="10"
        fontWeight="500"
        fill="#666666"
      >
        Human Resource Information System
      </text>
    </svg>
  );
}
