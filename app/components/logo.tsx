interface LogoProps {
  color?: string;
  width?: number;
  height?: number;
  size?: number;
}

export default function Logo(props: LogoProps) {
  const { color, width, height, size } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || 120}
      height={size || height || 120}
      viewBox={`0 0 120 120`}
    >
      <path
        d="m1.584 85.248 24.65-47.385h8.015L9.6 85.248Zm47.788 0L39.24 37.863h7.612l10.132 47.385zm14.72 0 24.65-47.385h8.015l-4.637 8.872 26.212 12.754-1.159 7.208-24.852 10.536 1.059-7.108 14.921-6.15q1.16-.454 2.52-.706 1.362-.302 2.168-.353-.806-.1-2.117-.352-1.26-.253-2.269-.757l-19.407-9.426-17.089 32.867Z"
        aria-label="Nikhil Prabhu Logo"
        style={{
          fontStyle: "italic",
          fontWeight: 800,
          fontSize: "50.4095px",
          fontFamily: "&quot",
          strokeWidth: 4.20079,
          fill: color || "white",
        }}
      />
    </svg>
  );
}
