import React, { useState } from 'react'
import styles from './forgot-password.module.css'
import { useDispatch } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { forgotPassword } from '../../features/auth/userSlice'
import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
const ResetPassword = () => {
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      forgotPassword(email, {
        onSuccess: () => navigate('/reset-password'),
      })
    )
    setEmail('')
    navigate('/reset-password', { state: { from: location.pathname } })
    
  }
  return (
    <>
      <div className={styles.wrap}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 className={styles.title}>Восстановление пароля</h3>
          <form onSubmit={handleSubmit} className={styles.form}>
            <EmailInput
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name={'email'}
              isIcon={false}
              placeholder="Укажите e-mail"
            />
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass={styles.button}
            >
              Восстановить
            </Button>
          </form>
          <p className={styles.paragraph}>
            Уже зарегистрированы?
            <Link to="/login" className={styles.link} href="#">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
