import React, { JSXElementConstructor, ReactElement } from 'react'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import {
  BurgerIcon,
  ProfileIcon,
  ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
import { NavLink, NavLinkProps } from 'react-router-dom'

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div
        className={`${styles.header_wrapper} wrapper
      `}
      >
        <div className={styles.container_header} id="nav">
          <NavLink to="/" className={styles.decoration}>
            {({ isActive }) => (
              <span
                className={isActive ? styles.active : styles.header_link_order}
              >
                {isActive ? (
                  <BurgerIcon type="primary" />
                ) : (
                  <BurgerIcon type="secondary" />
                )}
                Конструктор
              </span>
            )}
          </NavLink>
          <NavLink to="/feed" className={styles.decoration}>
            {({ isActive }) => (
              <span
                className={isActive ? styles.active : styles.header_link_order}
              >
                {isActive ? (
                  <ListIcon type="primary" />
                ) : (
                  <ListIcon type="secondary" />
                )}
                Лента заказов
              </span>
            )}
          </NavLink>
        </div>
        <div>
          <Logo />
        </div>
        <NavLink to="/profile" className={styles.decoration}>
          {({ isActive }) => (
            <span
              className={isActive ? styles.active : styles.header_link_account}
            >
              {isActive ? (
                <ProfileIcon type="primary" />
              ) : (
                <ProfileIcon type="secondary" />
              )}
              Личный кабинет
            </span>
          )}
        </NavLink>
      </div>
    </header>
  )
}

export default AppHeader
