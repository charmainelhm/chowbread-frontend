const Modal = ({ toggleModal }) => {
  return (
    <div className="modal">
      <div
        className="fill-screen bg-black opacity-70"
        onClick={toggleModal}
      ></div>
      <div className="modal-content">
        <h2>Testing modal</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          perferendis suscipit officia recusandae, eveniet quaerat assumenda id
          fugit, dignissimos maxime non natus placeat illo iusto! Sapiente
          dolorum id maiores dolores? Illum pariatur possimus quaerat ipsum quos
          molestiae rem aspernatur dicta tenetur. Sunt placeat tempora vitae
          enim incidunt porro fuga ea.
        </p>
        <button className="btn" onClick={toggleModal}>
          Close modal
        </button>
      </div>
    </div>
  );
};

export default Modal;
