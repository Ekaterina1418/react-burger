import React, { useMemo } from 'react'
import styles from './order-info.module.css'
import { useSelector } from '../../features/store'
import { TOrdersResponse } from '../../utils/types'

interface IOrdersInfoProps {
  orders: TOrdersResponse
}
const OrderInfo = ({ orders }: IOrdersInfoProps) => {
  return (
    <div>
      <div className={styles.container_info}>
        <div className={styles.ready}>
          <p className={styles.title_info}>Готовы:</p>
          <ul className={`${styles.info_number} ${styles.info_number_color}`}>
            {orders.orders &&
              orders.orders.map((item) => {
                if (item.status === 'done')
                  return <li key={item._id}>{item.number}</li>
              })}
          </ul>
        </div>
        <div className={styles.in_work}>
          <p className={styles.title_info}>В работе:</p>
          <ul className={styles.info_number}>
            {orders.orders &&
              orders.orders.map((item) => {
                if (item.status === 'pending')
                  return <li key={item._id}>{item.number}</li>
              })}
          </ul>
        </div>
      </div>
      <div className={styles.sum_orders}>
        <p className={styles.title_number}>Выполнено за это время:</p>
        <p className={styles.number}>{orders.total}</p>
      </div>
      <div className={styles.sum_orders}>
        <p className={styles.title_number}>Выполнено за сегодня:</p>
        <p className={styles.number}>{orders.totalToday}</p>
      </div>
    </div>
  )
}
export default OrderInfo
