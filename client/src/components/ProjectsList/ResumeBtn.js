import React from "react";
import { Link } from 'react-router-dom'

export function ResumeBtn(props) {
  return (
    <Link to={`resume/${props.id}`}
      >
      <button
      key={props.id}
      className="btn btn-dark"
      >
        resume project
      </button>
    </Link>
  );
}
