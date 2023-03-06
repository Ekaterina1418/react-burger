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
          <a
            href="#"
            className={`${styles.header_link_order} ${styles.color_active}`}
          >
            <BurgerIcon type="primary" />
            <span>Конструктор</span>
          </a>
          <a
            href="#"
            className={`${styles.header_link_order} text_color_inactive`}
          >
            <ListIcon type="secondary" />
            <span>Лента заказов</span>
          </a>
        </div>
        <div>
          <Logo />
        </div>
        <a
          href="#"
          className={`${styles.header_link_account} text_color_inactive`}
        >
          <ProfileIcon type="secondary" />
          <span>Личный кабинет</span>
        </a>
      </div>
    </header>
  )
}

export default AppHeader
