import cn from "classnames";

function InfoTooltip({ isOpen, onClose, isSucceeding, message }) {
  const classNamesPopup = cn("popup", { popup_opened: isOpen });
  const classNamesInfoTip = cn("form__info-tip", { [`form__info-tip_rejected`]: !isSucceeding });

  const closeOnOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={classNamesPopup} onClick={closeOnOverlay}>
      <form className="form form_type_info-tip popup__info-tip" noValidate>
        <p className={classNamesInfoTip}>{message}</p>
        <button
          className="form__close form__close_type_info-tip"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
      </form>
    </div>
  );
}

export default InfoTooltip;
