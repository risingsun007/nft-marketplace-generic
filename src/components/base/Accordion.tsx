import React, { useState, useRef, forwardRef, useEffect } from "react";
import Card, { cardProps } from "./Card";
import AccordionHeader from "./AccordionHeader";


const Accordion = ({ child }: { child: any }): JSX.Element => {
  const [isOpen, setOpen] = useState(false);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (accordionRef.current) {
      accordionRef.current.style.minHeight = '50px'
    }
  }
    , []);

  const open = () => {
    if (!isOpen) {
      setOpen(!isOpen);
      console.log(child);
      if (accordionRef.current) {
        accordionRef.current.style.height = "auto";
      }
    } else {
      setOpen(!isOpen);
      if (accordionRef.current) {
        accordionRef.current.style.height = "50px";
      }
    }
  }

  return (
    <Card
      width="250px"
      height="50px"
      ref={accordionRef}
      child={
        <>
          <AccordionHeader
            heading="Accordion Header"
            onClick={open}
            isOpen={isOpen}
          />
          {isOpen ? child : null}
        </>
      }
    />
  );
};

export default Accordion;
