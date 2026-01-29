// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Products from './Components/Product/Product'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import Orders from './Components/Orders/Orders'
import NotFound from './Components/NotFound/NotFound'
import AuthContextProvider from './Context/AuthContext'
import ProtectedRoute from './Components/Guards/ProtectedRoute/ProtectedRoute'
import AuthProtectedRoute from './Components/Guards/AuthProtectedRoute/AuthProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CounterContextProvider from "./Context/CounterContext";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Address from './Components/Address/Address'
import { QueryClient, QueryClientProvider } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'



export default function App() {



  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute>< Home /></ProtectedRoute> },
        { path: 'login', element: <AuthProtectedRoute><Login /></AuthProtectedRoute> },
        { path: 'register', element: <AuthProtectedRoute><Register /></AuthProtectedRoute> },
        { path: 'products', element: <ProtectedRoute>< Products /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute>< Categories /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute>< Brands /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute>< Cart /></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute>< Orders /></ProtectedRoute> },
        { path: 'address', element: <ProtectedRoute>< Address /></ProtectedRoute> },
        { path: 'productDetails/:id', element: <ProtectedRoute>< ProductDetails /></ProtectedRoute> },
        { path: '*', element: <NotFound /> },
      ]
    }
  ]
  )
  let queryClient = new QueryClient()


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CounterContextProvider>
            <RouterProvider router={router}></RouterProvider>
            <ToastContainer />
          </CounterContextProvider>
        </AuthContextProvider>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </>
  )
}

