import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const success = login(password);
      setLoading(false);
      if (success) {
        navigate("/admin");
      } else {
        alert("❌ Incorrect password");
      }
    }, 600); // simulate delay
  };

  return (
    <section className="pt-28 px-6 min-h-screen bg-white text-center text-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-pink-600">Admin Login</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Admin Password"
            required
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-pink-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
};

export default AdminLogin;
