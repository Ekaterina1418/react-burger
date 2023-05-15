import React, { useMemo } from 'react'
import styles from './ingredient-details.module.css'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useSelector } from '../../../features/store'

const IngredientDetails = () => {
  const { ingredients, loading } = useSelector(
    (state) => state.ingredients
  )
  const { ingredientId } = useParams()

  const ingredient = useMemo(() => {
    return ingredients.find(
      (ingredient) => ingredient._id === ingredientId
    )
  }, [ingredients, ingredientId])
  if (!ingredients) {
    return null
  }

  return (
    <>
      {!loading && ingredient && (
        <div className={styles.details_wrapper}>
          <img src={ingredient.image} alt={ingredient.name} />
          <h3 className={`${styles.details_name} text text_type_main-medium`}>
            {ingredient.name}
          </h3>
          <ul className={`${styles.details_list}`}>
            <li className={styles.details_item}>
              Калории,ккал
              <p className="text_type_digits-default">{ingredient.calories}</p>
            </li>
            <li className={styles.details_item}>
              Белки,г
              <p className="text_type_digits-default">{ingredient.proteins}</p>
            </li>
            <li className={styles.details_item}>
              Жиры,г<p className="text_type_digits-default">{ingredient.fat}</p>
            </li>
            <li className={styles.details_item}>
              Углеводы,г
              <p className="text_type_digits-default">
                {ingredient.carbohydrates}
              </p>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default IngredientDetails
