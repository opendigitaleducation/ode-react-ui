import { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgEuropress = ({
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
    <path d="m1.47 23.57-.2-.12a.43.43 0 0 0-.21-.1H.94V1.61h10.82c5.96 0 10.87.03 10.9.05.04 0 .06.07.06.15s.03.12.08.12c.02 0 .1.04.12.12.04.12.07 21.2 0 21.4 0 .05-.08.1-.17.12-.17.05-21.19.02-21.28 0zm21.16-11.09V1.68H.99V23.3h21.64V12.48zm-10.17 0V4.31l.33.02c.72.07 1.78.39 2.62.8a7.97 7.97 0 0 1 2.89 2.35c.39.48.46.63.77 1.2a7.3 7.3 0 0 1 .89 3.61l.02.9-2.93.02c-1.61 0-2.98 0-3.05-.03h-.1v7.5h-1.44v-8.2zm5.4-.74c0-.15-.09-.68-.2-1.04a8.2 8.2 0 0 0-.7-1.51l-.3-.39a6.36 6.36 0 0 0-2.33-1.87c-.48-.22-.43-.46-.43 2.38v2.48h1.97c1.61 0 2 0 2-.05zm-7.35 8.85a10.1 10.1 0 0 1-1.61-.46 8.02 8.02 0 0 1-2.55-1.56c-.24-.2-.8-.8-1.13-1.23a16.8 16.8 0 0 1-.82-1.42c0-.02-.07-.14-.12-.29a9.11 9.11 0 0 1-.48-1.58c-.1-.44-.1-.65-.1-1.54 0-.65.03-1.16.05-1.37A8.94 8.94 0 0 1 5.3 7.53a8.3 8.3 0 0 1 4.54-3l.75-.15c.14 0 .34-.05.41-.07l.17-.03v2.14l-.22.03a6.3 6.3 0 0 0-5.17 5.24c0 .1.03.1 2.7.1h2.69v.67c.02.36.02.67 0 .7 0 .02-1.23.02-2.7.02-2.11 0-2.69.02-2.69.07.03.31.24 1.15.46 1.61.05.1.07.22.07.22a6.54 6.54 0 0 0 2.12 2.43c.77.5 1.58.84 2.33.96l.4.05v2.11l-.2-.02-.44-.03z" />
  </svg>
);
export default SvgEuropress;
