import { lazy } from 'react';

export function lazyComponent(componentName, pageDirectory = 'pages') {
  return lazy(() =>
    import(`../${pageDirectory}/${componentName}/${componentName}`)
  );
}
