import type { ComponentType } from 'react';
import { Suspense } from 'react';
import { Spinner } from '../spinner';

export function Loadable(Component: ComponentType) {
  return function fn(props: any) {
    return (
      <Suspense fallback={<Spinner />}>
        <Component {...props} />
      </Suspense>
    );
  };
}
