import React, { useEffect } from 'react'
import CardOrder from '../../components/card-order/card-order'
import styles from './order-feed.module.css'
import OrderInfo from '../../components/order-info/order-info'
import { useDispatch, useSelector } from '../../features/store'
import { WebsocketStatus } from '../../utils/types'
import {
  connect as connectLiveTable,
  disconnect as disconnectLiveTable,
} from '../../features/live-table/actions'
import { log } from 'console'
import OrderDetails from '../../components/order-details/order-details'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
const OrderFeed = () => {
  const socket = 'wss://norma.nomoreparties.space/orders/all'
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(connectLiveTable(socket))
  }, [dispatch])

  const { orders, status } = useSelector((state) => state.liveTable)
  const isDisconnected = status !== WebsocketStatus.OFFLINE

  const disconnect = () => dispatch(disconnectLiveTable())

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
       <OrderInfo order={orders} />
        </div>
      </div>
    </div>
  )
}

export default OrderFeed
