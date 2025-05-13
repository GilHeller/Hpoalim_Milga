import React from 'react';
import './ProgressBar.css';

const CoolRedBar = ({ percentage = 70, label = "Progress" }) => {
  return (
    <div className="bar-container">
      <div className="bar-label">{label}</div>
      <div className="bar-background">
        <div
          className="bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="bar-percentage">{percentage}%</div>
    </div>
  );
};

export default CoolRedBar;
