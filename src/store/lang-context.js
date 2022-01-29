import React, { useState } from "react";

const LangContext = React.createContext({
    language: "¿Conoces a ese chico?",
    changeLanguage: (language) => {},
  });
  
  export const LangContextProvider = (props) => {

    const [language, setLanguage] = useState("Spanish");
    // const selectedLanguage = language;

    const changeLanguageHandler = (language) => {
        setLanguage(language);
    }
  
    const contextValue = {
      language: language,
      changeLanguage: changeLanguageHandler
    };
  
    return (
      <LangContext.Provider value={contextValue}>
        {props.children}
      </LangContext.Provider>
    );
  };
  
  export default LangContext;