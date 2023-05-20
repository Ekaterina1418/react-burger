import React, { useState } from 'react'
import styles from './profile.module.css'
import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from "../../features/store";
import { userUpdate } from '../../features/auth/userSlice'
const ProfileForm = () => {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [password, setPassword] = useState('')
  const form = {
    name: name,
    email: email,
    password: password,
  }
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(userUpdate(form))
  }
  const userCancel = () => {
    setName(user?.name ?? '')
    setEmail(user?.email ?? '')
  }
  return (
    <form className={styles.form_profile} onSubmit={handleSubmit}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={(e) => setName(e.target.value)}
        icon={'EditIcon'}
        value={name}
        name={'name'}
        error={false}
        size={'default'}
        extraClass="ml-1"
      />
      <EmailInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name={'email'}
        placeholder="Логин"
        isIcon
      />
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name={'password'}
        icon="EditIcon"
      />
      {name !== user?.name && email !== user?.email && (
        <div className={styles.buttons}>
          <Button  className={styles.cancel} onClick={() => userCancel()} htmlType='reset'>
            Отмена
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass={styles.button_save}
          >
            Сохранить
          </Button>
        </div>
      )}
    </form>
  )
}

export default ProfileForm
