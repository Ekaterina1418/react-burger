import React, { useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../features/auth/userSlice'
import { Link } from 'react-router-dom'
import styles from './sign-in.module.css'
import AppHeader from '../../components/app-header/app-header'
import {
  EmailInput,
  Button,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const form = {
    email: email,
    password: password,
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(form))
  }

  return (
    <>
      <AppHeader />
      <div className={styles.wrap}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 className={styles.title}>Вход</h3>
          <form className={styles.form} onSubmit={handleSubmit}>
            <EmailInput
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name={'email'}
              placeholder="E-mail"
              isIcon={false}
            />
            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name={'password'}
              extraClass="mb-2"
            />
            { user.error && <div className={styles.error}>{user.error}</div>}
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass={styles.button}
            >
              Войти
            </Button>
          </form>
          <p className={styles.paragraph}>
            Вы — новый пользователь?
            <Link to="/registration" className={styles.link} href="#">
              Зарегистрироваться
            </Link>
          </p>
          <p className={styles.paragraph}>
            Забыли пароль?
            <Link to="/forgot-password" className={styles.link} href="#">
              Восстановить пароль
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignIn
