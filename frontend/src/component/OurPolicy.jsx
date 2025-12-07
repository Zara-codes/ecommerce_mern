import React from 'react'
import Title from './Title'
import { RiExchangeFundsFill } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

const OurPolicy = () => {
  return (
    <div className='w-screen min-h-screen md:min-h-[70vh] flex flex-col items-center bg-gradient-to-l from-[#141414] to-[#0c2025] gap-12'>

      {/* Title Section */}
      <div className='text-center mt-20 px-4'>
        <Title text1={"OUR "} text2={"POLICY"} />
        <p className='text-[14px] md:text-[20px] text-blue-100 mt-2'>
          Customer-Friendly Policies - Committed to Your Satisfaction and Safety.
        </p>
      </div>

      {/* Policies Section */}
      <div className='w-full flex flex-wrap justify-center items-center gap-10 lg:gap-20 pb-10'>

        {/* Card 1 */}
        <div className='w-[400px] max-w-[90%] flex flex-col items-center text-center gap-3'>
          <RiExchangeFundsFill className='w-[35px] h-[35px] md:w-[60px] md:h-[60px] text-[#90b9ff]' />
          <p className='font-semibold text-[19px] md:text-[25px] text-[#a5e8f7]'>Easy Exchange Policy</p>
          <p className='text-[12px] md:text-[18px] text-[aliceblue]'>
            Exchange Made Easy - Quick, Simple And Customer-Friendly Process.
          </p>
        </div>

        {/* Card 2 */}
        <div className='w-[400px] max-w-[90%] flex flex-col items-center text-center gap-3'>
          <TbRosetteDiscountCheckFilled className='w-[35px] h-[35px] md:w-[60px] md:h-[60px] text-[#90b9ff]' />
          <p className='font-semibold text-[19px] md:text-[25px] text-[#a5e8f7]'>7 Days Return Policy</p>
          <p className='text-[12px] md:text-[18px] text-[aliceblue]'>
            Shop with Confidence - 7 Days Easy Return Guarantee.
          </p>
        </div>

        {/* Card 3 */}
        <div className='w-[400px] max-w-[90%] flex flex-col items-center text-center gap-3'>
          <BiSupport className='w-[35px] h-[35px] md:w-[60px] md:h-[60px] text-[#90b9ff]' />
          <p className='font-semibold text-[19px] md:text-[25px] text-[#a5e8f7]'>Best Customer Support</p>
          <p className='text-[12px] md:text-[18px] text-[aliceblue]'>
            Trusted Support - Your Satisfaction Is Our Priority.
          </p>
        </div>

      </div>
    </div>
  )
}

export default OurPolicy
