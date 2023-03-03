import React from 'react'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {
  BurgerIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div
        className={`${styles.header_wrapper} wrapper
      `}
      >
        <div style={{ display: 'flex' }}>
          <button className={styles.header_button_order}>
            <BurgerIcon type="primary" />
            <span>Конструктор</span>
          </button>
          <button className={styles.header_button_order}>
            <ListIcon type="primary" />
            <span>Лента заказов</span>
          </button>
        </div>
        <div>
          <Logo />
        </div>
        <button className={styles.header_button_account}>
          <ProfileIcon type="primary" />
          <span>Личный кабинет</span>
        </button>
      </div>
    </header>
  )
}

export default AppHeader
