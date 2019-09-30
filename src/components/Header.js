import React from "react";
import logoSebrae from "../img/sebraelabLogo.png"

const Header = () => (
  <div className="ui padded centered grid">
    <div className="sixteen wide column header--dashboard">
      <img className="ui centered small image" src={logoSebrae} alt="Logo do SebraeLab" />
    </div>
  </div>
)
export default Header;