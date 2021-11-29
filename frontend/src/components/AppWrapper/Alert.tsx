import { useEffect } from "react";
import { useTimeout } from "hooks/useTimeout";

type AlertProps = {
  value: string,
  onUnmount: () => any
}

const Alert: React.FC<AlertProps> = ({ value, onUnmount }: AlertProps) => {
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
