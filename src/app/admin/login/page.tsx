"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        window.location.href = "/admin"; // Force full reload to update middleware
      } else {
        const data = await res.json();
        setError(data.error || "Giriş başarısız");
      }
    } catch (err) {
      setError("Bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-[var(--card)] border border-[var(--border)] p-8 rounded-2xl w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Yönetici Girişi</h1>
          <p className="text-[var(--muted-foreground)]">Redtek Bilişim Yönetim Paneli</p>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-lg border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full apple-button bg-black dark:bg-white dark:text-black py-4 mt-4 text-lg"
          >
            {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
