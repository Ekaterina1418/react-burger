import React, { useEffect } from 'react'
import CardOrder from '../../components/card-order/card-order'
import styles from './order-feed.module.css'
import OrderInfo from '../../components/order-info/order-info'
import { useDispatch, useSelector } from '../../features/store'
import { connectFeed, disconnectFeed } from '../../features/feed/actions'

const OrderFeed = () => {
  const url = 'wss://norma.nomoreparties.space/orders/all'
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(connectFeed(url))
    return () => {
      dispatch(disconnectFeed())
    }
  }, [dispatch])

  const { orders, status } = useSelector((state) => state.feed)

  if (orders === null) {
    return <h1>Загрузка...</h1>
  }

  return (
    <div className="wrapper">
      <div className={styles.container}>
        <div className={styles.tape}>
          <h1 className={styles.title}>Лента заказов</h1>
          <div className={`${styles.order_scroll} custom-scroll`}>
            {orders.orders &&
              orders.orders.map((item) => { 
                return <CardOrder key={item._id} orderdetails={item} />
              })}
          </div>
        </div>
        <div className={styles.order_info}>
          <OrderInfo orders={orders} />
        </div>
      </div>
    </div>
  )
}

export default OrderFeed
