import React, { useEffect } from "react";
import { useTimeout } from "hooks/useTimeout";

const Alert = ({ value, onUnmount }) => {
  const isVisible = useTimeout(5000);

  useEffect(() => {
    if (isVisible) {
      return;
    }

    return () => onUnmount();
  }, [isVisible, onUnmount]);

  return isVisible ? <div className="alert">{value}</div> : null;
};

export default Alert;
