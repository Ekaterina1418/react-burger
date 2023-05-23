import React, { useMemo } from 'react'
import {
  FormattedDate,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './card-order.module.css'
import { useSelector } from '../../features/store'
import { Link, useLocation } from 'react-router-dom'
import { TOrderInfo } from '../../utils/types'

interface IOrderDetailsProps {
  orderdetails: TOrderInfo
}

const CardOrder = ({ orderdetails }: IOrderDetailsProps) => {
  const dateFromServer = orderdetails.updatedAt
  const location = useLocation()
  const number = orderdetails['number']
  const ingredients = useSelector((store) => store.ingredients.ingredients)
  const odds = orderdetails.ingredients.length - 5
  const socketImage = useMemo(() => {
    let res: Array<string> = []
    let result = orderdetails.ingredients.slice(0, 6)
    ingredients.map((item) => {
      result.map((el) => {
        if (el === item._id) {
          return res.push(item.image_mobile)
        }
      })
    })

    return res
  }, [orderdetails.ingredients])

  const total = useMemo(() => {
    let res
    ingredients.map((el) => {
      orderdetails.ingredients.map((id) => {
        if (el._id === id) {
          return (res = el.price * orderdetails.ingredients.length)
        }
      })
    })

    return res
  }, [orderdetails.ingredients])

  return (
    <Link
      to={`/feed/${number}`}
      className={styles.link}
      state={{ background: location }}
    >
      {orderdetails && (
        <div className={styles.wrapper_card}>
          <div className={styles.service_info}>
            <p className={styles.number}>{`#${orderdetails.number}`}</p>
            <FormattedDate
              className={styles.date}
              date={new Date(dateFromServer)}
            />
          </div>
          <h4 className={styles.name_burger}>{orderdetails.name}</h4>
          <div className={styles.container_ingredients}>
            <ul className={styles.img_ingredients}>
              {socketImage.map((item, index) => {
                return (
                  <li className={styles.ingredient} key={index}>
                    <img src={item} alt="ингредиенты" />
                  </li>
                )
              })}
            </ul>
            {socketImage.length > 5 && (
              <div className={styles.plus} key={socketImage.length - 1}>
                {` +${odds}`}
              </div>
            )}

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

export default CardOrder
