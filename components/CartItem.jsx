import { removeCartItem, updateCart } from '@/store/cartSlice'
import Image from 'next/image'
import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri"
import { useDispatch } from 'react-redux'


const CartItem = ({ data }) => {
    const dispatch=useDispatch();
    const updateCartItem = (e, key) => {
        let payload = {
            key,
            val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
            id: data.id,
        };
        dispatch(updateCart(payload));
    };
    return (
        <div className="flex py-5 gap-3 md:gap-5 border-b">
            {/* Image start  */}
            <div className="shrink-0 aspect-square w-[100px] md:w-[140px]">
                <Image src={data.attributes.thumbnail.data.attributes.url} height={130} width={130} />
            </div>
            {/* Image end */}

            <div className='flex flex-col w-full'>
                <div className="flex flex-col md:flex-row gap-x-5 md:items-center justify-between">
                    {/* PRODUCT TITLE */}
                    <div className="text-lg md:text-xl font-semibold text-black/[0.8]">
                        {data?.attributes.name}
                    </div>
                    {/* PRODUCT SUBTITLE */}
                    <div className="text-sm md:text-md  font-medium text-black/[0.5] block md:hidden">
                        {data?.attributes.subtitle}
                    </div>

                    {/* PRODUCT PRICE */}
                    <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
                        Price:&#8377;{data?.attributes.price}
                    </div>
                    {/* PRODUCT SUBTITLE */}
                    <div className="text-md font-medium text-black/[0.5] hidden md:block">
                        {data?.attributes.subtitle}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
                            <div className='flex items-center gap-1'>
                                <div className='font-semibold'>Size:</div>
                                {/* --------------------Size Selection */}
                                <select className='hover:text-black'
                                onChange={(e)=>updateCartItem(e,"sizeSelect")}>
                                    {data?.attributes?.size?.data?.map((item, i) => {
                                        return (
                                            <option
                                                value={item.size}
                                                key={i}
                                                selected={data.sizeSelect === item.size}
                                                disabled={item.enabled ? false : true}
                                            >
                                                {item.size}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>


                            <div className='flex items-center gap-1'>
                                <div className='font-semibold'>Quantity</div>
                                {/* --------------------quantity Selection */}
                                <select className='hover:text-black'
                                    onChange={(e) => updateCartItem(e,"quantity")}>
                                    {Array.from(
                                        { length: 10 },
                                        (_, i) => i + 1
                                    ).map((q, i) => {
                                        return (
                                            <option
                                                key={i}
                                                value={q}
                                                selected={data.quantity === q}
                                            >
                                                {q}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <RiDeleteBin6Line
                            onClick={()=>dispatch(removeCartItem({id:data.id}))}
                            className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem