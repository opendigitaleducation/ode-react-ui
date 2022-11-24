import { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgConnecteurGenerique1 = ({
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
    <path d="M18.9 12.99v4.28q0 1.6-1.13 2.74t-2.74 1.13H3.87q-1.6 0-2.74-1.13T0 17.27V6.1q0-1.59 1.13-2.72t2.74-1.15h9.45q.17 0 .3.12t.11.31v.87q0 .19-.12.31t-.29.12H3.87q-.89 0-1.51.63T1.7 6.1v11.16q0 .89.65 1.51t1.51.65h11.16q.89 0 1.52-.65t.62-1.51v-4.28q0-.2.12-.31t.31-.12h.87q.2 0 .31.12t.12.3zm5.15-11.6v6.86q0 .36-.27.6t-.6.27-.6-.27L20.22 6.5l-8.75 8.75q-.12.14-.31.14t-.3-.14L9.34 13.7q-.14-.12-.14-.29t.14-.31l8.75-8.76L15.73 2q-.27-.27-.27-.6t.27-.6.6-.27h6.85q.36 0 .6.27t.27.6z" />
  </svg>
);
export default SvgConnecteurGenerique1;
