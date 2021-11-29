import { useState, useEffect } from "react";

export const useTimeout = (time: number) => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsActive(false);
    }, time);

    return () => clearTimeout(timeout);
  }, [time]);

  return isActive;
};
