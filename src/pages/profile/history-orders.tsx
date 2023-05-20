import React, { useEffect, useMemo } from 'react'
import CardOrder from '../../components/card-order/card-order'
import { useDispatch, useSelector } from '../../features/store'
import {
  connectProfileFeed,
  disconnectProfileFeed,
} from '../../features/profile-feed/actions'
import styles from './history-orders.module.css'
import { Link } from 'react-router-dom'
import HistoryOrderItem from '../../components/history-order-item/history-order-item'

const HistoryOrders = () => {
  const { orders, status } = useSelector((state) => state.profileFeed)
  const accessToken = localStorage
    .getItem('accessToken')
    ?.replace(/Bearer /g, '')
  const url = `wss://norma.nomoreparties.space/orders?token=${accessToken}`

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(connectProfileFeed(url))
    return () => {
      dispatch(disconnectProfileFeed())
    }
  }, [dispatch])
  if (orders === null) {
    return <h1>Загрузка...</h1>
  }

  return (
    <div className={styles.container_history_orders}>
      <div className={`${styles.scroll} custom-scroll`}>
        {orders.orders &&
          orders.orders.map((item) => {
            return <HistoryOrderItem historyOrder={item} key={item._id} />
          })}
      </div>
    </div>
  )
}

export default HistoryOrders
