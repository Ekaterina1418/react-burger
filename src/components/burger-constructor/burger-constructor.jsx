import React from 'react'
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import styles from './burger-constructor.module.css'
import { DATA_TYPES } from '../../utils/types'

const BurgerConstructor = ({ data }) => {
  const searchElement = data.find((_, index) => {
    return index === 0
  })

  return (
    <div className={styles.burger_constructor_wrapper}>
      <div className={styles.burger_constructor_lists}>
        <div>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={searchElement.name}
            price={searchElement.price}
            thumbnail={searchElement.image}
          />
        </div>
        <div className={styles.burger_constructor_scroll}>
          {data.map((item) => (
            <div className={styles.burger_constructor_item}>
              <DragIcon />

              <ConstructorElement
                thumbnail={item.image}
                text={item.name}
                price={item.price}
              />
            </div>
          ))}
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={searchElement.name}
          price={searchElement.price}
          thumbnail={searchElement.image}
          extraClass={styles.burger_constructor_bottom}
        />
      </div>
      <div className={styles.burger_constructor_sum}>
        <p className="text text_type_main-large">
          610 <CurrencyIcon type="primary" />
        </p>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(DATA_TYPES),
}

export default BurgerConstructor
