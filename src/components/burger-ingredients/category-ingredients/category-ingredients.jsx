import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
const Categoryingredients = () => {
  const [current, setCurrent] = React.useState('булки')
  return (
    <div style={{ display: 'flex', paddingBottom: '40px' }}>
      <Tab value="булки" active={current === 'булки'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="соусы" active={current === 'соусы'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="начинки" active={current === 'начинки'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

export default Categoryingredients
