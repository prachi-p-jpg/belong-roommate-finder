import React from "react";

function Choice({children,selected,onClick,icon}) {
  return <button className={selected?"choice selected":"choice"} onClick={onClick}>
    {icon && <span>{icon}</span>} {children}
  </button>
}


export default Choice;