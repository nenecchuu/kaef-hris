/**
 * Kimia Farma HRIS Logo Icon
 * Medical cross with KF initials
 * @param {JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>} props
 */
export function AppLogoIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Medical Cross Background */}
      <path
        d="M15 5 H25 V15 H35 V25 H25 V35 H15 V25 H5 V15 H15 Z"
        fill="#00A651"
        opacity="0.9"
      />
      {/* KF Letters */}
      <text
        x="20"
        y="27"
        fontFamily="Arial, sans-serif"
        fontSize="16"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
      >
        KF
      </text>
    </svg>
  );
}
