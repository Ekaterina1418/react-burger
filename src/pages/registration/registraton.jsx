import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../features/auth/userSlice'
import { Link } from 'react-router-dom'
import styles from './registration.module.css'
import {
  EmailInput,
  Input,
  Button,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

const Registraton = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const form = {
    email: email,
    password: password,
    name: name,
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser(form))
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <>
      <div className={styles.wrap}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 className={styles.title}>Регистрация</h3>
          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={(e) => setName(e.target.value)}
              value={name}
              name={'name'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
              extraClass="ml-1"
            />
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

            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass={styles.button}
            >
              Зарегистрироваться
            </Button>
          </form>
          <p className={styles.paragraph}>
            Уже зарегистрированы?
            <Link to="/" className={styles.link} href="#">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Registraton
