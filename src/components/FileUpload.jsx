import { useState } from "react";

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith(".csv")) {
      setError("Please upload a valid .csv file");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
    onUpload(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
        Upload CSV File
      </h2>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition"
      >
        <input
          type="file"
          accept=".csv"
          className="hidden"
          id="fileInput"
          onChange={(e) => handleFileChange(e.target.files[0])}
        />

        <label htmlFor="fileInput" className="cursor-pointer">
          <p className="text-gray-600 dark:text-gray-300">
            Drag & drop your CSV here or
          </p>
          <span className="text-blue-600 font-medium underline">
            Browse Files
          </span>
        </label>
      </div>

      {/* File Info */}
      {file && (
        <div className="mt-4 flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded">
          <span className="text-sm text-gray-800 dark:text-gray-200">
            📄 {file.name}
          </span>
          <button
            onClick={() => setFile(null)}
            className="text-red-500 text-sm hover:underline"
          >
            Remove
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
