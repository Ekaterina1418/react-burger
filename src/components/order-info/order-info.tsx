import React, { useMemo } from 'react'
import styles from './order-info.module.css'
import { useSelector } from '../../features/store'
import {TableRow} from '../../utils/types'

interface IOrderProps {
  order:TableRow
}

const OrderInfo = ({ order }: IOrderProps ) => {
  return (
    <div>
      <div className={styles.container_info}>
        <div className={styles.ready}>
          <p className={styles.title_info}>Готовы:</p>
          <ul className={`${styles.info_number} ${styles.info_number_color}`}>
            {order.orders &&
              order.orders.map((item) => {
                if (item.status === 'done')
                  return <li key={item._id}>{item.number}</li>
              })}
          </ul>
        </div>
        <div className={styles.in_work}>
          <p className={styles.title_info}>В работе:</p>
          <ul className={styles.info_number}>
            {order.orders &&
              order.orders.map((item) => {
                if (item.status !== 'done')
                  return <li key={item._id}>{item.number}</li>
              })}
          </ul>
        </div>
      </div>
      <div className={styles.sum_orders}>
        <p className={styles.title_number}>Выполнено за это время:</p>
        <p className={styles.number}>{order.total}</p>
      </div>
      <div className={styles.sum_orders}>
        <p className={styles.title_number}>Выполнено за сегодня:</p>
        <p className={styles.number}>{order.totalToday}</p>
      </div>
    </div>
  )
}
export default OrderInfo
