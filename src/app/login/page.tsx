"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate login success
    if (email && password) {
      router.push("/admin/home");
    }
  };

  return (
    <div className="min-h-screen bg-[url('/photography-bg.jpg')] bg-cover bg-center flex items-center justify-center">
      <div className="backdrop-blur-md bg-black/50 p-10 rounded-xl shadow-lg max-w-md w-full text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Photographer Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 
            font-semibold py-2 rounded text-white mt-4 transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
