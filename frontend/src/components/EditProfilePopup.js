import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isFormLoading, onBtnLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  useEffect(() => {
    if (!isOpen) return;
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onBtnLoading();
    onUpdateUser({
      name: name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="editForm"
      title="Редактировать профиль"
      btn={isFormLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          className="form__input"
          onChange={handleChangeName}
          value={name}
          type="text"
          name="name"
          autoComplete="off"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="form__input-error"></span>
      </label>
      <label className="form__field">
        <input
          className="form__input"
          onChange={handleChangeDescription}
          value={description}
          type="text"
          name="about"
          autoComplete="off"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
