import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ username, password });

      localStorage.setItem("token", res.data.access_token);

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white xl:grid-cols-[1fr_0.9fr]">
        <section className="relative hidden overflow-hidden bg-slate-900 p-10 text-white xl:flex xl:flex-col xl:items-center xl:justify-center">
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                <span className="material-symbols-outlined text-[22px] text-cyan-200">task_alt</span>
              </div>
              <div>
                <p className="text-lg font-semibold uppercase tracking-[0.35em] text-indigo-200">FocusFlow</p>
              </div>
            </div>

            <div className="mt-8 max-w-lg space-y-4">
              <h2 className="text-4xl font-bold text-white">
                Sign in and keep your work organized.
              </h2>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14">
          <div className="w-full max-w-md">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-slate-900">Login</h2>
              </div>

              <form onSubmit={handleLogin} className="mt-8 space-y-4">
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-600">Username</span>
                  <input
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-600">Password</span>
                  <input
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>

                <button
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white"
                  type="submit"
                >
                  <span className="material-symbols-outlined text-[20px]">login</span>
                  Login
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-600">
                No account?{" "}
                <Link className="font-semibold text-indigo-600 transition hover:text-indigo-500" to="/register">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}