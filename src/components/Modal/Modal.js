import './Modal.css';

export default function Modal({ children, handleClose }) {
  const handleUserClickBackground = (e) => {
    if (e.target !== e.currentTarget) return;
    handleClose();
  };

  return (
    <div className='overlay' onClick={handleUserClickBackground}>
      <div className="box our-modal">
        <button className='close-button delete is-large' onClick={handleClose}></button>
        {children}
      </div>
    </div>
  );
}
