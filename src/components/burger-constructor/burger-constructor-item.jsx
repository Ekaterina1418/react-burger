import React, { useRef } from 'react'
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop } from 'react-dnd'
import styles from './burger-constructor.module.css'


const BurgerConstructorItem = ({ingredient, id, index, handleClose, moveCard }) => {
 
 
 const ref = useRef(null)
  const [, drop] = useDrop({
    accept: 'sorting',
    hover:(item, monitor) => {
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

  const [{ isDragging }, drag] = useDrag({
    type: 'sorting',
    item: () => {
      return {id, index }
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 1 : 0
  drag(drop(ref))




  
  return (
    <div className={styles.burger_constructor_item} ref={ref}>
      <DragIcon />
      <ConstructorElement
        thumbnail={ingredient.image}
        text={ingredient.name}
        price={ingredient.price}
        handleClose={handleClose}
        
      />
    </div>
  )
}

export default BurgerConstructorItem
