import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from "../assets/vcart-logo.png"
import google from "../assets/google.png"
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { AuthDataContext } from '../context/AuthContext';
import axios from "axios"


const Registration = () => {
    let navigate = useNavigate()
    let [show, setShow] = useState(false)
    let {serverUrl} = useContext(AuthDataContext)
    let [name, setName] = useState("")
    let [password, setPassword] = useState("")
    let [email, setEmail] = useState("")

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            console.log(serverUrl)
            const result = await axios.post(`${serverUrl}/api/auth/registration`, {
                name, email, password
            }, {withCredentials: true})
            console.log(result.data)
        } catch (error) {
            console.log(`Signup Error: ${error}`)
        }
    }
    return (
        <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
            <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={() => navigate("/")}>
                <img className='w-[40px]' src={Logo} alt="MCart Logo" />
                <h1 className='text-[22px] font-sans'>Mcart</h1>
            </div>

            <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
                <span className='text-[25px] font-semibold'>Registration Page</span>
                <span className='text-[16px]'>Welcome to MCART, Place your order</span>
            </div>

            <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px]  border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
                <form action="" onSubmit={handleSignup} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>
                    <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer'>
                        <img src={google} alt="Google Logo" className='w-[20px]' />Registration with Google
                    </div>

                    <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
                        <div className='w-[40%] h-[1px] bg-[#96969635]'></div>OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
                    </div>

                    <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
                        <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='UserName' required onChange={(e) => setName(e.target.value)} value={name} />
                        <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email' required onChange={(e) => setEmail(e.target.value)} value={email} />
                        <input type={show ? "text" : "password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} value={password} />
                        {!show && <MdOutlineRemoveRedEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%]' onClick={() => setShow(prev => !prev)} />}
                        {show && <IoEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%]' onClick={() => setShow(prev => !prev)} />}
                        <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>Create Account</button>
                        <p className='flex gap-[10px]'>You have an account already? <span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={() => navigate('/login')}>Login</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration