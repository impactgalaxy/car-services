import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Layout from './layout/Layout.jsx'
import ServiceDetails from './pages/ServiceDetails.jsx'
import Checkout from './pages/Checkout.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import PrivateRout from './private/PrivateRout.jsx'
import MyOrders from './pages/MyOrders.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/car-services-details/:id",
        element: <ServiceDetails></ServiceDetails>
      },
      {
        path: "/checkout",
        element: <PrivateRout><Checkout></Checkout></PrivateRout>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/my_orders",
        element: <PrivateRout><MyOrders></MyOrders></PrivateRout>
      }

    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='max-w-7xl mx-auto'>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider><RouterProvider router={router} /></AuthProvider>
      </QueryClientProvider>

    </React.StrictMode>
  </div>
)
