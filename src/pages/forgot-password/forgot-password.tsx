import React, { useState } from 'react'
import styles from './forgot-password.module.css'
import { useDispatch } from '../../features/store'
import { useNavigate, Link, useLocation } from 'react-router-dom'

import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { forgotPassword } from '../../utils/api'

const ResetPassword = () => {
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    forgotPassword(email)
      .then(() => {
        setEmail('')
        navigate('/reset-password', { state: { from: location.pathname } })
      })
      .catch((error) => console.log(error.message))
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.container_forgot_password}>
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
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ResetPassword
