import React from 'react'
import styles from './ingredient-item.module.css'
import { Link } from 'react-router-dom'
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from 'react-dnd'
import { useLocation } from 'react-router-dom'
import { type } from 'os'
import { TIngredient } from '../../../utils/types'

type TIngredientItem = {
  ingredient: TIngredient
  count: number
}

const IngredientItem = ({
  ingredient,
  count,
}: TIngredientItem): JSX.Element => {
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
    <>
      {!isDrag && (
        <Link
          key={ingredientId}
          to={`/ingredient/${ingredientId}`}
          state={{ background: location }}
          className={styles.link}
          data-test={ingredient.name}
        >
          <div
            className={`${styles.burger_ingredient_container} ${styles.burger_ingredient_rolls}`}
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
      )}
    </>
  )
}

export default IngredientItem
