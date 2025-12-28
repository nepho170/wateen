import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const About = () => {
  const { currentLang } = useLanguage();

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-tag" data-en="Who We Are" data-ar="من نحن">
            {currentLang === "en" ? "Who We Are" : "من نحن"}
          </span>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p
              className="about-description"
              data-en="WATEEN is an Emirati creative production establishment specializing in podcasting, social media coverage, commercials"
              data-ar="وتين هي مؤسسة إماراتية للإنتاج الإبداعي، متخصصة في صناعة البودكاست، والتغطية الإعلامية عبر وسائل التواصل الاجتماعي، وإنتاج المحتوى البصري المؤثر عالي الجودة."
            >
              {currentLang === "en"
                ? "WATEEN is an Emirati creative production establishment specializing in podcasting, social media coverage, commercials, and high-impact visual content."
                : "وتين هي مؤسسة إماراتية للإنتاج الإبداعي، متخصصة في صناعة البودكاست، والتغطية الإعلامية عبر وسائل التواصل الاجتماعي، وإنتاج المحتوى البصري المؤثر عالي الجودة."}
            </p>
            <p
              className="about-description"
              data-en="We help organizations, government entities, and brands communicate their message with clarity, credibility, and creativity across digital and traditional platforms."
              data-ar="نساعد المؤسسات والجهات الحكومية والعلامات التجارية على إيصال رسالتهم بوضوح ومصداقية وإبداع عبر المنصات الرقمية والتقليدية."
            >
              {currentLang === "en"
                ? "We help organizations, government entities, and brands communicate their message with clarity, credibility, and creativity."
                : "نساعد المؤسسات والجهات الحكومية والعلامات التجارية على إيصال رسالتهم بوضوح ومصداقية وإبداع عبر المنصات الرقمية والتقليدية."}
            </p>
            <p
              className="about-description highlight"
              data-en="With a strong focus on latest AI technologies, updated market tools and topics, WATEEN transforms ideas into engaging media experiences that build trust, enhance visibility, and strengthen public connection."
              data-ar="مع التركيز القوي على أحدث تقنيات الذكاء الاصطناعي، وأدوات السوق المحدثة والموضوعات المعاصرة، يحول وتين الأفكار إلى تجارب إعلامية جذابة تبني الثقة وتعزز الحضور وتقوي التواصل مع الجمهور."
            >
              {currentLang === "en"
                ? "With a strong focus on latest AI technologies, updated market tools and topics, WATEEN transforms ideas into engaging media experiences."
                : "مع التركيز القوي على أحدث تقنيات الذكاء الاصطناعي، وأدوات السوق المحدثة والموضوعات المعاصرة، يحول وتين الأفكار إلى تجارب إعلامية جذابة تبني الثقة وتعزز الحضور وتقوي التواصل مع الجمهور."}
            </p>
          </div>

          <div className="about-visual">
            <div
              className="visual-card"
              role="region"
              aria-label={currentLang === "en" ? "Our Vision" : "رؤيتنا"}
            >
              <div className="visual-icon" aria-hidden="true">
                {/* Lightbulb SVG (inline, reliable) */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M9 18h6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 22h4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 3a6 6 0 00-4 10v1a2 2 0 002 2h4a2 2 0 002-2v-1a6 6 0 00-4-10z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 data-en="Our Vision" data-ar="رؤيتنا">
                {currentLang === "en" ? "Our Vision" : "رؤيتنا"}
              </h3>
              <p
                data-en="To become the leading media production and podcasting house in the UAE, known for creating meaningful, influential, and future-ready content that amplifies voices and builds lasting impact."
                data-ar="أن نكون من روّاد بيوت الإنتاج الإعلامي وصناعة البودكاست في دولة الإمارات العربية المتحدة والوطن العربي، ومعروفين بابتكار محتوى هادف، مؤثر، ومواكب للمستقبل، يصنع الأصوات ويترك أثرًا مستدامًا."
              >
                {currentLang === "en"
                  ? "To become the leading media production and podcasting house in the UAE, known for creating meaningful, influential, and future-ready content that amplifies voices and builds lasting impact."
                  : "أن نكون من روّاد بيوت الإنتاج الإعلامي وصناعة البودكاست في دولة الإمارات العربية المتحدة والوطن العربي، ومعروفين بابتكار محتوى هادف، مؤثر، ومواكب للمستقبل، يصنع الأصوات ويترك أثرًا مستدامًا."}
              </p>
            </div>

            <div
              className="visual-card"
              role="region"
              aria-label={currentLang === "en" ? "Our Mission" : "مهمتنا"}
            >
              <div className="visual-icon" aria-hidden="true">
                {/* Bullseye SVG */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                </svg>
              </div>
              <h3 data-en="Our Mission" data-ar="مهمتنا">
                {currentLang === "en" ? "Our Mission" : "مهمتنا"}
              </h3>
              <p
                data-en="To empower institutions and brands by delivering professional podcasting, visual production, and social media coverage services that combine creativity, strategy, and technical excellence—aligned with UAE values and global media standards."
                data-ar="تمكين المؤسسات والعلامات التجارية من خلال تقديم خدمات احترافية في صناعة البودكاست، والإنتاج المرئي، والتغطية الإعلامية عبر وسائل التواصل الاجتماعي، تجمع بين الإبداع والاستراتيجية والتميز التقني، وبما يتماشى مع قيم دولة الإمارات والمعايير الإعلامية العالمية."
              >
                {currentLang === "en"
                  ? "Empowering institutions and brands with professional podcasting, visual production and social media coverage—combining creativity, strategy and technical excellence."
                  : "تمكين المؤسسات والعلامات التجارية من خلال تقديم خدمات احترافية في صناعة البودكاست، والإنتاج المرئي، والتغطية الإعلامية عبر وسائل التواصل الاجتماعي، تجمع بين الإبداع والاستراتيجية والتميز التقني، وبما يتماشى مع قيم دولة الإمارات والمعايير الإعلامية العالمية."}
              </p>
            </div>

            <div
              style={{
                marginTop: "12px",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/hero.png`}
                alt="Studio session"
                style={{
                  width: "100%",
                  display: "block",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
