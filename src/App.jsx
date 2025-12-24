import React from 'react'
import NavBar from './components/NavBar'
import ViewPaste from './components/ViewPaste'
import Home from './components/Home'
import Paste from './components/Paste'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    {
    path:"/",
    element:
    <div>
      <NavBar />
      <Home />
    </div>
  },
   { 
    path:"/pastes",
    element:
    <div>
      <NavBar />
      <Paste />
    </div>
  },
   {
    path:"/pastes/:id",
    element:
    <div>
      <NavBar />
      <ViewPaste />
    </div>
  },
])


const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
