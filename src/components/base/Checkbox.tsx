import React from "react";
import '../../styles/base/Checkbox.css';

const Checkbox = ({name,onChange}: {name:string, onChange: () => void}) => {
  return (
    <label className="container">
      {name}
      <input type="checkbox" onChange={onChange} />
      <span className="checkmark"></span>
    </label>
  );
};

export default Checkbox;
