import React, { useState, useEffect } from 'react'
import '../App.css'
import AppHeader from './app-header/app-header'
import BurgerConstructor from './burger-constructor/burger-constructor'
import BurgerIngredients from './burger-ingredients/burger-ingredients'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIngredients } from '../features/api/apiSlice'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchIngredients())
  }, [])
   const ingredients = useSelector((state) => state.ingredients)
  

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <div className="wrapper">
          <div className="main_container">
            {ingredients.loading && <div>идёт загрузка</div>}
            {!ingredients.loading && ingredients.error && (
              <div>{ingredients.error}</div>
            )}
            {!ingredients.loading && ingredients.ingredients !== null && (
              <>
                <BurgerIngredients data={ingredients.ingredients} />
                <BurgerConstructor />
              </>
            )}
          </div>
        </div>
      </DndProvider>
    </>
  )
}

export default App
