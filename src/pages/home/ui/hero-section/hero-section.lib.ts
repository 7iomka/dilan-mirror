import type { Ref } from 'react';
import { useEffect, useRef, useState } from 'react';

/**
 * Returns DOM Ref and the setter ref
 */
export const useDomRefWithSetter = <T extends HTMLElement>(): [T | null, Ref<T>] => {
  const ref = useRef<T>(null);
  const [DOMRef, setRefState] = useState<T | null>(null);

  useEffect(() => {
    if (ref.current) {
      setRefState(ref.current);
    }
  }, []);

  return [DOMRef, ref];
};

/**
 * Checks if touch supported
 */
export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    'ontouchstart' in document.documentElement ||
    navigator.maxTouchPoints > 0 ||
    navigator.maxTouchPoints > 0
  );
};
