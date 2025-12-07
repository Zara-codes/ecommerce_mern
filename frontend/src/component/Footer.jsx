import React from 'react'
import logo from "../assets/logo.png"

const Footer = () => {
    return (
        <div className='w-full bg-[#dbfcfcec]'>

            {/* ------- TOP SECTION ------- */}
            <div className='w-full flex flex-col md:flex-row justify-between items-start md:items-center 
                            px-5 md:px-14 py-10 md:py-12'>

                {/* --------- BRAND / ABOUT --------- */}
                <div className='w-full md:w-1/3 flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left'>

                    <div className='flex items-center gap-3'>
                        <img src={logo} alt="MCART Logo" className='w-[35px] h-[35px] md:w-[45px] md:h-[45px]' />
                        <p className='text-[20px] font-semibold text-black mr-[40px]'>MCART</p>
                    </div>

                    <p className='text-[15px] text-[#1e2223] hidden md:block leading-6'>
                        MCART is your all-in-one online shopping destination, offering top-quality products, 
                        unbeatable deals, and fast delivery—all backed by trusted service designed to make life easier.
                    </p>

                    <p className='text-[15px] text-[#1e2223] md:hidden'>
                        Fast, Easy & Reliable Shopping
                    </p>
                </div>

                {/* --------- COMPANY --------- */}
                <div className='w-full md:w-1/4 flex flex-col items-center md:items-start mt-6 md:mt-0'>
                    <p className='text-[20px] font-semibold text-[#1e2223] mb-3'>COMPANY</p>

                    <ul className='flex flex-col gap-1 text-[15px] text-[#1e2223]'>
                        <li className='cursor-pointer'>Home</li>
                        <li className='cursor-pointer'>About Us</li>
                        <li className='cursor-pointer'>Delivery</li>
                        <li className='cursor-pointer'>Privacy Policy</li>
                    </ul>
                </div>

                {/* --------- GET IN TOUCH --------- */}
                <div className='w-full md:w-1/4 flex flex-col items-center md:items-start mt-6 md:mt-0'>
                    <p className='text-[20px] font-semibold text-[#1e2223] mb-3'>GET IN TOUCH</p>

                    <ul className='flex flex-col gap-1 text-[15px] text-[#1e2223]'>
                        <li className='cursor-pointer'>+977-9876543210</li>
                        <li className='cursor-pointer'>contact@mcart.com</li>
                        <li className='cursor-pointer'>+1-123-456-7890</li>
                        <li className='cursor-pointer'>admin@mcart.com</li>
                    </ul>
                </div>

            </div>

            {/* ------- DIVIDER ------- */}
            <div className='w-full h-[1px] bg-slate-400'></div>

            {/* ------- COPYRIGHT ------- */}
            <div className='w-full py-3 text-center text-[14px] text-[#1e2223]'>
                Copyright © 2025 MCART.com — All Rights Reserved
            </div>

        </div>
    )
}

export default Footer
