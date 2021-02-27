import { useEffect, useRef } from "react";
import cn from "classnames";

function PopupWithForm({ name, title, btn, children, isOpen, onClose, onSubmit }) {
  // для доступа к методу reset() формы, при закрытии не через submit
  const form = useRef();

  const classNames = cn("popup", { popup_opened: isOpen });

  useEffect(() => {
    if (!isOpen) return;
    form.current.reset();
  }, [isOpen]);

  const closeOnOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={classNames} onClick={closeOnOverlay}>
      <form className="form popup__form" onSubmit={onSubmit} name={name} noValidate ref={form}>
        <h2 className="form__title form__title_size_s">{title}</h2>
        {children}
        <button className="form__submit form__submit_size_s" type="submit">
          {btn}
        </button>
        <button className="form__close" type="button" aria-label="Закрыть окно" onClick={onClose}></button>
      </form>
    </div>
  );
}

export default PopupWithForm;
