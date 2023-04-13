import React from 'react'
import styles from './ingredient-item.module.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from 'react-dnd'
import { useLocation } from 'react-router-dom'

const IngredientItem = ({ selectIng, ingredient, count }) => {
  const location = useLocation()
  const ingredientId = ingredient['_id']

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  })

  return (
    !isDrag && (
      <Link
        key={ingredientId}
        to={`/ingredient/${ingredientId}`}
        state={{ background: location }}
        className={styles.link}
      >
        <div
          className={`${styles.burger_ingredient_container} ${styles.burger_ingredient_rolls}`}
          onClick={() => selectIng}
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
      </Link>
    )
  )
}
IngredientItem.propTypes = {
  ingredient: PropTypes.object,
  selectIng: PropTypes.func,
  count: PropTypes.number,
}
export default IngredientItem
