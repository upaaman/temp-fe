import CardProduct from '@/components/CardProduct'
import Wrapper from '@/components/Wrapper'
import { removeFromWishList } from '@/store/wishListSlice'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const wishList = () => {
    const dispatch = useDispatch();
    const { wishListItems } = useSelector((state => state.wishList))
    // console.log("WishList Items", wishListItems);
    return (
        <Wrapper className="mt-[40px] mb-[90px]">
            {wishListItems?.length > 0 && <>
                <div className=" max-w-[800px] mx-auto text-center mt-8 md:mt-[40px]">
                    <div className="text-[28px]  md:text-[34px] mb-5 font-semibold leading-tight">
                        Your Wishlist
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
                    {
                        wishListItems?.map((item) => {
                            return <div key={item.id} className='flex flex-col items-center gap-y-5'>
                                <CardProduct data={item} />
                                <button
                                    className="w-full max-w-[360px]  py-4 rounded-full bg-black text-white text-lg font-medium 
                                    transition-transform active:scale-95 
                                    mb-3 hover:opacity-75"
                                    onClick={() => {
                                        dispatch(removeFromWishList({ id: item.id }));
                                    }}
                                >Remove from wishlist</button>
                            </div>
                        })
                    }
                </div>
            </>
            }
            {/*-----------------------Empty WISHLIST -----------------------*/}

            {wishListItems?.length === 0 && <div className="flex-[2] flex flex-col items-center pd-[50px] md:-mt-14">
                <Image src="/empty-cart.jpg" height={300} width={300} alt="No Item In Cart"
                    className='md:w-[400px] w-[300px]'></Image>
                <span className="text-xl font-bold">
                    Your wishlist is empty
                </span>
                <span className="text-center mt-4">
                    Looks like you have not added anything in your wishlist.
                    <br />
                    Go ahead and explore top categories.
                </span>
                <Link
                    href="/"
                    className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
                >
                    Continue Shopping
                </Link>
            </div>}
        </Wrapper>
    )
}

export default wishList