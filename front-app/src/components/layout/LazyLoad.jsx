import { Suspense, lazy } from "react";
import './Layout.scss';

export const LazyLoad = (importComponent) => {
  const LazyComponent = lazy(importComponent);
  return (
    <Suspense fallback={<div className="lazy-skeleton" data-testid="lazy-skeleton"></div>}>
      <LazyComponent />
    </Suspense>
  );
};
