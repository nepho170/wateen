import React, { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const Hero = () => {
  const { currentLang } = useLanguage();

  useEffect(() => {
    // Podcast carousel autoplay
    const carousels = document.querySelectorAll(".podcast-carousel");
    carousels.forEach((carousel) => {
      let auto = setInterval(() => {
        carousel.scrollBy({ left: 260, behavior: "smooth" });
      }, 4200);
      carousel.addEventListener("mouseover", () => clearInterval(auto));
      carousel.addEventListener("mouseleave", () => {
        auto = setInterval(() => {
          carousel.scrollBy({ left: 260, behavior: "smooth" });
        }, 4200);
      });
    });
  }, []);

  return (
    <section className="hero" id="home" aria-label="Hero Section">
      <div className="container hero-inner">
        <div className="hero-left">
          <h1 className="hero-title">
            <span data-en="WATEEN Production" data-ar="وتين للإنتاج">
              {currentLang === "en" ? "WATEEN Production" : "وتين للإنتاج"}
            </span>
          </h1>

          <p
            className="hero-description"
            data-en="Transforming ideas into engaging media experiences."
            data-ar="نحول الأفكار إلى تجارب إعلامية جذابة."
          >
            {currentLang === "en"
              ? "Transforming ideas into engaging media experiences."
              : "نحول الأفكار إلى تجارب إعلامية جذابة."}
          </p>

          <div className="hero-buttons">
            <a
              href="#services"
              className="btn btn-primary"
              data-en="Explore Services"
              data-ar="استكشف خدماتنا"
            >
              {currentLang === "en" ? "Explore Services" : "استكشف خدماتنا"}{" "}
              <i className="fas fa-arrow-right"></i>
            </a>
            <a
              href="#contact"
              className="btn btn-secondary"
              data-en="Get in Touch"
              data-ar="تواصل معنا"
            >
              {currentLang === "en" ? "Get in Touch" : "تواصل معنا"}
            </a>
          </div>

          <div style={{ marginTop: "20px" }}>
            <div
              className="section-tag"
              style={{ display: "inline-block", marginBottom: "10px" }}
            >
              Featured
            </div>
            <div
              className="podcast-carousel"
              id="heroCarousel"
              aria-label="Podcast carousel"
            >
              <div className="podcast-card audio-card" tabIndex="0">
                <img
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=9e4c3c5c8a7b7d2a1b1a6a4f6d052d06"
                  alt="Podcast cover 1"
                />
                <div style={{ paddingTop: "8px" }}>
                  <h4>Episode Preview</h4>
                  <p className="muted">
                    Short audio series produced by WATEEN.
                  </p>
                </div>
                <div className="play-overlay" aria-hidden="true">
                  <div className="play-btn">
                    <i className="fas fa-play"></i>
                  </div>
                </div>
              </div>
              <div className="podcast-card audio-card" tabIndex="0">
                <img
                  src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=2a6f8b5f0b1f2e9d3c6a8d3e6b5f8a1c"
                  alt="Podcast cover 2"
                />
                <div style={{ paddingTop: "8px" }}>
                  <h4>Client Series</h4>
                  <p className="muted">A branded podcast example.</p>
                </div>
                <div className="play-overlay" aria-hidden="true">
                  <div className="play-btn">
                    <i className="fas fa-play"></i>
                  </div>
                </div>
              </div>
              <div className="podcast-card audio-card" tabIndex="0">
                <img
                  src="https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3f5f6a6d7f6e7b6b8c7a7d7a6e7f8c9a"
                  alt="Podcast cover 3"
                />
                <div style={{ paddingTop: "8px" }}>
                  <h4>Behind the Scenes</h4>
                  <p className="muted">Short documentaries & highlights.</p>
                </div>
                <div className="play-overlay" aria-hidden="true">
                  <div className="play-btn">
                    <i className="fas fa-play"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
