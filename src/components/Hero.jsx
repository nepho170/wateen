import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

/**
 * Updated Hero
 * - keeps all text exactly the same
 * - replaces Font Awesome icons with SVG/Unicode
 * - improved responsive spacing, autoplay carousel, drag-to-swipe, dots, pause-on-interact
 * - accessible play buttons
 */

const Hero = () => {
  const { currentLang } = useLanguage();
  const carouselRef = useRef(null);
  const autoplayRef = useRef(null);
  const isInteractingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardsCount = 3; // keep in sync with number of podcast-card items

  // exposed control helpers used by UI buttons/dots
  const goTo = (idx) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const children = Array.from(carousel.querySelectorAll(".podcast-card"));
    if (!children[idx]) return;
    const target = children[idx];
    const offset =
      target.offsetLeft + target.offsetWidth / 2 - carousel.clientWidth / 2;
    carousel.scrollTo({ left: offset, behavior: "smooth" });
    setActiveIndex(idx);
  };
  const next = () => goTo(Math.min(cardsCount - 1, activeIndex + 1));
  const prev = () => goTo(Math.max(0, activeIndex - 1));

  // Autoplay + drag support
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Autoplay function
    const startAutoplay = () => {
      stopAutoplay();
      autoplayRef.current = setInterval(() => {
        if (isInteractingRef.current) return;
        const nextIndex = (activeIndex + 1) % cardsCount;
        goTo(nextIndex);
      }, 4200);
    };
    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    // Pause on pointer/touch/enter
    const onEnter = () => (isInteractingRef.current = true);
    const onLeave = () => (isInteractingRef.current = false);

    let isDown = false;
    let startX;
    let startScroll;

    const onPointerDown = (e) => {
      isDown = true;
      isInteractingRef.current = true;
      startX = e.pageX ?? (e.touches && e.touches[0]?.pageX) ?? 0;
      startScroll = carousel.scrollLeft;
      carousel.classList.add("dragging");
    };
    const onPointerMove = (e) => {
      if (!isDown) return;
      const x = e.pageX ?? (e.touches && e.touches[0]?.pageX) ?? 0;
      const walk = (startX - x) * 1.0;
      carousel.scrollLeft = startScroll + walk;
    };
    const onPointerUp = () => {
      isDown = false;
      isInteractingRef.current = false;
      carousel.classList.remove("dragging");
      // snap to nearest card
      snapToClosest();
    };

    const snapToClosest = () => {
      const children = Array.from(carousel.querySelectorAll(".podcast-card"));
      if (!children.length) return;
      const center =
        carousel.getBoundingClientRect().left + carousel.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      children.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const cCenter = r.left + r.width / 2;
        const d = Math.abs(cCenter - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      scrollToCard(best);
      setActiveIndex(best);
    };

    const onScroll = () => {
      // update active index (throttled-ish)
      window.requestAnimationFrame(() => {
        const children = Array.from(carousel.querySelectorAll(".podcast-card"));
        if (!children.length) return;
        const center =
          carousel.getBoundingClientRect().left + carousel.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        children.forEach((c, i) => {
          const r = c.getBoundingClientRect();
          const cCenter = r.left + r.width / 2;
          const d = Math.abs(cCenter - center);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setActiveIndex(best);
      });
    };

    // listeners
    carousel.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    carousel.addEventListener("touchstart", onPointerDown, { passive: true });
    carousel.addEventListener("touchmove", onPointerMove, { passive: true });
    carousel.addEventListener("touchend", onPointerUp);
    carousel.addEventListener("mouseenter", onEnter);
    carousel.addEventListener("mouseleave", onLeave);
    carousel.addEventListener("scroll", onScroll, { passive: true });
    carousel.addEventListener("focusin", onEnter);
    carousel.addEventListener("focusout", onLeave);

    // keyboard navigation
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollBy(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollBy(-1);
      }
    };
    carousel.addEventListener("keydown", onKey);

    // start autoplay
    startAutoplay();

    // cleanup
    return () => {
      stopAutoplay();
      carousel.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      carousel.removeEventListener("touchstart", onPointerDown);
      carousel.removeEventListener("touchmove", onPointerMove);
      carousel.removeEventListener("touchend", onPointerUp);
      carousel.removeEventListener("mouseenter", onEnter);
      carousel.removeEventListener("mouseleave", onLeave);
      carousel.removeEventListener("scroll", onScroll);
      carousel.removeEventListener("focusin", onEnter);
      carousel.removeEventListener("focusout", onLeave);
      carousel.removeEventListener("keydown", onKey);
    };

    // helpers
    function scrollBy(dir) {
      const w = carousel.clientWidth;
      carousel.scrollBy({ left: dir * (w * 0.8), behavior: "smooth" });
    }
    function scrollToCard(idx) {
      const children = Array.from(carousel.querySelectorAll(".podcast-card"));
      if (!children[idx]) return;
      const target = children[idx];
      const offset =
        target.offsetLeft + target.offsetWidth / 2 - carousel.clientWidth / 2;
      carousel.scrollTo({ left: offset, behavior: "smooth" });
    }
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
              {/* inline SVG arrow (always reliable) */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
                style={{ marginLeft: 8, verticalAlign: "middle" }}
              >
                <path
                  d="M10 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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
            {/* carousel */}
            <div
              className="podcast-carousel"
              id="heroCarousel"
              aria-label="Podcast carousel"
              ref={carouselRef}
              tabIndex={0}
            >
              {/* card 1 */}
              <div
                className="podcast-card audio-card"
                tabIndex="0"
                role="group"
                aria-label={
                  currentLang === "en"
                    ? "Episode Preview"
                    : "معاينة الحلقة"
                }
              >
                <img
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=9e4c3c5c8a7b7d2a1b1a6a4f6d052d06"
                  alt="Podcast cover 1"
                />
                <div style={{ paddingTop: "8px" }}>
                  <h4 data-en="Episode Preview" data-ar="معاينة الحلقة">
                    {currentLang === "en" ? "Episode Preview" : "معاينة الحلقة"}
                  </h4>
                  <p
                    className="muted"
                    data-en="Short audio series produced by WATEEN."
                    data-ar="سلسلة صوتية قصيرة أنتجتها وتين."
                  >
                    {currentLang === "en"
                      ? "Short audio series produced by WATEEN."
                      : "سلسلة صوتية قصيرة أنتجتها وتين."}
                  </p>
                </div>

                {/* accessible play button (uses inline SVG) */}
                <button
                  className="play-overlay-btn"
                  aria-label={
                    currentLang === "en"
                      ? "Play Episode Preview"
                      : "تشغيل معاينة الحلقة"
                  }
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M5 3v18l15-9z" fill="currentColor" />
                  </svg>
                </button>
              </div>

              {/* card 2 */}
              <div
                className="podcast-card audio-card"
                tabIndex="0"
                role="group"
                aria-label={
                  currentLang === "en"
                    ? "Client Series"
                    : "سلسلة العميل"
                }
              >
                <img
                  src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=2a6f8b5f0b1f2e9d3c6a8d3e6b5f8a1c"
                  alt="Podcast cover 2"
                />
                <div style={{ paddingTop: "8px" }}>
                  <h4 data-en="Client Series" data-ar="سلسلة العميل">
                    {currentLang === "en" ? "Client Series" : "سلسلة العميل"}
                  </h4>
                  <p
                    className="muted"
                    data-en="A branded podcast example."
                    data-ar="مثال على بودكاست مميز."
                  >
                    {currentLang === "en"
                      ? "A branded podcast example."
                      : "مثال على بودكاست مميز."}
                  </p>
                </div>
                <button
                  className="play-overlay-btn"
                  aria-label={
                    currentLang === "en"
                      ? "Play Client Series"
                      : "تشغيل سلسلة العميل"
                  }
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M5 3v18l15-9z" fill="currentColor" />
                  </svg>
                </button>
              </div>

              {/* card 3 */}
              <div
                className="podcast-card audio-card"
                tabIndex="0"
                role="group"
                aria-label={
                  currentLang === "en"
                    ? "Behind the Scenes"
                    : "ما وراء الكواليس"
                }
              >
                <img
                  src="https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3f5f6a6d7f6e7b6b8c7a7d7a6e7f8c9a"
                  alt="Podcast cover 3"
                />
                <div style={{ paddingTop: "8px" }}>
                  <h4 data-en="Behind the Scenes" data-ar="ما وراء الكواليس">
                    {currentLang === "en" ? "Behind the Scenes" : "ما وراء الكواليس"}
                  </h4>
                  <p
                    className="muted"
                    data-en="Short documentaries & highlights."
                    data-ar="وثائقيات قصيرة وأبرز الأحداث."
                  >
                    {currentLang === "en"
                      ? "Short documentaries & highlights."
                      : "وثائقيات قصيرة وأبرز الأحداث."}
                  </p>
                </div>
                <button
                  className="play-overlay-btn"
                  aria-label={
                    currentLang === "en"
                      ? "Play Behind the Scenes"
                      : "تشغيل ما وراء الكواليس"
                  }
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M5 3v18l15-9z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>

            {/* carousel controls (dots only) */}
            <div
              className="podcast-controls"
              aria-hidden={false}
              style={{ marginTop: 12, textAlign: "center" }}
            >
              <div
                className="svc-dots"
                role="tablist"
                style={{
                  display: "inline-flex",
                  gap: 8,
                  margin: "0 12px",
                  verticalAlign: "middle",
                }}
              >
                {Array.from({ length: cardsCount }).map((_, i) => (
                  <button
                    key={i}
                    className={`svc-dot ${i === activeIndex ? "active" : ""}`}
                    onClick={() => goTo(i)}
                    aria-label={`${i + 1} ${
                      currentLang === "en" ? "podcast" : "بودكاست"
                    }`}
                    role="tab"
                    aria-selected={i === activeIndex}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
