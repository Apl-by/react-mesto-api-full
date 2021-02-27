import logo from "../images/logo.svg";
import { useState } from "react";
import cn from "classnames";

function HeaderMobil({ btnName, path, isLoggedIn, history, email, onSignOut }) {
  const [isCliked, setIsClicked] = useState(false);

  const classNames = cn("header__auth-btn", {
    "header__auth-btn_type_open": !isCliked,
    "header__auth-btn_type_close": isCliked,
  });

  const handleClick = () => {
    if (btnName === "Выйти") {
      onSignOut();
      setIsClicked(false);
    }
    history.push(path);
  };

  const handleClickOnMenu = () => {
    setIsClicked(!isCliked);
  };

  return (
    <div className="header-mobile">
      {isCliked && isLoggedIn && (
        <div className="header__account header__account_type_mobile">
          <span className="header__login">{email}</span>
          <button className="header__auth-btn header__auth-btn_type_mobile" type="button" onClick={handleClick}>
            {btnName}
          </button>
        </div>
      )}
      <header className="header page__header">
        <img className="header__logo" src={logo} alt="Логотип" />
        <div className="header__account">
          {!isLoggedIn && (
            <button className="header__auth-btn" type="button" onClick={handleClick}>
              {btnName}
            </button>
          )}
          {isLoggedIn && <button className={classNames} type="button" aria-label="Меню" onClick={handleClickOnMenu} />}
        </div>
      </header>
    </div>
  );
}

export default HeaderMobil;
