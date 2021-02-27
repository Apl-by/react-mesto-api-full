import { useState, useEffect, useCallback } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { api } from "../utils/api";
import { auth } from "../utils/auth";
import { setBtnName, setRedirectPath } from "../utils/utils";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import defaultAvatar from "../images/avatar.png";

import Header from "./Header";
import HeaderMobil from "./HeaderMobil";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const history = useHistory();
  const [mountedComponent, setMountedComponent] = useState("");
  const [currentUser, setCurrentUser] = useState({ name: "Name", about: "Description", avatar: defaultAvatar });
  const [cards, setCards] = useState([]);
  const [cardForDelete, setCardForDelete] = useState({});
  const [selectedCard, setSelectedCard] = useState({ name: "#", link: "" });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isPopupWithConfirmOpen, setIsPopupWithConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isSuccessfulReg, setIsSuccessfulReg] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [userEmail, setUserEmail] = useState("");

  const isMobile = useMediaQuery({ query: "(max-width: 460px)" });

  const checkValidityToken = useCallback(
    (token) => {
      auth
        .checkToken(token)
        .then((res) => {
          console.log(res);
          setIsLoggedIn(true);
          setUserEmail(res.email);
          history.push("/");
        })
        .catch((err) => console.log(err));
    },
    [setIsLoggedIn, setUserEmail, history]
  );

  useEffect(() => {
    checkValidityToken(jwt);
  }, [jwt, checkValidityToken]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(222);
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddPlaceSubmit = (card, e) => {
    api
      .addNewCard(card)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        e.target.reset();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((i) => (i._id === card._id ? newCard : i));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    setCardForDelete(card);
    handleCardDeleteClick();
  };

  const handleCardDeleteConfirm = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((i) => !(i._id === card._id));
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const handleCardDeleteClick = () => {
    setIsPopupWithConfirmOpen(true);
  };

  const handleBtnLoading = () => {
    setIsLoading(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsPopupWithConfirmOpen(false);
    setIsInfoToolTipOpen(false);
  };

  const handleUpdateUser = (updateInfo) => {
    api
      .updateUserInfo(updateInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateAvatar = (avatarLink, e) => {
    api
      .editAvatar(avatarLink)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        e.target.reset();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleRegisterUser = (regData) => {
    auth
      .registerUser(regData)
      .then((res) => {
        setIsSuccessfulReg(true);
        history.push("/signin");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessfulReg(false);
      })
      .finally(() => setIsInfoToolTipOpen(true));
  };

  const handleSignIn = (authData) => {
    auth
      .signIn(authData)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setJwt(res.token);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserEmail("");
  };

  const handleMountedComponent = useCallback(
    (name) => {
      setMountedComponent(name);
    },
    [setMountedComponent]
  );

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        {isMobile && (
          <HeaderMobil
            btnName={setBtnName(mountedComponent)}
            path={setRedirectPath(mountedComponent)}
            history={history}
            isLoggedIn={isLoggedIn}
            email={userEmail}
            onSignOut={handleSignOut}
          />
        )}
        {!isMobile && (
          <Header
            btnName={setBtnName(mountedComponent)}
            path={setRedirectPath(mountedComponent)}
            history={history}
            isLoggedIn={isLoggedIn}
            email={userEmail}
            onSignOut={handleSignOut}
          />
        )}
        <Switch>
          <Route path="/signin">
            <Login isRendered={handleMountedComponent} onSignIn={handleSignIn} />
          </Route>
          <Route path="/signup">
            <Register isRendered={handleMountedComponent} history={history} onSignUp={handleRegisterUser} />
          </Route>
          <ProtectedRoute
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            cards={cards}
            isRendered={handleMountedComponent}
            isLoggedIn={isLoggedIn}
          />
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          userInfo={currentUser}
          onUpdateUser={handleUpdateUser}
          isFormLoading={isLoading}
          onBtnLoading={handleBtnLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isFormLoading={isLoading}
          onBtnLoading={handleBtnLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isFormLoading={isLoading}
          onBtnLoading={handleBtnLoading}
        />
        <ConfirmPopup
          isOpen={isPopupWithConfirmOpen}
          onClose={closeAllPopups}
          onCardClickDelete={handleCardDeleteConfirm}
          card={cardForDelete}
        />
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          isSucceeding={isSuccessfulReg}
          message={
            (isSuccessfulReg && "Вы успешно \n зарегистрировались!") || "Что-то пошло не так! \n Попробуйте ещё раз."
          }
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
