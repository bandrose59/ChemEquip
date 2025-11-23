import { useState } from "react";
import { API } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const submit = async () => {
    if (!data.username || !data.password || !data.confirmPassword) {
      setMsg("All fields are required");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      await API.post("auth/register/", {
        username: data.username,
        password: data.password,
      });
      navigate("/login");
    } catch {
      setMsg("User already exists");
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
          Create Account
        </h2>

        <div className="space-y-4">
          {/* Username */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Username
            </label>
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
            <label className="text-sm text-gray-300 mb-1 block">
              Password
            </label>
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
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Re-enter password"
                value={data.confirmPassword}
                onChange={(e) =>
                  setData({ ...data, confirmPassword: e.target.value })
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

          {/* Message */}
          {msg && (
            <p className="text-red-400 text-sm text-center">{msg}</p>
          )}

          {/* Register Button */}
          <button
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-medium shadow-lg transition ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
            onClick={submit}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </div>

        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
