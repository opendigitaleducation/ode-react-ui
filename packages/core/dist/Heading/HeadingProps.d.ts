import { ReactNode } from "react";
export declare type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    /**
     * Level of Heading
     * `"h1" | "h2" | "h3" | "h4" | "h5" | "h6"`
     */
    level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    /**
     * Apply Bootstrap utility Class
     * `"h1" | "h2" | "h3" | "h4" | "h5" | "h6"`
     */
    headingStyle?: HeadingElement;
    /**
     * Text to render
     */
    children: ReactNode;
}
