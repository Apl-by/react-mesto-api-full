import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ isOpen, onClose, card, onCardClickDelete }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onCardClickDelete(card);
  };

  return (
    <PopupWithForm
      name="deleteForm"
      title="Вы уверены?"
      btn="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmPopup;
