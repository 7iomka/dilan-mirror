import { createEvent, sample } from 'effector';
import { appStarted } from '@/shared/config/events';
import { wrapper } from '@/shared/lib/wrapper';
import { $$i18n } from '@/shared/i18n';

export const $$app = wrapper(() => {
  const started = createEvent();

  // Run shared appStarted event to init shared logic
  sample({
    clock: started,
    target: appStarted,
  });

  // Init i18n
  sample({
    clock: started,
    fn: () => ({ lng: 'en' }),
    target: $$i18n.setupTriggered,
  });

  return { started };
});
