import { createEvent, sample } from 'effector';
import { appStarted } from '@/shared/config/events';
import { $$i18n } from '@/shared/i18n';

export const $$app = (() => {
  const started = createEvent();

  // Run shared appStarted event to init shared logic
  sample({
    clock: started,
    target: appStarted,
  });

  // Init i18n
  sample({
    clock: started,
    target: $$i18n.setupTriggered,
  });

  return { started };
})();
