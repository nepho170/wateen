import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    // 1. Initialize state by checking localStorage first
    const [currentLang, setCurrentLang] = useState(() => {
        const savedLang = localStorage.getItem('siteLang');
        return savedLang || 'en';
    });

    // 2. Run this every time currentLang changes
    useEffect(() => {
        // Save to storage
        localStorage.setItem('siteLang', currentLang);

        // Update the HTML tag immediately (handles RTL/LTR switching instantly)
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    }, [currentLang]);

    const toggleLanguage = () => {
        setCurrentLang(prev => prev === 'en' ? 'ar' : 'en');
    };

    return (
        <LanguageContext.Provider value={{ currentLang, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};