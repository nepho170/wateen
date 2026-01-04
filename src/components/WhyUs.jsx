import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

/**
 * WhyUs — responsive enhancement:
 * - Desktop: original grid (unchanged)
 * - Mobile: horizontal swipe carousel with arrows + dots + tilt micro-interactions
 *
 * Everything inside each .why-card stays exactly the same (no content removed).
 */

const MOBILE_BREAK = 720;

const WhyUs = () => {
  const { currentLang } = useLanguage();
  const gridRef = useRef(null);
  const cardsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= MOBILE_BREAK : false
  );
  const [activeIdx, setActiveIdx] = useState(0);

  // Resize watcher to toggle mobile mode
  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth <= MOBILE_BREAK;
      setIsMobile(mobile);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Ensure card refs length matches
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, 8); // we have 8 cards
  }, []);

  // Update active dot based on center of viewport
  useEffect(() => {
    if (!isMobile || !gridRef.current) return;
    const grid = gridRef.current;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        // find closest card to center
        const rect = grid.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        let best = 0;
        let bestDist = Infinity;
        cardsRef.current.forEach((c, i) => {
          if (!c) return;
          const r = c.getBoundingClientRect();
          const cardCenter = r.left + r.width / 2;
          const dist = Math.abs(cardCenter - center);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });
        setActiveIdx(best);
        ticking = false;
      });
    };
    grid.addEventListener("scroll", onScroll, { passive: true });
    // initial set
    onScroll();
    return () => grid.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  // Scroll helper to center a card
  const scrollToCard = (index) => {
    const grid = gridRef.current;
    const card = cardsRef.current[index];
    if (!grid || !card) return;
    const offset = card.offsetLeft - (grid.clientWidth - card.offsetWidth) / 2;
    grid.scrollTo({ left: offset, behavior: "smooth" });
    setActiveIdx(index);
  };

  // Small keyboard navigation for accessibility
  useEffect(() => {
    const grid = gridRef.current;
    if (!isMobile || !grid) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollToCard(Math.max(0, activeIdx - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollToCard(Math.min(cardsRef.current.length - 1, activeIdx + 1));
      }
    };
    grid.addEventListener("keydown", onKey);
    return () => grid.removeEventListener("keydown", onKey);
  }, [isMobile, activeIdx]);

  // Tilt micro-interaction (pointermove)
  useEffect(() => {
    if (!isMobile) return; // only enable on mobile to keep desktop static (you said you like it)
    const handlers = [];
    cardsRef.current.forEach((card) => {
      if (!card) return;
      const onPointerMove = (e) => {
        const r = card.getBoundingClientRect();
        const cx = e.clientX - r.left;
        const cy = e.clientY - r.top;
        const px = cx / r.width - 0.5;
        const py = cy / r.height - 0.5;
        const rx = -py * 6;
        const ry = px * 6;
        card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      };
      const onLeave = () => {
        card.style.transform = "";
      };
      card.addEventListener("pointermove", onPointerMove);
      card.addEventListener("pointerleave", onLeave);
      handlers.push({ card, onPointerMove, onLeave });
    });
    return () =>
      handlers.forEach(({ card, onPointerMove, onLeave }) => {
        card.removeEventListener("pointermove", onPointerMove);
        card.removeEventListener("pointerleave", onLeave);
      });
  }, [isMobile]);

  // Auto-center first card on mobile initial mount
  useEffect(() => {
    if (!isMobile) return;
    const t = setTimeout(() => scrollToCard(0), 120);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return (
    <section className="why-us" id="why-us">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span
            className="section-tag"
            data-en="Why Choose Us"
            data-ar="لماذا تختارنا"
          >
            {currentLang === "en" ? "Why Choose Us" : "لماذا تختارنا"}
          </span>
          <h2
            className="section-title"
            data-en="Why WATEEN?"
            data-ar="لماذا وتين؟"
          >
            {currentLang === "en" ? "Why WATEEN?" : "لماذا وتين؟"}
          </h2>
        </div>

        {/* grid / carousel wrapper */}
        <div
          className={`why-grid ${isMobile ? "why-grid--carousel" : ""}`}
          ref={gridRef}
          tabIndex={isMobile ? 0 : -1}
          aria-label={
            currentLang === "en" ? "Why WATEEN carousel" : "لماذا وتين"
          }
        >
          {/* Card 1 */}
          <div
            className="why-card"
            ref={(el) => (cardsRef.current[0] = el)}
            data-aos="fade-right"
          >
            <div className="why-icon">
              <i className="fas fa-flag" aria-hidden="true"></i>
            </div>
            <h3
              data-en="First Emirati AI Production "
              data-ar="أول إنتاج إماراتي بالذكاء الاصطناعي 🇦🇪"
            >
              {currentLang === "en"
                ? "First Emirati AI Production 🇦🇪"
                : "أول إنتاج إماراتي بالذكاء الاصطناعي 🇦🇪"}
            </h3>
            <p
              data-en="First Emirati Production Company engaging AI in our model."
              data-ar="أول شركة إنتاج إماراتية توظف الذكاء الاصطناعي ضمن نموذج عملها لتقديم حلول إعلامية ذكية وقابلة للتوسع."
            >
              {currentLang === "en"
                ? "First Emirati Production Company engaging AI in our model."
                : "أول شركة إنتاج إماراتية توظف الذكاء الاصطناعي ضمن نموذج عملها لتقديم حلول إعلامية ذكية وقابلة للتوسع."}
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="why-card"
            ref={(el) => (cardsRef.current[1] = el)}
            data-aos="fade-right"
          >
            <div className="why-icon">
              <i className="fas fa-landmark" aria-hidden="true"></i>
            </div>
            <h3 data-en="Government Trust �️" data-ar="ثقة حكومية 🏛️">
              {currentLang === "en" ? "Government Trust 🏛️" : "ثقة حكومية 🏛️"}
            </h3>
            <p
              data-en="Trusted by government entities for delivering excellence."
              data-ar="موثوق به من قبل الجهات الحكومية لتقديم معايير عالية في الإنتاج الإعلامي والتواصل العام."
            >
              {currentLang === "en"
                ? "Trusted by government entities for delivering excellence."
                : "موثوق به من قبل الجهات الحكومية لتقديم معايير عالية في الإنتاج الإعلامي والتواصل العام."}
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="why-card"
            ref={(el) => (cardsRef.current[2] = el)}
            data-aos="fade-right"
          >
            <div className="why-icon">
              <i className="fas fa-users" aria-hidden="true"></i>
            </div>
            <h3 data-en="Expert Team 👥" data-ar="فريق خبير 👥">
              {currentLang === "en" ? "Expert Team 👥" : "فريق خبير 👥"}
            </h3>
            <p
              data-en="A team of skilled professionals with extensive industry experience."
              data-ar="فريق من المحترفين المهرة ذوي خبرة عميقة في الصوت والمرئيات والإعلام الرقمي."
            >
              {currentLang === "en"
                ? "A team of skilled professionals with extensive industry experience."
                : "فريق من المحترفين المهرة ذوي خبرة عميقة في الصوت والمرئيات والإعلام الرقمي."}
            </p>
          </div>

          {/* Card 4 */}
          <div
            className="why-card"
            ref={(el) => (cardsRef.current[3] = el)}
            data-aos="fade-right"
          >
            <div className="why-icon">
              <i className="fas fa-check-circle" aria-hidden="true"></i>
            </div>
            <h3 data-en="Long-term Value 💎" data-ar="قيمة طويلة الأمد 💎">
              {currentLang === "en"
                ? "Long-term Value 💎"
                : "قيمة طويلة الأمد 💎"}
            </h3>
            <p
              data-en="Content designed for long-term value, not one-time use."
              data-ar="نصمم المحتوى كأصول إعلامية ذات قيمة طويلة الأمد، وليس للاستخدام لمرة واحدة."
            >
              {currentLang === "en"
                ? "Content designed for long-term value, not one-time use."
                : "نصمم المحتوى كأصول إعلامية ذات قيمة طويلة الأمد، وليس للاستخدام لمرة واحدة."}
            </p>
          </div>

          {/* Card 5 */}
          <div
            className="why-card"
            ref={(el) => (cardsRef.current[4] = el)}
            data-aos="fade-right"
          >
            <div className="why-icon">
              <i className="fas fa-map-marked-alt" aria-hidden="true"></i>
            </div>
            <h3
              data-en="UAE Media Expertise 📺"
              data-ar="خبرة إعلامية إماراتية 📺"
            >
              {currentLang === "en"
                ? "UAE Media Expertise 📺"
                : "خبرة إعلامية إماراتية 📺"}
            </h3>
            <p
              data-en="Strong understanding of UAE media landscape and cultural context."
              data-ar="فهم عميق للمشهد الإعلامي الإماراتي والسياق الثقافي."
            >
              {currentLang === "en"
                ? "Strong understanding of UAE media landscape and cultural context."
                : "فهم عميق للمشهد الإعلامي الإماراتي والسياق الثقافي."}
            </p>
          </div>

          {/* Card 6 */}
          <div
            className="why-card"
            ref={(el) => (cardsRef.current[5] = el)}
            data-aos="fade-right"
          >
            <div className="why-icon">
              <i className="fas fa-book-open" aria-hidden="true"></i>
            </div>
            <h3
              data-en="Strategic Storytelling 📖"
              data-ar="سرد قصصي استراتيجي 📖"
            >
              {currentLang === "en"
                ? "Strategic Storytelling 📖"
                : "سرد قصصي استراتيجي 📖"}
            </h3>
            <p
              data-en="Professional storytelling with strategic depth and purpose."
              data-ar="سرد قصصي احترافي بعمق استراتيجي وهدف واضح."
            >
              {currentLang === "en"
                ? "Professional storytelling with strategic depth and purpose."
                : "سرد قصصي احترافي بعمق استراتيجي وهدف واضح."}
            </p>
          </div>

          {/* Card 7 */}
          <div
            className="why-card"
            ref={(el) => (cardsRef.current[6] = el)}
            data-aos="fade-right"
          >
            <div className="why-icon">
              <i className="fas fa-video" aria-hidden="true"></i>
            </div>
            <h3
              data-en="High-Quality Production �"
              data-ar="إنتاج عالي الجودة 🎥"
            >
              {currentLang === "en"
                ? "High-Quality Production 🎥"
                : "إنتاج عالي الجودة 🎥"}
            </h3>
            <p
              data-en="High-quality audio & visual production with attention to detail."
              data-ar="إنتاج صوتي ومرئي عالي الجودة مع الاهتمام بالتفاصيل."
            >
              {currentLang === "en"
                ? "High-quality audio & visual production with attention to detail."
                : "إنتاج صوتي ومرئي عالي الجودة مع الاهتمام بالتفاصيل."}
            </p>
          </div>

          {/* Card 8 */}
          <div
            className="why-card"
            ref={(el) => (cardsRef.current[7] = el)}
            data-aos="fade-right"
          >
            <div className="why-icon">
              <i className="fas fa-location-arrow" aria-hidden="true"></i>
            </div>
            <h3 data-en="Flexible Solutions 🔄" data-ar="حلول مرنة 🔄">
              {currentLang === "en" ? "Flexible Solutions 🔄" : "حلول مرنة 🔄"}
            </h3>
            <p
              data-en="Flexible on-site & studio solutions tailored to your needs."
              data-ar="حلول مرنة في الموقع والاستوديو مصممة لتلبية احتياجاتك."
            >
              {currentLang === "en"
                ? "Flexible on-site & studio solutions tailored to your needs."
                : "حلول مرنة في الموقع والاستوديو مصممة لتلبية احتياجاتك."}
            </p>
          </div>
        </div>

        {/* Controls (mobile only) */}
        {isMobile && (
          <div
            className="why-controls"
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
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <button
                  key={i}
                  className={`svc-dot ${i === activeIdx ? "active" : ""}`}
                  onClick={() => scrollToCard(i)}
                  aria-label={`${i + 1} ${
                    currentLang === "en" ? "service" : "خدمة"
                  }`}
                  role="tab"
                  aria-selected={i === activeIdx}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyUs;
