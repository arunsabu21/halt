const SIZES = {
  sm: {
    width: 101,
    height: 45,
    fontSize: 30,
    dashY: -10,
    lineEnd: 86,
    dotX: 89,
    strokeWidth: 3,
    dotR: 3,
  },
  md: {
    width: 201,
    height: 90,
    fontSize: 60,
    dashY: -20,
    lineEnd: 172,
    dotX: 178,
    strokeWidth: 5,
    dotR: 5,
  },
  lg: {
    width: 301,
    height: 135,
    fontSize: 90,
    dashY: -30,
    lineEnd: 258,
    dotX: 267,
    strokeWidth: 7,
    dotR: 7,
  },
};

function HaltLogo({ size = "md", className = "" }) {
  const s = SIZES[size] || SIZES.md;
  const leftPad = s.fontSize * 0.15;
  const dashStart = s.fontSize * 2.08;

  return (
    <svg
      width={s.width}
      height={s.height}
      viewBox={`0 0 ${s.width} ${s.height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <style>
          {`.wordmark { font-family: 'Figtree', 'Segoe UI', sans-serif; font-weight: 700; letter-spacing: -0.5px; }`}
        </style>
      </defs>
      <g transform={`translate(${leftPad}, ${s.height * 0.67})`}>
        <text
          x="0"
          y="0"
          fontSize={s.fontSize}
          fill="var(--color-text-primary)"
          className="wordmark"
        >
          Hal<tspan fill="var(--color-primary)">t</tspan>
        </text>
        <line
          x1={dashStart}
          y1={s.dashY}
          x2={s.lineEnd}
          y2={s.dashY}
          stroke="var(--color-accent)"
          strokeWidth={s.strokeWidth}
          strokeLinecap="round"
        />
        <circle
          cx={s.dotX}
          cy={s.dashY}
          r={s.dotR}
          fill="var(--color-accent)"
        />
      </g>
    </svg>
  );
}

export default HaltLogo;
