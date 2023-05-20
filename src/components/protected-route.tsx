import React from 'react'
import { useSelector } from '../features/store'
import { useLocation, Navigate } from 'react-router-dom'


interface ProtectedRouteProps {
  onlyUnAuth?: boolean
  component: React.ReactNode
}
type TComponent = Pick<ProtectedRouteProps, 'component'>
const ProtectedRoute = ({
  onlyUnAuth = false,
  component,
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked)
  const user = useSelector((state) => state.user.user)
  const location = useLocation()

  if (!isAuthChecked) {
    return null
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } }
    return <Navigate to={from} />
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return <>{component}</>
}

export const OnlyAuth = ProtectedRoute
export const OnlyUnAuth = ({ component }: TComponent) => (
  <ProtectedRoute onlyUnAuth={true} component={component} />
)
