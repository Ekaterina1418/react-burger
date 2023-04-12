import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from './reset-password.module.css'
import { resetPassword } from '../../features/auth/userSlice'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AppHeader from '../../components/app-header/app-header'
import {
  PasswordInput,
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  useEffect(() => {
    if (location.state === null || location.state.from !== '/forgot-password') {
      navigate('/', { replace: true })
    }
  }, [navigate, location.state])
  const form = {
    password: password,
    token: token,
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(resetPassword(form))
    navigate('/login', { replace: true })
  }
  return (
    <>
      <AppHeader />
      <div className={styles.wrap}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 className={styles.title}>Восстановление пароля</h3>
          <form onSubmit={handleSubmit} className={styles.form}>
            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name={'password'}
              extraClass="mb-2"
            />
            <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              name={'name'}
              size={'default'}
              extraClass="ml-1"
            />
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass={styles.button}
            >
              Сохранить
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
