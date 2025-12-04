import React, { useState } from "react";

export default function Tooltip({ children, content, position = "top" }) {
  const [show, setShow] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className={`absolute z-50 ${positionClasses[position]} px-2 py-1 text-xs text-white bg-slate-800 rounded shadow-lg whitespace-nowrap pointer-events-none`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
