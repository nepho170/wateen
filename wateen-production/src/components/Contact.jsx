import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const Contact = () => {
  const { currentLang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      currentLang === "ar"
        ? "تم إرسال الرسالة — شكرًا!"
        : "Message sent — thanks!"
    );
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-header">
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
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="contact-details">
                <h4 data-en="Phone" data-ar="الهاتف">
                  {currentLang === "en" ? "Phone" : "الهاتف"}
                </h4>
                <a href="tel:+971566137333">+971 56 613 7333</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-details">
                <h4 data-en="Email" data-ar="البريد الإلكتروني">
                  {currentLang === "en" ? "Email" : "البريد الإلكتروني"}
                </h4>
                <a href="mailto:wateen.ae@hotmail.com">wateen.ae@hotmail.com</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-globe"></i>
              </div>
              <div className="contact-details">
                <h4 data-en="Website" data-ar="الموقع الإلكتروني">
                  {currentLang === "en" ? "Website" : "الموقع الإلكتروني"}
                </h4>
                <a
                  href="https://www.wateenproduction.ae"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.wateenproduction.ae
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form
              className="contact-form"
              id="contactForm"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder=" "
                  value={formData.name}
                  onChange={handleChange}
                />
                <label htmlFor="name" data-en="Your Name" data-ar="اسمك">
                  {currentLang === "en" ? "Your Name" : "اسمك"}
                </label>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                />
                <label
                  htmlFor="email"
                  data-en="Your Email"
                  data-ar="بريدك الإلكتروني"
                >
                  {currentLang === "en" ? "Your Email" : "بريدك الإلكتروني"}
                </label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder=" "
                  value={formData.subject}
                  onChange={handleChange}
                />
                <label htmlFor="subject" data-en="Subject" data-ar="الموضوع">
                  {currentLang === "en" ? "Subject" : "الموضوع"}
                </label>
              </div>
              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  placeholder=" "
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <label
                  htmlFor="message"
                  data-en="Your Message"
                  data-ar="رسالتك"
                >
                  {currentLang === "en" ? "Your Message" : "رسالتك"}
                </label>
              </div>
              <button type="submit" className="btn btn-primary btn-submit">
                <span data-en="Send Message" data-ar="إرسال الرسالة">
                  {currentLang === "en" ? "Send Message" : "إرسال الرسالة"}
                </span>
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
