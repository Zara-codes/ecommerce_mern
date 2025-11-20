import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Registration from './pages/Registration'
import Login from './pages/Login'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Registration />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
