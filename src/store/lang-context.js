import React, { useState } from "react";

const LangContext = React.createContext({
  language: "¿Conoces a ese chico?",
  changeLanguage: (language) => {},
});

export const LangContextProvider = (props) => {
  const [language, setLanguage] = useState(null);
  const [enabled, setEnabled] = useState(true);

  const changeLanguageHandler = (language) => {
    setLanguage(language);
    localStorage.setItem("language", language);
  };

  const disableHandler = () => {
    setEnabled(false);
  };

  const enableHandler = () => {
    setEnabled(true);
  };

  const contextValue = {
    language: language,
    disabled: enabled,
    changeLanguage: changeLanguageHandler,
    disable: disableHandler,
    enable: enableHandler,
  };

  return (
    <LangContext.Provider value={contextValue}>
      {props.children}
    </LangContext.Provider>
  );
};

export default LangContext;
