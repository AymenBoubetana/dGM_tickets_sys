import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MonthlyPriorityLineChart = ({ data }) => {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
    <LineChart
      width={600}
      height={300}
      data={data} // Use monthlyPriorityData here
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="faible" stroke="#8884d8" />
      <Line type="monotone" dataKey="moyen" stroke="#82ca9d" />
      <Line type="monotone" dataKey="eleve" stroke="#ff7300" />
    </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthlyPriorityLineChart;
