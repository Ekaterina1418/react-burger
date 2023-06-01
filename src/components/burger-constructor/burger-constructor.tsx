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
import { useDispatch, useSelector } from '../../features/store'
import {
  removeIngredient,
  addToCart,
  sortingIngredient,
} from '../../features/cart/cartSlice'
import { Order, createOrder } from '../../features/order/orderSlice'
import { resetOrder } from '../../features/order/orderSlice'
import BurgerConstructorItem from './burger-constructor-item'
import { useNavigate } from 'react-router-dom'
import { TIngredient } from '../../utils/types'
import { v4 as uuid } from 'uuid'
import { RootState } from '../../features/reducer'
import { number } from 'prop-types'
import BurgerConstructorBackground from './burger-constructor-background'

interface IIndex {
  toIndex: number
  fromIndex: number
}

const BurgerConstructor = () => {
  const bun = useSelector((state) => state.cart.bun)
  const ingredient = useSelector((state) => state.cart.ingredient)
  const user = useSelector((state) => state.user.user)
  const order = useSelector((state) => state.orderes)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const t = uuid()

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(ingredient: TIngredient) {
      dispatch(addToCart({ ...ingredient, id: uuid() }))
    },
  })

  const handleMoveItem = ({
    toIndex: hoverIndex,
    fromIndex: dragIndex,
  }: IIndex) => {
    dispatch(sortingIngredient({ toIndex: hoverIndex, fromIndex: dragIndex }))
  }

  const orderClick = () => {
    const items = ingredient.map((item) => item._id)
    let order = { ingredients: [bun!._id, ...items, bun!._id] }
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
    const amountIngredients = ingredient.reduce((acc: number, item) => {
      acc += item.price * 2
      return acc
    }, 0)
    if (bun !== null) {
      return amountIngredients + bun.price * 2
    }
    return amountIngredients
  }, [ingredient, bun])

  return (
    <>
      <div
        className={styles.burger_constructor_wrapper}
        data-test="constructor"
        ref={dropRef}
      >
        <div className={styles.burger_constructor_lists}>
          {bun ? (
            <div data-test={bun.name}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
                extraClass={styles.wrapper_ingreients}
              />
            </div>
          ) : (
            <div className={`${styles.default_bun} ${styles.default_bun_top}`}>
              <span>Выберете булку</span>
            </div>
          )}
          <div className={`${styles.constructor_elements} custom-scroll`}>
            {ingredient.length > 0 ? (
              ingredient.map((item, index: number) => (
                <div data-test={item} key={item.id}>
                  <BurgerConstructorItem
                    ingredient={item}
                    key={item.id}
                    index={index}
                    moveCard={handleMoveItem}
                    handleClose={(item) => dispatch(removeIngredient(item))}
                  />
                </div>
              ))
            ) : (
              <div className={styles.default_elements}><span>Выберете начинку</span></div>
            )}
          </div>
          {bun ? (
            <div data-test={bun.name}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
                extraClass={styles.burger_constructor_bottom}
              />
            </div>
          ) : (
            <div
              className={`${styles.default_bun} ${styles.default_bun_bottom}`}
            >
              <span> Выберете булку</span>
            </div>
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
              data-test="order-button"
            >
              Оформить заказ
            </Button>
          </>

          {order.loading && (
            <Modal
              onClose={() => closeModal()}
              closeOverlay={() => closeModal()}
            >
              <div className={styles.wrapper_orders}>
                <p className={styles.text_loading}>Создание заказа...</p>
              </div>
            </Modal>
          )}
          {!order.loading && order.error && <div>Ошибка</div>}
          {!order.loading && order.order !== null && (
            <Modal
              onClose={() => closeModal()}
              closeOverlay={() => closeModal()}
            >
              <OrderDetails order={{ order: order.order }} />
            </Modal>
          )}
        </div>
      </div>
    </>
  )
}

export default BurgerConstructor
