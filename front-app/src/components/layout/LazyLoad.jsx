import { Suspense, lazy } from "react";

export const LazyLoad = (importComponent) => {
  const LazyComponent = lazy(importComponent);
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <LazyComponent />
    </Suspense>
  );
};
