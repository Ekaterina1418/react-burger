import React from 'react'
import styles from './ingredient-item.module.css'
import PropTypes from 'prop-types'
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from 'react-dnd'
import { useSelector } from 'react-redux'

const IngredientItem = ({ selectIng, ingredient, count }) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  })

  return (
    !isDrag && (
      <div
        className={`${styles.burger_ingredient_container} ${styles.burger_ingredient_rolls}`}
        onClick={() => selectIng(ingredient)}
        ref={dragRef}
      >
        <img
          className={styles.burger_component_img}
          src={ingredient.image}
          alt={ingredient.name}
        />
        {count ? (
          <Counter count={count} size="default" extraClass="m-1" />
        ) : null}
        <p className={styles.burger_component_currency}>
          <CurrencyIcon type="primary" />
          <span>{ingredient.price}</span>
        </p>
        <p className={styles.burger_component_name}>{ingredient.name}</p>
      </div>
    )
  )
}
IngredientItem.propTypes = {
  ingredient: PropTypes.object,
}
export default IngredientItem
