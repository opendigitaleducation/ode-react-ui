import { SVGProps } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
declare const SvgSortTime: ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => JSX.Element;
export default SvgSortTime;
