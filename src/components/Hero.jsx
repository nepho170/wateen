import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

/**
 * Hero.jsx - Fixed Infinite Carousel
 * - Always shows 3 cards side by side
 * - Seamless infinite loop with no gaps
 */

const Hero = () => {
  const { currentLang } = useLanguage();

  const cards = [
    {
      key: "creative-vision",
      titleEn: "Creative Vision",
      titleAr: "رؤية إبداعية",
      descEn: "From concept to delivery, we bring your story to life.",
      descAr: "من الفكرة إلى التنفيذ، نحيي قصتك.",
      img: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=800&auto=format&fit=crop",
    },
    {
      key: "media-excellence",
      titleEn: "Media Excellence",
      titleAr: "التميز الإعلامي",
      descEn: "High-quality production across all platforms.",
      descAr: "إنتاج عالي الجودة عبر جميع المنصات.",
      img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800&auto=format&fit=crop",
    },
    {
      key: "your-partner",
      titleEn: "Your Partner",
      titleAr: "شريكك",
      descEn: "Building lasting media assets for your brand.",
      descAr: "بناء أصول إعلامية دائمة لعلامتك.",
      img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop",
    },
  ];

  // Logical index for dots (0-2)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Clone cards multiple times for seamless looping
  // We need at least 2x the original to ensure smooth transitions
  const extendedCards = [...cards, ...cards, ...cards];

  const wrapperRef = useRef(null);
  const stripRef = useRef(null);
  const animatingRef = useRef(false);
  const pauseRef = useRef(false);

  // Start in the middle set (index 3 = first card of second set)
  const [slideIndex, setSlideIndex] = useState(cards.length);

  // Get card width + gap
  const getSlideWidth = () => {
    const firstCard = stripRef.current?.querySelector(".circ-card");
    if (!firstCard) return 0;
    const rect = firstCard.getBoundingClientRect();
    return rect.width + 16; // 16px gap from CSS
  };

  // Move to next slide
  const goNext = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    setSlideIndex((prev) => prev + 1);
    setCurrentIndex((prev) => (prev + 1) % cards.length);

    setTimeout(() => {
      const strip = stripRef.current;
      // If we've moved past the middle set, reset to the beginning of middle set
      if (slideIndex + 1 >= cards.length * 2) {
        strip.style.transition = "none";
        setSlideIndex(cards.length);
        setTimeout(() => {
          strip.style.transition = "";
          animatingRef.current = false;
        }, 50);
      } else {
        animatingRef.current = false;
      }
    }, 600);
  }, [slideIndex, cards.length]);

  // Move to previous slide
  const goPrev = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    setSlideIndex((prev) => prev - 1);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);

    setTimeout(() => {
      const strip = stripRef.current;
      // If we've moved before the middle set, reset to the end of middle set
      if (slideIndex - 1 < cards.length) {
        strip.style.transition = "none";
        setSlideIndex(cards.length * 2 - 1);
        setTimeout(() => {
          strip.style.transition = "";
          animatingRef.current = false;
        }, 50);
      } else {
        animatingRef.current = false;
      }
    }, 600);
  }, [slideIndex, cards.length]);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      if (!pauseRef.current) goNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [goNext]);

  // Pause on hover
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onEnter = () => (pauseRef.current = true);
    const onLeave = () => (pauseRef.current = false);

    wrapper.addEventListener("mouseenter", onEnter);
    wrapper.addEventListener("mouseleave", onLeave);

    return () => {
      wrapper.removeEventListener("mouseenter", onEnter);
      wrapper.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        pauseRef.current = true;
        goNext();
        setTimeout(() => (pauseRef.current = false), 2000);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        pauseRef.current = true;
        goPrev();
        setTimeout(() => (pauseRef.current = false), 2000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  // Drag
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    let startX = 0;
    let isDragging = false;
    let currentTranslate = 0;
    let prevTranslate = 0;

    const getPositionX = (e) =>
      e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;

    const onStart = (e) => {
      startX = getPositionX(e);
      isDragging = true;
      pauseRef.current = true;
      const slideWidth = getSlideWidth();
      const isRTL = currentLang === "ar";
      prevTranslate = isRTL
        ? slideIndex * slideWidth
        : -slideIndex * slideWidth;
      strip.style.transition = "none";
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const currentX = getPositionX(e);
      const diff = currentX - startX;
      currentTranslate = prevTranslate + diff;
      strip.style.transform = `translateX(${currentTranslate}px)`;
    };

    const onEnd = () => {
      if (!isDragging) return;
      isDragging = false;

      const slideWidth = getSlideWidth();
      const movedBy = currentTranslate - prevTranslate;
      const isRTL = currentLang === "ar";

      strip.style.transition =
        "transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)";

      // In RTL: swipe right = next, swipe left = prev (opposite of LTR)
      if (isRTL) {
        if (movedBy > slideWidth / 4) {
          goNext();
        } else if (movedBy < -slideWidth / 4) {
          goPrev();
        } else {
          strip.style.transform = `translateX(${slideIndex * slideWidth}px)`;
        }
      } else {
        if (movedBy < -slideWidth / 4) {
          goNext();
        } else if (movedBy > slideWidth / 4) {
          goPrev();
        } else {
          strip.style.transform = `translateX(${-slideIndex * slideWidth}px)`;
        }
      }

      setTimeout(() => (pauseRef.current = false), 1000);
    };

    strip.addEventListener("mousedown", onStart);
    strip.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchend", onEnd);

    return () => {
      strip.removeEventListener("mousedown", onStart);
      strip.removeEventListener("touchstart", onStart);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchend", onEnd);
    };
  }, [slideIndex, currentLang, goNext, goPrev]);

  // Dot click
  const onDotClick = (index) => {
    if (index === currentIndex) return;
    pauseRef.current = true;

    setSlideIndex(cards.length + index);
    setCurrentIndex(index);

    setTimeout(() => (pauseRef.current = false), 1000);
  };

  // Calculate transform with RTL support
  const slideWidth = getSlideWidth();
  const isRTL = currentLang === "ar";
  const transformValue = isRTL
    ? slideIndex * slideWidth
    : -slideIndex * slideWidth;

  return (
    <section className="hero" id="home" aria-label="Hero Section">
      <div className="container hero-inner">
        <div className="hero-left">
          <h1 className="hero-title" data-aos="fade-up" data-aos-delay="200">
            <span>
              {currentLang === "en" ? "WATEEN Production" : "وتين للإنتاج"}
            </span>
          </h1>

          <p
            className="hero-description"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {currentLang === "en"
              ? "Transforming ideas into engaging media experiences."
              : "نحول الأفكار إلى تجارب إعلامية جذابة."}
          </p>

          <div className="hero-buttons" data-aos="fade-up" data-aos-delay="600">
            <a href="#services" className="btn btn-primary">
              {currentLang === "en" ? "Explore Services" : "استكشف خدماتنا"}{" "}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                aria-hidden="true"
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

            <a href="#contact" className="btn btn-secondary">
              {currentLang === "en" ? "Get in Touch" : "تواصل معنا"}
            </a>
          </div>

          <div
            style={{ marginTop: 20 }}
            data-aos="fade-up"
            data-aos-delay="800"
          >
            <div
              className="circ-carousel"
              ref={wrapperRef}
              tabIndex={0}
              style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}
            >
              <div
                className="circ-strip"
                ref={stripRef}
                style={{
                  transform: `translateX(${transformValue}px)`,
                  transition: animatingRef.current
                    ? "transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                    : "none",
                }}
              >
                {extendedCards.map((card, idx) => {
                  // Center card gets special styling
                  const isCenter = idx === slideIndex;

                  return (
                    <article
                      key={`${card.key}-${idx}`}
                      className={`circ-card ${isCenter ? "is-center" : ""}`}
                    >
                      <img
                        src={card.img}
                        alt={currentLang === "en" ? card.titleEn : card.titleAr}
                        draggable="false"
                      />
                      <div style={{ paddingTop: 8 }}>
                        <h4>
                          {currentLang === "en" ? card.titleEn : card.titleAr}
                        </h4>
                        <p className="muted">
                          {currentLang === "en" ? card.descEn : card.descAr}
                        </p>
                      </div>
                      <button
                        className="play-overlay-btn"
                        aria-label={`Play ${
                          currentLang === "en" ? card.titleEn : card.titleAr
                        }`}
                      >
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M5 3v18l15-9z" fill="currentColor" />
                        </svg>
                      </button>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="hero-dots" style={{ marginTop: 12 }}>
              {cards.map((_, i) => (
                <button
                  key={i}
                  className={`hero-dot ${i === currentIndex ? "active" : ""}`}
                  onClick={() => onDotClick(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
