import { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCut = ({
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
    <g clipPath="url(#cut_svg__a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.593 19.227a.995.995 0 0 0 1.355-.397c.258-.483.07-1.089-.42-1.353l-9.638-5.198 9.639-5.197c.49-.264.678-.87.42-1.353a.995.995 0 0 0-1.355-.396L10.8 11.153l-1.974-1.065 1.164-1.9c.41-.67.59-1.469.46-2.234A2.637 2.637 0 0 0 9.162 4.08L6.76 2.71c-.713-.406-1.558-.445-2.323-.183A3.456 3.456 0 0 0 2.63 3.994l-.567.924c-.41.671-.59 1.47-.46 2.234a2.637 2.637 0 0 0 1.288 1.873l3.393 1.934c.04.029.081.056.126.08l.27.146.217.123c.04.023.081.043.123.06l1.69.911-1.698.916a1.024 1.024 0 0 0-.115.056l-.18.103-.307.165c-.047.026-.091.054-.132.085l-3.388 1.93a2.638 2.638 0 0 0-1.287 1.873c-.13.765.048 1.563.46 2.234l.565.924c.411.671 1.05 1.207 1.807 1.467.764.261 1.61.222 2.322-.184l2.405-1.37a2.638 2.638 0 0 0 1.287-1.873c.13-.765-.048-1.563-.46-2.233L8.827 14.47l1.974-1.064 10.793 5.82ZM8.441 6.274c.046.27-.013.606-.203.916L7.057 9.118l-3.13-1.784c-.137-.078-.27-.237-.315-.501-.046-.271.013-.606.203-.916l.566-.925c.19-.31.466-.522.734-.614.262-.09.47-.053.607.025l2.404 1.37c.137.077.27.236.315.5Zm0 12.011c.046-.27-.013-.605-.203-.916l-1.18-1.928-3.132 1.784c-.137.078-.27.237-.315.502-.046.27.013.606.203.916l.566.924c.19.31.466.522.734.614.262.09.47.054.608-.024l2.404-1.37c.137-.078.27-.237.315-.502Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="cut_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCut;
