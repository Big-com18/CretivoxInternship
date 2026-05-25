import { useState, FormEvent } from "react";
import gsap from "gsap";
import { UserData } from "@/types";

export function useAuth() {
  const [showLogin, setShowLogin] = useState(false);
  const [username,  setUsername]  = useState("");
  const [password,  setPassword]  = useState("");
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState<string | null>(null);
  const [userData,  setUserData]  = useState<UserData | null>(null);

  const isLoggedIn = userData !== null;

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
          const response = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, expiresInMins: 30 }),
          });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login gagal. Cek lagi username/password lo.");
      }

      setUserData({
        firstName: data.firstName,
        lastName:  data.lastName,
        image:     data.image,
        username:  data.username,
      });

      // Animate profile badge & project cards after login
      gsap.fromTo(
        ".profile-badge",
        { y: -20, opacity: 0 },
        { y: 0,   opacity: 1, duration: 0.5, ease: "power2.out" }
      );
      gsap.fromTo(
        ".project-card",
        { scale: 0.95 },
        { scale: 1, duration: 0.8, ease: "expo.out", stagger: 0.1 }
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan yang tidak terduga.");
    } finally {
      setLoading(false);
    }
  };

  return {
    // state
    showLogin, setShowLogin,
    username,  setUsername,
    password,  setPassword,
    loading,
    error,
    userData,
    isLoggedIn,
    // handler
    handleLogin,
  };
}