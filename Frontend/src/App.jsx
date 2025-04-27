import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Home from './components/Home'
import AddItem from './components/AddItem'
import Edit from './components/Edit'
import View from './components/View'
import Error from './components/Error'
import ProtectedRoute from './components/ProtectedRoute'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/add-item",
    element: (
      <ProtectedRoute>
        <AddItem />
      </ProtectedRoute>
    )
  },
  {
    path: "/items/view/:id",
    element: (
      <ProtectedRoute>
        <View />
      </ProtectedRoute>
    )
  },
  {
    path: "/items/edit/:id",
    element: (
      <ProtectedRoute>
        <Edit />
      </ProtectedRoute>
    )
  },
  {
    path: "*",
    element: <Error />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App