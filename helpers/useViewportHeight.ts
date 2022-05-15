import { useEffect, useState } from "react";
import { debounce } from "./useDebounce";
import { getDocument, getWindow } from "./browser";

const useViewportHeight = () => {
  const [prevHeight, setPrevHeight] = useState();

  const handleWindowResize = () => {
    const height = (getWindow() as any).innerHeight;

    if (!prevHeight || height !== prevHeight) {
      requestAnimationFrame(() => {
        (getDocument() as any).documentElement.style.setProperty(
          "--vh",
          `${height}px`
        );

        setPrevHeight(height);
      });
    }
  };

  useEffect(() => {
    handleWindowResize();
    const debounced = debounce(handleWindowResize, 300);

    (getWindow() as any).addEventListener("resize", debounced);

    return () => {
      (getWindow() as any).removeEventListener("resize", debounced);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return prevHeight;
};

export default useViewportHeight;
