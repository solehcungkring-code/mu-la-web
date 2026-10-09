"use client";

import { useActionState } from "react";
import { updateAdminEmailAction, updateAdminPasswordAction } from "../app/admin/actions";

export default function AdminSettingsForm({ currentEmail }: { currentEmail: string }) {
  const [emailState, emailFormAction, isEmailPending] = useActionState(updateAdminEmailAction, null);
  const [passwordState, passwordFormAction, isPasswordPending] = useActionState(updateAdminPasswordAction, null);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "2rem" }}>
      {/* 1. KARTU UBAH EMAIL */}
      <div style={{
        background: "white",
        borderRadius: "1rem",
        padding: "2rem",
        border: "1px solid var(--border)",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.03)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "0.75rem",
            background: "#eff6ff",
            color: "#2563eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.25rem"
          }}>
            <i className="las la-envelope"></i>
          </div>
          <div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0f172a" }}>Ubah Email Login</h3>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>Ganti alamat email utama akun administrator</p>
          </div>
        </div>

        {emailState?.error && (
          <div style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            marginBottom: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <i className="las la-exclamation-circle"></i>
            <span>{emailState.error}</span>
          </div>
        )}

        {emailState?.success && (
          <div style={{
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            color: "#15803d",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            marginBottom: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <i className="las la-check-circle"></i>
            <span>{emailState.message}</span>
          </div>
        )}

        <form action={emailFormAction} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#475569", marginBottom: "0.35rem" }}>
              Email Saat Ini
            </label>
            <input 
              type="text" 
              disabled 
              value={currentEmail}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                border: "1px solid #e2e8f0",
                background: "#f8fafc",
                color: "#64748b",
                fontSize: "0.95rem"
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#475569", marginBottom: "0.35rem" }}>
              Email Baru
            </label>
            <input 
              type="email" 
              name="newEmail" 
              required 
              placeholder="admin-baru@domain.com"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5e1",
                fontSize: "0.95rem",
                outline: "none"
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#475569", marginBottom: "0.35rem" }}>
              Konfirmasi Password Saat Ini
            </label>
            <input 
              type="password" 
              name="currentPassword" 
              required 
              placeholder="Masukkan password Anda"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5e1",
                fontSize: "0.95rem",
                outline: "none"
              }}
            />
            <small style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginTop: "0.25rem", display: "block" }}>
              Diperlukan untuk memvalidasi identitas sebelum email diubah.
            </small>
          </div>

          <button 
            type="submit" 
            disabled={isEmailPending}
            className="btn btn-primary"
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              fontSize: "0.95rem",
              fontWeight: "600",
              marginTop: "0.5rem",
              alignSelf: "flex-start",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              opacity: isEmailPending ? 0.7 : 1
            }}
          >
            {isEmailPending ? (
              <>
                <i className="las la-spinner la-spin"></i>
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <i className="las la-save"></i>
                <span>Simpan Email Baru</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* 2. KARTU UBAH PASSWORD */}
      <div style={{
        background: "white",
        borderRadius: "1rem",
        padding: "2rem",
        border: "1px solid var(--border)",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.03)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "0.75rem",
            background: "#fef3c7",
            color: "#d97706",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.25rem"
          }}>
            <i className="las la-key"></i>
          </div>
          <div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0f172a" }}>Ubah Password</h3>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>Perbarui kata sandi untuk keamanan akun</p>
          </div>
        </div>

        {passwordState?.error && (
          <div style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            marginBottom: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <i className="las la-exclamation-circle"></i>
            <span>{passwordState.error}</span>
          </div>
        )}

        {passwordState?.success && (
          <div style={{
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            color: "#15803d",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            marginBottom: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <i className="las la-check-circle"></i>
            <span>{passwordState.message}</span>
          </div>
        )}

        <form action={passwordFormAction} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#475569", marginBottom: "0.35rem" }}>
              Password Saat Ini
            </label>
            <input 
              type="password" 
              name="currentPassword" 
              required 
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5e1",
                fontSize: "0.95rem",
                outline: "none"
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#475569", marginBottom: "0.35rem" }}>
              Password Baru (min. 6 karakter)
            </label>
            <input 
              type="password" 
              name="newPassword" 
              required 
              placeholder="••••••••"
              minLength={6}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5e1",
                fontSize: "0.95rem",
                outline: "none"
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#475569", marginBottom: "0.35rem" }}>
              Konfirmasi Password Baru
            </label>
            <input 
              type="password" 
              name="confirmPassword" 
              required 
              placeholder="••••••••"
              minLength={6}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                border: "1px solid #cbd5e1",
                fontSize: "0.95rem",
                outline: "none"
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={isPasswordPending}
            className="btn btn-primary"
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              fontSize: "0.95rem",
              fontWeight: "600",
              marginTop: "0.5rem",
              alignSelf: "flex-start",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              opacity: isPasswordPending ? 0.7 : 1
            }}
          >
            {isPasswordPending ? (
              <>
                <i className="las la-spinner la-spin"></i>
                <span>Memperbarui...</span>
              </>
            ) : (
              <>
                <i className="las la-shield-alt"></i>
                <span>Perbarui Password</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
