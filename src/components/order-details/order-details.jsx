import React from 'react'
import styles from './order-details.module.css'
import img from '../../images/graphics.svg'

const OrderDetails = (order) => {
  return (
    <div className={styles.burger_checkout_wrapper}>
      <p className={`${styles.order_number} text text_type_digits-large`}>
        {order.order.order.number}
      </p>
      <p className={`${styles.order_text} text text_type_main-medium`}>
        {order.order.name}
      </p>
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
