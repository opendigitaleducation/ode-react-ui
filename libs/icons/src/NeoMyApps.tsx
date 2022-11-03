import { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgNeoMyApps = ({
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
    <path
      d="M1.898 22.555c-.072-.145-.096-1.37-.048-2.691l.048-2.402h5.261v5.26l-2.595.049c-1.994.048-2.594 0-2.666-.216Zm7.76 0c-.049-.145-.073-1.37-.049-2.691l.072-2.402h5.238v5.26l-2.571.049c-2.018.048-2.595 0-2.69-.216Zm7.759 0c-.048-.145-.072-1.37-.048-2.691l.072-2.402h5.237v5.26l-2.57.049c-1.994.048-2.595 0-2.691-.216Zm-15.52-7.76c-.071-.168-.095-1.37-.047-2.69l.048-2.403h5.261v5.261l-2.595.048c-1.994.048-2.594 0-2.666-.216Zm7.76 0c-.048-.168-.072-1.37-.048-2.69l.072-2.403h5.238v5.261l-2.571.048c-2.018.048-2.595 0-2.69-.216Zm7.76 0c-.048-.168-.072-1.37-.048-2.69l.072-2.403h5.237v5.261l-2.57.048c-1.994.048-2.595 0-2.691-.216ZM1.897 7.011c-.071-.144-.095-1.345-.047-2.666l.048-2.402h5.261V7.18l-2.595.072c-1.994.048-2.594 0-2.666-.24Zm7.76 0c-.048-.144-.072-1.345-.048-2.666l.072-2.402h5.238V7.18l-2.571.072c-2.018.048-2.595 0-2.69-.24Zm7.76 0c-.048-.144-.072-1.345-.048-2.666l.072-2.402h5.237V7.18l-2.57.072c-1.994.048-2.595 0-2.691-.24Z"
      fill="#2A9CC8"
    />
  </svg>
);
export default SvgNeoMyApps;
