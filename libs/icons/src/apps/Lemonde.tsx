import { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgLemonde = ({
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
    <path d="M4.71 2.02c-.14.03-.4.27-.8.8-.88 1.22-.86 2 .13 2.35.17.05.82 0 1.47-.1.98-.14 1.25-.11 1.44.03.2.17.21.68.2 4.48-.06 4.2-.06 4.25-.4 4.73-.6.82-.16.77 1.23-.12 1.9-1.22 1.83-1.03 1.93-5.55l.07-3.75.5-.27.53-.29.58.48c.31.27.62.6.67.77.05.2.07 3.1.07 6.47l.03 6.18 1.13-.58a5.17 5.17 0 0 0 1.3-.86c.1-.2.14-2.33.14-6.04V5.01l.53-.32c.26-.17.58-.31.65-.31.21 0 2.43 1.35 2.43 1.47 0 .07-.1.16-.22.21s-.4.39-.62.75l-.39.67-.05 4.4c-.02 2.84.03 4.57.12 4.9.15.46 1.04 1.28 1.42 1.28.17 0 2.29-1.22 2.58-1.49.12-.1.12-.24.04-.36-.1-.17-.19-.17-.5-.02-.5.21-.92.1-1.01-.32-.05-.19-.07-2.47-.05-5.07.05-5.44.05-5.39 1.27-6.16.75-.45.8-.5.6-.82-.11-.14-.21-.14-.57.05-.67.34-1.1.3-2.17-.33-1.68-.97-1.41-.97-2.76-.1l-1.37.84c-.1.05-.67-.29-1.3-.77-1.01-.77-1.13-.84-1.42-.67-1.06.67-2.1 1.27-2.24 1.27-.07 0-.14-.1-.14-.21s-.2-.44-.4-.68c-.6-.67-1.38-.72-2.85-.14-1.34.5-1.94.58-1.94.2 0-.15.1-.4.21-.56.27-.36.27-.58 0-.7h-.07zM2.77 3.8s-.08.07-.12.24c-.12.22-.22.48-.22.58-.03.29.55.89.89.96.17.05.36.07.38.1.05 0-.1-.15-.3-.32-.47-.38-.73-1.03-.63-1.46.02-.05.02-.1 0-.1zm13.27 1.18s-.02 0-.02.02c-.05.05.1.2.3.34l.7.43c.34.22.65.27.65.1a5 5 0 0 0-1.63-.89zM10.87 5c-.14 0-.1.2.22.46l.4.31v6.38c0 4.18.05 6.34.15 6.34s.12-2.18.1-6.49l-.03-6.5-.4-.3c-.2-.15-.35-.2-.44-.2zm-4.6.41c-.09 0-.09.08.03.27.1.19.14 1.54.12 4.25-.02 2.63 0 3.9.1 3.8s.14-1.68.14-4.2c0-3.83-.02-4.07-.27-4.12h-.11zm10.5 2.2c-.03 0-.03.02-.06.04-.12.29-.16 1.73-.19 4.93 0 4.98 0 4.95.92 5.6.79.56.9.34.16-.31l-.72-.63v-5c0-3.5-.02-4.64-.12-4.64zm-9.6 7.74c-.2 0-.41 0-.72.02-1.16.05-1.4.12-2.48.65-1.28.65-2.67 1.75-2.53 2.02.08.1.48-.05 1.23-.43 1.83-.94 3.51-.94 4.4-.03l.5.5 1.45-.84c1.44-.81 1.56-.93 1.32-1.32-.1-.14-.2-.14-.5.07-.39.27-.41.24-1.25-.21-.63-.34-.85-.44-1.42-.44zm-1.69 2.01c-.17 0-.1.08.2.2.24.12.57.36.72.57.28.39.36.44.52.3.3-.32-.76-1.09-1.44-1.06zm1.01 1.9s-.04.03-.07.08l-.1.1c.03.02 0 .06-.04.14-.1.14-.1.33 0 .4.04.05.19.08.36.05H7c.1.03.1 1.85-.03 2.02-.04.07-.07.15-.04.17s-.03.05-.08.05c-.28 0-1.2.55-1.13.67.05.07.15.05.24-.02.15-.12.44-.22.73-.22.21 0 .28.03.36.15l.12.14.31-.22c.17-.1.34-.19.38-.19s.05-.02 0-.1c-.07-.11-.1-.11-.19-.04-.07.02-.14.02-.29-.05a.73.73 0 0 0-.3-.12c-.06 0 .04-.1.2-.2.17-.11.34-.26.37-.33.05-.07.07-.48.07-.94 0-.77 0-.82.1-.86s.14-.05.26.04l.12.15v1.42c0 .8.02 1.44.02 1.44.1 0 .58-.29.6-.36.03-.05.03-.67.03-1.37 0-1.2 0-1.28.12-1.32.07-.05.17-.03.38.07l.27.14-.14.17-.12.17v2.21l.14.14.17.15.29-.17c.16-.1.31-.14.31-.14.02.02.02-.03.05-.08 0-.14-.1-.19-.17-.12-.05.05-.07.05-.14 0-.05-.04-.08-.3-.08-1.08 0-1.13.05-1.37.32-1.47.14-.07.16-.19.07-.24-.03-.02-.1 0-.15.03-.12.07-.16.05-.45-.1l-.32-.19-.28.17c-.32.2-.41.24-.39.12.02-.03 0-.05-.02-.03-.05.03-.15-.02-.24-.12l-.2-.14-.26.17-.27.14-.12-.14c-.16-.2-.3-.2-.74-.05-.2.07-.34.1-.34.1-.02-.03 0-.08.03-.15.04-.1.04-.14 0-.19-.03-.02-.05-.05-.08-.05zm9.67.17-.36.22c-.34.2-.36.22-.27.26.08.08.1.08.17 0s.1-.07.22 0c.1.05.19.12.21.2.12.24.08.29-.53.65-.33.19-.6.38-.6.43s.03.05.1.05c.12-.03.12 0 .12.62v.67l.34.22c.19.12.36.22.38.22l.55-.32c.37-.21.51-.31.46-.36-.02-.05-.07-.07-.12-.05-.07.03-.07-.12-.1-1.13 0-1.27 0-1.3-.38-1.53l-.2-.15zm-12.77.03h-.12c-.26 0-.43.1-.7.31-.3.29-.36.67-.21 1.5.1.42.1.64 0 .86-.05.12.02.12.26 0 .41-.22.48-.53.32-1.54-.08-.44-.08-.48.02-.68.12-.24.29-.3.5-.19.17.1.2.22.05.36-.21.24-.02.24.34.03l.34-.24-.15-.15a.89.89 0 0 0-.65-.26zm17.99.07c-.27 0-.36.02-.55.17a.77.77 0 0 0-.39.72c0 .14-.02.17-.14.19-.15 0-.17.02-.17.22-.03.19-.03.19.14.19h.17v1.97h.6v-1.97h.65v.89c0 .48-.02.94 0 .98 0 .08.05.1.29.1h.31v-.77c0-.72 0-.77.12-.91.1-.12.22-.2.39-.22.21-.05.21-.05.24-.24.02-.36 0-.39-.27-.29-.14.05-.29.15-.36.2l-.12.11v-.29h-1.27l.04-.16c.03-.1.05-.22.1-.3.05-.09.24-.11.36-.02.07.05.63-.26.58-.33-.1-.12-.41-.24-.72-.24zm-18.06.2c-.05 0-.03.04.05.13s.14.15.19.12c.05-.04-.12-.26-.24-.26zm2.76 0c-.07 0-.07.28 0 .35.05.05.12.07.17.07.07 0 .07-.02-.02-.14-.1-.07-.12-.14-.12-.22.02-.04.02-.07-.03-.07zm9.74.2c-.04 0-.04.06.08.15.07.1.14.2.14.22 0 .05.02.07.05.07.1 0 .04-.17-.08-.31a.242.242 0 0 0-.19-.12zm-6.75.03V20c-.05 0 .02.07.14.14s.24.12.27.1c.02-.03-.05-.1-.17-.17-.1-.05-.2-.1-.24-.1zM7.93 20c-.1 0-.07.1.03.14.07.02.07.24.07 1.47 0 .91.02 1.44.07 1.44.03 0 .05-.5.05-1.44 0-1.23-.02-1.45-.1-1.52-.04-.05-.1-.1-.12-.1zm-1 .07c-.05.02-.05.26-.05.98.02.6.05.97.07.94.07-.05.07-1.85.02-1.9-.02 0-.02-.02-.02-.02h-.02zm-4.72.05c-.02 0-.02.02-.05.07-.07.14-.07.77 0 1 .03.1.08.35.08.54s.02.33.04.33c.1 0 .1-.28.03-.77-.05-.26-.1-.64-.1-.79.03-.26.03-.38 0-.38zm10.97.3-.24.15c-.34.2-.39.27-.36.39.02.07.04.07.1.02.02-.05.04-.05.09.05.05.07.05.43.05 1.06-.03.62 0 .96.02.96.07 0 .05-2.02-.02-2.12-.05-.04-.05-.07 0-.07.12 0 .16.34.16 1.2 0 .5.03.92.05.92s.15-.05.24-.12l.24-.12v-.87c.03-1.03.08-1.13.36-.86.15.14.15.14.15.93v.8l.14.12c.1.07.12.14.1.14s-.12-.07-.2-.14c-.11-.15-.11-.2-.16-.96 0-.7-.03-.82-.1-.9-.07-.02-.12-.02-.14 0s0 .08.05.1c.07.05.1.15.1.8 0 .84.04 1 .26 1.1.14.05.19.05.53-.14.19-.1.33-.22.33-.24 0-.1-.1-.12-.16-.07-.03.02-.1.04-.12.02-.08-.02-.08-.2-.08-.89v-.87l-.26-.19-.24-.19-.58.34-.14-.17-.17-.17zm5.07 0-.53.3c-.31.17-.55.36-.55.4s.05.08.12.06c.1-.03.1 0 .1.67 0 .4 0 .72.02.74a5.8 5.8 0 0 0 .63.39 3 3 0 0 0 .77-.5c0-.1-.15-.1-.34 0-.15.09-.17.06-.34-.08-.17-.12-.19-.17-.19-.36 0-.22.02-.24.26-.41.15-.1.3-.14.34-.12s.05 0 .03-.02.02-.1.12-.15c.1-.05.16-.12.16-.17s-.12-.21-.29-.38c-.16-.17-.3-.31-.3-.34v-.02zm-6.73.06c-.07 0-.22.07-.55.26-.3.2-.51.36-.49.39 0 0 .03.31 0 .67 0 .65.05.89.22.96l.27.17c.19.12.36.17.3.07a2.76 2.76 0 0 0-.33-.21l-.31-.24a5.3 5.3 0 0 1 .02-1.4c.03 0 .05.22.07.7v.72l.36.21.34.22.53-.31c.31-.17.55-.34.55-.39s-.04-.07-.12-.04c-.1.02-.1 0-.1-.68v-.7l-.2-.11c-.13-.08-.22-.15-.2-.2.02-.02 0-.02-.02 0s-.12 0-.2-.04c-.04-.05-.1-.08-.14-.05zm-6.78 0H4.7l-.04.02a.42.42 0 0 1-.17.07l-.34.22c-.2.1-.36.21-.4.24-.13.05-.08.2.04.14.1-.02.12 0 .12.68v.7l.31.2c.17.15.31.25.34.25.1 0 .82-.5.77-.55-.05-.08-.17-.08-.31.02-.12.1-.15.1-.34-.02-.17-.12-.2-.15-.2-.41 0-.3.06-.34.2-.32.02.03.02 0 .02-.02s.17-.17.39-.29l.38-.22-.12-.12c-.07-.07-.21-.24-.36-.38s-.19-.22-.26-.22zm4.47.07c-.02.02-.05.48-.05 1.13 0 1.06 0 1.08.12 1.22.07.08.2.15.24.15.1 0 .1-.03-.07-.17l-.2-.14V21.6c0-.7 0-1.06-.04-1.06zm6.95.17c.02 0 .02 0 .02.02 0 .05-.02.07-.07.1s-.07 0-.07-.03c.02-.04.07-.1.12-.1zm-.22.12H16c.02.02.05.38.05.8 0 1.03.1 1 .12 0v-.8l.02.84v.82l-.21-.12-.17-.12v-.65c.02-.53.05-.77.14-.77zm2 0 .14.19c.1.12.17.22.17.24 0 .05-.07.12-.17.17l-.14.1v-.7zM4.5 20.9l.16.14c.1.1.17.2.17.22 0 .05-.07.1-.16.14l-.15.1v-.31l-.02-.3zm6.78.02.21.1.2.12v.67c0 .39-.03.68-.05.68s-.12-.05-.22-.12l-.17-.12v-.68c0-.36 0-.65.03-.65zm.07.12c-.05 0-.05.05.07.15s.12.12.1.65c0 .36 0 .55.05.55s.07-.22.07-.6c0-.58-.03-.6-.15-.7l-.14-.05zm-6.78.05v.05c0 .05 0 .1.02.12.05.05.12.05.12 0 0-.02-.02-.1-.07-.12-.02-.02-.05-.05-.07-.05zm13.44.03c-.02 0-.02.02 0 .1.02.04.07.09.12.09.07 0 .07-.03 0-.12-.07-.05-.1-.1-.12-.07zm-14.21.12c-.07 0-.07.04-.05.81 0 .32.02.6.05.63.02.05.02.1.02.12-.02 0-.02.02.03 0s.16.02.29.1c.16.12.3.16.3.12 0 0-.11-.1-.28-.22l-.31-.2v-.67c0-.43-.03-.7-.05-.7zm13.47.02c-.05 0-.05.31-.05.7.02.53.05.7.1.77.04.04.11.1.14.1s.1.04.17.09c.1.1.3.17.3.1 0 0-.11-.1-.28-.2-.14-.1-.29-.21-.31-.26a3.9 3.9 0 0 1-.05-.72c.02-.34 0-.58-.03-.58zm-2.14.07h-.03a5.6 5.6 0 0 0-.02 1.28l.31.24c.17.1.31.19.36.19.07 0 .1-.12 0-.12a.83.83 0 0 1-.33-.2l-.27-.16v-.65c0-.39 0-.58-.02-.58zm4.42.9a.36.36 0 0 0-.36.3c-.03.27 0 .34.17.44.21.1.19.1.36-.03.19-.1.26-.29.17-.5-.05-.15-.2-.2-.34-.22zm-16.8.02c-.23 0-.47.04-.61.12a1.9 1.9 0 0 1-.24.12c-.05-.03-.43.4-.43.45 0 .08.04.05.29-.07.5-.24 1-.24 1.25 0 .12.1.12.1.36-.05a.7.7 0 0 1 .26-.14c.03.02.05-.02.05-.1-.02-.07-.05-.12-.12-.12s-.2-.04-.27-.1c-.12-.09-.33-.11-.55-.11zm-.08.52c-.12 0-.12 0 .05.12.19.15.26.17.26.1s-.19-.21-.31-.21zm4.06 0c-.12 0-.12 0-.02.05.07.03.14.1.2.17.02.05.06.1.09.07.14-.1-.05-.29-.27-.29z" />
  </svg>
);
export default SvgLemonde;
