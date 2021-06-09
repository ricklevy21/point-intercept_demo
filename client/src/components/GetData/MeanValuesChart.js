import React from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'


function MeanValuesChart(props) {
    return (
        <>
        <h5>measurements by transect</h5>
        <BarChart width={600} height={300} data={props.chartData}
            margin={{top: 5, right: 100, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="transectName"/>
            <YAxis/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="meanSoilMoisturePercentage" fill="#000000" />
            <Bar dataKey="meanCanopyScore" fill="#808080" />
            <Bar dataKey="meanShrubDensity" fill="#C0C0C0" />
      </BarChart>
      </>
    );
  }
export default MeanValuesChart
