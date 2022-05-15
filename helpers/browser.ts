export const getDocument = () =>
  typeof document !== "undefined" ? document : {};

export const getWindow = () => (typeof window !== "undefined" ? window : {});

export const scrollTop = () => (getWindow() as any).scroll(0, 0);

export const getLocationOrigin = () => (getWindow() as any).location?.origin;
