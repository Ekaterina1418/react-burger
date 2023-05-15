import React from 'react'
import { useSelector } from "../../features/store";
import IngredientDetails from '../../components/burger-ingredients/ingredient-details/ingredient-details'
import styles from './ingredient-info.module.css'
const IngredientInfo = () => {
  const { ingredients, loading } = useSelector((state) => state.ingredients)

  return (
    <>
      <div className={styles.wrapper}>
        {!loading && ingredients && (
          <IngredientDetails  />
        )}
      </div>
    </>
  )
}

export default IngredientInfo
