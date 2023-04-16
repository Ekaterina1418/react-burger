import React, { useMemo } from 'react'
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
import { createOrder } from '../../features/order/orderSlice'
import { resetOrder } from '../../features/order/orderSlice'
import BurgerConstructorItem from './burger-constructor-item'
import { useNavigate } from 'react-router-dom'
const BurgerConstructor = () => {
  const bun = useSelector((state) => state.cart.bun)
  const ingredient = useSelector((state) => state.cart.ingredient)
  const user = useSelector((state) => state.user.user)
  const order = useSelector((state) => state.orderes)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(itemId) {
      dispatch(addToCart(itemId))
    },
  })

  const handleMoveItem = ({ toIndex: hoverIndex, fromIndex: dragIndex }) => {
    dispatch(sortingIngredient({ toIndex: hoverIndex, fromIndex: dragIndex }))
  }

  const orderClick = () => {
    const items = ingredient.map((item) => item._id)
    let order = { ingredients: [bun._id, ...items, bun._id] }
    if (user && bun !== null) {
      dispatch(createOrder(order))
    } else {
      navigate('/login', { replace: true })
    }
  }

  const closeModal = () => {
    dispatch(resetOrder())
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
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={styles.wrapper_ingreients}
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
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={styles.burger_constructor_bottom}
          />
        )}
      </div>
      <div className={styles.burger_constructor_sum}>
        <>
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
        </>

        {order.loading && <div>загрузка</div>}
        {!order.loading && order.error && <div>Ошибка</div>}
        {!order.loading && order.order !== null && (
          <Modal onClose={() => closeModal()} closeOverlay={() => closeModal()}>
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
