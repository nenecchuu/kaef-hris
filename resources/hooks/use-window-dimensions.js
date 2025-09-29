import * as React from "react";

import { throttle } from "@src/utils";

/*
  Keep track of the window's width/height
  in React state.

  cr: Josh W. Comeau (https://www.joshwcomeau.com/react/file-structure/#bonus-exploring-the-fileviewer-component)
*/
export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
    clientWidth: document.documentElement.clientWidth,
  });

  React.useEffect(() => {
    const handleResize = throttle(() => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        clientWidth: document.documentElement.clientWidth,
      });
    }, 250);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // For the very first render, for whatever reason, the width of the scrollbars
  // is sometimes not taken into account, so we need to wait until after
  // the first render to set it.
  React.useEffect(() => {
    if (windowDimensions.clientWidth !== document.documentElement.clientWidth) {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        clientWidth: document.documentElement.clientWidth,
      });
    }
    // The whole point is to fix an irregularity on mount, so we only want to
    // run this effect on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return windowDimensions;
}
