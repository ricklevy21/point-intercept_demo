import React from "react";


// COMPONENT NOT FULLY FUNCTIONAL

export function NextPointBtn(props) {
  
  //function to increase point value by 0.25 and the update state??
  function incrementPoint(){
    let nextPoint = parseFloat(props.statePoint.point) + 0.25
    props.setPoint({...props.statePoint, point: nextPoint})
    console.log(nextPoint)
  };
    
  return (
    <button
    {...props}
    id="nextPoint"
    style={{ float: "right", marginBottom: 10 }}
    className="btn btn-lg btn-dark btn-block"
    onClick={incrementPoint}
    >
        Next Point
    </button>
  );
}
