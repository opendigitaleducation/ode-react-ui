import { ReactNode } from "react";
export interface NavLinkProps<T> {
    /**
     * href link
     */
    link: T;
    /**
     * To override default classes
     */
    className?: T;
    /**
     * Children props
     */
    children: ReactNode;
    /**
     * Translate Text
     */
    translate?: T;
    /**
     * Give Navlink Button Style (for 1D navbar)
     */
    button?: boolean;
}
