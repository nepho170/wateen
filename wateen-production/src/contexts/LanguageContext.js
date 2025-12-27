import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [currentLang, setCurrentLang] = useState('en');

    const toggleLanguage = () => {
        setCurrentLang(prev => prev === 'en' ? 'ar' : 'en');
    };

    return (
        <LanguageContext.Provider value={{ currentLang, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};