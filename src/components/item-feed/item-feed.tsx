import React, { useMemo, useEffect, useState } from 'react'
import styles from './item-feed.module.css'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from '../../features/store'
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components'
import img from '../../images/bun-02.png'
import { connect as connectLiveTable } from '../../features/live-table/actions'
import { count } from 'console'
import { createOrder } from '../../features/details-order/detailsOrderSlice'
const ItemFeed = () => {
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.liveTable.orders)
  const status = useSelector((state) => state.liveTable.status)
  const ingredients = useSelector((state) => state.ingredients.ingredients)
  const order = useSelector((state) => state.order)
  const { number } = useParams()

  const itemDetails = useMemo(() => {
    if (orders.orders) {
      return orders.orders.find((item) => item.number === Number(number))
    }
  }, [orders, number])
  if (!orders) {
    return null
  }

  useEffect(() => {
    if (!orders.orders) {
      dispatch(createOrder(Number(number)))
    }
  }, [dispatch])

  const orderDetails = useMemo(() => {
    let res: Array<string | number> = []
    if (orders.orders && ingredients) {
      ingredients.map((item) => {
        orders.orders.map((elem) => {
          elem.ingredients.map((el) => {
            if (item._id === el && elem.number === Number(number)) {
              return res.push({
                id: item._id,
                quantity: 1,
                image: item.image_mobile,
                name: item.name,
                price: item.price,
              })
            }
          })
        })
      })
    }else if (!orders.orders && !order.loading && order.order !== null) {
      ingredients.map((item) => {
        order.order.orders.map((elem) => {
          console.log(order.order.orders)
          elem.ingredients.map((el) => {
            if (item._id === el && elem.number === Number(number)) {
              return res.push({
                id: item._id,
                quantity: 1,
                image: item.image_mobile,
                name: item.name,
                price: item.price,
              })
            }
          })
        })
      })
    }
    console.log(res)
    return res
  }, [orders.orders, ingredients,order.order])


  const today = new Date()
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1,
    today.getHours(),
    today.getMinutes() - 1,
    0
  )

  return (
    <>
      {order.loading && <div>идёт загрузка</div>}
      {!order.loading && order.error && <div>{error}</div>}

      {orderDetails && itemDetails &&  (
        <div className="wrapper">
          <div className={styles.wrapper_details_order}>
            <div className={styles.container}>
              <p className={styles.number_order}>{`#${itemDetails.number}`}</p>
              <h5 className={styles.name_burger}>{itemDetails.name}</h5>
              {itemDetails.status === 'done' ? (
                <p className={styles.status}>Выполнен</p>
              ) : (
                <p className={styles.status}>В работе</p>
              )}
              <p className={styles.composition}>Состав:</p>
              <ul className={styles.container_ingredients}>
                { orderDetails.map((item,index) => {
                  return (
                    <li key={index}>
                      <div className={styles.img}>
                        <img src={item.image} alt="ингредиент" />
                      </div>
                      <p>{item.name}</p>

                      <p className={styles.quantity}>
                        2 X 20 <CurrencyIcon type="primary" />
                      </p>
                    </li>
                  )
                })}



                
              </ul>
              <div className={styles.container_date}>
                <FormattedDate date={yesterday} className={styles.date} />
                <p className={styles.quantity}>
                  500 <CurrencyIcon type="primary" />
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ItemFeed
