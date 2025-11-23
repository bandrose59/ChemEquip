import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";
import HistoryDetail from "./pages/HistoryDetail";
import { Landing } from "./pages/Landing";

const router = createBrowserRouter([
  // 🌐 Landing Page
  {
    path: "/",
    element: <Landing />,
  },

  // ✅ Dashboard (protected)
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },

  // ✅ History List
  {
    path: "/history",
    element: (
      <ProtectedRoute>
        <History />
      </ProtectedRoute>
    ),
  },

  // ✅ History Detail
  {
    path: "/history/:filename",
    element: (
      <ProtectedRoute>
        <HistoryDetail />
      </ProtectedRoute>
    ),
  },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
