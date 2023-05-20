import React, { useMemo, useEffect, useState } from 'react'
import styles from './item-feed.module.css'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from '../../features/store'
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components'
import img from '../../images/bun-02.png'
import { connectFeed } from '../../features/feed/actions'
import { count } from 'console'
import { getOrder } from '../../features/details-order/detailsOrderSlice'
import { TOrderInfo } from '../../utils/types'
import { object } from 'prop-types'
import { access } from 'fs'
interface IResult {
  id: string
  image: string
  name: string
  price: number
  quantity: number
}

const ItemFeed = () => {
  const dispatch = useDispatch()
  const { orders, status } = useSelector((state) => state.feed)
  const ingredients = useSelector((state) => state.ingredients.ingredients)
  const order = useSelector((state) => state.order)
  const { number } = useParams()

  const itemDetails = useMemo(() => {
    if (orders !== null) {
      return orders.orders.find((item) => item.number === Number(number))
    } else if (order !== null) {
      return order.orders.find((item) => item.number === Number(number))
    }
  }, [orders, order, number])

  useEffect(() => {
    if (orders === null) {
      dispatch(getOrder(Number(number)))
    }
  }, [dispatch])

  const orderDetails = useMemo(() => {
    let res: Array<IResult> = []
    let result = {} as any
    if (orders && ingredients) {
      ingredients.map((item) => {
        if (itemDetails) {
          itemDetails.ingredients.reduce((acc, el) => {
            acc[el] = (acc[el] || 1) + 1
            return acc
          }, result)
          for (const [key, value] of Object.entries(result)) {
            if (key === item._id) {
              return res.push({
                id: item._id,
                image: item.image_mobile,
                name: item.name,
                price: item.price,
                quantity: value as number,
              })
            }
          }
        }
      })
    }
    if (orders === null) {
      ingredients.map((item) => {
        if (itemDetails) {
          itemDetails.ingredients.reduce((acc, el) => {
            acc[el] = (acc[el] || 0) + 1
            return acc
          }, result)
            for (const [key, value] of Object.entries(result)) {
                if (key === item._id) {
                  return res.push({
                  id: item._id,
                  image: item.image_mobile,
                  name: item.name,
                  price: item.price,
                  quantity: value as number,
                })
              }
            }
        }

      
      })
    }
    return res
  }, [orders, ingredients, order])

  return (
    <>
      {order.loading && <div>идёт загрузка</div>}
      {!order.loading && order.error && <div>{order.error}</div>}

      {orderDetails && itemDetails && (
        <div className="wrapper">
          <div className={styles.container}>
            <p className={styles.number_order}>{`#${itemDetails.number}`}</p>
            <h5 className={styles.name_burger}>{itemDetails.name}</h5>
            {itemDetails.status === 'done' ? (
              <p className={styles.status}>Выполнен</p>
            ) : (
              <p className={styles.status}>В работе</p>
            )}
            <p className={styles.composition}>Состав:</p>
            <div className={`${styles.scroll} custom-scroll`}>
              <ul className={styles.container_ingredients}>
                {orderDetails.map((item, index) => {
                  return (
                    <li key={index}>
                      <div className={styles.container_name}>
                        <div className={styles.img}>
                          <img src={item.image} alt="ингредиент" />
                        </div>
                        <p className={styles.ingredient_name}>{item.name}</p>
                      </div>
                      <p className={styles.quantity}>
                        {item.quantity} X {item.price}{' '}
                        <CurrencyIcon type="primary" />
                      </p>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className={styles.container_date}>
              <FormattedDate
                date={new Date(itemDetails.createdAt)}
                className={styles.date}
              />
              <p className={styles.quantity}>
                500 <CurrencyIcon type="primary" />
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
  return <></>
}

export default ItemFeed
