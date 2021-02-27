import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function AddPlacePopup({ isOpen, onClose, isFormLoading, onBtnLoading, onAddPlace }) {
  const name = useRef();
  const link = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onBtnLoading();
    onAddPlace(
      {
        name: name.current.value,
        link: link.current.value,
      },
      e
    );
  };

  return (
    <PopupWithForm
      name="addForm"
      title="Новое место"
      onSubmit={handleSubmit}
      btn={isFormLoading ? "Создание..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <label className="form__field">
        <input
          className="form__input"
          type="text"
          name="name"
          ref={name}
          placeholder="Название"
          autoComplete="off"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="form__input-error" id="place-input-error"></span>
      </label>
      <label className="form__field">
        <input className="form__input" type="url" name="link" ref={link} placeholder="Ссылка на картинку" required />
        <span className="form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
