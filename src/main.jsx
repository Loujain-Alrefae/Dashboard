import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './pages/Register'
import Items from './pages/Items'
import ListItems from './pages/ListItems'
import AddItems from './pages/AddItems'
import EditeItems from './pages/EditeItems'
import Favorites from './pages/Favorites'
import OrderList from './pages/OrderList'
import { SearchProvider } from './components/SearchProvider/SearchProvider'
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login'



const routes = createBrowserRouter([
  {
    path : "/",
    element : <Register/>
  },
  {
    path : "/login",
    element : <Login/>
  },
  {
    path : "/items",
    element : <Items/>,
    children: [
      {
        path : "" ,
        element : <ListItems/>
      },
      {
        path : "additems" ,
        element : <AddItems/>
      },
      {
        path : "editeitems/:id" ,
        element : <EditeItems/>
      },
      {
        path : "favorites" ,
        element : <Favorites/>
      },
      {
        path : "orderlist" ,
        element : <OrderList/>
      },
    ]
  },
  
] , {
  basename:"/"
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchProvider>
      <RouterProvider router={routes}/>
    </SearchProvider>
  </StrictMode>,
)
