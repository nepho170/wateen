import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const Footer = () => {
  const { currentLang } = useLanguage();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo-inline">
              <img
                src="wateenlogo.png"
                alt="WATEEN logo"
                className="logo-img small"
              />
            </div>
            <p
              data-en="Transforming ideas into engaging media experiences."
              data-ar="نحول الأفكار إلى تجارب إعلامية جذابة."
            >
              {currentLang === "en"
                ? "Transforming ideas into engaging media experiences."
                : "نحول الأفكار إلى تجارب إعلامية جذابة."}
            </p>
          </div>

          <div className="footer-links">
            <h4 data-en="Quick Links" data-ar="روابط سريعة">
              {currentLang === "en" ? "Quick Links" : "روابط سريعة"}
            </h4>
            <ul>
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
                <a href="#contact" data-en="Contact" data-ar="تواصل معنا">
                  {currentLang === "en" ? "Contact" : "تواصل معنا"}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-services">
            <h4 data-en="Services" data-ar="خدماتنا">
              {currentLang === "en" ? "Services" : "خدماتنا"}
            </h4>
            <ul>
              <li data-en="Podcast Production" data-ar="إنتاج البودكاست">
                {currentLang === "en"
                  ? "Podcast Production"
                  : "إنتاج البودكاست"}
              </li>
              <li data-en="Social Media" data-ar="وسائل التواصل">
                {currentLang === "en" ? "Social Media" : "وسائل التواصل"}
              </li>
              <li data-en="Commercials" data-ar="الإعلانات">
                {currentLang === "en" ? "Commercials" : "الإعلانات"}
              </li>
              <li data-en="Visual Content" data-ar="المحتوى المرئي">
                {currentLang === "en" ? "Visual Content" : "المحتوى المرئي"}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom" style={{ marginTop: "18px" }}>
          <p>
            © 2025 WATEEN Production.
            <span data-en="All rights reserved." data-ar="جميع الحقوق محفوظة.">
              {currentLang === "en"
                ? "All rights reserved."
                : "جميع الحقوق محفوظة."}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
