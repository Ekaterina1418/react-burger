import React, { useEffect } from 'react'
import styles from './order-details.module.css'
import img from '../../images/graphics.svg'
import { createOrder } from '../../features/order/orderSlice'
import { useDispatch, useSelector } from 'react-redux'
const OrderDetails = () => {
  const dispatch = useDispatch()
  const bun = useSelector((state) => state.cart.bun)
  const ingredient = useSelector((state) => state.cart.ingredient)
  const order = useSelector((state) => state.orderes)
  useEffect(() => {
     const items = ingredient.map((item) => item._id)
    if (bun !== null) {
      let order = { ingredients: [bun._id, ...items, bun._id] }
      dispatch(createOrder(order))
    }
  }, [dispatch])

  return (
    <div className={styles.burger_checkout_wrapper}>
      {order.loading && <div>загрузка</div>}
      {!order.loading && order.error && <div>Ошибка</div>}
      {!order.loading && order.order !== null && (
        <>
          <p className={`${styles.order_number} text text_type_digits-large`}>
            {order.order.order.number}
          </p>
          <p className={`${styles.order_text} text text_type_main-medium`}>
            {order.order.name}
          </p>
        </>
      )}
      <img className={styles.order_img} src={img} alt="check" />
      <p className={`${styles.order_status} text text_type_main-default`}>
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

export default OrderDetails
