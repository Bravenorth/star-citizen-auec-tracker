// src/components/AUECChart.tsx
'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AUECChartProps {
  data: { [key: string]: number };
}

export default function AUECChart({ data }: AUECChartProps) {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'AUEC',
        data: Object.values(data),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'Statistiques AUEC',
        font: {
          size: 18,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 rounded shadow-md"
    >
      <Bar data={chartData} options={options} />
    </motion.div>
  );
}
