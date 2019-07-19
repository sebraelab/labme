import React from "react";
import logoSebrae from "../img/sebraelabLogo.png"

const Header = () => (
  <div class="ui padded centered grid">
    <div class="sixteen wide column header--dashboard">
      <img class="ui centered small image" src={logoSebrae} alt="Logo do SebraeLab" />
    </div>
  </div>
)
export default Header;