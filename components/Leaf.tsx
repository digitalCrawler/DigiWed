/** The VERDURE mark — a single leaf with its midrib. */
export default function Leaf({
  size = 20, className = "", title,
}: { size?: number; className?: string; title?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M21 3C11.5 3 4 8.2 4 15.5c0 2 .6 3.8 1.6 5.2C7.9 13.4 13 8.8 20 7.2c-5.6 2.6-9.6 7-11.6 13.4 1 .3 2 .5 3.1.5 7 0 9.5-6.8 9.5-18Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M20.2 7.4C13.6 9.3 8.4 14 5.9 20.6"
        stroke="#f3ecd9"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}
