import { useParams } from "react-router-dom";

export default function HistoryDetail() {
  const { filename } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">History Detail</h1>
      <p className="mt-2 text-gray-600">File: {filename}</p>
    </div>
  );
}
