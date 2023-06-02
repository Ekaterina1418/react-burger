import React, { useEffect } from 'react'
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useNavigationType,
  useMatch,
} from 'react-router-dom'
import * as H from 'history'
import { useDispatch } from '../features/store'
import '../App.css'
import { fetchIngredients } from '../features/api/apiSlice'
import ConstructorPage from '../pages/constroctor/constructor-page'
import SignIn from '../pages/sign-in/sign-in'
import Registraton from '../pages/registration/registraton'
import ForgotPassword from '../pages/forgot-password/forgot-password'
import ResetPassword from '../pages/reset-password/reset-password'
import Profile from '../pages/profile/profile'
import IngredientDetails from './burger-ingredients/ingredient-details/ingredient-details'
import Orders from '../pages/profile/history-orders'
import ProfileForm from '../pages/profile/profile-form'
import IngredientInfo from '../pages/ingredient-info/ingredient-info'
import Modal from './modal/modal'
import { OnlyAuth, OnlyUnAuth } from './protected-route'
import { checkUserAuth } from '../features/auth/userSlice'
import Layout from './Layout'
import Page404 from '../pages/404/Page404'
import OrderFeed from '../pages/feed/order-feed'
import PageItemFeed from '../pages/page-item-feed/page-item-feed'
import ItemFeed from './item-feed/item-feed'
import PageHistoryOrder from '../pages/page-history-order/page-history-order'
import HistoryOrderItem from './history-order-item/history-order-item'
import HistoryOrders from '../pages/profile/history-orders'

function App() {
  const dispatch = useDispatch()
  const navigationType = useNavigationType()
  useEffect(() => {
    dispatch(checkUserAuth())
    dispatch(fetchIngredients())
  }, [dispatch])

  const navigate = useNavigate()
  const location = useLocation()
  const isFeedItem = useMatch('/feed/:number')
  const isHistoryOrder = useMatch('/profile/orders/:number')
  let background: H.Location | undefined =
    (location.state as { background?: H.Location }) && location.state.background

  const handleModalClose = (): void => {
    navigate(-1)
  }

  if (navigationType !== 'PUSH' && (isFeedItem || isHistoryOrder)) {
    background = undefined
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
          <Route
            path="/profile/orders/:number"
            element={<OnlyAuth component={<PageHistoryOrder />} />}
          />
          <Route path="*" element={<Page404 />} />
          <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
            <Route index element={<ProfileForm />} />
            <Route path="/profile/orders" element={<HistoryOrders />} />
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

      {background && navigationType === 'PUSH' && (
        <Routes>
          <Route
            path="/feed/:number"
            element={
              <Modal onClose={handleModalClose} closeOverlay={handleModalClose}>
                <ItemFeed />
              </Modal>
            }
          />
        </Routes>
      )}

      {background && navigationType === 'PUSH' && (
        <Routes>
          <Route
            path="/profile/orders/:number"
            element={
              <Modal onClose={handleModalClose} closeOverlay={handleModalClose}>
                <ItemFeed />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  )
}

export default App
