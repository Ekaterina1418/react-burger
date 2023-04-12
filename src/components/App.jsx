import React, { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../App.css'
import { fetchIngredients } from '../features/api/apiSlice'
import ConstructorPage from '../pages/constroctor/constructor-page'
import SignIn from '../pages/sign-in/sign-in'
import Registraton from '../pages/registration/registraton'
import ForgotPassword from '../pages/forgot-password/forgot-password'
import ResetPassword from '../pages/reset-password/reset-password'
import Profile from '../pages/profile/profile'
import IngredientDetails from './burger-ingredients/ingredient-details/ingredient-details'
import Orders from '../pages/profile/orders'
import ProfileForm from '../pages/profile/profile-form'
import IngredientInfo from '../pages/ingredient-info/ingredient-info'
import Modal from './modal/modal'
import { OnlyAuth, OnlyUnAuth } from './protected-route'
import { checkUserAuth } from '../features/auth/userSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserAuth())
    dispatch(fetchIngredients())
  }, [dispatch])

  const { ingredients, loading, error } = useSelector(
    (state) => state.ingredients
  )

  const navigate = useNavigate()
  const location = useLocation()
  const background = location.state && location.state.background
  const handleModalClose = () => {
    navigate(-1)
  }
  return (
    <>
      <Routes location={background || location}>
        <Route
          path="/"
          element={
            <ConstructorPage
              ingredients={ingredients.ingredients}
              error={error}
              loading={loading}
            />
          }
        />
        <Route
          path="/ingredient/:ingredientId"
          element={
            <IngredientInfo ingredients={ingredients} loading={loading} />
          }
        />
        <Route path="/login" element={<OnlyUnAuth component={<SignIn />} />} />
        <Route
          path="/registration"
          element={<OnlyUnAuth component={<Registraton />} />}
        />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
          <Route index element={<ProfileForm />} />
          <Route path="/profile/orders" element={<Orders />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredient/:ingredientId"
            element={
              <Modal onClose={handleModalClose} title="Детали ингредиента">
                <IngredientDetails
                  ingredients={ingredients}
                  loading={loading}
                />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  )
}

export default App
