import React from 'react'
import logo from "../assets/logo.png"

const Footer = () => {
  return (
    <div className='w-[100%] md:h-[36vh] h-[21vh] mb-[77px] md:mb-[0px]'>
      <div className='w-[100%] md:h-[30vh] h-[15vh] md:mb-[0px] bg-[#dbfcfcec] flex items-center justify-center md:px-[50px] px-[5px] py-[5px] flex'>
        <div className='w-full md:w-1/3 h-[100%] flex items-start justify-center flex-col md:flex-row gap-[5px]'>
          <div className='flex items-start justify-start gap-[5px] mt-[10px] md:mt-[40px]'>
            <img src={logo} alt="MCART Logo" className='md:w-[40px] md:h-[40px] w-[30px] h-[30px]' />
            <p className='text-[19px] md:text-[20px] text-[black]'>MCART</p>
          </div>

          <p className='text-[15px] text-[#1e2223] hidden md:block'>MCART is your all-in-one online shopping destination, offering top-quality products, unbeatable deals, and fast delivery-all backed by trusted service designed to make your life easier every day.</p>
          <p className='text-[15px] text-[#1e2223] flex md:hidden'>Fast, Easy, Reliable MCART Shopping</p>
        </div>
        <div className='w-full md:w-1/4 h-[100%] flex items-center justify-center flex-col text-center'>
          <div className='flex items-center justify-center gap-[5px] mt-[10px] md:mt-[40px]'>
            <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans'>COMPANY</p>
          </div>

          <ul>
            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>Home</li>
            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>About Us</li>
            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>Delivery</li>
            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>

        <div className='w-full md:w-1/4 h-[100%] flex items-center justify-center flex-col text-center'>
          <div className='flex items-center justify-center gap-[5px] mt-[10px] md:mt-[40px]'>
            <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans'>GET IN TOUCH</p>
          </div>
          <ul>
            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>+977-9876543210</li>
            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>contact@mcart.com</li>
            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>+1-123-456-7890</li>
            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>admin@mcart.com</li>
          </ul>
        </div>
      </div>

      <div className='w-[100%] h-[1px] bg-slate-400'></div>
      <div className='w-[100%] h-[5px] bg-[#dbfcfcec] flex items-center justify-center'>Copyright 2025@mcart.com-All Rights Reserved</div>
    </div>
  )
}

export default Footer