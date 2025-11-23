import { useEffect, useState } from "react";
import { API } from "../utils/api";
import Navbar from "../components/Navbar";

export default function History() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHistory = async () => {
    try {
      const res = await API.get("history/");
      setItems(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load upload history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">📁 Upload History</h2>

        {/* Loading State */}
        {loading && (
          <p className="text-gray-500 text-center">Loading history...</p>
        )}

        {/* Error State */}
        {error && (
          <p className="text-red-500 text-center bg-red-50 p-3 rounded">
            {error}
          </p>
        )}

        {/* Empty State */}
        {!loading && items.length === 0 && !error && (
          <p className="text-gray-500 text-center">No uploads found.</p>
        )}

        {/* History List */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">
                  {item.file}
                </p>
                <p className="text-sm text-gray-500">
                  Uploaded: {formatDate(item.uploaded_at)}
                </p>
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-600">
                Saved
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
