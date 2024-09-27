import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetPestIncident } from '../hooks/useGetPestincident';
import { PestIncident } from '@/app/utils/types';

// const PestInfestationChart = () => {
//     const { pestIncidentData: incidents, loading, error } = useGetPestIncident();

//     if (loading) {
//         return <div className="text-center text-lg">Loading data...</div>;
//     }
//     if (error) {
//         return <div className="text-center text-lg text-red-500">Error: {error}</div>;
//     }

//     const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//     const aggregateByMonth = (data: PestIncident[]) => {
//         const monthlyData = allMonths.map(month => ({
//             month,
//             pest1: 0,
//             pest2: 0,
//             count: 0,
//         }));

//         data.forEach(incident => {
//             const monthIndex = new Date(incident.detection_date).getMonth(); 
//             if (monthIndex >= 0 && monthIndex < 12) {
//                 monthlyData[monthIndex].pest1 += incident.confidence_score;
//                 monthlyData[monthIndex].pest2 += incident.affected_area_percentage;
//                 monthlyData[monthIndex].count += 1;
//             }
//         });

//         return monthlyData.map(monthData => ({
//             month: monthData.month,
//             pest1: monthData.count > 0 ? (monthData.pest1 / monthData.count).toFixed(2) : 0,
//             pest2: monthData.count > 0 ? (monthData.pest2 / monthData.count).toFixed(2) : 0,
//         }));
//     };

//     const chartData = incidents?.length ? aggregateByMonth(incidents) : allMonths.map(month => ({ month, pest1: 0, pest2: 0 }));

//     return (
//         <ResponsiveContainer width="100%" height={550}>
//             <LineChart
//                 data={chartData}
//                 margin={{
//                     top: 5,
//                     right: 50,
//                     left: 20,
//                     bottom: 22,
//                 }}
//             >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis
//                     dataKey="month"
//                     label={{ value: "Months", position: "bottom", offset: -9 }}
//                 />
//                 <YAxis label={{ value: "Pest Infestation Rate", angle: -90 }} />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="pest1" name="Confidence Score" stroke="#4CAF50" activeDot={{ r: 8 }} />
//                 <Line type="monotone" dataKey="pest2" name="Affected Area" stroke="#795548" />
//             </LineChart>
//         </ResponsiveContainer>
//     );
// };

// export default PestInfestationChart;


const PestInfestationChart = () => {
    const { pestIncidentData: incidents, loading, error } = useGetPestIncident();

    if (loading) {
        return <div className="text-center text-lg">Loading data...</div>;
    }
    if (error) {
        return <div className="text-center text-lg text-red-500">Error: {error}</div>;
    }

    const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const aggregateByMonth = (data: PestIncident[]) => {
        const monthlyData = allMonths.map(month => ({
            month,
            pest1: 0,
            pest2: 0,
            count: 0,
        }));

        data.forEach(incident => {
            const monthIndex = new Date(incident.detection_date).getMonth(); 
            if (monthIndex >= 0 && monthIndex < 12) {
                monthlyData[monthIndex].pest1 += incident.confidence_score;
                monthlyData[monthIndex].pest2 += incident.affected_area_percentage;
                monthlyData[monthIndex].count += 1;
            }
        });

        return monthlyData.map(monthData => ({
            month: monthData.month,
            pest1: monthData.count > 0 ? (monthData.pest1 / monthData.count).toFixed(2) : 0,
            pest2: monthData.count > 0 ? (monthData.pest2 / monthData.count).toFixed(2) : 0,
        }));
    };

    const chartData = incidents && incidents.length > 0
        ? aggregateByMonth(incidents)
        : allMonths.map(month => ({ month, pest1: 0, pest2: 0 }));

    return (
        <ResponsiveContainer width="100%" height={550}>
            <LineChart
                data={chartData}
                margin={{
                    top: 5,
                    right: 50,
                    left: 20,
                    bottom: 22,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="month"
                    label={{ value: "Months", position: "bottom", offset: -9 }}
                />
                <YAxis label={{ value: "Pest Infestation Rate", angle: -90 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pest1" name="Confidence Score" stroke="#4CAF50" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="pest2" name="Affected Area" stroke="#795548" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default PestInfestationChart;


// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useGetPestIncident } from '../hooks/useGetPestincident';
// import { PestIncident } from '@/app/utils/types';

// const PestInfestationChart = () => {
// const { pestIncidentData: incidents, loading, 
//     error } = useGetPestIncident();
// if (loading) {
// return <div className="text-center text-lg">Loading data...</div>;
// }
// if (error) {
// return <div className="text-center text-lg text-red-500">Error: {error}</div>;
// }
// const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// const aggregateByMonth = (data:PestIncident) => {
// const monthlyData: { [key: string]:  PestIncident[]} = {};
// allMonths.forEach((month:string) => {
// monthlyData[month] = {
//                month:"",
//                pest1: 0,
//                pest2: 0,
//                count: 0,
//            };
//        });


//        data.forEach((incidents) => {
//            const month = new Date(incidents.detection_date).toLocaleString('default', { month: 'short' });


//            if (monthlyData[month]) {
//                monthlyData[month].pest1 += incidents.confidence_score;
//                monthlyData[month].pest2 += incidents.affected_area_percentage;
//                monthlyData[month].count += 1;
//            }
//        });
//        return allMonths.map((month) => {
//            const monthData = monthlyData[month];
//            return {
//                month: monthData.month,
//                pest1: monthData.count > 0 ? (monthData.pest1 / monthData.count).toFixed(2) : 0,
//                pest2: monthData.count > 0 ? (monthData.pest2 / monthData.count).toFixed(2) : 0,
//            };
//        });
//    };
//    const chartData = incidents?.length ? aggregateByMonth(incidents) : allMonths.map((month) => ({ month, pest1: 0, pest2: 0 }));
//    return (
//        <ResponsiveContainer width="102%" height={550}>
//            <LineChart
//                data={chartData}
//                margin={{
//                    top: 5,
//                    right: 50,
//                    left: 20,
//                    bottom: 22,
//                }}
//            >
//                <CartesianGrid strokeDasharray="3 3" />
//                <XAxis
//                    dataKey="month"
//                    label={{ value: "Months", position: "bottom", offset: -9 }}
//                />
//                <YAxis label={{ value: "Pest Infestation Rate", angle: -90 }} />
//                <Tooltip />
//                <Legend />
//                <Line type="monotone" dataKey="pest1" name="Confidence Score" stroke="#4CAF50" activeDot={{ r: 8 }} />
//                <Line type="monotone" dataKey="pest2" name="Affected Area" stroke="#795548" />
//            </LineChart>
//        </ResponsiveContainer>
//    );
// };


// export default PestInfestationChart;

// import React from 'react';
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
// } from 'recharts';
// import { PestIncident } from '@/app/utils/types';

// const PestInfestationChart: React.FC = () => {
//     const { pestIncidentData: incidents, loading, error } = useGetPestIncident();

//     if (loading) {
//         return <div className="text-center text-lg">Loading data...</div>;
//     }

//     if (error) {
//         return <div className="text-center text-lg text-red-500">Error: {error}</div>;
//     }

//     const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//     const aggregateByMonth = (data: PestIncident[]) => {
//         const monthlyData: { [key: string]: { month: string; pest1: number; pest2: number; count: number } } = {};
//         allMonths.forEach((month: string) => {
//             monthlyData[month] = {
//                 month: month,
//                 pest1: 0,
//                 pest2: 0,
//                 count: 0,
//             };
//         });

//         data.forEach((incident) => {
//             const detectionDate = incident.detection_date;
//             if (detectionDate) {
//                 const month = new Date(detectionDate).toLocaleString('default', { month: 'short' });
//                 if (monthlyData[month]) {
//                     monthlyData[month].pest1 += incident.confidence_score;
//                     monthlyData[month].pest2 += incident.affected_area_percentage;
//                     monthlyData[month].count += 1;
//                 }
//             }
//         });

//         return allMonths.map((month) => {
//             const monthData = monthlyData[month];
//             return {
//                 month: monthData.month,
//                 pest1: monthData.count > 0 ? (monthData.pest1 / monthData.count).toFixed(2) : '0',
//                 pest2: monthData.count > 0 ? (monthData.pest2 / monthData.count).toFixed(2) : '0',
//             };
//         });
//     };

//     const chartData = incidents.length ? aggregateByMonth(incidents) : allMonths.map((month) => ({ month, pest1: '0', pest2: '0' }));

//     return (
//         <ResponsiveContainer width="100%" height={550}>
//             <LineChart
//                 data={chartData}
//                 margin={{
//                     top: 5,
//                     right: 50,
//                     left: 20,
//                     bottom: 22,
//                 }}
//             >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis
//                     dataKey="month"
//                     label={{ value: "Months", position: "bottom", offset: -9 }}
//                 />
//                 <YAxis label={{ value: "Pest Infestation Rate", angle: -90 }} />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="pest1" name="Confidence Score" stroke="#4CAF50" activeDot={{ r: 8 }} />
//                 <Line type="monotone" dataKey="pest2" name="Affected Area" stroke="#795548" />
//             </LineChart>
//         </ResponsiveContainer>
//     );
// };

// export default PestInfestationChart;




