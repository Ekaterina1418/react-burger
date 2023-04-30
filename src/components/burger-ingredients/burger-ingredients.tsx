import React, { useState, useRef, useMemo } from 'react'
import styles from './burger-ingredients.module.css'
import { TIngredient } from '../../utils/types'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientItem from './ingredient-item/ingredient-item'
import { useSelector } from 'react-redux'
import { number } from 'prop-types'

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('булки')
  const refTabs = useRef<HTMLDivElement | null>(null)
  const refBun = useRef<HTMLHeadingElement | null>(null)
  const refSauce = useRef<HTMLHeadingElement | null>(null)
  const refMain = useRef<HTMLHeadingElement | null>(null)

  const handleScroll = () => {
    const tabsBottom = refTabs.current!.getBoundingClientRect().bottom

    const bunsTop = refBun.current!.getBoundingClientRect().top

    const saucesTop = refSauce.current!.getBoundingClientRect().top

    const mainsTop = refMain.current!.getBoundingClientRect().top

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
  const ingredients = useSelector((store: any) => store.ingredients.ingredients)
  const buns = ingredients.filter((item: any) => item.type === 'bun')
  const sauces = ingredients.filter((item: any) => item.type === 'sauce')
  const mains = ingredients.filter((item: any) => item.type === 'main')
  const bun = useSelector((state: any) => state.cart.bun)
  const ingredientsConstructor = useSelector(
    (state: any) => state.cart.ingredient
  )

  const bunStatistics = useMemo(() => {
    let res = new Map<string, number>()
    if (buns.length === 0) {
      return res
    }

    buns.forEach((b: any) => {
      const count = bun && b._id === bun._id ? 2 : 0
      res.set(b._id, count)
    })

    return res
  }, [buns, bun])

  const sauceStatistics = useMemo(() => {
    let res = new Map<string, number>()
    if (sauces.length === 0) {
      return res
    }

    const items = ingredientsConstructor.filter(
      (el: any) => el.type === 'sauce'
    )
    return items.reduce(
      (acc: any, e: any) => acc.set(e._id, (acc.get(e._id) || 0) + 1),
      res
    )
  }, [sauces, ingredients])

  const mainStatistics = useMemo(() => {
    let res = new Map<string, number>()
    if (mains.length === 0) {
      return res
    }

    const items = ingredientsConstructor.filter((el: any) => el.type === 'main')
    return items.reduce(
      (acc: any, e: any) => acc.set(e._id, (acc.get(e._id) || 0) + 1),
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
            {buns.map((item: any) => {
              return (
                <IngredientItem
                  key={item._id}
                  ingredient={item}
                  count={bunStatistics.get(item._id) || 0}
                />
              )
            })}
          </div>
          <h2 className={styles.burger_ingredient_name} ref={refSauce}>
            Соусы
          </h2>
          <div className={styles.burger_ingredient}>
            {sauces.map((item: any) => {
              return (
                <IngredientItem
                  key={item._id}
                  ingredient={item}
                  count={sauceStatistics.get(item._id) || 0}
                />
              )
            })}
          </div>
          <h2 className={styles.burger_ingredient_name} ref={refMain}>
            Начинки
          </h2>
          <div className={styles.burger_ingredient}>
            {mains.map((item: any) => {
              return (
                <IngredientItem
                  key={item._id}
                  ingredient={item}
                  count={mainStatistics.get(item._id) || 0}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BurgerIngredients
