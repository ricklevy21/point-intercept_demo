import React from "react";
import { Link } from 'react-router-dom'

export function EditDataBtn(props) {
  return (
    <Link to={`edit/${props.id}`}
    >
    <button
    key={props.id}
    className="btn btn-dark">
     edit data
    </button>
    </Link>
  );
}
