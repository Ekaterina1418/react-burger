import React, { useRef } from 'react'
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop } from 'react-dnd'
import styles from './burger-constructor.module.css'
import {TConstructorIngredient} from '../../features/cart/cartSlice'

type TIngredientDragType = {
  index: number
}
 interface IIndex {
   toIndex: number
   fromIndex: number
 }
interface TIngredientProps extends TIngredientDragType {
  ingredient: TConstructorIngredient
  handleClose: (item:string) => void
  moveCard: (toIndex:IIndex) => void
}
const BurgerConstructorItem = ({
  ingredient,
  index,
  handleClose,
  moveCard,
}: TIngredientProps): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [, drop] = useDrop<TIngredientDragType>({
    accept: 'sorting',
    hover: (item, monitor) => {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()
      if (!clientOffset) {
        return
      }
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard({ toIndex: hoverIndex, fromIndex: dragIndex })
      item.index = hoverIndex
    },
  })

  const [, drag] = useDrag<TIngredientDragType>({
    type: 'sorting',
    item: () => {
      return { id:ingredient.id, index }
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  })
  drag(drop(ref))

  return (
    <div className={styles.burger_constructor_item} ref={ref}>
      <DragIcon type="primary" />
      <ConstructorElement
        thumbnail={ingredient.image}
        text={ingredient.name}
        price={ingredient.price}
        handleClose={() => handleClose(ingredient.id)}
        extraClass={styles.wrapper_ingredients}
      />
    </div>
  )
}

export default BurgerConstructorItem
