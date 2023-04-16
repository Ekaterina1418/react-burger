import React from 'react'
import {useSelector} from 'react-redux'
import IngredientDetails from '../../components/burger-ingredients/ingredient-details/ingredient-details'
import styles from './ingredient-info.module.css'
const IngredientInfo = () => {
   const { ingredients, loading } = useSelector(
     (state) => state.ingredients
   )

  return (
    <>
      <div className={styles.wrapper}>
        {!loading && ingredients && (
          <IngredientDetails ingredients={ingredients} />
        )}
      </div>
    </>
  )
}

export default IngredientInfo
