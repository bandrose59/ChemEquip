import { useState, useEffect } from "react";
import { API } from "../utils/api";
import FileUpload from "../components/FileUpload";
import ChartCard from "../components/ChartCard";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const fetchHistory = async () => {
    try {
      const res = await API.get("history/");
      setHistory(res.data);
    } catch (err) {
      console.error("Failed to load history");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const upload = async (file) => {
    const form = new FormData();
    form.append("file", file);

    try {
      const res = await API.post("upload/", form);
      setSummary(res.data);
      setError("");
      fetchHistory(); // ✅ refresh history after upload
    } catch (e) {
      setError(e.response?.data?.error || "Upload failed");
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <>
      <Navbar />

      <div className="p-6 space-y-8 max-w-6xl mx-auto">

        {/* Upload Section */}
        <div>
          <FileUpload onUpload={upload} />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {/* Charts Section */}
        {summary && (
          <div>
            <h2 className="text-xl font-semibold mb-4">📊 Data Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ChartCard
                title="Flowrate"
                labels={["Average"]}
                values={[summary.averages.flowrate]}
              />

              <ChartCard
                title="Pressure"
                labels={["Average"]}
                values={[summary.averages.pressure]}
              />

              <ChartCard
                title="Temperature"
                labels={["Average"]}
                values={[summary.averages.temperature]}
              />

              <ChartCard
                title="Type Distribution"
                labels={Object.keys(summary.type_distribution)}
                values={Object.values(summary.type_distribution)}
              />
            </div>
          </div>
        )}

        {/* History Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">📁 Recent Upload History</h2>

          {history.length === 0 ? (
            <p className="text-gray-500">No uploads yet.</p>
          ) : (
            <div className="space-y-3">
              {history.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700"
                >
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      {item.file}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(item.uploaded_at)}
                    </p>
                  </div>

                  <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
                    Uploaded
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
