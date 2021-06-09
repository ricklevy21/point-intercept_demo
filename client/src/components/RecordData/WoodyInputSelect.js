import React from "react";
import WoodyList from "./WoodyList"
//import json object that is list of species

export function WoodyInputSelect(props) {


  return (
    <div className="form-group">
      <input onChange={props.onChange} value={props.value} name={props.name} type="text" list="exampleListWoody" className="form-control"/>
        <datalist id="exampleListWoody">
          {WoodyList.map(opt => 
            <option key={opt.id} value={opt.value}>{opt.value}</option>
            )}
        </datalist>
    </div>
  );
}