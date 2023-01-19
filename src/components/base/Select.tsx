import React, { useState, createRef } from "react";
import "../../styles/base/Select.css";

const Select = ({ items, onChange }: {items: any, onChange: (arg0: string)=>void }) => {

  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  const optionRef = createRef<HTMLUListElement>();

  const setSelect = (value: string) => {
    setValue(value);
    onClick();
    onChange(value);
  }


  const onClick = () => {
    if (!isOpen) {
      if (optionRef?.current) {
        optionRef.current.style.display = 'block';
      }
      setOpen(!isOpen);
    } else {
      if (optionRef?.current) {
        optionRef.current.style.display = 'none';
      }
      setOpen(!isOpen);
    }
  }


  return (
    <div className="dropdown">
      <button className="dropdown-toggle" type="button" aria-haspopup="true" onClick={onClick}>
        {value ? value : "Select from Options"}
      </button>
      <ul className="dropdown-menu" role="listbox" aria-expanded="false" ref={optionRef} >

        {items && items.map((item: any, index: number) => (
          <li role="option" tabIndex={index} key={index} onClick={() => setSelect(item)} >
            {item}
          </li>
        ))}

      </ul>
    </div>
  );
};

export default Select;
