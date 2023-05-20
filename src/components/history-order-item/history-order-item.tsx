import React, {useMemo} from 'react'
import { TOrderInfo } from '../../utils/types'
import {useSelector} from '../../features/store'
import { Link } from 'react-router-dom'
import styles from './history-order-item.module.css'
import {
  FormattedDate,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
 interface IHistoryOrderProps {
   historyOrder: TOrderInfo
 }

const HistoryOrderItem = ({ historyOrder }: IHistoryOrderProps) => {
  const dateFromServer = historyOrder.updatedAt
  const ingredients = useSelector((store) => store.ingredients.ingredients)
  const number = historyOrder['number']

  const socketImage = useMemo(() => {
    let res: Array<string> = []
    ingredients.map((item) => {
      historyOrder.ingredients.map((el) => {
        if (el === item._id) {
          return res.push(item.image_mobile)
        }
      })
    })

    return res
  }, [historyOrder.ingredients])

  const total = useMemo(() => {
    let res
    ingredients.map((el) => {
      historyOrder.ingredients.map((id) => {
        if (el._id === id) {
          return (res = el.price * historyOrder.ingredients.length)
        }
      })
    })

    return res
  }, [historyOrder.ingredients])

  return (
    <Link to={`/profile/orders/${number}`} className={styles.link}>
      {historyOrder && (
        <div className={styles.wrapper_card}>
          <div className={styles.service_info}>
            <p className={styles.number}>{`#${historyOrder.number}`}</p>
            <FormattedDate
              className={styles.date}
              date={new Date(dateFromServer)}
            />
          </div>
          <h4 className={styles.name_burger}>{historyOrder.name}</h4>
          {historyOrder.status === 'done' && (
            <p style={{ color: '#00CCCC' }} className={styles.status}>
              Выполнен
            </p>
          )}
          {historyOrder.status === 'created' && (
            <p className={styles.status}>Создан</p>
          )}
          {historyOrder.status === 'pending' && (
            <p className={styles.status}>Готовится</p>
          )}
          <div className={styles.container_ingredients}>
            <ul className={styles.img_ingredients}>
              {socketImage.map((elem, id) => {
                return (
                  <li className={styles.ingredient} key={id}>
                    <img src={elem} alt="ингредиенты" />
                  </li>
                )
              })}
            </ul>
            <div className={styles.container_price}>
              <p className={styles.price}>{total}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
    </Link>
  )
}

export default HistoryOrderItem
