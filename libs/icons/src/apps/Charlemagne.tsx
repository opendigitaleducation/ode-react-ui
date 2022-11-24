import { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCharlemagne = ({
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
    <path d="M2.4 11.64c-.76-.04-1.1-.21-1.5-.64-.24-.29-.27-.29-.24-.86 0-.5.02-.65.17-.9.1-.16.17-.33.17-.4.02-.39 1.77-2.26 2.45-2.6a3.81 3.81 0 0 1 1.2-.63 7.07 7.07 0 0 1 2.53-.5c.43 0 .53.02.67.14.2.22.14.53-.31 1.42-.36.72-.8 1.25-.92 1.16a1.98 1.98 0 0 1-.1-.5c-.02-.3-.09-.49-.19-.59-.3-.28-1.75-.21-2.5.15a6.35 6.35 0 0 0-1.6 1.51c-.13.17-.15.34-.13.75l.03.53.67.26c.8.34 1.18.41 2.4.46 1.47.05 1.98.12 1.98.2 0 .14-.46.64-.7.76a3.8 3.8 0 0 1-.63.22c-.48.1-2.64.14-3.43.07zm6.35-1.23c0-.07.15-.3.32-.57.6-.96.89-1.8.65-2.02a.31.31 0 0 0-.17-.12c-.17 0-.36.36-.63 1.06-.33.96-.45 1.1-1.06 1.27-.26.05-.5.1-.55.07-.14-.1-.07-.67.17-1.18.14-.26.4-.89.6-1.37.7-1.85.75-1.97 1.3-2.2.48-.23.91-.23.94.01.02.1-.12.44-.3.77-.35.68-.42.99-.2.99.06 0 .2-.07.3-.14.22-.17.37-.2.65-.05.44.24.49.72.15 1.49-.12.26-.24.62-.3.77-.09.31-.5.84-.74.91a1.7 1.7 0 0 0-.33.2c-.24.16-.8.26-.8.11zm2.46-.4c-.08-.1-.15-.22-.15-.27 0-.17.34-1.15.5-1.49s1.02-1.25 1.3-1.4c.4-.19 1.55.03 1.83.37.32.33.32.33-.43 2.38-.12.33-1.08.65-1.37.45-.12-.1-.12-.12.05-.45.33-.68.17-.68-.72.04-.3.24-.56.41-.58.41a.44.44 0 0 0-.17.05c-.07.03-.19-.02-.26-.1zm1.82-1.42c.44-.22.5-.63.15-.82-.22-.12-.27-.1-.5.39-.27.55-.18.67.35.43zm5.22 1.22c-.21-.24-.24-.29-.21-.57.02-.17.14-.53.26-.8.24-.5.6-1.56.84-2.35l.12-.41.53-.27c.65-.29.96-.36 1.08-.21s.05.33-.67 1.85c-.74 1.56-.77 1.66-.65 2 .1.26.1.28-.02.5-.34.58-.84.67-1.28.26zm2.5.15a.9.9 0 0 1-.38-.3c-.15-.16-.15-.18-.03-.66.27-1.16.63-1.69 1.3-2.05.22-.12.41-.14.8-.14.57 0 1.05.12 1.2.26.1.15-.1.8-.36 1.06-.22.24-.84.55-1.23.6-.53.1-.43.2.24.3.2.01.36.09.39.16.07.2-.34.48-.92.7-.6.19-.65.19-1 .07zm1.57-1.73c.1-.1.16-.24.14-.34-.05-.34-.7-.2-.7.17 0 .38.24.45.56.17zm-6.79 1.6c-.38-.16-.5-.4-.38-.76.2-.72.67-2 .77-2.1.17-.2.43-.23.87-.07.38.12.4.15.57.03.44-.29 1.01-.24 1.01.05 0 .19-.24.67-.43.86-.1.1-.24.15-.48.15-.39 0-.67.16-.77.43-.03.07.02.26.12.4.19.42.17.56-.15.87-.21.24-.3.3-.55.3-.14 0-.4-.05-.58-.15zm-7.47 9.82a3.39 3.39 0 0 1-1.42-.46 1.91 1.91 0 0 1-.46-.55c-.24-.39-.24-.41-.2-.92.03-.45.08-.64.37-1.27.43-.91.84-1.49 1.35-1.95a5.67 5.67 0 0 1 3.07-1.25c.15 0 .5.03.85.07.74.15 1.13.37 1.41.87.22.34.22.39.2.87-.03.45-.05.6-.32 1.08a3.81 3.81 0 0 1-2.23 1.95c-.58.19-.84.21-1.1.07-.2-.1-.25-.1-.6 0-.68.2-1.1.1-1.43-.29-.36-.43-.17-1.13.58-2.02.8-.99 1.7-1.35 2.57-1.03.27.07.31.07.48 0 .22-.12.58-.15.72-.05.12.07-.14.57-.77 1.58s-.64 1.11-.43 1.11c.36 0 1.16-.67 1.47-1.27.46-.82.43-1.33-.05-1.76-.38-.36-.62-.4-1.7-.31-.9.05-.94.07-1.47.34-.41.21-.68.43-1.1.86a2.92 2.92 0 0 0-1.02 1.73c-.1.63.02 1.04.36 1.37.41.39.75.46 1.85.46 1.09 0 1.4-.07 2.2-.46.45-.24.64-.3.76-.26.6.14-.55 1.08-1.73 1.37a6.8 6.8 0 0 1-2.21.12zm1.25-2.29c.5-.33 1.17-1.41 1.1-1.75-.05-.22-.48-.29-.8-.12-.26.12-.76.67-1 1.1-.22.4-.24.85-.03.92.2.1.44.05.72-.14zm3.48 2.17a.62.62 0 0 1-.29-.22c-.12-.14-.12-.19-.04-.43.1-.27.6-.82.76-.82a.7.7 0 0 1 .34.2c.3.23.48.26.7.02.38-.41.53-.92.36-1.3-.02-.07.05-.22.2-.41.3-.4.38-.74.18-.82-.16-.05-.33.03-.48.2a2 2 0 0 0-.14.64c-.05.53-.05.56-.29.77-.43.36-1.06.39-1.1.03 0-.1.11-.44.26-.75.2-.46.34-.65.74-1.03.27-.27.6-.56.75-.65.21-.15.26-.17.6-.1.48.07.89.27 1.01.48.14.22.1.44-.39 1.61a9.8 9.8 0 0 0-.4 1.06 4.23 4.23 0 0 1-1.45 1.4c-.36.19-.93.24-1.32.12zm-8.73-1.4c-.1-.07-.02-.45.1-.62a.5.5 0 0 0 .12-.22c.02-.04.1-.21.22-.36.14-.24.19-.38.19-.65 0-.4-.12-.57-.31-.43-.15.12-.37.62-.56 1.18-.07.26-.19.53-.26.6-.17.14-.58.29-.87.29s-.26-.15.07-.87c.17-.38.27-.67.27-.84 0-.31-.07-.39-.3-.34-.16.08-.28.32-.42.94-.08.27-.2.6-.27.72-.14.27-.53.41-.86.34l-.24-.03v-.4c0-.3.04-.49.14-.65.07-.12.24-.53.36-.87.27-.84.39-.91 1.15-.91.34 0 .65-.05.75-.08.22-.11.38-.1.67.08.32.21.48.21.9 0l.3-.2.37.12c.43.15.62.34.55.6-.07.25-.7 1.66-.82 1.83a5.1 5.1 0 0 1-1.15.82.18.18 0 0 1-.1-.05zm13.83-.19c-.14-.05-.12-.12.27-.77.36-.58.55-1.15.48-1.37-.03-.05-.1-.1-.22-.07-.24.02-.43.36-.65 1.18-.1.36-.21.67-.26.72-.1.12-.94.31-1.09.26-.16-.04-.12-.33.15-.96.12-.31.29-.8.36-1.08.07-.27.17-.53.22-.58.12-.12.79-.36.96-.36.1 0 .29.05.4.07.17.07.27.07.46-.02.12-.07.34-.12.48-.12.27 0 .63.24.63.4 0 .08-.14.47-.31.85-.17.36-.3.72-.3.77 0 .14-.52.72-.69.77-.07.02-.22.1-.31.17-.2.12-.46.19-.58.14zm2.55-.1c-.24-.07-.46-.38-.46-.57 0-.22.44-1.5.6-1.73.05-.1.34-.3.6-.46.58-.34.56-.34 1.42-.14.22.04.44.12.46.14.07.05.03.6-.05.87-.14.4-.53.65-1.22.74-.58.05-.48.3.14.3.27 0 .34.16.17.35-.07.07-.34.24-.6.36-.46.22-.8.27-1.06.15zm1.4-1.63c.14-.2.12-.46-.03-.48s-.53.29-.53.43c0 .1.17.22.34.22.07 0 .17-.07.21-.17z" />
  </svg>
);
export default SvgCharlemagne;
