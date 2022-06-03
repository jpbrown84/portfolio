import { useEffect, useState } from "react";

const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateScreenWidth = () => {
      const width = window.innerWidth;

      if (width !== screenWidth) {
        setScreenWidth(width);
      }
    };

    window.addEventListener("resize", updateScreenWidth);

    return () => window.removeEventListener("resize", updateScreenWidth);
  }, [screenWidth]);

  return screenWidth;
};

export default useScreenWidth;
