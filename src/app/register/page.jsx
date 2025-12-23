"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./register.css";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const res = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    });

    if (res.ok) {
      // 👇 هنا التحويل
      router.push("/signin");
    }

    setLoading(false);
  }

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>

        <input name="firstName" placeholder="First Name" required />
        <input name="lastName" placeholder="Last Name" required />
        <input name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />

        <button disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="switch">
          Already have an account?
          <Link href="/signin"> Sign in</Link>
        </p>
      </form>
    </div>
  );
}