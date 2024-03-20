import { createEffect, createEvent, restore, sample } from 'effector';
import { appConfig } from '@/shared/config/app-config';
import type {
  CommitteeMember,
  GetCommitteeMembersRequestParams,
  GetCommitteeMembersResponseDto,
} from './committee.types';

const getFx = createEffect<GetCommitteeMembersRequestParams, GetCommitteeMembersResponseDto>({
  handler: async () => {
    const res = await fetch(`${appConfig.apiBaseURL}/application/supervisory?limit=5000&page=1`);
    const json = await res.json();

    return json;
  },
});

const listRequested = createEvent<GetCommitteeMembersRequestParams>();
const listRequestResolved = createEvent<GetCommitteeMembersResponseDto>();

const listUpdated = createEvent<CommitteeMember[]>();
const $list = restore(listUpdated, []);

sample({
  clock: listRequested,
  target: getFx,
});

sample({
  clock: getFx.doneData,
  target: listRequestResolved,
});

sample({
  clock: listRequestResolved,
  fn: ({ data: { items } }) => items,
  target: listUpdated,
});

export const $$committee = {
  listRequested,
  $list,
};
