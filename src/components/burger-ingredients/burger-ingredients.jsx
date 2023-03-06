import React from 'react'
import styles from './burger-ingredients.module.css'
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import Categoryingredients from './category-ingredients/category-ingredients'
import PropTypes from 'prop-types'
import { DATA_TYPES } from '../../utils/types'

const BurgerIngredients = ({ data }) => {
  const ingredients = ['Булки', 'Соусы', 'Начинки']
  return (
    <section>
      <div className={styles.burger_ingredients_wrapper}>
        <h1 className={styles.burger_ingredients_title}>Соберите бургер</h1>

        <Categoryingredients ingredients={ingredients} />
        <div className={styles.burger_ingredient_scroll}>
          <h2 className={styles.burger_ingredient_name}>Булки</h2>
          <div
            className={`${styles.burger_ingredient} ${styles.burger_ingredient_pb}`}
          >
            {data.map((item, id) => {
              if (item.type === 'bun') {
                return (
                  <div
                    className={`${styles.burger_ingredient_container} ${styles.burger_ingredient_rolls}`}
                    key={id}
                  >
                    <img
                      className={styles.burger_component_img}
                      src={item.image}
                      alt={item.name}
                    />
                    <Counter count="1" size="default" extraClass="m-1" />
                    <p className={styles.burger_component_currency}>
                      <CurrencyIcon type="primary" />
                      <span>20</span>
                    </p>
                    <p className={styles.burger_component_name}>{item.name}</p>
                  </div>
                )
              }
            })}
          </div>
          <h2 className={styles.burger_ingredient_name}>Соусы</h2>
          <div className={styles.burger_ingredient}>
            {data.map((item, id) => {
              if (item.type === 'sauce') {
                return (
                  <div
                    className={`${styles.burger_ingredient_container} ${styles.burger_ingredient_sauce}`}
                    key={id}
                  >
                    <img
                      className={styles.burger_component_img}
                      src={item.image}
                      alt={item.name}
                    />
                    <Counter count="1" size="default" extraClass="m-1" />
                    <p className={styles.burger_component_currency}>
                      <CurrencyIcon type="primary" />
                      <span>20</span>
                    </p>
                    <p className={styles.burger_component_name}>{item.name}</p>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(DATA_TYPES),
}
export default BurgerIngredients
