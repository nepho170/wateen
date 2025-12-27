import React, { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const Clients = () => {
  const { currentLang } = useLanguage();

  useEffect(() => {
    /* -------------------------
       Clients carousel helper logic
       Adapted from Services carousel
    ------------------------- */
    const clientsGrid = document.querySelector(".clients-grid");
    if (!clientsGrid) return;

    // Add tilt attribute to cards
    const cards = Array.from(clientsGrid.querySelectorAll(".client-card"));
    cards.forEach((c) => c.setAttribute("data-tilt", "true"));

    // Create controls only on small screens
    const createControlsIfNeeded = () => {
      // Remove existing controls to avoid duplication on re-renders
      const existing = document.querySelector(".clients-controls-wrapper");
      if (existing) existing.remove();

      if (window.matchMedia("(max-width: 720px)").matches) {
        const wrapper = document.createElement("div");
        wrapper.className = "clients-controls-wrapper container";
        Object.assign(wrapper.style, {
          padding: "0 20px",
          marginTop: "6px",
        });

        // Left arrow
        const left = document.createElement("button");
        left.className = "clt-arrow";
        left.setAttribute("aria-label", "Previous clients");
        left.innerHTML =
          '<i class="fas fa-chevron-left" aria-hidden="true"></i>';
        left.addEventListener("click", () => scrollByCard(-1));

        // Dots container
        const dotsWrap = document.createElement("div");
        dotsWrap.className = "clients-controls";
        dotsWrap.setAttribute("role", "tablist");

        // Right arrow
        const right = document.createElement("button");
        right.className = "clt-arrow";
        right.setAttribute("aria-label", "Next clients");
        right.innerHTML =
          '<i class="fas fa-chevron-right" aria-hidden="true"></i>';
        right.addEventListener("click", () => scrollByCard(1));

        // Append elements
        wrapper.appendChild(left);
        wrapper.appendChild(dotsWrap);
        wrapper.appendChild(right);

        // Insert after clients section
        const clientsSection = document.querySelector("#clients .container");
        if (clientsSection) {
          clientsSection.parentNode.insertBefore(
            wrapper,
            clientsSection.nextSibling
          );
        }

        // Create dots
        cards.forEach((card, i) => {
          const dot = document.createElement("button");
          dot.className = "clt-dot";
          dot.setAttribute(
            "aria-label",
            `${i + 1} ${currentLang === "ar" ? "عميل" : "client"}`
          );
          dot.setAttribute("data-index", i);
          dot.addEventListener("click", () => scrollToCard(i));
          dotsWrap.appendChild(dot);
        });

        // Update active dot on scroll
        const updateActiveDot = () => {
          const gridRect = clientsGrid.getBoundingClientRect();
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
          const dots = dotsWrap.querySelectorAll(".clt-dot");
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

        clientsGrid.addEventListener("scroll", throttle(updateActiveDot, 120), {
          passive: true,
        });
        updateActiveDot();

        // Scroll helpers
        const scrollToCard = (index) => {
          const card = cards[index];
          if (!card) return;
          const offset =
            card.offsetLeft +
            card.offsetWidth / 2 -
            clientsGrid.clientWidth / 2;
          clientsGrid.scrollTo({ left: offset, behavior: "smooth" });
        };

        const scrollByCard = (dir) => {
          const activeIdx = Array.from(
            document.querySelectorAll(".clt-dot")
          ).findIndex((d) => d.classList.contains("active"));
          const target = Math.min(
            cards.length - 1,
            Math.max(0, (activeIdx === -1 ? 0 : activeIdx) + dir)
          );
          scrollToCard(target);
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
      const existing = document.querySelector(".clients-controls-wrapper");
      if (existing) existing.remove();
    };
  }, [currentLang]);

  return (
    <section className="clients" id="clients">
      <div className="container">
        <div className="section-header">
          <span className="section-tag" data-en="Our Clients" data-ar="عملاؤنا">
            {currentLang === "en" ? "Our Clients" : "عملاؤنا"}
          </span>
          <h2
            className="section-title"
            data-en="Who We Serve"
            data-ar="من نخدم"
          >
            {currentLang === "en" ? "Who We Serve" : "من نخدم"}
          </h2>
        </div>

        <div className="clients-grid">
          <div className="client-card">
            <img
              className="client-logo"
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&s=4c3d2b1a0f9e8d7c6b5a4a3b2c1d0e9f"
              alt="Government Entities"
            />
            <div className="client-icon">
              <i className="fas fa-building-columns"></i>
            </div>
            <h3 data-en="Government Entities" data-ar="الجهات الحكومية">
              {currentLang === "en" ? "Government Entities" : "الجهات الحكومية"}
            </h3>
            <p
              data-en="Supporting government communication and public engagement initiatives."
              data-ar="دعم التواصل الحكومي ومبادرات المشاركة العامة."
            >
              {currentLang === "en"
                ? "Supporting government communication and public engagement initiatives."
                : "دعم التواصل الحكومي ومبادرات المشاركة العامة."}
            </p>
          </div>

          <div className="client-card">
            <img
              className="client-logo"
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&s=1d0a3b4c5e6f7a8b9c0d2e3f4a5b6c7d"
              alt="Corporates & Institutions"
            />
            <div className="client-icon">
              <i className="fas fa-briefcase"></i>
            </div>
            <h3 data-en="Corporates & Institutions" data-ar="الشركات والمؤسسات">
              {currentLang === "en"
                ? "Corporates & Institutions"
                : "الشركات والمؤسسات"}
            </h3>
            <p
              data-en="Helping businesses build strong brand presence and visibility."
              data-ar="مساعدة الأعمال في بناء حضور قوي ورؤية في السوق."
            >
              {currentLang === "en"
                ? "Helping businesses build strong brand presence and visibility."
                : "مساعدة الأعمال في بناء حضور قوي ورؤية في السوق."}
            </p>
          </div>

          <div className="client-card">
            <img
              className="client-logo"
              src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&s=7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e"
              alt="Universities & Educational Bodies"
            />
            <div className="client-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h3
              data-en="Universities & Educational Bodies"
              data-ar="الجامعات والهيئات التعليمية"
            >
              {currentLang === "en"
                ? "Universities & Educational Bodies"
                : "الجامعات والهيئات التعليمية"}
            </h3>
            <p
              data-en="Creating educational content that inspires and informs."
              data-ar="إنشاء محتوى تعليمي يلهم ويثقف ويدعم التعلم."
            >
              {currentLang === "en"
                ? "Creating educational content that inspires and informs."
                : "إنشاء محتوى تعليمي يلهم ويثقف ويدعم التعلم."}
            </p>
          </div>

          <div className="client-card">
            <img
              className="client-logo"
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&s=2a6f8b5f0b1f2e9d3c6a8d3e6b5f8a1c"
              alt="NGOs & Social Initiatives"
            />
            <div className="client-icon">
              <i className="fas fa-hands-helping"></i>
            </div>
            <h3
              data-en="NGOs & Social Initiatives"
              data-ar="المنظمات والمبادرات"
            >
              {currentLang === "en"
                ? "NGOs & Social Initiatives"
                : "المنظمات والمبادرات"}
            </h3>
            <p
              data-en="Producing advocacy and storytelling content for impact."
              data-ar="إنتاج محتوى ترويجي وسردي يدعم الرسائل المجتمعية ويعزز المشاركة."
            >
              {currentLang === "en"
                ? "Producing advocacy and storytelling content for impact."
                : "إنتاج محتوى ترويجي وسردي يدعم الرسائل المجتمعية ويعزز المشاركة."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
