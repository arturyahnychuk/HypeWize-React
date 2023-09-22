import React, { Suspense } from "react";
import { IconProps } from "@/types/components/icon.types";

const Icon = ({
  icon,
  className = "icon",
  width = 20,
  height = 20,
}: IconProps) => {
  const LazyIcon = React.lazy(() =>
    import(`../icons/${icon}-icon.tsx`).catch(() => {
      return { default: () => <div className="no-icon">No Icon</div> };
    })
  );

  return (
    <Suspense fallback={null}>
      <div
        className={`icon ${className}`}
        style={{ width: width, height: height }}
      >
        <LazyIcon />
      </div>
    </Suspense>
  );
};

export default Icon;
