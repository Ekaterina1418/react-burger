import React from 'react'
import AppHeader from '../../components/app-header/app-header'
import IngredientDetails from '../../components/burger-ingredients/ingredient-details/ingredient-details'
import styles from './ingredient-info.module.css'
const IngredientInfo = ({ ingredients, loading }) => {
  return (
    <>
      <AppHeader />
      <div className={styles.wrapper}>
        {!loading && ingredients && (
          <IngredientDetails ingredients={ingredients} />
        )}
      </div>
    </>
  )
}

export default IngredientInfo
