import { useState, useContext } from "react";
import { API } from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const submit = async () => {
    if (!data.username || !data.password) {
      setErr("All fields are required");
      return;
    }

    setLoading(true);
    setErr("");

    try {
      const res = await API.post("auth/login/", data);
      login(res.data.token);
      navigate("/dashboard");
    } catch (error) {
      setErr("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") submit();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">
          ChemEquip Login
        </h2>

        <div className="space-y-4">
          {/* Username */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Username</label>
            <input
              className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
              value={data.username}
              onChange={(e) =>
                setData({ ...data, username: e.target.value })
              }
              onKeyDown={handleKeyPress}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                value={data.password}
                onChange={(e) =>
                  setData({ ...data, password: e.target.value })
                }
                onKeyDown={handleKeyPress}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 cursor-pointer text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* Error */}
          {err && (
            <p className="text-red-400 text-sm text-center">{err}</p>
          )}

          {/* Button */}
          <button
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-medium shadow-lg transition ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={submit}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <div className="flex justify-between mt-4 text-sm text-gray-400">
          <span className="hover:underline cursor-pointer">Forgot Password?</span>
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Create Account
          </span>
        </div>
      </div>
    </div>
  );
}
