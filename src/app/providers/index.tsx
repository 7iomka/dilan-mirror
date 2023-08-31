import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'atomic-router-react';
import type { ReactNode } from 'react';
import { FullPageError } from '@/shared/ui/full-page-error';
import { router } from '@/shared/routing';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary FallbackComponent={FullPageError}>
      <RouterProvider router={router}>{children}</RouterProvider>
    </ErrorBoundary>
  );
};
