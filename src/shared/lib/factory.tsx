/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/destructuring-assignment */
// CAUTION
// - Avoid dynamic factories calls
// - Generic factories are not supported in `useModel`and `modelView` components
// Usage:
// const Root = modelView(factory, () => { ... })
// const model = useModel(factory)

'use client';

import { createFactory } from '@withease/factories';
import type { invoke } from '@withease/factories';
import type { Context, FC, Provider } from 'react';
import { createContext, useContext } from 'react';

const contexts = new Map<
  ReturnType<typeof createFactory>,
  Context<ReturnType<typeof invoke<ReturnType<typeof createFactory>>>>
>();

export const createModelProvider = <T extends (props: any) => any>(factory: T) => {
  contexts.set(factory, createContext(null));

  return contexts.get(factory)!.Provider as Provider<ReturnType<typeof invoke<T>>>;
};

export const useModel = <T extends (props: any) => any>(factory: T) => {
  const model = useContext(contexts.get(factory)!);
  if (!model) {
    throw new Error('No model found');
  }
  return model as ReturnType<T>;
};

/**
 * HOC that wraps your `View` into model `Provider`. Also adds `model` prop that will be passed into `Provider`
 * @param factory Factory that will be passed through Context
 * @param View Root component that will be wrapped into Context
 * @returns Wrapped component
 */
export const modelView = <T extends (props: any) => any, Props extends {} = {}>(
  factory: T,
  View: FC<Props & { model: ReturnType<typeof invoke<T, Parameters<T>[0]>> }>,
) => {
  const Provider = createModelProvider(factory);

  const Render = (props: Props & { model: ReturnType<typeof invoke<T, Parameters<T>[0]>> }) => {
    return (
      <Provider value={props.model}>
        <View {...props} />
      </Provider>
    );
  };
  // `as` is used for a better "Go To Definition"
  return Render as typeof View;
};

export { createFactory };
