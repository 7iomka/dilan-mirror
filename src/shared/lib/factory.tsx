// CAUTION
// - Avoid dynamic factories calls
// - Generic factories are not supported in `useModel`and `modelView` components
/**
 * Usage:
    const factory = createFactory(() => {});
    const { modelView, useModel } = createModelView(factory);
    root component creator: const CreateSome = modelView(SomeComponent)
    SomeComponent can use inside the model: const model = useModel();
    Factory instance creation: const $$instance = invoke(factory, {someParams})
    Factory component usage: <CreateSome model={$$instance} />
 */

'use client';

import type { invoke } from '@withease/factories';
import type { ComponentType } from 'react';
import { createContext, useContext } from 'react';

// Helper type for model prop
export type FactoryModelType<T extends (props: any) => any> = ReturnType<typeof invoke<T, any>>;

export const createModelView = <T extends (props: any) => any>(_factory: T) => {
  const Ctx = createContext<FactoryModelType<T>>(null!);

  const modelView = <Props extends object>(View: ComponentType<Props>) =>
    function ModelView({ model, ...restProps }: Props & { model: FactoryModelType<T> }) {
      return (
        <Ctx.Provider value={model}>
          <View {...(restProps as Props)} />
        </Ctx.Provider>
      );
    };

  const useModel = () => useContext(Ctx);

  return { useModel, modelView };
};
