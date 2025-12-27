import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Clients from './components/Clients';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function AppContent() {
  const { currentLang } = useLanguage();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="App" dir={currentLang === 'ar' ? 'rtl' : 'ltr'} lang={currentLang}>
      <Nav />
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <Clients />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
