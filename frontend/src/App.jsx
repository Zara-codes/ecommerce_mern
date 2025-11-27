import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Nav from './component/Nav'
import { useContext } from 'react'
import { userDataContext } from './context/UserContext'
import About from './pages/About'
import Contact from './pages/Contact'
import Collections from './pages/Collections'
import Product from './pages/Product'
import ProductDetail from './pages/ProductDetail'

function App() {
  let { userData } = useContext(userDataContext)
  let location = useLocation()

  return (
    <>
      {userData && <Nav />}
      <Routes>
        <Route path='/signup' element={
          userData ? (<Navigate to={location.state?.from || "/"} />)
            : (<Registration />)
        } />

        <Route path='/login'
          element={
            userData ? (<Navigate to={location.state?.from || "/"} />)
              : (<Login />)
          } />

        <Route path='/'
          element={userData ? <Home /> : <Navigate to="/login"
            state={{ from: location.pathname }} />} />
        <Route path='/about' element={userData ? <About /> : <Navigate to="/login"
          state={{ from: location.pathname }} />} />
        <Route path='/collections' element={userData ? <Collections /> : <Navigate to="/login"
          state={{ from: location.pathname }} />} />
        <Route path='/product' element={userData ? <Product /> : <Navigate to="/login"
          state={{ from: location.pathname }} />} />
        <Route path='/contact' element={userData ? <Contact /> : <Navigate to="/login"
          state={{ from: location.pathname }} />} />
        <Route path='/productdetail/:productId' element={userData ? <ProductDetail /> : <Navigate to="/login"
          state={{ from: location.pathname }} />} />
      </Routes>
    </>
  )
}

export default App
