import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
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
        throw new Error(data.msg || `Registration failed with status ${res.status}.`);
      }

      // Verify we have the necessary data
      if (!data.token || !data.user) {
        throw new Error('Invalid response from server. Missing token or user data.');
      }

      // Save to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Navigate based on role - use replace to prevent going back
      console.log('Registration successful, navigating to dashboard for role:', data.user.role);
      
      // Navigate immediately - only admin and parent dashboards
      const destination = 
        data.user.role === 'admin' ? "/admin-dashboard" :
        "/parent-dashboard";
      
      navigate(destination, { replace: true });
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'An error occurred during registration. Please try again.');
    }
  };

  return (
    <>
      <h2 className="auth-title">Create Account ✨</h2>
      <p className="auth-subtitle">
        Join us and start managing your records easily
      </p>

      {error && (
        <div className="auth-error">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form-group">
          <label htmlFor="name" className="auth-form-label">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="auth-form-input"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="auth-form-group">
          <label htmlFor="email" className="auth-form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="auth-form-input"
            value={formData.email}
            onChange={handleChange}
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
            name="password"
            className="auth-form-input"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />
        </div>

        <div className="auth-form-group">
          <label htmlFor="confirmPassword" className="auth-form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="auth-form-input"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            required
          />
        </div>

        <button type="submit" className="auth-button">
          Register
        </button>
      </form>

      <p className="auth-footer">
        Already have an account?{" "}
        <Link to="/login" className="auth-footer-link">
          Log in
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
