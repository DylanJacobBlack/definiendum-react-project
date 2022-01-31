import React, { useState } from "react";

const LangContext = React.createContext({
  language: "¿Conoces a ese chico?",
  changeLanguage: (language) => {},
});

export const LangContextProvider = (props) => {
  const [language, setLanguage] = useState(localStorage.getItem("language"));
  const [enabled, setEnabled] = useState(true);
  const [welcome, setWelcome] = useState(false);

  const changeLanguageHandler = (language) => {
    setLanguage(language);
    localStorage.setItem("language", language);
  };

  const welcomeHandler = () => {
    setWelcome(true);
  }

  const unWelcomeHandler = () => {
    setWelcome(false);
  }

  const disableHandler = () => {
    setEnabled(false);
  };

  const enableHandler = () => {
    setEnabled(true);
  };

  const contextValue = {
    language: language,
    disabled: enabled,
    welcome: welcome,
    changeLanguage: changeLanguageHandler,
    disable: disableHandler,
    enable: enableHandler,
    startWelcome: welcomeHandler,
    endWelcome: unWelcomeHandler
  };

  return (
    <LangContext.Provider value={contextValue}>
      {props.children}
    </LangContext.Provider>
  );
};

export default LangContext;
