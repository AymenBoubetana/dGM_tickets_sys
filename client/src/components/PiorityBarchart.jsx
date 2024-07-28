import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const PriorityPieChart = ({ data }) => {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
    <PieChart width={400} height={400}>
      <Pie
        data={data} // Use graphData here
        dataKey="total"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
    </ResponsiveContainer>
  );
};

export default PriorityPieChart;
