import { ReactNode } from "react";

export type LoadingPosition = "left" | "right" | undefined;
export type LoadingIcon = JSX.Element | undefined;

export interface LoadingProps {
  /**
   * Is it loading ?
   */
  loading: boolean;
  /**
   * Override default loading icon
   */
  loadingIcon?: LoadingIcon;
  /**
   * Default position to left. When using with another component, position can be switched
   */
  loadingPosition?: LoadingPosition;
  /** When using with another component, we can pass a children */
  children?: ReactNode;
}
