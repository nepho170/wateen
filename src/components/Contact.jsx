import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

/**
 * Contact — Clean contact section with fixed background
 * - No form, just contact info and CTA
 * - Fixed background image with overlay
 */

const Contact = () => {
  const { currentLang } = useLanguage();

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span
            className="section-tag"
            data-en="Get in Touch"
            data-ar="تواصل معنا"
          >
            {currentLang === "en" ? "Get in Touch" : "تواصل معنا"}
          </span>
          <h2 className="section-title" data-en="Contact Us" data-ar="اتصل بنا">
            {currentLang === "en" ? "Contact Us" : "اتصل بنا"}
          </h2>
        </div>

        <div className="contact-content">
          {/* Contact info column (cards) */}
          <div
            className="contact-info"
            style={{ textAlign: currentLang === "en" ? "left" : "right" }}
            aria-label={
              currentLang === "en" ? "Contact information" : "معلومات الاتصال"
            }
          >
            <div className="contact-item" data-aos="fade-right">
              <div className="contact-icon" aria-hidden="true">
                {/* Phone SVG */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.9.37 1.76.72 2.56a2 2 0 0 1-.45 2.11L8.91 9.91a14 14 0 0 0 6 6l1.5-1.5a2 2 0 0 1 2.11-.45c.8.35 1.66.6 2.56.72A2 2 0 0 1 22 16.92z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                className="contact-details"
                style={{ textAlign: currentLang === "en" ? "left" : "right" }}
              >
                <h4 data-en="Phone" data-ar="الهاتف">
                  {currentLang === "en" ? "Phone" : "الهاتف"}
                </h4>
                <a href="tel:+971566137333" dir="ltr">
                  +971 56 613 7333
                </a>
              </div>
            </div>

            <div className="contact-item" data-aos="fade-right">
              <div className="contact-icon" aria-hidden="true">
                {/* Envelope SVG */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M3 8.5v7.5A2 2 0 0 0 5 18h14a2 2 0 0 0 2-2V8.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 6.5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2V7l9 6 9-6V6.5z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                className="contact-details"
                style={{ textAlign: currentLang === "en" ? "left" : "right" }}
              >
                <h4 data-en="Email" data-ar="البريد الإلكتروني">
                  {currentLang === "en" ? "Email" : "البريد الإلكتروني"}
                </h4>
                <a href="mailto:wateen.ae@hotmail.com" dir="ltr">
                  wateen.ae@hotmail.com
                </a>
              </div>
            </div>

            <div className="contact-item" data-aos="fade-right">
              <div className="contact-icon" aria-hidden="true">
                {/* Globe SVG */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.05 12H21.95"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 2.05c2.5 2.3 3.3 5.9 3.6 9.95M12 21.95c-2.5-2.3-3.3-5.9-3.6-9.95"
                    stroke="currentColor"
                    strokeWidth="1.0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                className="contact-details"
                style={{ textAlign: currentLang === "en" ? "left" : "right" }}
              >
                <h4 data-en="Website" data-ar="الموقع الإلكتروني">
                  {currentLang === "en" ? "Website" : "الموقع الإلكتروني"}
                </h4>
                <a
                  href="https://www.wateenproduction.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                >
                  www.wateenproduction.com
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="contact-form-wrapper" data-aos="fade-left">
            <div
              className="contact-cta-box"
              style={{
                background:
                  "linear-gradient(135deg, rgba(46, 62, 82, 0.95), rgba(26, 34, 44, 0.95))",
                borderRadius: "16px",
                padding: "48px 36px",
                textAlign: "center",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div style={{ marginBottom: "24px" }}>
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{
                    margin: "0 auto",
                    display: "block",
                    color: "#3498db",
                  }}
                >
                  <path
                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <h3
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  marginBottom: "16px",
                  color: "#ffffff",
                }}
              >
                {currentLang === "en"
                  ? "Let's Start a Conversation"
                  : "لنبدأ محادثة"}
              </h3>

              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "1.7",
                  color: "rgba(255, 255, 255, 0.85)",
                  marginBottom: "32px",
                  maxWidth: "420px",
                  margin: "0 auto 32px",
                }}
              >
                {currentLang === "en"
                  ? "Ready to transform your ideas into compelling media? Reach out via phone or email and let's create something exceptional together."
                  : "هل أنت مستعد لتحويل أفكارك إلى محتوى إعلامي مميز؟ تواصل معنا عبر الهاتف أو البريد الإلكتروني ولنصنع شيئًا استثنائيًا معًا."}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="tel:+971566137333"
                  className="btn btn-primary"
                  style={{ minWidth: "160px" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ marginRight: "8px", verticalAlign: "middle" }}
                  >
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.9.37 1.76.72 2.56a2 2 0 0 1-.45 2.11L8.91 9.91a14 14 0 0 0 6 6l1.5-1.5a2 2 0 0 1 2.11-.45c.8.35 1.66.6 2.56.72A2 2 0 0 1 22 16.92z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {currentLang === "en" ? "Call Us" : "اتصل بنا"}
                </a>

                <a
                  href="mailto:wateen.ae@hotmail.com"
                  className="btn btn-secondary"
                  style={{ minWidth: "160px" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ marginRight: "8px", verticalAlign: "middle" }}
                  >
                    <path
                      d="M3 8.5v7.5A2 2 0 0 0 5 18h14a2 2 0 0 0 2-2V8.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 6.5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2V7l9 6 9-6V6.5z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {currentLang === "en" ? "Email Us" : "راسلنا"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
