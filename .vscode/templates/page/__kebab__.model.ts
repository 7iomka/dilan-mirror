import { createEvent, createStore } from 'effector';
import { wrapper } from '@/shared/lib/wrapper';

export const $$__camel__Page = wrapper(() => {
  const opened = createEvent<{ url: string }>();
  const updated = createEvent<{ url: string }>();
  const closed = createEvent<{ url: string }>();

  const $isPageOpened = createStore(false)
    .on(opened, () => true)
    .on(closed, () => false);

  return { opened, updated, closed, $isPageOpened };
});
