import { useState, useEffect } from "react";
import ChartCard from "./ChartCard"; // Your improved ChartCard

export default function Dashboard() {
  const [equipmentData, setEquipmentData] = useState([]);
  const [summary, setSummary] = useState({
    totalCount: 0,
    averagePrice: 0,
    averageUsage: 0,
    typeDistribution: {},
  });

  useEffect(() => {
    // Fetch raw data from your backend
    fetch("http://localhost:8000/api/equipment/") // Your backend endpoint
      .then((res) => res.json())
      .then((data) => setEquipmentData(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  useEffect(() => {
    if (!equipmentData.length) return;

    const totalCount = equipmentData.length;
    const totalPrice = equipmentData.reduce((acc, item) => acc + item.price, 0);
    const totalUsage = equipmentData.reduce((acc, item) => acc + item.usage_hours, 0);

    const typeDistribution = {};
    equipmentData.forEach((item) => {
      typeDistribution[item.equipment_type] = (typeDistribution[item.equipment_type] || 0) + 1;
    });

    setSummary({
      totalCount,
      averagePrice: totalPrice / totalCount,
      averageUsage: totalUsage / totalCount,
      typeDistribution,
    });
  }, [equipmentData]);

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow text-center">
          <h3 className="text-gray-600 dark:text-gray-300">Total Equipment</h3>
          <p className="text-2xl font-bold">{summary.totalCount}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow text-center">
          <h3 className="text-gray-600 dark:text-gray-300">Average Price</h3>
          <p className="text-2xl font-bold">{summary.averagePrice.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow text-center">
          <h3 className="text-gray-600 dark:text-gray-300">Average Usage Hours</h3>
          <p className="text-2xl font-bold">{summary.averageUsage.toFixed(1)}</p>
        </div>
      </div>

      {/* Equipment Type Distribution Chart */}
      <ChartCard
        title="Equipment Type Distribution"
        labels={Object.keys(summary.typeDistribution)}
        values={Object.values(summary.typeDistribution)}
      />
    </div>
  );
}
