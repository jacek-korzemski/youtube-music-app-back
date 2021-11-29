import { useState } from "react";
import { StarsWrapper } from "./Wrappers";

const Stars = () => {
  const [active, setActive] = useState(-1);
  const [disabled, setDisabled] = useState(false);
  const rate = (num: number) => {
    setActive(num);
    setDisabled(true);
  };

  return (
    <StarsWrapper>
      <ul onMouseLeave={!disabled ? () => setActive(-1) : undefined} className={disabled ? "disabled" : undefined}>
        <li
          onClick={!disabled ? () => rate(0) : undefined}
          onMouseOver={() => setActive(0)}
          className={active >= 0 ? "active" : "inactive"}
        >
          <i className="fi-star"></i>
        </li>
        <li
          onClick={!disabled ? () => rate(1) : undefined}
          onMouseOver={() => setActive(1)}
          className={active >= 1 ? "active" : "inactive"}
        >
          <i className="fi-star"></i>
        </li>
        <li
          onClick={!disabled ? () => rate(2) : undefined}
          onMouseOver={() => setActive(2)}
          className={active >= 2 ? "active" : "inactive"}
        >
          <i className="fi-star"></i>
        </li>
        <li
          onClick={!disabled ? () => rate(3) : undefined}
          onMouseOver={() => setActive(3)}
          className={active >= 3 ? "active" : "inactive"}
        >
          <i className="fi-star"></i>
        </li>
        <li
          onClick={!disabled ? () => rate(4) : undefined}
          onMouseOver={() => setActive(4)}
          className={active >= 4 ? "active" : "inactive"}
        >
          <i className="fi-star"></i>
        </li>
      </ul>
      <p>Rate</p>
    </StarsWrapper>
  );
};

export default Stars;
