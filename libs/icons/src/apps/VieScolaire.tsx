import { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgVieScolaire = ({
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
    <path d="M1.42 22.4c-.2-.42-.22-4.12-.07-10.57l.21-9.93 10.58-.07c8.3-.05 10.58 0 10.68.29.29.94.41 19.84.14 20.34-.28.56-.64.56-10.77.56H1.71l-.3-.63zm15.32-7.42c0-2.8-.08-3.27-.56-3.7-.5-.46-.57-.46-1.3 0-.98.65-2.9.65-3.94-.02-.8-.53-.8-.53-1.32.12-.46.55-.53 1.15-.53 3.75v3.08h7.65v-3.23zm4.52 0c0-3.05-.27-3.84-1.13-3.29-.53.34-1.88.36-2.5.02-.44-.24-.46.03-.39 2.99l.1 3.22h3.92v-2.94zM6.73 17.1l1.78-.02v-2.72c0-2.65.03-2.74.87-3.58.8-.8.84-.92.43-1.33-.4-.38-.53-.36-1.4.48-.98.97-1.32.94-1.32-.14 0-.39.17-.65.44-.65.64 0 1.56-1.06 1.56-1.8 0-1.06-1.03-2.17-2.02-2.17-.96 0-2.24 1.08-2.24 1.93 0 .7 1.04 2.04 1.59 2.04.24 0 .39.29.39.84 0 1.08-.17 1.06-1.35-.07L4.5 9l-.53.67c-.48.58-.56 1.13-.56 4.11v3.44l.77-.05c.44-.02 1.59-.07 2.55-.07zm13.42-6.57c.39-.72.12-1.58-.62-1.97-1.23-.67-2.55.6-1.98 1.88.41.91 2.12.96 2.6.1zm-5.38-.76A2.24 2.24 0 0 0 14 6.33c-1-.46-1.64-.39-2.43.24-1.42 1.13-1.2 3.15.36 3.8 1.15.5 2.14.29 2.84-.6z" />
  </svg>
);
export default SvgVieScolaire;
