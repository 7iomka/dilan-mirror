/* eslint-disable effector/mandatory-scope-binding */
import type { Event } from 'effector';
// import { createEvent } from 'effector';
import type { Gate } from 'effector-react';
// import { useUnit } from 'effector-react';
// import equal from 'fast-deep-equal';
// import { useEffect, useRef } from 'react';

// const fallbackPageEvents = {
//   update: createEvent<any | void>(),
//   close: createEvent<any | void>(),
// };
// /**
//  * Allow to pass as config Gate or events like open, close, update
//  */
// export function useBasePageEvents<P>(
//   config: Gate<P> | { open: Event<P>; close?: Event<P>; update?: Event<P> },
//   props: P,
// ) {
//   const conf = {
//     open: config.open as Event<any>,
//     close: config.close as Event<any>,
//     update: ((config as any).set || (config as any).update) as Event<any>,
//   };

//   if (!((config as any).set || (config as any).update)) {
//     conf.update = fallbackPageEvents.update;
//   }

//   if (!config.close) {
//     conf.close = fallbackPageEvents.close;
//   }

//   const { open, close, update } = useUnit(conf);
//   const router = useRouter();
//   const propsRef = useRef<{ value: any; count: number }>({
//     value: null,
//     count: 0,
//   });
//   const isPropsAssignedOnceRef = useRef(false);

//   if (!equal(propsRef.current.value, props)) {
//     propsRef.current.value = props;
//     if (isPropsAssignedOnceRef.current) {
//       propsRef.current.count += 1;
//     }
//     isPropsAssignedOnceRef.current = true;
//   }

//   useEffect(() => {
//     if (router.isReady) {
//       const currRef = propsRef.current;

//       open(currRef.value);

//       return () => close?.(currRef.value);
//     }

//     return () => {
//       // noop
//     };
//   }, [open, close, router.isReady]);

//   useEffect(() => {
//     if (update && propsRef.current.count > 0) update(propsRef.current.value);
//   }, [propsRef.current.count, update]);

// useEffect(() => {
//   if (router.isReady && propsRef.current.count > 0) {
//     update?.(propsRef.current.value);
//   }
// }, [update, router]);
// }

// TODO:

export const usePageEvents = <P>(
  config: Gate<P> | { open: Event<P>; close?: Event<P>; update?: Event<P> },
  props?: P,
) => {
  // const router = useRouter();
  // const context = props ?? ({ url: ContextNormalizers.router(router).asPath } as P);
  return null;
};
