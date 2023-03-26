import React, { useState, useRef, useMemo } from 'react'
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { DATA_TYPES } from '../../utils/types'
import IngredientItem from './ingredient-item/ingredient-item'
import Modal from '../modal/modal'
import IngredientDetails from './ingredient-details/ingredient-details'
import { useSelector } from 'react-redux'

const BurgerIngredients = () => {
  const [currentIngredient, setCurrentIngredient] = useState(null)
  const [current, setCurrent] = useState('булки')
  const refTabs = useRef()
  const refBun = useRef()
  const refSauce = useRef()
  const refMain = useRef()

  const handleScroll = () => {
    const tabsBottom = refTabs.current.getBoundingClientRect().bottom
    const bunsTop = refBun.current.getBoundingClientRect().top
    const saucesTop = refSauce.current.getBoundingClientRect().top
    const mainsTop = refMain.current.getBoundingClientRect().top

    const bunsDelta = Math.abs(bunsTop - tabsBottom)
    const saucesDelta = Math.abs(saucesTop - tabsBottom)
    const mainsDelta = Math.abs(mainsTop - tabsBottom)

    const min = Math.min(bunsDelta, saucesDelta, mainsDelta)
    if (min === bunsDelta) {
      setCurrent('булки')
    }
    if (min === saucesDelta) {
      setCurrent('соусы')
    }
    if (min === mainsDelta) {
      setCurrent('начинки')
    }
  }
  const ingredients = useSelector((store) => store.ingredients.ingredients)
  const buns = ingredients.filter((item) => item.type === 'bun')
  const sauces = ingredients.filter((item) => item.type === 'sauce')
  const mains = ingredients.filter((item) => item.type === 'main')
  const bun = useSelector((state) => state.cart.bun)
  const ingredientsConstructor = useSelector((state) => state.cart.ingredient)

  const bunStatistics = useMemo(() => {
    if (buns.length === 0) {
      return {}
    }
    let res = new Map()
    buns.forEach((b) => {
      const count = bun && b._id === bun._id ? 2 : 0
      res.set(b._id, count)
    })

    return res
  }, [buns, bun])

  const sauceStatistics = useMemo(() => {
    if (sauces.length === 0) {
      return {}
    }
    let res = new Map()
    const items = ingredientsConstructor.filter((el) => el.type === 'sauce')
    return items.reduce(
      (acc, e) => acc.set(e._id, (acc.get(e._id) || 0) + 1),
      res
    )
  }, [sauces, ingredients])

  const mainStatistics = useMemo(() => {
    if (mains.length === 0) {
      return {}
    }
    let res = new Map()
    const items = ingredientsConstructor.filter((el) => el.type === 'main')
    return items.reduce(
      (acc, e) => acc.set(e._id, (acc.get(e._id) || 0) + 1),
      res
    )
  }, [mains, ingredients])
  return (
    <section>
      <div className={styles.burger_ingredients_wrapper}>
        <h1 className={styles.burger_ingredients_title}>Соберите бургер</h1>

        <div style={{ display: 'flex', paddingBottom: '40px' }} ref={refTabs}>
          <Tab value="булки" active={current === 'булки'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="соусы" active={current === 'соусы'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab
            value="начинки"
            active={current === 'начинки'}
            onClick={setCurrent}
          >
            Начинки
          </Tab>
        </div>
        <div
          className={`${styles.burger_ingredient_scroll} custom-scroll`}
          id="scroll"
          onScroll={handleScroll}
        >
          <h2 className={styles.burger_ingredient_name} ref={refBun}>
            Булки
          </h2>
          <div
            className={`${styles.burger_ingredient} ${styles.burger_ingredient_pb}`}
          >
            {buns.map((item) => {
              return (
                <IngredientItem
                  key={item._id}
                  ingredient={item}
                  selectIng={setCurrentIngredient}
                  count={bunStatistics.get(item._id) || 0}
                />
              )
            })}
          </div>
          <h2 className={styles.burger_ingredient_name} ref={refSauce}>
            Соусы
          </h2>
          <div className={styles.burger_ingredient}>
            {sauces.map((item) => {
              return (
                <IngredientItem
                  key={item._id}
                  ingredient={item}
                  selectIng={setCurrentIngredient}
                  count={sauceStatistics.get(item._id) || 0}
                />
              )
            })}
          </div>
          <h2 className={styles.burger_ingredient_name} ref={refMain}>
            Начинки
          </h2>
          <div className={styles.burger_ingredient}>
            {mains.map((item) => {
              return (
                <IngredientItem
                  key={item._id}
                  ingredient={item}
                  selectIng={setCurrentIngredient}
                  count={mainStatistics.get(item._id) || 0}
                />
              )
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
