import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import RelatedProduct from '../component/RelatedProduct';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(shopDataContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  const [size, setSize] = useState('')

  useEffect(() => {
    const item = products.find(p => p._id === productId)
    if (item) {
      setProductData(item)
      setImage1(item.image1)
      setImage2(item.image2)
      setImage3(item.image3)
      setImage4(item.image4)
      setImage(item.image1)
    }
  }, [products, productId])

  if (!productData) return <div className='opacity-0'></div>

  return (
    <div>
      {/* Top Section */}
      <div className='lg:w-[99vw] w-[100vw] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col lg:flex-row gap-[20px] pt-[80px]'>

        {/* Left: Images (kept same style) */}
        <div className='lg:w-[50vw] md:w-[90vw] mt-[70px] flex items-center justify-center md:gap-[10px] gap-[30px] flex-col-reverse lg:flex-row lg:h-auto'>
          <div className='lg:w-[20%] md:w-[80%] flex items-center justify-center gap-[50px] sm:gap-[20px] md:gap-[20px] lg:gap-[20px] lg:flex-col flex-wrap'>
            {[image1, image2, image3, image4].map((img, idx) => (
              <div key={idx} className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md'>
                <img
                  src={img}
                  alt={`Product ${idx + 1}`}
                  className='w-[100%] h-[100%] cursor-pointer rounded-md'
                  onClick={() => setImage(img)}
                />
              </div>
            ))}
          </div>

          <div className='lg:w-[60%] w-[80%] border-[1px] border-[#80808049] rounded-md overflow-hidden'>
            <img src={image} alt="Product" className='w-[100%] h-auto rounded-md object-fill' />
          </div>
        </div>

        {/* Right: Info */}
        <div className='lg:w-[50vw] w-[100vw] lg:mt-[80px] flex flex-col py-[20px] px-[30px] gap-[10px]'>
          <h1 className='text-[40px] font-semibold text-[aliceblue]'>{productData.name.toUpperCase()}</h1>

          <div className='flex items-center gap-1'>
            <FaStar className='text-[20px] fill-[#FFD700]' />
            <FaStar className='text-[20px] fill-[#FFD700]' />
            <FaStar className='text-[20px] fill-[#FFD700]' />
            <FaStar className='text-[20px] fill-[#FFD700]' />
            <FaStarHalfStroke className='text-[20px] fill-[#FFD700]' />
            <p className='text-[18px] font-semibold pl-[5px] text-[white]'>(124)</p>
          </div>

          <p className='text-[30px] font-semibold pl-[5px] text-[white]'>{currency} {productData.price}</p>

          {/* Description flows naturally */}
          <p className='w-[80%] md:w-[60%] text-[20px] font-semibold pl-[5px] text-[white]'>
            {productData.description}
          </p>

          {/* Size & Add to Cart */}
          <div className='flex flex-col gap-[10px] my-[10px]'>
            <p className='text-[25px] font-semibold pl-[5px] text-[white]'>Select Size</p>
            <div className='flex gap-2 flex-wrap'>
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  className={`border py-2 px-4 bg-slate-300 rounded-md ${item === size ? 'bg-black text-[#2f97f1] text-[20px]' : ''}`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              className='text-[16px] cursor-pointer bg-[#495b61c9] py-[10px] px-[20px] rounded-2xl mt-[10px] border-[1px] border-[#80808049] text-white shadow-md shadow-black'
              onClick={() => {
                if (size) {
                  addToCart(productData._id, size);
                  toast.success(`Product (${productData.name}) added to cart`);
                } else {
                  toast.error("Please select a size first");
                }
              }}
            >
              Add To Cart
            </button>
          </div>

          <div className='w-[90%] h-[1px] bg-slate-700 mt-2'>
            <div className='w-[80%] text-[16px] text-white'>
              <p>100% Original Product.</p>
              <p>50% Cash on delivery is available on this product</p>
              <p>Easy return and exchange policy within 3 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className='lg:pt-[0px] md:pt-[150px] sm:pt-[150px] pt-[200px] px-[20px] w-[100%] min-h-[50vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col gap-4'>
        <div className='flex gap-2 lg:ml-[120px]'>
          <p className='border px-5 py-3 text-sm text-white'>Description</p>
          <p className='border px-5 py-3 text-sm text-white'>Reviews(124)</p>
        </div>

        <div className='w-[80%] bg-[#3336397c] border text-white text-[13px] md:text-[15px] lg:text-[20px] px-[10px] md:px-[30px] lg:ml-[100px] mt-[40px] rounded-md'>
          <p className='w-[95%] h-[90%] flex items-center justify-center'>
            Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on MCART. Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting, this shirt is a must-have essential for those who value both fashion and function.
          </p>
        </div>

        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />
      </div>
    </div>
  )
}

export default ProductDetail
