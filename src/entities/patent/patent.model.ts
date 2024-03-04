import { createEffect, createEvent, restore, sample } from 'effector';
import { appConfig } from '@/shared/config/app-config';
import type { Patent, GetPatentsResponseDto, GetPatentsRequestParams } from './patent.types';
import { getMappedPatent } from './patent.lib';

const getFx = createEffect<GetPatentsRequestParams, GetPatentsResponseDto>({
  handler: async () => {
    const res = await fetch(`${appConfig.apiBaseURL}/projects/projects/dmr/sections`);
    const json = await res.json();

    return json;
  },
});

const patentsRequested = createEvent<GetPatentsRequestParams>();
const patentsRequestResolved = createEvent<GetPatentsResponseDto>();

const patentsUpdated = createEvent<Patent[]>();
const $patents = restore(patentsUpdated, []);

sample({
  clock: patentsRequested,
  target: getFx,
});

sample({
  clock: getFx.doneData,
  target: patentsRequestResolved,
});

sample({
  clock: patentsRequestResolved,
  fn: ({
    data: {
      about: { patents },
    },
  }) => patents.map(getMappedPatent),
  target: patentsUpdated,
});

export const $$patent = {
  patentsRequested,
  $patents,
};
