import React from 'react'
import styles from './profile.module.css'
import {  NavLink, Outlet} from 'react-router-dom'
import AppHeader from '../../components/app-header/app-header'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/auth/userSlice'
const Profile = () => {
  const dispatch = useDispatch()
  
  return (
    <>
      <AppHeader />
      <div className={styles.wrapper}>
        <div className={styles.links}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? `${styles.active}` : `${styles.category}`
            }
          end>
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders" 
            className={({ isActive }) =>
              isActive ? `${styles.active}` : `${styles.category}`
            }
          >
           История заказов
          </NavLink>
          <p className={styles.category} onClick={() => dispatch(logout())}>
            Выход
          </p>
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете <br />
            изменить свои персональные данные
          </p>
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default Profile
