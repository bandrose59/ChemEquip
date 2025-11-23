import { useState, useRef, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartCard({ title, labels, values }) {
  const [type, setType] = useState("bar");
  const reportRef = useRef();

  // ✅ BASIC AUTH CHECK
  

  // ✅ Summary Calculations
  const total = values.reduce((a, b) => a + b, 0);
  const average = (total / values.length || 0).toFixed(2);

  // Equipment distribution
  const distribution = labels.reduce((acc, label, i) => {
    acc[label] = values[i];
    return acc;
  }, {});

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: type === "pie"
          ? ["#4F46E5", "#6366F1", "#A78BFA", "#C4B5FD", "#EDE9FE"]
          : "#4F46E5",
        borderColor: "#4F46E5",
        borderWidth: 1
      }
    ]
  };

  const Chart = type === "bar" ? Bar : type === "line" ? Line : Pie;

  // ✅ PDF Generator
  const generatePDF = async () => {
    const element = reportRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.text("ChemEquip Report", 10, 10);
    pdf.addImage(imgData, "PNG", 10, 20, 190, 0);
    pdf.save("equipment-report.pdf");
  };

  return (
    <div
      ref={reportRef}
      className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-3xl mx-auto"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h2>

        <select
          className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
        </select>
      </div>

      {/* ✅ CHART */}
      <div className="h-64 mb-6">
        <Chart data={chartData} options={{ responsive: true }} />
      </div>

      {/* ✅ SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <div>
          <p className="text-sm text-gray-500">Total Count</p>
          <p className="text-lg font-bold">{total}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Average Value</p>
          <p className="text-lg font-bold">{average}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Equipment Types</p>
          <p className="text-lg font-bold">{labels.length}</p>
        </div>
      </div>

      {/* ✅ DISTRIBUTION LIST */}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Equipment Distribution
        </h3>
        <ul className="text-sm space-y-1">
          {Object.entries(distribution).map(([key, val]) => (
            <li key={key} className="flex justify-between">
              <span>{key}</span>
              <span className="font-semibold">{val}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ ACTIONS */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={generatePDF}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          📄 Download PDF
        </button>
      </div>
    </div>
  );
}
