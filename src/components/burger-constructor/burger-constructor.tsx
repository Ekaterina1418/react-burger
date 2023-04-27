import React, { useMemo } from 'react'
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrop } from 'react-dnd'
import styles from './burger-constructor.module.css'
import Modal from '../modal/modal'
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
import { TIngredient } from '../../utils/types'

const BurgerConstructor = () => {
  const bun = useSelector((state: any) => state.cart.bun)
  const ingredient = useSelector((state: any) => state.cart.ingredient)
  const user = useSelector((state: any) => state.user.user)
  const order = useSelector((state: any) => state.orderes)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(itemId) {
      dispatch(addToCart(itemId))
    },
  })

  const handleMoveItem = ({
    toIndex: hoverIndex,
    fromIndex: dragIndex,
  }: any) => {
    dispatch(sortingIngredient({ toIndex: hoverIndex, fromIndex: dragIndex }))
  }

  const orderClick = () => {
    const items = ingredient.map((item: any) => item._id)
    let order = { ingredients: [bun._id, ...items, bun._id] }
    if (user && bun !== null) {
      // @ts-ignore
      dispatch(createOrder(order))
    } else {
      navigate('/login', { replace: true })
    }
  }

  const closeModal = () => {
    dispatch(resetOrder())
  }
  const total = useMemo(() => {
    const amountIngredients = ingredient.reduce((acc: number, item: any) => {
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
          ingredient.map((item: any, index: number) => (
            <BurgerConstructorItem
              ingredient={item}
              key={item.id}
              index={index}
              moveCard={handleMoveItem}
              // @ts-ignore
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

export default BurgerConstructor
