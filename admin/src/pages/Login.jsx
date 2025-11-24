import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import axios from "axios"
import { AuthDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import {useNavigate} from "react-router-dom"

const Login = () => {
  let [show, setShow] = useState(false)
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")

  let {serverUrl} = useContext(AuthDataContext)

  let {adminData, getAdmin} = useContext(adminDataContext)
  let navigate = useNavigate()

  const adminLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post(`${serverUrl}/api/auth/adminlogin`, {email, password}, {withCredentials: true})
      getAdmin()
      navigate('/')
      console.log(result.data)
    } catch (error) {
      console.log(`adminLogin error: ${error}`)
    }
  }
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
      <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={() => navigate("/")}>
        <img className='w-[40px]' src={logo} alt="MCart Logo" />
        <h1 className='text-[22px] font-sans'>Mcart</h1>
      </div>

      <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
        <span className='text-[25px] font-semibold'>Admin Login Page</span>
        <span className='text-[16px]'>Welcome to MCART, Apply to Admin Login</span>
      </div>

      <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px]  border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
        <form action="" onSubmit={adminLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>
          
          <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
            <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email' required onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type={show ? "text" : "password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} value={password} />
            {!show && <MdOutlineRemoveRedEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[55%]' onClick={() => setShow(prev => !prev)} />}
            {show && <IoEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[55%]' onClick={() => setShow(prev => !prev)} />}
            <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>Login</button>
            <p className='flex gap-[10px]'>Don't have an account already? <span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={() => navigate('/signup')}>Register</span></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login