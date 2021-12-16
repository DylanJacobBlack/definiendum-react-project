import "./NavBar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";

;


const NavBar = () => {
  return (
    <nav className="nav-backdrop">
      <div className="menu">
        <h1 className="logo-text">
          <FontAwesomeIcon icon={faLanguage} />
          definiens
        </h1>
      </div>
    </nav>
  );
};

export default NavBar;
