import { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCanalNumerique = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 26 24"
    width="24"
    height="24"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8.13 3.66c-.07.12-.07 1.03-.07 2.04.07 2.45 0 2.43 2.69 2.43h2.02l.05-1.76c.04-1.9-.12-2.62-.7-2.76-.17-.05-1.15-.1-2.14-.1-1.3-.05-1.8 0-1.85.15zm5.4.21c-.33.32-.33.51-.3 2.31l.04 1.95 1.95.05c2.7.07 2.72.05 2.79-2.62l.05-2.02h-2.1c-1.9 0-2.13.02-2.42.33zm-5.09 5.1c-.4.39-.43.48-.43 2.33v1.93h2.07c2.06 0 2.09 0 2.43-.44.3-.38.36-.7.36-2.35v-1.9h-2.02c-1.9 0-2.02.02-2.4.43zm4.76 1.47c0 1.66.05 1.97.34 2.36.34.43.38.43 2.45.43h2.07L18 11.2c-.07-2.67-.07-2.67-2.84-2.67H13.2v1.9zm-2.79 4.66c-.07.1-.1 1.01-.07 2.02.02 1.25-.02 1.86-.14 2.02-.17.2-.6.27-1.88.27-2.21 0-2.3-.05-2.3-1.5 0-.74.09-1.2.2-1.31.13-.1.85-.2 1.62-.25 1.1-.02 1.42-.12 1.59-.33.12-.22.12-.39 0-.55-.15-.22-.48-.27-1.78-.27-.9 0-1.78.1-1.97.2-.53.28-.85 1.17-.85 2.42 0 1.23.32 2.14.82 2.4.22.12 1.44.17 3.1.17h2.77v-1.9c0-1.32.07-1.92.22-2.04.1-.1.77-.12 1.46-.07l1.25.1.05 1.94.05 1.97h5.63l.43-.5c.58-.68.58-1.47.02-2.12-.33-.38-.53-.46-1.56-.5-1.23-.08-1.63-.3-1.37-.7.1-.17.58-.22 1.7-.24l1.57-.03v-1.15l-1.42-.05c-1.85-.07-2.6.22-2.96 1.08-.24.58-.24.68.05 1.2.39.75.94 1.02 1.97 1.02s1.42.19 1.16.62c-.15.24-.46.29-1.88.34-2.12.05-2.19 0-2.19-1.85 0-1.23-.05-1.45-.36-1.76-.6-.55-1.3-.72-2.74-.7-.72.03-1.5-.02-1.68-.07-.24-.07-.41-.05-.5.12z" />
  </svg>
);
export default SvgCanalNumerique;
