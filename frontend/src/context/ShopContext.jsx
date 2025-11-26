import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthDataContext } from './AuthContext'
import axios from 'axios'

export const shopDataContext = createContext()

const ShopContext = ({children}) => {

    let [products, setProducts] = useState([])
    let [search, setSearch] = useState('')
    let [showSearch, setShowSearch] = useState(false)
    let {serverUrl} = useContext(AuthDataContext)
    let currency = "Rs."
    let delivery_fee = 100

    const getProducts = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/product/list`)
            console.log(result.data)
            setProducts(result.data)
        } catch (error) {
            console.log(`getProducts Error: ${error}`)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    let value = {
        products, currency, delivery_fee, getProducts, search, setSearch, showSearch, setShowSearch
    }

  return (
    <div>
        <shopDataContext.Provider value={value}>
            {children}
        </shopDataContext.Provider>
    </div>
  )
}

export default ShopContext