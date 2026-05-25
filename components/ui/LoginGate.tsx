import { FormEvent } from "react";

interface LoginGateProps {
  showLogin:    boolean;
  username:     string;
  password:     string;
  loading:      boolean;
  error:        string | null;
  onShowLogin:  () => void;
  onUsername:   (v: string) => void;
  onPassword:   (v: string) => void;
  onSubmit:     (e: FormEvent<HTMLFormElement>) => void;
}

export default function LoginGate({
  showLogin,
  username,
  password,
  loading,
  error,
  onShowLogin,
  onUsername,
  onPassword,
  onSubmit,
}: LoginGateProps) {
  return (
    <div className="absolute inset-0 z-30 flex justify-center items-start pointer-events-none">
      <div className="sticky top-[calc(50vh-220px)] mt-32 pointer-events-auto w-full max-w-sm mx-4">
        <div className="bg-zinc-900/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-zinc-800 flex flex-col items-center text-center">

          {!showLogin ? (
            /* ── Lock screen ── */
            <>
              <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Konten Terkunci</h3>
              <p className="text-zinc-400 text-sm mb-2 leading-relaxed">
                Section ini hanya bisa diakses setelah login.
              </p>
              <p className="text-zinc-500 text-xs mb-6 max-w-[260px]">
                Silakan login menggunakan API Intern untuk membuka semua konten di bawah ini.
              </p>
              <button
                onClick={onShowLogin}
                className="w-full py-3 bg-white text-black font-bold text-sm rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-md active:scale-95"
              >
                Login untuk Lanjut
              </button>
            </>
          ) : (
            /* ── Login form ── */
            <form onSubmit={onSubmit} className="w-full flex flex-col gap-4 text-left">
              <h4 className="text-lg font-bold text-center mb-1">API Authentication</h4>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs text-center">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-400">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => onUsername(e.target.value)}
                  className="px-4 py-2.5 text-sm rounded-lg bg-zinc-950 border border-zinc-800 focus:border-orange-500 focus:outline-none transition-all"
                  placeholder="e.g., emilys"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-400">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => onPassword(e.target.value)}
                  className="px-4 py-2.5 text-sm rounded-lg bg-zinc-950 border border-zinc-800 focus:border-blue-500 focus:outline-none transition-all"
                  placeholder="e.g., emilyspass"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full py-3 bg-red-600 text-white font-bold text-sm rounded-xl hover:bg-red-500 transition-all flex justify-center items-center shadow-lg shadow-red-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Login & Unlock"}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}