export default function EndGameModal({ isVisible, onClose, message }) {
    if (!isVisible) return null; // No renderiza nada si no está visible
   
    return (
      <div className="overlay">
        <div className="modal">
          <h2>Fin del Juego</h2>
          <p>{message}</p>
          <button onClick={onClose} className="modal-button">
            Volver a Jugar
          </button>
        </div>
      </div>
    );
  }