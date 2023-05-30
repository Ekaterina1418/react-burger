import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css'
import ModalOverlay from './modal-overlay/modal-overlay'
const modalRootElement = document.getElementById('react-modal')

type TModalProps = {
  onClose: () => void
  children: React.ReactNode
  title?: string
  closeOverlay: () => void
}

const Modal = ({
  children,
  onClose,
  title,
  closeOverlay,
}: TModalProps): JSX.Element => {
  const [close, setClose] = useState<boolean>(true)

  const closeModal = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setClose(false)
      onClose()
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
          <div className={styles.modal_wrapper} data-test="modal">
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

    modalRootElement as Element
  )
}
export default Modal
