import logo from "../images/logo.svg";

function Header({ btnName, path, isLoggedIn, history, email, onSignOut }) {
  const handleClick = () => {
    if (btnName === "Выйти") {
      onSignOut();
    }
    history.push(path);
  };

  return (
    <header className="header page__header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <div className="header__account">
        {isLoggedIn && <span className="header__login">{email}</span>}
        <button className="header__auth-btn" type="button" onClick={handleClick}>
          {btnName}
        </button>
      </div>
    </header>
  );
}

export default Header;
