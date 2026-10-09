import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { logoutAdminAction } from "./actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || "";

  // If on login page, render children directly without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/logout");
  }

  return (
    <div className="admin-container">
      {/* Sidebar / Bottom Nav */}
      <aside className="admin-sidebar">
        <div className="admin-header-brand">
          <h2 className="admin-title">MU-LA Admin</h2>
          <div className="admin-user-pill">
            <span className="admin-user-dot"></span>
            <span className="admin-user-email" title={session.email}>{session.email}</span>
          </div>
        </div>

        <nav className="admin-nav">
          <Link href="/admin" className="admin-link">
            <i className="las la-home icon"></i> <span className="label">Dashboard</span>
          </Link>
          <Link href="/admin/content" className="admin-link">
            <i className="las la-edit icon"></i> <span className="label">Konten</span>
          </Link>
          <Link href="/admin/artikel" className="admin-link">
            <i className="las la-newspaper icon"></i> <span className="label">Artikel</span>
          </Link>
          <Link href="/admin/reseller" className="admin-link">
            <i className="las la-users icon"></i> <span className="label">Reseller</span>
          </Link>
          <Link href="/admin/settings" className="admin-link">
            <i className="las la-user-cog icon"></i> <span className="label">Pengaturan Akun</span>
          </Link>
          <Link href="/" target="_blank" className="admin-link website-link">
            <i className="las la-external-link-alt icon"></i> <span className="label">Lihat Web</span>
          </Link>
          
          <a href="/admin/logout" className="admin-logout-btn" style={{ textDecoration: "none" }}>
            <i className="las la-sign-out-alt icon"></i> <span className="label">Keluar</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {children}
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .admin-container {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
          flex-direction: column;
        }
        
        /* Mobile Bottom Nav Styles */
        .admin-sidebar {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background: #0f172a;
          color: white;
          z-index: 50;
          box-shadow: 0 -4px 16px rgba(0,0,0,0.2);
        }
        .admin-header-brand {
          display: none; /* Hide on mobile bottom bar */
        }
        .admin-nav {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0.5rem 0.25rem calc(0.5rem + env(safe-area-inset-bottom, 0px));
        }
        .admin-link, .admin-logout-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.68rem;
          padding: 0.25rem 0;
          flex: 1;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          transition: color 0.2s;
        }
        .admin-link .icon, .admin-logout-btn .icon {
          font-size: 1.35rem;
        }
        .admin-link:hover, .admin-logout-btn:hover { color: white; }
        .website-link { display: none; }
        .admin-logout-form { display: contents; }
        
        .admin-main {
          flex: 1;
          padding: 1.5rem;
          padding-bottom: 5.5rem; /* Space for bottom nav */
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
        }
        
        /* Desktop Styles */
        @media (min-width: 768px) {
          .admin-container {
            flex-direction: row;
          }
          .admin-sidebar {
            position: sticky;
            top: 0;
            width: 260px;
            height: 100vh;
            padding: 2rem 1.25rem;
            box-shadow: none;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .admin-header-brand {
            display: block;
            margin-bottom: 2rem;
          }
          .admin-title {
            display: block;
            font-size: 1.4rem;
            color: white;
            font-weight: 700;
            margin-bottom: 0.5rem;
          }
          .admin-user-pill {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.35rem 0.75rem;
            border-radius: 999px;
            font-size: 0.75rem;
            color: #cbd5e1;
            max-width: 100%;
            overflow: hidden;
          }
          .admin-user-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #22c55e;
            box-shadow: 0 0 6px #22c55e;
            flex-shrink: 0;
          }
          .admin-user-email {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .admin-nav {
            flex-direction: column;
            gap: 0.35rem;
            padding: 0;
            flex: 1;
            justify-content: flex-start;
          }
          .admin-link, .admin-logout-btn {
            flex-direction: row;
            padding: 0.75rem 1rem;
            border-radius: 0.65rem;
            font-size: 0.92rem;
            font-weight: 500;
            justify-content: flex-start;
            gap: 0.75rem;
            width: 100%;
            text-align: left;
          }
          .admin-link .icon, .admin-logout-btn .icon {
            font-size: 1.25rem;
          }
          .admin-link:hover, .admin-logout-btn:hover {
            background: rgba(255, 255, 255, 0.08);
            color: white;
          }
          .website-link {
            display: flex;
            margin-top: auto;
            color: #94a3b8;
          }
          .admin-logout-form {
            display: block;
            width: 100%;
            margin-top: 0.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 0.5rem;
          }
          .admin-logout-btn {
            color: #f87171;
          }
          .admin-logout-btn:hover {
            background: rgba(239, 68, 68, 0.15);
            color: #fca5a5;
          }
          .admin-main {
            padding: 2.5rem;
            padding-bottom: 2.5rem;
          }
        }
      `}} />
    </div>
  );
}
