"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./layout.module.css";

export default function Header({ content }: { content?: Record<string, any> }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}>
      <div className={`container ${styles.nav}`}>
        <div className={styles.logo}>
          <Link href="/">
            <Image 
              src={content?.["branding_logo"]?.textValue || "/logo.jpg"} 
              alt="MU-LA Logo" 
              width={120} 
              height={40} 
              className={styles.logoImg} 
            />
          </Link>
        </div>
        <nav className={styles.navLinks}>
          <Link href="/#produk">Produk</Link>
          <Link href="/#why">Mengapa MU-LA</Link>
          <Link href="/#ingredients">Ingredients</Link>
          <Link href="/#faq">FAQ</Link>
        </nav>
        <div className={styles.navActions}>
          <Link href="/reseller" className="btn btn-outline">
            Jadi Reseller
          </Link>
          <Link href="/#beli" className="btn btn-primary">
            Beli Sekarang
          </Link>
        </div>
      </div>
    </header>
  );
}
