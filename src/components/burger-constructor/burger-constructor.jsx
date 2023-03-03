import React from 'react'
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import styles from './burger-constructor.module.css'
import img from '../../images/bun-02.png'
const burgerConstructor = PropTypes.shape({
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
})

const BurgerConstructor = ({ data }) => {
  return (
    <div className={styles.burger_constructor_wrapper}>
      <div className={styles.burger_constructor_lists}>
        <div>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={img}
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
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={img}
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
  data: PropTypes.arrayOf(burgerConstructor).isRequired,
}

export default BurgerConstructor
