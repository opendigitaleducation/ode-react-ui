import { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgViewList = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <circle cx={3.5} cy={5} r={1.5} fill="currentColor" />
    <circle cx={3.5} cy={12} r={1.5} fill="currentColor" />
    <circle cx={3.5} cy={19} r={1.5} fill="currentColor" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 5a1 1 0 0 1 1-1h13a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1ZM7 12a1 1 0 0 1 1-1h13a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1ZM7 19a1 1 0 0 1 1-1h13a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgViewList;
