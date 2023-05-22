import React from 'react'
import '../../App.css'
import { useSelector } from '../../features/store'
import BurgerConstructor from '../../components/burger-constructor/burger-constructor'
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {useLocation} from 'react-router'



const ConstructorPage = () => {
   const { ingredients, loading, error } = useSelector(
     (state) => state.ingredients
   )
  const location = useLocation()
  console.log(location)
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="wrapper">
          <div className="main_container">
            {loading && <div>идёт загрузка</div>}
            {!loading && error && <div>{error}</div>}
            {!loading && ingredients !== null && (
              <>
                <BurgerIngredients  />
                <BurgerConstructor />
              </>
            )}
          </div>
        </div>
      </DndProvider>
    </>
  )
}

export default ConstructorPage
