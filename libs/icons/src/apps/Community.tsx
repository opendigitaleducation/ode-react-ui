import { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCommunity = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 23 24"
    width="24"
    height="24"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="currentColor"
      d="M19.21 17.92q1.1 0 1.9.8t.8 1.9-.8 1.9-1.87.78-1.9-.79-.8-1.92q0-.44.2-.94l-4.07-2.94q-1.18 1.2-2.84 1.2T7 16.75t-1.2-2.86q0-.22.07-.63L2.64 12.2q-.38.34-.86.34-.58 0-.96-.38t-.39-.97.39-.93.96-.39q.48 0 .82.31t.45.75L6.3 12q.5-.98 1.47-1.56t2.06-.58q1.25 0 2.31.75l4.79-4.79q-.39-.72-.39-1.32 0-1.1.8-1.9t1.9-.8 1.87.8.8 1.9-.8 1.87-1.9.8q-.62 0-1.32-.41l-4.78 4.8q.74 1.06.74 2.32 0 .89-.4 1.75l4.06 2.91q.79-.62 1.7-.62z"
    />
  </svg>
);
export default SvgCommunity;
