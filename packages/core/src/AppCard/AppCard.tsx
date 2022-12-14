/**
 * AppCard Component
 *
 * @see Docs     https://ode-react-ui.vercel.app/?path=/docs/components-core-app-card--base
 * @see Source   https://github.com/opendigitaleducation/ode-react-ui/blob/main/packages/core/src/AppCard/AppCard.tsx
 */

import { forwardRef, useMemo } from "react";

import { useOdeIcons } from "@ode-react-ui/hooks";
import clsx from "clsx";

import AppIcon from "../AppIcon/AppIcon";
import { Heading } from "../Heading";
import { AppCardContext } from "./AppCardContext";
import {
  AppCardProps,
  AppCardRef,
  DefaultElementType,
  PolymorphicAppCard,
} from "./AppCardProps";

/**
 * AppCard shows icon and name of application
 */

const Root: PolymorphicAppCard = forwardRef(
  <T extends React.ElementType = DefaultElementType>(
    {
      app,
      as,
      children,
      headingStyle,
      isHeading = false,
      level,
      variant = "title",
      ...restProps
    }: AppCardProps<T>,
    ref: AppCardRef<T>,
  ) => {
    const { getIconClass, getIconCode } = useOdeIcons();
    const { name } = app;
    const displayName = name || "Application";

    const classes = clsx(
      "app-card app-card-react",
      {
        "app-card-title": variant === "title",
      },
      getIconClass(app),
    );

    const value = useMemo(
      () => ({
        icon: app.icon,
        displayName: app.icon,
        code: getIconCode(app),
      }),
      [],
    );

    const Component = as || "div";

    return (
      <AppCardContext.Provider value={value}>
        <Component ref={ref} className={classes} {...restProps}>
          {children}
          {isHeading ? (
            <Heading {...{ level, headingStyle }}>{displayName}</Heading>
          ) : (
            <p>{displayName}</p>
          )}
        </Component>
      </AppCardContext.Provider>
    );
  },
);

const AppCard = Object.assign({}, Root, {
  Icon: AppIcon,
});

// AppCard.displayName = "AppCard";

export default AppCard;
