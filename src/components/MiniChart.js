// src/components/MiniChart.js
import React from 'react';

const MiniChart = ({ data, change7d }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  
  // Get SVG points
  const getPoints = () => {
    const width = 120;
    const height = 40;
    
    return data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');
  };
  
  const lineColor = change7d >= 0 ? '#16c784' : '#ea3943';
  
  return (
    <div className="mini-chart">
      <svg width="120" height="40" viewBox="0 0 120 40">
        <polyline
          fill="none"
          stroke={lineColor}
          strokeWidth="2"
          points={getPoints()}
        />
      </svg>
    </div>
  );
};

export default MiniChart;
