import * as React from "react";
import { useLocation } from "react-router-dom";

import { useDocumentTitle } from "@src/hooks/use-document-title";

type IframeProps = React.DetailedHTMLProps<
  React.IframeHTMLAttributes<HTMLIFrameElement>,
  HTMLIFrameElement
>;

export function IframePage({ title, ...props }: IframeProps) {
  useDocumentTitle(title);
  const location = useLocation();
  const ref = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.src += "";
    }
  }, [location]);

  return (
    <div className="-m-4 flex-1 md:-mx-6 md:-my-8 xl:-mx-8 [&_iframe]:block [&_iframe]:h-full [&_iframe]:w-full">
      <iframe {...props} ref={ref} title={title} />
    </div>
  );
}
