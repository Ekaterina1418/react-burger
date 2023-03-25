import React, { useMemo, useState, useEffect } from 'react'
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrop } from 'react-dnd'
import PropTypes from 'prop-types'
import styles from './burger-constructor.module.css'
import Modal from '../modal/modal'
import { DATA_TYPES } from '../../utils/types'
import OrderDetails from '../order-details/order-details'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeIngredient,
  addToCart,
  sortingIngredient,
} from '../../features/cart/cartSlice'
import { createOrder, resetOrder } from '../../features/order/orderSlice'
import BurgerConstructorItem from './burger-constructor-item'
const BurgerConstructor = () => {
  const bun = useSelector((state) => state.cart.bun)
  const ingredient = useSelector((state) => state.cart.ingredient)
  const order = useSelector((store) => store.orderes.order)
  const dispatch = useDispatch()

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(itemId) {
      dispatch(addToCart(itemId))
    },
  })

  const orderClick = () => {
    if (bun !== null) {
      let order = { ingredients: [bun._id, ...ingredient, bun._id] }
      dispatch(createOrder(order))
    }
  }

  const handleMoveItem = ({ toIndex: hoverIndex, fromIndex: dragIndex }) => {
    dispatch(sortingIngredient({ toIndex: hoverIndex, fromIndex: dragIndex }))
  }

  const total = useMemo(() => {
    const amountIngredients = ingredient.reduce((acc, item) => {
      acc += item.price * 2
      return acc
    }, 0)
    if (bun !== null) {
      return amountIngredients + bun.price * 2
    }
    return amountIngredients
  }, [ingredient, bun])

  return (
    <div className={styles.burger_constructor_wrapper} ref={dropRef}>
      <div className={styles.burger_constructor_lists}>
        {bun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
        {ingredient &&
          ingredient.map((item, index) => (
            <BurgerConstructorItem
              ingredient={item}
              key={item.id}
              index={index}
              moveCard={handleMoveItem}
              handleClose={(item) => dispatch(removeIngredient(item))}
            />
          ))}
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={styles.burger_constructor_bottom}
          />
        )}
      </div>
      <div className={styles.burger_constructor_sum}>
        <p className="text text_type_main-large">
          {total}
          <CurrencyIcon type="primary" />
        </p>
        <Button
          onClick={() => orderClick()}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
        {order && (
          <Modal
            onClose={() => dispatch(resetOrder())}
            closeOverlay={() => dispatch(resetOrder())}
          >
            <OrderDetails order={order} />
          </Modal>
        )}
      </div>
    </div>
  )
}
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(DATA_TYPES),
}

export default BurgerConstructor
