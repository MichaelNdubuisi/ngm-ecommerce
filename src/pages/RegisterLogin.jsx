import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RegisterLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = new URLSearchParams(location.search).get("redirectTo") || "/";

  useEffect(() => {
    const alreadyLoggedIn = localStorage.getItem("ngm-authenticated") === "true";
    if (alreadyLoggedIn) navigate("/");
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (isLogin) {
      const savedUser = JSON.parse(localStorage.getItem("ngm-user"));
      if (savedUser?.email === form.email && savedUser?.password === form.password) {
        localStorage.setItem("ngm-authenticated", "true");
        window.dispatchEvent(new Event("authChange")); // Notify navbar
        navigate(redirectTo);
      } else {
        setMessage("❌ Invalid credentials");
      }
    } else {
      localStorage.setItem("ngm-user", JSON.stringify(form));
      setMessage("✅ Registration successful! Please login below.");
      setIsLogin(true);
      setForm({ name: "", email: "", password: "" });
    }
  };

  return (
    <section className="pt-28 px-6 pb-20 min-h-screen bg-white text-gray-800">
      <div className="max-w-md mx-auto bg-gray-50 p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>

        {message && <p className="text-center mb-4 text-sm text-gray-700">{message}</p>}

        <form onSubmit={handleSubmit} className="grid gap-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="border px-4 py-2 rounded"
            />
          )}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="border px-4 py-2 rounded"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="border px-4 py-2 rounded"
          />
          <button
            type="submit"
            className="bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
            }}
            className="text-pink-600 font-semibold underline"
          >
            {isLogin ? "Register" : "Login"} here
          </button>
        </p>
      </div>
    </section>
  );
};

export default RegisterLogin;
