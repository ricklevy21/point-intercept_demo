import React from "react";

export function ProjectName(props) {
  return (
    <h3 key={props.id} >
      {props.project}
    </h3>
  );
}
