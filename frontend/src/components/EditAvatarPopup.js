import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isFormLoading, onBtnLoading }) {
  const avatarLink = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onBtnLoading();
    onUpdateAvatar(avatarLink.current.value, e);
  };

  return (
    <PopupWithForm
      name="avatarForm"
      title="Обновить аватар"
      btn={isFormLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          className="form__input"
          type="url"
          name="link"
          ref={avatarLink}
          placeholder="Ссылка на картинку"
          required
        />
        <span className="form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
