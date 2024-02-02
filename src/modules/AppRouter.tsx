import { FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainPage from '../pages/MainPage/MainPage'
import ModelingPage from '../pages/ModelingPage/ModelingPage'
import LoginPage from '../pages/LoginPage/LoginPage'


const AppRouter: FC = () => {
    const router = createBrowserRouter(
        [
            {
                path: '/',
                element: <MainPage />
            },
            {
                path: '/modelings/:modelingId',
                element: <ModelingPage />
            },
            {
                path: '/login',
                element: <LoginPage />
            }
        ]
    )

    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter
