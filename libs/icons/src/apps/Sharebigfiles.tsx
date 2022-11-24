import { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSharebigfiles = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="m20.64 11.1-3.87-6.52a.72.72 0 0 0-.96-.24l-6.5 3.87a.76.76 0 0 0-.3.41.66.66 0 0 0 .07.53l3.85 6.52a.71.71 0 0 0 .6.34.9.9 0 0 0 .36-.1l6.5-3.87c.33-.2.45-.63.26-.94zm-1.56.1-5.29 3.15-3.15-5.3 5.3-3.14 3.14 5.29zm3.06 1.32a.7.7 0 0 0-.97-.24l-7 4.16a2.28 2.28 0 0 0-1.63-.27L6.36 5.74a.62.62 0 0 0-.46-.32l-3.29-.64c-.36-.08-.75.16-.82.55s.2.74.55.82l2.99.57 6 10.13c-.64.72-.78 1.8-.26 2.66a2.22 2.22 0 0 0 3.08.8 2.23 2.23 0 0 0 .94-2.8l6.8-4.03a.7.7 0 0 0 .25-.96z" />
  </svg>
);
export default SvgSharebigfiles;
