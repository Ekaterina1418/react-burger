import React, { useState, useEffect } from 'react'
import '../App.css'
import AppHeader from './app-header/app-header'
import BurgerConstructor from './burger-constructor/burger-constructor'
import BurgerIngredients from './burger-ingredients/burger-ingredients'

function App() {
  const [loading, setLoading] = useState(false)
  const [ingredients, setIngredients] = useState([])
  const [error, setError] = useState(null)


  const url = 'https://norma.nomoreparties.space/api/ingredients'

  useEffect(() => {
    setLoading(true)
    fetch(url)
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
      <div className="main_container wrapper">
        {loading && <div>идёт загрузка</div>}
        {!loading && error && <div>{error}</div>}
        {!loading && ingredients.length > 0 && (
          <>
            <BurgerIngredients data={ingredients} />
            <BurgerConstructor data={ingredients} />
          </>
        )}
      </div>
    </>
  )
}

export default App
