import React from 'react'
import '../App.css'
import { data } from '../utils/data'
import AppHeader from './app-header/app-header'
import BurgerConstructor from './burger-constructor/burger-constructor'
import BurgerIngredients from './burger-ingredients/burger-ingredients'

function App() {
  return (
    <>
      <AppHeader />
      <div className="main_container wrapper">
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </div>
    </>
  )
}

export default App
