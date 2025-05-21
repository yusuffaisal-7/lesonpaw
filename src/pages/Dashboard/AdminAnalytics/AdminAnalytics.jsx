import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUsers, FaChalkboardTeacher, FaBriefcase, FaMoneyBillWave, FaGraduationCap, FaChartLine } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminAnalytics = () => {
  const axiosSecure = useAxiosSecure();
  const [period, setPeriod] = useState('monthly');
  const [chartType, setChartType] = useState('bar');

  const { data: stats = {}, isLoading, refetch } = useQuery({
    queryKey: ['analytics', period],
    queryFn: async () => {
      const res = await axiosSecure.get(`/analytics?period=${period}`);
      return res.data;
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 300000);
    return () => clearInterval(interval);
  }, [refetch]);

  const statCards = [
    { title: 'Total Users', value: stats.totalUsers || 0, icon: <FaUsers />, color: '#70C5D7' },
    { title: 'Total Tutors', value: stats.totalTutors || 0, icon: <FaChalkboardTeacher />, color: '#DA3A60' },
    { title: 'Total Jobs', value: stats.totalJobs || 0, icon: <FaBriefcase />, color: '#005482' },
    { title: 'Total Payments', value: stats.totalPayments || 0, icon: <FaMoneyBillWave />, color: '#70C5D7' },
    { title: 'Total Students', value: stats.totalStudent || 0, icon: <FaGraduationCap />, color: '#DA3A60' },
  ];

  const chartData = {
    labels: ['Users', 'Tutors', 'Jobs', 'Payments', 'Students'],
    datasets: [
      {
        label: 'Platform Statistics',
        data: [
          stats.totalUsers || 0,
          stats.totalTutors || 0,
          stats.totalJobs || 0,
          stats.totalPayments || 0,
          stats.totalStudent || 0,
        ],
        backgroundColor: [
          '#70C5D7',
          '#DA3A60',
          '#005482',
          '#70C5D7',
          '#DA3A60',
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            family: "'Montserrat', sans-serif",
          },
          padding: 20,
        },
      },
      title: {
        display: true,
        text: `Platform Analytics (${period.charAt(0).toUpperCase() + period.slice(1)})`,
        font: {
          size: 16,
          family: "'Montserrat', sans-serif",
          weight: 'bold',
        },
        padding: 20,
      },
    },
    scales: chartType !== 'doughnut' ? {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            family: "'Montserrat', sans-serif",
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Montserrat', sans-serif",
          },
        },
      },
    } : undefined,
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar data={chartData} options={chartOptions} />;
      case 'line':
        return <Line data={chartData} options={chartOptions} />;
      case 'doughnut':
        return <Doughnut data={chartData} options={chartOptions} />;
      default:
        return <Bar data={chartData} options={chartOptions} />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#70C5D7]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 font-['Montserrat']">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#005482] mb-2">Platform Analytics</h2>
        <p className="text-gray-600">Comprehensive overview of platform performance and metrics</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-8">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#70C5D7] bg-white text-[#005482]"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>

        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#70C5D7] bg-white text-[#005482]"
        >
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
          <option value="doughnut">Doughnut Chart</option>
        </select>

        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-[#70C5D7] text-white rounded-lg hover:bg-[#5AB1C3] transition-colors duration-200 flex items-center gap-2"
        >
          <FaChartLine /> Refresh Data
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 transform hover:-translate-y-1 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div style={{ color: stat.color }} className="text-2xl">
                {stat.icon}
              </div>
              <span className="text-3xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </span>
            </div>
            <h3 className="text-[#005482] font-semibold">{stat.title}</h3>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="h-[400px]">
          {renderChart()}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;