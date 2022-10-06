import './Modal.css';

export default function Modal({ children }) {
  return (
    <div className='overlay'>
      <div className="box modal">
        {children}
      </div>
    </div>
  );
}
