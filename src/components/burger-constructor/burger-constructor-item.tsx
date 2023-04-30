import React, { useRef } from 'react'
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop } from 'react-dnd'
import styles from './burger-constructor.module.css'

type TIngredientDragType = {
  id: string
  index: number
}

interface TIngredientProps extends TIngredientDragType {
  ingredient: {
    name: string
    image: string
    price: number
  }
  handleClose: () => void
  moveCard: (toIndex: any) => any
}
const BurgerConstructorItem = ({
  ingredient,
  id,
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
      return { id, index }
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
        handleClose={handleClose}
        extraClass={styles.wrapper_ingredients}
      />
    </div>
  )
}

export default BurgerConstructorItem
