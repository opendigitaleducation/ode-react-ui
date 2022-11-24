import { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgHiboutheque = ({
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
    <path d="M15.16 9.05a.74.74 0 0 1 0-1.47c.4 0 .74.33.74.73 0 .4-.33.74-.74.74zm-4.25-1.47a.74.74 0 1 0 0 1.47.74.74 0 0 0 0-1.47zm12.77 13.17-.75.86c-.18.22-1.3-.08-1.77-.72-1.27-1.81-3.95-2.92-5.32-3.4a.54.54 0 0 1-.18.03h-1a.62.62 0 0 1-.62-.59 4.8 4.8 0 0 1-2 .02c0 .06-.02.1-.04.16a6.2 6.2 0 0 1 3.78 2.96c1.61 2.97-5.03 2.31-6.2 2.17a.77.77 0 0 1-.37-.13c-.62-.4-2.44-1.95.62-4.98a.64.64 0 0 1-.05-.24v-.75c0-.09.02-.17.05-.24a7.23 7.23 0 0 1-2.52-5.66A7.6 7.6 0 0 1 8.75 5.7c-.11-.94-.43-4.47 2.04-1.74a4.88 4.88 0 0 1 4.67.14c2.51-2.73 2.08 1.15 1.97 1.9a7.66 7.66 0 0 1 1.25 4.24c0 2.33-.98 4.39-2.46 5.61a.6.6 0 0 1 .07.3v.5c.18.04.36.1.53.2l4.36 1.96c-.25-.23-.42-.42-.42-.42s-1.17-2.09.65-4.43c1.82-2.34 2.08 2.28 1.98 4.75-.01.52-.15.81-.34.94l.14.06.02.01c.69.4.66.82.47 1.03zM12.8 8.51a2.17 2.17 0 1 0-4.34 0 2.17 2.17 0 0 0 4.34 0zm.94 2.39h-1.4l.7 1.22.7-1.22zm1.72-.15a2.24 2.24 0 1 0 0-4.47 2.24 2.24 0 0 0 0 4.47zM3.94 17.73c.96.71 3.31-.53 2.4-4.43s-4.86 2.6-2.4 4.43zm-3 3.77c.53.87 2.92 2.08 3.4.82.7-1.85-4.2-2.13-3.4-.82z" />
  </svg>
);
export default SvgHiboutheque;
