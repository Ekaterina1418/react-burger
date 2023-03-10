import React, { useState, useEffect } from 'react'
import '../App.css'
import AppHeader from './app-header/app-header'
import BurgerConstructor from './burger-constructor/burger-constructor'
import BurgerIngredients from './burger-ingredients/burger-ingredients'
import { URL } from '../utils/data'
function App() {
  const [loading, setLoading] = useState(false)
  const [ingredients, setIngredients] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          throw Error('Не удалось получить данные')
        }
        return res.json()
      })
      .then((data) => {
        setLoading(false)
        setIngredients(data.data)
      })
      .catch((err) => (setLoading(false), setError(err.message)))
  }, [])

  return (
    <>
      <AppHeader />

      <div className="wrapper">
        <div className="main_container">
          {loading && <div>идёт загрузка</div>}
          {!loading && error && <div>{error}</div>}
          {!loading && ingredients !== null && (
            <>
              <BurgerIngredients data={ingredients} />
              <BurgerConstructor data={ingredients} />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default App
