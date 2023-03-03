import React from 'react'
import './App.css'
import { data } from './utils'
import AppHeader from './components/app-header/app-header'
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'

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
