import { forwardRef, Ref } from "react";

import clsx from "clsx";

import { LogoProps } from "./LogoProps";

const Logo = forwardRef(
  (
    { url, is1d, translate = "Retour accueil" }: LogoProps,
    ref: Ref<HTMLAnchorElement>,
  ) => {
    const classes = clsx("navbar-brand d-none d-md-block");
    const logo = `logo ${is1d ? "ONE" : "NEO"}`;
    return (
      <a ref={ref} className={classes} href="/" aria-label={translate}>
        <img className="logo" src={url} alt={logo} />
      </a>
    );
  },
);

Logo.displayName = "Logo";
export default Logo;
