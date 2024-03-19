import React from 'react'
// import { Pie } from 'react-chart.js'
import { Pie } from "react-chartjs-2";



const PieChart = (props) => {
  const data = {
    labels: props.label,
    datasets: [
      {
        data: props.data,
        backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#FF800", "#FF8067"],
        borderColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#FF800", "#FF8067"]

      },
    ],
  }
  return (
    <>
      <Pie
        data={data}
        width={100}
        height={50}
        options={{
          title: {
            display: true,
            text: "s,s,",
            fontSize: 1,
          },
          legend: {
            display: true,
            position: "right",

          },
        }}

      />
    </>
  )
}

export default PieChart









// import { Pie } from "react-chartjs-2";

// import React from "react";

// const PieChart = () => {
//   const data = [
//     { name: 'Group A', value: 400 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
//   ];
//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
//   const COLORS1 = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
//   const chartData = {
//     labels: ["hekek","kdkkdk"],
//     datasets: [
//       {
//         label: "s,d",
//         backgroundColor: COLORS,
//         borderColor: COLORS1,
//         borderWidth: 2,
//         data: data,
//       },
//     ],
//   };
//   return (
//     <div>
//       <Pie
//         data={chartData}
//         options={{
//           title: {
//             display: true,
//             text: "",
//             fontSize: 2,
//           },
//           legend: {
//             display: true,
//             position: "right",
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default PieChart;
// OnbordingTat(params) => {
//     return (<Bar data={params.data} label={param.label}>)
//     }












// import React from 'react';
// import { PieChart, Pie,Cell, Tooltip, ResponsiveContainer } from 'recharts';

// const Report = () => {
//     const data = [
//         { name: 'Group A', value: 400 },
//         { name: 'Group B', value: 300 },
//         { name: 'Group C', value: 300 },
//         { name: 'Group D', value: 200 },
//       ];

//       const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
//       // const RADIAN = Math.PI / 180;
//       // const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//       //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//       //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//       //   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//       //   return (
//       //     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       //       {`${(percent * 100).toFixed(0)}%`}
//       //     </text>
//       //   );
//       // };
//     return (
//         <ResponsiveContainer width="100%" height="100%">
//         <PieChart width={400} height={400}>
//           <Pie
//             data={data}
//             labelLine={false}
//             // label={renderCustomizedLabel}
//             outerRadius={80}
//             fill="#8884d8"
//             dataKey="value"
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>
//     );

// }
// export default Report

