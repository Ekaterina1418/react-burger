import React from 'react'
import styles from './modal-overlay.module.css'
const ModalOverlay = ({ close}) => {
  return <div className={styles.modal_overlay} onClick={close}></div>
}

export default ModalOverlay
