"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { loginAdminAction } from "../app/admin/actions";

export default function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
      padding: "1.5rem",
      fontFamily: "var(--font-body)"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        background: "rgba(255, 255, 255, 0.98)",
        borderRadius: "1.5rem",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        padding: "2.5rem 2rem",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ display: "inline-block", marginBottom: "1rem" }}>
            <Image 
              src="/logo.jpg" 
              alt="MU-LA Logo" 
              width={140} 
              height={46} 
              style={{ height: "46px", width: "auto", objectFit: "contain" }}
              priority
            />
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.25rem" }}>
            Admin Portal
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
            Masukkan email dan password untuk mengakses dashboard
          </p>
        </div>

        {/* Error Alert */}
        {state?.error && (
          <div style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
            padding: "0.75rem 1rem",
            borderRadius: "0.75rem",
            fontSize: "0.875rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <i className="las la-exclamation-circle" style={{ fontSize: "1.25rem" }}></i>
            <span>{state.error}</span>
          </div>
        )}

        {/* Login Form */}
        <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#334155", marginBottom: "0.5rem" }}>
              Email Admin
            </label>
            <div style={{ position: "relative" }}>
              <i className="las la-envelope" style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94a3b8",
                fontSize: "1.25rem"
              }}></i>
              <input 
                type="email" 
                name="email" 
                required 
                placeholder="nama@email.com"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem 0.75rem 2.75rem",
                  borderRadius: "0.75rem",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#334155", marginBottom: "0.5rem" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <i className="las la-lock" style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94a3b8",
                fontSize: "1.25rem"
              }}></i>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                required 
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "0.75rem 2.75rem 0.75rem 2.75rem",
                  borderRadius: "0.75rem",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  fontSize: "1.25rem",
                  padding: "0.25rem",
                  display: "flex",
                  alignItems: "center"
                }}
                aria-label="Toggle password"
              >
                <i className={showPassword ? "las la-eye-slash" : "las la-eye"}></i>
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="btn btn-primary"
            style={{
              width: "100%",
              padding: "0.875rem",
              borderRadius: "0.75rem",
              fontSize: "1rem",
              fontWeight: "600",
              marginTop: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              opacity: isPending ? 0.7 : 1,
              cursor: isPending ? "not-allowed" : "pointer"
            }}
          >
            {isPending ? (
              <>
                <i className="las la-spinner la-spin" style={{ fontSize: "1.25rem" }}></i>
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <i className="las la-arrow-right" style={{ fontSize: "1.1rem" }}></i>
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.75rem" }}>
          <a href="/" style={{ color: "#64748b", fontSize: "0.8125rem", textDecoration: "none" }}>
            <i className="las la-angle-left"></i> Kembali ke Website Utama
          </a>
        </div>
      </div>
    </div>
  );
}
