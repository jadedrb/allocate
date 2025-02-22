import React, { act, useState } from 'react';
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts';

import { COLORS, formatCurrency, percent } from '../utility';

const Chart = ({ data, total, category }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const renderCenterText = () => {
    if (activeIndex !== null) {
      const activeSlice = data[activeIndex];
      return (
        <g> {/* Use a <g> to group the text elements */}
          <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle" fontSize={16} opacity={.4}> {/* Adjust y for top text */}
            <tspan fill={COLORS[activeIndex]}>{formatCurrency(percent(total, data[activeIndex].value))}</tspan>
          </text>
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize={16}> {/* Adjust y for bottom text */}
            <tspan fill={COLORS[activeIndex]}>{activeSlice.name}</tspan>
          </text>
          <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fontSize={15}> {/* Adjust y for bottom text */}
            <tspan fill="lightgrey">(or {data[activeIndex].value}%)</tspan>
          </text>
        </g>
      );
    }
    return null;
  };


  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <text x="50%" y="90" opacity={.4} textAnchor="middle" dominantBaseline="middle" fontSize={20} fontWeight="bold">
          {category} - {formatCurrency(total)}
        </text>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={2}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          labelLine={false}
          onClick={(_, index) => index !== activeIndex ? setActiveIndex(index) : null}
          onMouseEnter={(_, index) => index !== activeIndex ? setActiveIndex(index) : null}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        {renderCenterText()}
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;