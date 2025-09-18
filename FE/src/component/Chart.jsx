import React from "react";

function Chart() {
  return (
    <div className="chart">
      <svg width="100%" height="150">
        <polyline
          fill="none"
          stroke="#426FE4"
          strokeWidth="3"
          points="0,120 50,100 100,80 150,60 200,70 250,50 300,70 350,90 400,85"
        />
      </svg>
    </div>
  );
}

export default Chart;
