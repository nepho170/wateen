import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const Nav = () => {
  const { currentLang, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <button
        className="lang-toggle"
        onClick={toggleLanguage}
        aria-label="Toggle Language"
        style={{
          position: "fixed",
          right: "18px",
          top: "18px",
          zIndex: 60,
          padding: "8px 12px",
          borderRadius: "10px",
          background: "rgba(255, 255, 255, 0.9)",
          border: "1px solid rgba(11, 24, 40, 0.04)",
          boxShadow: "0 6px 20px rgba(11, 24, 40, 0.04)",
        }}
      >
        <span
          className="lang-en"
          style={{ display: currentLang === "en" ? "inline" : "none" }}
        >
          عربي
        </span>
        <span
          className="lang-ar"
          style={{ display: currentLang === "ar" ? "inline" : "none" }}
        >
          English
        </span>
      </button>

      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`} id="navbar">
        <div className="nav-container container">
          <a href="#home" className="logo" aria-label="WATEEN Production">
            <img src="wateenlogo.png" alt="WATEEN logo" className="logo-img" />
          </a>

          <ul className="nav-links" role="menubar" aria-label="Main Navigation">
            <li>
              <a href="#home" data-en="Home" data-ar="الرئيسية">
                {currentLang === "en" ? "Home" : "الرئيسية"}
              </a>
            </li>
            <li>
              <a href="#about" data-en="About" data-ar="من نحن">
                {currentLang === "en" ? "About" : "من نحن"}
              </a>
            </li>
            <li>
              <a href="#services" data-en="Services" data-ar="خدماتنا">
                {currentLang === "en" ? "Services" : "خدماتنا"}
              </a>
            </li>
            <li>
              <a href="#why-us" data-en="Why Us" data-ar="لماذا نحن">
                {currentLang === "en" ? "Why Us" : "لماذا نحن"}
              </a>
            </li>
            <li>
              <a href="#clients" data-en="Clients" data-ar="عملاؤنا">
                {currentLang === "en" ? "Clients" : "عملاؤنا"}
              </a>
            </li>
            <li>
              <a href="#contact" data-en="Contact" data-ar="تواصل معنا">
                {currentLang === "en" ? "Contact" : "تواصل معنا"}
              </a>
            </li>
          </ul>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="mobile-menu"
          id="mobileMenu"
          style={{
            display: "block",
            position: "fixed",
            inset: "72px 18px auto 18px",
            zIndex: 70,
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.96)",
              padding: "18px",
              borderRadius: "12px",
              boxShadow: "0 18px 40px rgba(6, 18, 38, 0.08)",
              border: "1px solid rgba(11, 24, 40, 0.04)",
            }}
          >
            <ul
              className="mobile-nav-links"
              style={{ listStyle: "none", margin: 0, padding: 0 }}
            >
              <li>
                <a
                  href="#home"
                  onClick={closeMobileMenu}
                  data-en="Home"
                  data-ar="الرئيسية"
                  style={{ display: "block", padding: "10px 0" }}
                >
                  {currentLang === "en" ? "Home" : "الرئيسية"}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={closeMobileMenu}
                  data-en="About"
                  data-ar="من نحن"
                  style={{ display: "block", padding: "10px 0" }}
                >
                  {currentLang === "en" ? "About" : "من نحن"}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={closeMobileMenu}
                  data-en="Services"
                  data-ar="خدماتنا"
                  style={{ display: "block", padding: "10px 0" }}
                >
                  {currentLang === "en" ? "Services" : "خدماتنا"}
                </a>
              </li>
              <li>
                <a
                  href="#why-us"
                  onClick={closeMobileMenu}
                  data-en="Why Us"
                  data-ar="لماذا نحن"
                  style={{ display: "block", padding: "10px 0" }}
                >
                  {currentLang === "en" ? "Why Us" : "لماذا نحن"}
                </a>
              </li>
              <li>
                <a
                  href="#clients"
                  onClick={closeMobileMenu}
                  data-en="Clients"
                  data-ar="عملاؤنا"
                  style={{ display: "block", padding: "10px 0" }}
                >
                  {currentLang === "en" ? "Clients" : "عملاؤنا"}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={closeMobileMenu}
                  data-en="Contact"
                  data-ar="تواصل معنا"
                  style={{ display: "block", padding: "10px 0" }}
                >
                  {currentLang === "en" ? "Contact" : "تواصل معنا"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
