import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        const text = await res.text();
        if (!text) {
          throw new Error("Empty response from server. Is the backend server running?");
        }
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('Parse error:', parseError);
        throw new Error(`Server error: ${parseError.message}. Make sure the backend server is running on port 5000.`);
      }

      if (!res.ok) {
        throw new Error(data.msg || `Login failed with status ${res.status}.`);
      }

      // Verify we have the necessary data
      if (!data.token || !data.user) {
        throw new Error('Invalid response from server. Missing token or user data.');
      }

      // Save to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Navigate based on role - use replace to prevent going back
      console.log('Login successful, navigating to dashboard for role:', data.user.role);
      
      // Navigate immediately - only admin and parent dashboards
      const destination = 
        data.user.role === 'admin' ? "/admin-dashboard" :
        "/parent-dashboard";
      
      navigate(destination, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login. Please try again.');
    }
  };

  return (
    <>
      <h2 className="auth-title">Welcome Back 👋</h2>
      <p className="auth-subtitle">
        Log in to continue to your dashboard
      </p>

      {error && (
        <div className="auth-error">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form-group">
          <label htmlFor="email" className="auth-form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="auth-form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="auth-form-group">
          <label htmlFor="password" className="auth-form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="auth-form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="auth-button">
          Log In
        </button>
      </form>

      <p className="auth-footer">
        Don't have an account?{" "}
        <Link to="/register" className="auth-footer-link">
          Register here
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
