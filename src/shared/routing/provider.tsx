import { createContext, useContext } from 'react';
import type { RouteInstance } from 'atomic-router';

const CurrentRouteCtx = createContext<RouteInstance<any> | null>(null);

export const CurrentRouteProvider = CurrentRouteCtx.Provider;

export const useCurrentRoute = () => useContext(CurrentRouteCtx);
