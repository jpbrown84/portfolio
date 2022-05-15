import { useCallback, useEffect } from "react";

export const useDebounce = (effect: any, delay: any, deps: any) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
};

export { default as debounce } from "lodash.debounce";
