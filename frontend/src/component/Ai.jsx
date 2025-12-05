import React, { act, useContext, useState } from 'react'
import ai from "../assets/ai.png"
import { shopDataContext } from '../context/ShopContext'
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify'
// import open from "../assests/open.mp3"

const Ai = () => {
    let {showSearch, setShowSearch} = useContext(shopDataContext)
    let navigate = useNavigate()
    let [activeAi, setActiveAi] = useState(false)
    // let openingSound = new Audio(open)

    function speak(message) {
        let utterance = new SpeechSynthesisUtterance(message)
        window.speechSynthesis.speak(utterance)
    }

    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    const recognition = new speechRecognition()

    if (!recognition) {
        console.log("Not supported")
    }
    
    recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript.trim()
        if (transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("open") && !showSearch) {
            speak("Opening Search")
            setShowSearch(true)
            navigate("/collection")
        } else if (transcript.toLowerCase().includes("search") && showSearch) {
            speak("Closing Search")
            setShowSearch(false)
        } else if (transcript.toLowerCase().includes("collection") || transcript.toLowerCase().includes("collections") || transcript.toLowerCase().includes("product") || transcript.toLowerCase().includes("products")) {
            speak("Opening collection page")
            navigate('/collection')
        } else if (transcript.toLowerCase().includes("about") || transcript.toLowerCase().includes("aboutpage")) {
            speak("Opening about page")
            navigate('/about')
            setShowSearch(false)
        } else if (transcript.toLowerCase().includes("home") || transcript.toLowerCase().includes("homepage")) {
            speak("Opening home page")
            navigate('/')
            setShowSearch(false)
        } else if (transcript.toLowerCase().includes("cart") || transcript.toLowerCase().includes("kaat") || transcript.toLowerCase().includes("caat")) {
            speak("Opening your cart")
            navigate('/cart')
            setShowSearch(false)
        } else if (transcript.toLowerCase().includes("contact")) {
            speak("Opening contact page")
            navigate('/contact')
            setShowSearch(false)
        } else if (transcript.toLowerCase().includes("order") || transcript.toLowerCase().includes("myorders")|| transcript.toLowerCase().includes("orders")|| transcript.toLowerCase().includes("my order")) {
            speak("Opening your orders page")
            navigate('/order')
            setShowSearch(false)
        } else {
            toast.error("Try Again")
        }
    }

    recognition.onend = () => {
        setActiveAi(false)
    }

  return (
    <div className='fixed lg:bottom-[20px] md:bottom-[80px] left-[2%]'
     onClick={() => {
        recognition.start()
        // openingSound.play()
        setActiveAi(true)
        }}>
        <img src={ai} alt="AI image" className={` bg-gray-400 rounded-full p-[10px] w-[100px] cursor-pointer ${activeAi ? 'translate-x-[10%] translate-y-[0] scale-125' : 'translate-x-[0] translate-y-[0] scale-100'} transition-transform`} style={{filter: `${activeAi ? "drop-shadow(0px 0px 30px #00d2fc)" : "drop-shadow(0px 0px 20px black)"}`}} />
    </div>
  )
}

export default Ai