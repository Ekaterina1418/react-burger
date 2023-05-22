import React, { useMemo, useEffect, useState } from 'react'
import styles from './item-feed.module.css'
import { Navigate, useParams } from 'react-router-dom'
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
import OrderDetails from '../order-details/order-details'
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
  const profileFeed = useSelector((state) => state.profileFeed.orders)
  const { number } = useParams()

  const itemDetails = useMemo(() => {
    if (orders !== null) {
      return orders.orders.find((item) => item.number === Number(number))
    } else if (order !== null) {
      return order.orders.find((item) => item.number === Number(number))
    } else if (profileFeed !== null) {
      return profileFeed.orders.find((item) => item.number === Number(number))
    }
  }, [orders, order, number])

  useEffect(() => {
    if (orders === null) {
      dispatch(getOrder(Number(number)))
    }
  }, [dispatch])

  const quantityIngredients = useMemo(() => {
    let result = {} as any
    if (itemDetails) {
      itemDetails.ingredients.reduce((acc, el) => {
        acc[el] = (acc[el] || 0) + 1
        return acc
      }, result)

      return result
    }
  }, [itemDetails])

  const uniqueId =
    itemDetails &&
    itemDetails?.ingredients.filter(
      (item, index, numbers) => numbers.indexOf(item) === index
    )

  const orderDetails = useMemo(() => {
    let res: Array<IResult> = []
    uniqueId?.map((elem) => {
      ingredients.map((item) => {
        if (item._id === elem) {
          return res.push({
            id: item._id,
            image: item.image_mobile,
            name: item.name,
            price: item.price,
            quantity: quantityIngredients[item._id],
          })
        }
      })
    })

    return res
  }, [ingredients, uniqueId])

  const total = useMemo(() => {
    const amount = orderDetails.reduce((acc, el) => {
      acc += el.price * el.quantity
      return acc
    }, 0)
    return amount
  }, [orderDetails])

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
                        {item.quantity} X {item.price}
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
                {total}
                <CurrencyIcon type="primary" />
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
