import React, { useState } from "react";

const LangContext = React.createContext({
    language: "¿Conoces a ese chico?",
    changeLanguage: (language) => {},
  });
  
  export const LangContextProvider = (props) => {

    const [language, setLanguage] = useState("spanish");
    const [disabled, setDisabled] = useState(false);
    // const selectedLanguage = language;

    const changeLanguageHandler = (language) => {
        setLanguage(language);
    }
    
    const disableHandler = () => {
      setDisabled(true);
    }
  
    const contextValue = {
      language: language,
      disabled: disabled,
      changeLanguage: changeLanguageHandler,
      disable: disableHandler
    };
  
    return (
      <LangContext.Provider value={contextValue}>
        {props.children}
      </LangContext.Provider>
    );
  };
  
  export default LangContext;