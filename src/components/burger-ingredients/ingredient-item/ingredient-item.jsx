import React from 'react'
import styles from './ingredient-item.module.css'
import PropTypes from 'prop-types'
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
const IngredientItem = ({ selectIng, ingredient }) => {
  return (
    <div
      className={`${styles.burger_ingredient_container} ${styles.burger_ingredient_rolls}`}
      onClick={() => selectIng(ingredient)}
    >
      <img
        className={styles.burger_component_img}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <Counter count="1" size="default" extraClass="m-1" />
      <p className={styles.burger_component_currency}>
        <CurrencyIcon type="primary" />
        <span>20</span>
      </p>
      <p className={styles.burger_component_name}>{ingredient.name}</p>
    </div>
  )
}
IngredientItem.propTypes = {
  ingredient: PropTypes.object,
}
export default IngredientItem
