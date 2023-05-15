import React, { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import * as H from 'history'
import { useDispatch } from "../features/store";
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
import Layout from './Layout'
import Page404 from '../pages/404/Page404'
import OrderFeed from '../pages/feed/order-feed'
import ItemFeed from './item-feed/item-feed';
import PageItemFeed from '../pages/page-item-feed/page-item-feed';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserAuth())
    dispatch(fetchIngredients())
  }, [dispatch])

  const navigate = useNavigate()
  const location = useLocation()
  const background =
    (location.state as { background?: H.Location }) && location.state.background
  const handleModalClose = (): void => {
    navigate(-1)
  }
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<ConstructorPage />} />
          <Route
            path="/ingredient/:ingredientId"
            element={<IngredientInfo />}
          />
          <Route
            path="/login"
            element={<OnlyUnAuth component={<SignIn />} />}
          />
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
          <Route path="/feed" element={<OrderFeed />} />
          <Route path="/feed/:number" element={<PageItemFeed />} />

          <Route path="*" element={<Page404 />} />
          <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
            <Route index element={<ProfileForm />} />
            <Route path="/profile/orders" element={<Orders />} />
          </Route>
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredient/:ingredientId"
            element={
              <Modal
                onClose={handleModalClose}
                closeOverlay={handleModalClose}
                title="Детали ингредиента"
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  )
}

export default App
