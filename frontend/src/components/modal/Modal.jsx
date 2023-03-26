import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Icon } from '@iconify/react';
import './modal.scss';

const CustomModal = ({settings}) => {
  const [show, setShow] = useState(false);
  const {buttonClassName, text, icon} = settings.buttonSettings;
  const {title, content, buttons} = settings.contentSettings;
  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);
  return (
    <>
      <button type="button" className={buttonClassName} onClick={showModal}>
        {text}
        {icon != '' ? <Icon icon={icon} /> : null}
      </button>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton closeVariant='white'>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content()}</Modal.Body>
        {buttons.length != 0 ? 
        (<Modal.Footer>
          <button type="button" className="modal__button" onClick={closeModal}>
            Отменить
          </button>
          {buttons.map((button, i) => {
            return ( 
              <button key={i} type="button" className="modal__button" onClick={() => {
                    button.action();
                    closeModal();
                }}>
                {button.text}
              </button>)
          })}
        </Modal.Footer>)
        : null}
      </Modal>
    </>
  );
};
export default CustomModal;