import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'atomic-router-react';
import { Provider as EffectorProvider } from 'effector-react';
import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { FullPageError } from '@/shared/ui/full-page-error';
import { $$router } from '@/shared/routing';
import { $$i18n } from '@/shared/i18n';
import { scope } from '@/shared/scope';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary FallbackComponent={FullPageError}>
      <I18nextProvider i18n={$$i18n.i18n}>
        <EffectorProvider value={scope}>
          <RouterProvider router={$$router}>{children}</RouterProvider>
        </EffectorProvider>
      </I18nextProvider>
    </ErrorBoundary>
  );
};
