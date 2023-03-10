import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css'
import ModalOverlay from './modal-overlay/modal-overlay'
const modalRootElement = document.getElementById('react-modal')

const Modal = ({ children, onClose, title, closeOverlay }) => {
  const [close, setClose] = useState(true)
  const closeModal = (e) => {
    if (e.key === 'Escape') {
     setClose(false)
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', closeModal)
    return () => {
      document.removeEventListener('keydown', closeModal)
    }
  }, [])
  return ReactDOM.createPortal(
    <>
      {close && (
        <>
          <div className={styles.modal_wrapper}>
            <div className={styles.modal_basic}>
              <h2 className={styles.modal_title}>{title}</h2>
              <CloseIcon type="primary" onClick={onClose} />
            </div>
            {children}
          </div>
          <ModalOverlay close={closeOverlay} />
        </>
      )}
    </>,

    modalRootElement
  )
}
export default Modal
