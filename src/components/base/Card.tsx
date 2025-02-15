import React, { useState, RefObject } from "react";
import "../../styles/base/Card.css";

export interface cardProps {
  child: any;
  onClick?: () => void;
  blurColor?: string;
  width?: string;
  height?: string;
}

const Card = React.forwardRef(
  (
    {
      width = "250px",
      height = "300px",
      child,
      blurColor = "rgba(48,118,234,0.2)",
      onClick,
    }: cardProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => (
    <div
      className="card"
      style={{
        width: `${width}`,
        height: `${height}`,
        background: `radial-gradient(
                circle,
                rgba(255, 255, 255, 0.05) 0%,
                ${blurColor} 0%,
                rgba(255, 255, 255, 0.05) 70%
              )`,
      }}
      onClick={onClick}
      ref={ref}
    >
      {child}
    </div>
  )
);
export default Card;
