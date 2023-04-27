import React from 'react'
import styles from './modal-overlay.module.css'
type TypeOverlayProps = {
  close: () => void,
}
const ModalOverlay = ({ close }: TypeOverlayProps) :JSX.Element  => {
  return <div className={styles.modal_overlay} onClick={close}></div>
}

export default ModalOverlay
