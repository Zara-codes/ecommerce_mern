// import React, { useContext } from 'react'
// import { shopDataContext } from '../context/ShopContext'
// import Title from './Title'

// const CartTotal = () => {
//     const {currency, delivery_fee, getCartAmount} = useContext(shopDataContext) 
//   return (
//     <div className='w-full lg:ml-[30px]'>
//         <div className='text-xl py-[10px]'>
//             <Title text1={'CART '} text2={'TOTAL'} />
//         </div>

//         <div className='flex flex-col gap-2 mt-2 text-sm p-[30px] border-[2px] border-[#4d8890]'>
//             <div className='flex justify-between text-white text-[18px] p-[10px]'>
//                 <p>SubTotal</p>
//                 <p>{currency} {getCartAmount()}.00</p>
//             </div>
//             <hr/>
//             <div className='flex justify-between text-white text-[18px] p-[10px]'>
//                 <p>Shipping Fee</p>
//                 <p>{currency} {delivery_fee}</p>
//             </div>
//             <hr/>
//             <div className='flex justify-between text-white text-[18px] p-[10px]'>
//                 <b>Total</b>
//                 <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</b>
//             </div>
//             <hr/>
//         </div>
//     </div>
//   )
// }

// export default CartTotal

import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = ({ itemId, size }) => {
    const { currency, delivery_fee, getSingleCartAmount } = useContext(shopDataContext) 

    if (!itemId || !size) return null // nothing to show if not provided

    const subtotal = getSingleCartAmount(itemId, size)
    const total = subtotal + delivery_fee

    return (
        <div className='w-full lg:ml-[30px]'>
            <div className='text-xl py-[10px]'>
                <Title text1={'CART '} text2={'TOTAL'} />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm p-[30px] border-[2px] border-[#4d8890]'>
                <div className='flex justify-between text-white text-[18px] p-[10px]'>
                    <p>SubTotal</p>
                    <p>{currency} {subtotal.toFixed(2)}</p>
                </div>
                <hr/>
                <div className='flex justify-between text-white text-[18px] p-[10px]'>
                    <p>Shipping Fee</p>
                    <p>{currency} {delivery_fee.toFixed(2)}</p>
                </div>
                <hr/>
                <div className='flex justify-between text-white text-[18px] p-[10px]'>
                    <b>Total</b>
                    <b>{currency} {total.toFixed(2)}</b>
                </div>
                <hr/>
            </div>
        </div>
    )
}

export default CartTotal
