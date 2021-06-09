import React from "react";
import { Link } from 'react-router-dom'

export function ViewDataBtn(props) {
  return (
    <Link to={`data/${props.id}`}
    >
    <button
    key={props.id}
    className="btn btn-dark">
     get data
    </button>
    </Link>
  );
}
