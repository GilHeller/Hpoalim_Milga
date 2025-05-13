import React from "react";
import "./ProgressBar.css";

const CoolRedBar = ({ percentage = 0, label = "" }) => (
  <div className='bar-container'>
    {label && <div className='bar-label'>{label}</div>}
    <div className='bar-background'>
      <div className='bar-fill' style={{ width: `${percentage}%` }} />
      <div className='walker' style={{ left: `${percentage}%` }}>
        <div id='head' />
        <div id='torso' />
        <div id='left_arm' />
        <div id='right_arm' />
        <div id='left_leg' />
        <div id='right_leg' />
      </div>
    </div>
    <div className='bar-percentage'>{Math.round(percentage)}%</div>
  </div>
);

export default CoolRedBar;