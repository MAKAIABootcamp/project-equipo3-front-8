import React from 'react'
import Home from '../pages/Home'
import { Routes, Route } from 'react-router-dom'
import PublicRouter from './PublicRouter'
import PrivateRoutes from './PrivateRoutes'


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>} />
        <Route element={<PublicRouter isAutenticate={false} />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route element={<PrivateRoutes isAutenticate={false}/>}>
            <Route path='news' element={<News/>}>
                <Route path=':newid' element={<NewDetalles/>} />
            </Route>
        </Route>
    </Route>
    </Routes>
  )
}

export default AppRouter