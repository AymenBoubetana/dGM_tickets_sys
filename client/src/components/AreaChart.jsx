import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const AreaPriorityAreaChart = ({ data }) => {
  return (
    <BarChart
      width={600}
      height={400}
      data={data} // Use monthlyPriorityData here
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="faible" stackId="a" fill="#8884d8" />
      <Bar dataKey="moyen" stackId="a" fill="#82ca9d" />
      <Bar dataKey="eleve" stackId="a" fill="#ffc658" />
    </BarChart>
  );
};

export default AreaPriorityAreaChart;
