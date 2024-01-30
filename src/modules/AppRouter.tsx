import { FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainPage from '../pages/MainPage/MainPage'
import ModelingPage from '../pages/ModelingPage/ModelingPage'


const AppRouter: FC = () => {
    const router = createBrowserRouter(
        [
            {
                path: '/NetTestReact/',
                element: <MainPage />
            },
            {
                path: '/NetTestReact/modelings/:modelingId',
                element: <ModelingPage />
            }
        ]
    )

    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter
