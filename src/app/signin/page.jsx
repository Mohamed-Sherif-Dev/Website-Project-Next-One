"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./login.css";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (res.ok) {
        const data = await res.json();

        
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        
        localStorage.setItem(
          "user",
          JSON.stringify({ username, fake: true })
        );
      }
    } catch (error) {
    
      localStorage.setItem(
        "user",
        JSON.stringify({ username, fake: true })
      );
    }

    
    router.push("/");
  }

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Sign In</h1>

        <input name="username" placeholder="Username" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />

        <button disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="switch">
          Don&apos;t have an account?
          <Link href="/register"> Create one</Link>
        </p>
      </form>
    </div>
  );
}