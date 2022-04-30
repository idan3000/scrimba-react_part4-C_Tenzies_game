import React from "react";

const Die = (props) => {
  const styles = props.isHeld
    ? { backgroundColor: `#59E391` }
    : { backgroundColor: `#ffffff` };
  return (
    <button style={styles} className="die-face" onClick={props.handleClick}>
      <span className="die-num">{props.value}</span>
    </button>
  );
};

export default Die;
