import React, { useState } from 'react'
import styles from './burger-ingredients.module.css'
import Categoryingredients from './category-ingredients/category-ingredients'
import PropTypes from 'prop-types'
import { DATA_TYPES } from '../../utils/types'
import IngredientItem from './ingredient-item/ingredient-item'
import Modal from '../modal/modal'
import IngredientDetails from './ingredient-details/ingredient-details'
const BurgerIngredients = ({ data }) => {
  const [currentIngredient, setCurrentIngredient] = useState(null)
  const ingredientGroup = ['Булки', 'Соусы', 'Начинки']
  return (
    <section>
      <div className={styles.burger_ingredients_wrapper}>
        <h1 className={styles.burger_ingredients_title}>Соберите бургер</h1>

        <Categoryingredients ingredients={ingredientGroup} />
        <div className={styles.burger_ingredient_scroll}>
          <h2 className={styles.burger_ingredient_name}>Булки</h2>
          <div
            className={`${styles.burger_ingredient} ${styles.burger_ingredient_pb}`}
          >
            {data.map((item) => {
              if (item.type === 'bun') {
                return (
                  <IngredientItem
                    key={item._id}
                    ingredient={item}
                    selectIng={setCurrentIngredient}
                  />
                )
              }
            })}
          </div>
          <h2 className={styles.burger_ingredient_name}>Соусы</h2>
          <div className={styles.burger_ingredient}>
            {data.map((item) => {
              if (item.type === 'sauce') {
                return (
                  <IngredientItem
                    key={item._id}
                    ingredient={item}
                    selectIng={setCurrentIngredient}
                  />
                )
              }
            })}
          </div>
          <h2 className={styles.burger_ingredient_name}>Начинки</h2>
          <div className={styles.burger_ingredient}>
            {data.map((item) => {
              if (item.type === 'main') {
                return (
                  <IngredientItem
                    key={item._id}
                    ingredient={item}
                    selectIng={setCurrentIngredient}
                  />
                )
              }
            })}
          </div>
        </div>
      </div>
      {currentIngredient && (
        <Modal
          title="Детали ингредиента"
          onClose={() => setCurrentIngredient(null)}
          closeOverlay={() => setCurrentIngredient(null)}
        >
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </section>
  )
}
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(DATA_TYPES),
}
export default BurgerIngredients
