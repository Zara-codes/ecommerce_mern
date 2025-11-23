import React from 'react'
import background1 from "../assets/background1.jpg"
import background2 from "../assets/background2.jpg"
import background3 from "../assets/background3.jpg"
import background4 from "../assets/background4.jpg"

const Background = ({ heroCount }) => {

    if (heroCount === 0) {
        return <img src={background2} alt="Background Image First" className='w-[100%] h-[100%] float-left overflow-auto object-cover' />
    } else if (heroCount === 1) {
        return <img src={background1} alt="Background Image Second" className='w-[100%] h-[100%] float-left overflow-auto object-cover' />
    } else if (heroCount === 2) {
        return <img src={background3} alt="Background Image Third" className='w-[100%] h-[100%] float-left overflow-auto object-cover' />
    } else if (heroCount === 3) {
        return <img src={background4} alt = "Background Image Fourth" className='w-[100%] h-[100%] float-left overflow-auto object-cover' />
    }

}

export default Background