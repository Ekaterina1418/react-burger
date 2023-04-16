import React from 'react'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import {
  BurgerIcon,
  ProfileIcon,
  ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
import { NavLink } from 'react-router-dom'

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div
        className={`${styles.header_wrapper} wrapper
      `}
      >
        <div style={{ display: 'flex' }}>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <span
                className={`${styles.header_link_order}`}
                style={{ color: isActive ? '#FFFFFF' : '#8585AD' }}
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
          <NavLink to="" style={{ textDecoration: 'none' }}>
            <span className={`${styles.header_link_order}`}>
              <ListIcon type="secondary" />
              Лента заказов
            </span>
          </NavLink>
        </div>
        <div>
          <Logo />
        </div>
        <NavLink to="/profile" style={{ textDecoration: 'none' }}>
          {({ isActive }) => (
            <span
              className={styles.header_link_account}
              style={{ color: isActive ? '#FFFFFF' : '#8585AD' }}
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
