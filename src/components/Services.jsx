import React, { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const Services = () => {
  const { currentLang } = useLanguage();
  useEffect(() => {
    /* -------------------------
       Services carousel helper logic
       Migrated from vanilla JS to useEffect
    ------------------------- */
    const servicesGrid = document.querySelector(".services-grid");
    if (!servicesGrid) return;

    // Add tilt attribute to cards
    const cards = Array.from(servicesGrid.querySelectorAll(".service-card"));
    cards.forEach((c) => c.setAttribute("data-tilt", "true"));

    // Create controls only on small screens
    const createControlsIfNeeded = () => {
      // Remove existing controls to avoid duplication on re-renders
      const existing = document.querySelector(".services-controls-wrapper");
      if (existing) existing.remove();

      if (window.matchMedia("(max-width: 720px)").matches) {
        const wrapper = document.createElement("div");
        wrapper.className = "services-controls-wrapper container";
        Object.assign(wrapper.style, {
          padding: "0 20px",
          marginTop: "6px",
          textAlign: "center",
        });

        // Dots container
        const dotsWrap = document.createElement("div");
        dotsWrap.className = "services-controls";
        dotsWrap.setAttribute("role", "tablist");

        // Append elements
        wrapper.appendChild(dotsWrap);

        // Insert after services section
        const servicesSection = document.querySelector("#services .container");
        if (servicesSection) {
          servicesSection.parentNode.insertBefore(
            wrapper,
            servicesSection.nextSibling
          );
        }

        // Create dots
        cards.forEach((card, i) => {
          const dot = document.createElement("button");
          dot.className = "svc-dot";
          dot.setAttribute(
            "aria-label",
            `${i + 1} ${window.currentLang === "ar" ? "خدمة" : "service"}`
          );
          dot.setAttribute("data-index", i);
          dot.addEventListener("click", () => scrollToCard(i));
          dotsWrap.appendChild(dot);
        });

        // Update active dot on scroll
        const updateActiveDot = () => {
          const gridRect = servicesGrid.getBoundingClientRect();
          const gridCenter = gridRect.left + gridRect.width / 2;
          let closest = 0;
          let closestDist = Infinity;
          cards.forEach((c, idx) => {
            const r = c.getBoundingClientRect();
            const dist = Math.abs(r.left + r.width / 2 - gridCenter);
            if (dist < closestDist) {
              closestDist = dist;
              closest = idx;
            }
          });
          const dots = dotsWrap.querySelectorAll(".svc-dot");
          dots.forEach((d) => d.classList.remove("active"));
          if (dots[closest]) dots[closest].classList.add("active");
        };

        const throttle = (fn, wait) => {
          let last = 0;
          return (...args) => {
            const now = Date.now();
            if (now - last >= wait) {
              last = now;
              fn(...args);
            }
          };
        };

        servicesGrid.addEventListener(
          "scroll",
          throttle(updateActiveDot, 120),
          {
            passive: true,
          }
        );
        updateActiveDot();

        // Scroll helpers
        const scrollToCard = (index) => {
          const card = cards[index];
          if (!card) return;
          const offset =
            card.offsetLeft +
            card.offsetWidth / 2 -
            servicesGrid.clientWidth / 2;
          servicesGrid.scrollTo({ left: offset, behavior: "smooth" });
        };

        window.addEventListener("resize", throttle(updateActiveDot, 200));
      }
    };

    // Initialize logic
    createControlsIfNeeded();
    const mediaQuery = window.matchMedia("(max-width: 720px)");
    mediaQuery.addEventListener("change", createControlsIfNeeded);

    // 3D Tilt Effect & Interactions
    const handlePointerMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const px = cx / rect.width - 0.5;
      const py = cy / rect.height - 0.5;
      const rx = -py * 6;
      const ry = px * 6;
      card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    };

    const handlePointerLeave = (e) => {
      e.currentTarget.style.transform = "";
    };

    const handlePointerDown = (e) => {
      e.currentTarget.style.transform += " translateY(-6px)";
    };

    const handlePointerUp = (e) => {
      e.currentTarget.style.transform = "";
    };

    cards.forEach((card) => {
      card.addEventListener("pointermove", handlePointerMove);
      card.addEventListener("pointerleave", handlePointerLeave);
      card.addEventListener("pointerdown", handlePointerDown);
      card.addEventListener("pointerup", handlePointerUp);
    });

    // Cleanup function
    return () => {
      mediaQuery.removeEventListener("change", createControlsIfNeeded);
      cards.forEach((card) => {
        card.removeEventListener("pointermove", handlePointerMove);
        card.removeEventListener("pointerleave", handlePointerLeave);
        card.removeEventListener("pointerdown", handlePointerDown);
        card.removeEventListener("pointerup", handlePointerUp);
      });
      const existing = document.querySelector(".services-controls-wrapper");
      if (existing) existing.remove();
    };
  }, []);

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span
            className="section-tag"
            data-en="What We Offer"
            data-ar="ما نقدمه"
          >
            {currentLang === "en" ? "What We Offer" : "ما نقدمه"}
          </span>
          <h2
            className="section-title"
            data-en="Our Services"
            data-ar="خدماتنا"
          >
            {currentLang === "en" ? "Our Services" : "خدماتنا"}
          </h2>
        </div>

        <div className="services-grid">
          {/* Podcast Production */}
          <div className="service-card" data-aos="fade-up">
            <img
              src="herosection.png"
              alt="Podcast production"
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "12px",
              }}
            />
            <div className="service-icon">
              <i className="fas fa-podcast"></i>
            </div>
            <h3 data-en="Podcast Production" data-ar="إنتاج البودكاست">
              {currentLang === "en" ? "Podcast Production" : "إنتاج البودكاست"}
            </h3>
            <p
              data-en="Complete podcast production services, from concept to distribution — we build long-term media assets."
              data-ar="خدمات إنتاج بودكاست متكاملة — تطوير الفكرة والاسم، استراتيجية المحتوى، تخطيط الحلقات، تسجيل احترافي داخل الاستوديو وفي المواقع، إنتاج صوتي ومرئي، كتابة النصوص، المونتاج وتصميم الصوت، بناء الهوية، النشر على منصات البودكاست، إنتاج مقاطع ترويجية وتحليل الأداء واستراتيجيات النمو."
            >
              {currentLang === "en"
                ? "Complete podcast production services, from concept to distribution — we build long-term media assets."
                : "خدمات إنتاج بودكاست متكاملة — تطوير الفكرة والاسم، استراتيجية المحتوى، تخطيط الحلقات، تسجيل احترافي داخل الاستوديو وفي المواقع، إنتاج صوتي ومرئي، كتابة النصوص، المونتاج وتصميم الصوت، بناء الهوية، النشر على منصات البودكاست، إنتاج مقاطع ترويجية وتحليل الأداء واستراتيجيات النمو."}
            </p>
          </div>

          {/* Social Media Coverage */}
          <div className="service-card" data-aos="fade-up">
            <img
              src="herosection.png"
              alt="Social media coverage"
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "12px",
              }}
            />
            <div className="service-icon">
              <i className="fas fa-share-nodes"></i>
            </div>
            <h3 data-en="Social Media Coverage" data-ar="تغطية وسائل التواصل">
              {currentLang === "en"
                ? "Social Media Coverage"
                : "تغطية وسائل التواصل"}
            </h3>
            <p
              data-en="Professional event coverage and short-form content tailored for social platforms and campaigns."
              data-ar="تغطية احترافية للفعاليات (صوت، فيديو، ريلز)، محتوى قصير لمنصات إنستغرام/تيك توك/لينكدإن/X، سرد خلف الكواليس، فيديوهات ملخصة وأبرز اللقطات، ريلز مع علامة تجارية، تقاويم محتوى متوافقة مع الحملات، وعناوين ونصوص استراتيجية."
            >
              {currentLang === "en"
                ? "Professional event coverage and short-form content tailored for social platforms and campaigns."
                : "تغطية احترافية للفعاليات (صوت، فيديو، ريلز)، محتوى قصير لمنصات إنستغرام/تيك توك/لينكدإن/X، سرد خلف الكواليس، فيديوهات ملخصة وأبرز اللقطات، ريلز مع علامة تجارية، تقاويم محتوى متوافقة مع الحملات، وعناوين ونصوص استراتيجية."}
            </p>
          </div>

          {/* Commercial Production */}
          <div className="service-card" data-aos="fade-up">
            <img
              src="herosection.png"
              alt="Commercial production"
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "12px",
              }}
            />
            <div className="service-icon">
              <i className="fas fa-film"></i>
            </div>
            <h3 data-en="Commercial Production" data-ar="إنتاج الإعلانات">
              {currentLang === "en"
                ? "Commercial Production"
                : "إنتاج الإعلانات"}
            </h3>
            <p
              data-en="High-quality commercials that capture attention and deliver your message."
              data-ar="فيديوهات إعلانية عالية الجودة: التخطيط قبل التصوير، المفهوم الإبداعي، التصوير والمونتاج والتسليم بما يتناسب مع استراتيجية العلامة التجارية."
            >
              {currentLang === "en"
                ? "High-quality commercials that capture attention and deliver your message."
                : "فيديوهات إعلانية عالية الجودة: التخطيط قبل التصوير، المفهوم الإبداعي، التصوير والمونتاج والتسليم بما يتناسب مع استراتيجية العلامة التجارية."}
            </p>
          </div>

          {/* Visual Content */}
          <div className="service-card" data-aos="fade-up">
            <img
              src="herosection.png"
              alt="Visual content"
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "12px",
              }}
            />
            <div className="service-icon">
              <i className="fas fa-camera"></i>
            </div>
            <h3 data-en="Visual Content" data-ar="المحتوى المرئي">
              {currentLang === "en" ? "Visual Content" : "المحتوى المرئي"}
            </h3>
            <p
              data-en="Visual assets that tell your story and connect emotionally."
              data-ar="سرد بصري مذهل، مقاطع سينمائية، ريلز ملخصة وأصول مرئية طويلة الأمد تهدف للتواصل العاطفي مع الجمهور."
            >
              {currentLang === "en"
                ? "Visual assets that tell your story and connect emotionally."
                : "سرد بصري مذهل، مقاطع سينمائية، ريلز ملخصة وأصول مرئية طويلة الأمد تهدف للتواصل العاطفي مع الجمهور."}
            </p>
          </div>

          {/* AI-Powered Solutions */}
          <div className="service-card featured" data-aos="fade-up">
            <img
              src="herosection.png"
              alt="AI solutions"
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "12px",
              }}
            />
            <div className="service-badge" data-en="NEW" data-ar="جديد">
              {currentLang === "en" ? "NEW" : "جديد"}
            </div>
            <div className="service-icon">
              <i className="fas fa-robot"></i>
            </div>
            <h3 data-en="AI-Powered Solutions" data-ar="حلول الذكاء الاصطناعي">
              {currentLang === "en"
                ? "AI-Powered Solutions"
                : "حلول الذكاء الاصطناعي"}
            </h3>
            <p
              data-en="AI tools integrated into production to optimize quality and scale."
              data-ar="استخدام أحدث تقنيات الذكاء الاصطناعي لتعزيز إنشاء المحتوى، أتمتة العمل، تحسين استراتيجيات التوزيع واستخراج رؤى نمو."
            >
              {currentLang === "en"
                ? "AI tools integrated into production to optimize quality and scale."
                : "استخدام أحدث تقنيات الذكاء الاصطناعي لتعزيز إنشاء المحتوى، أتمتة العمل، تحسين استراتيجيات التوزيع واستخراج رؤى نمو."}
            </p>
          </div>

          {/* Media Consulting */}
          <div className="service-card" data-aos="fade-up">
            <img
              src="herosection.png"
              alt="Consulting"
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "12px",
              }}
            />
            <div className="service-icon">
              <i className="fas fa-comments"></i>
            </div>
            <h3 data-en="Media Consulting" data-ar="استشارات إعلامية">
              {currentLang === "en" ? "Media Consulting" : "استشارات إعلامية"}
            </h3>
            <p
              data-en="Strategy, planning and measurement to amplify your media impact."
              data-ar="إرشاد خبير حول استراتيجية الإعلام، تخطيط المحتوى، تحسين القنوات وقياس الحملات لتعظيم الأثر."
            >
              {currentLang === "en"
                ? "Strategy, planning and measurement to amplify your media impact."
                : "إرشاد خبير حول استراتيجية الإعلام، تخطيط المحتوى، تحسين القنوات وقياس الحملات لتعظيم الأثر."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
