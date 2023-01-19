import React from "react";
import '../../styles/base/AccordionHeader.css';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

interface AccordingHeaderProps {
  heading: string;
  isOpen: boolean;
  onClick: () => void;
}


const AccordionHeader = ({ heading, isOpen, onClick }: AccordingHeaderProps) => {


  return (
    <div className="accordion-header" onClick={onClick}>
      <h1> {heading} </h1>
      {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
    </div>
  );
}

export default AccordionHeader;