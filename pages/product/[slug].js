import ProductDetailsCarousel from '@/components/ProductDetailsCarousel'
import RelatedProducts from '@/components/RelatedProducts'
import Wrapper from '@/components/Wrapper'
import { addToCart } from '@/store/cartSlice'
import { addToWishList, removeFromWishList } from '@/store/wishListSlice'
import { fetchDataFromApi } from '@/utils/api'
import { getDiscountPErcentage } from '@/utils/helperFunctions'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AiFillHeart} from "react-icons/ai"

const ProductDetails = ({ products, product }) => {
    const [sizeSelect, setSizeSelect] = useState();
    const [showError, setShowError] = useState(true);
    const dispatch = useDispatch();
    const router = useRouter()
    const { cartItems } = useSelector((state => state.cart));
    const { wishListItems } = useSelector((state => state.wishList));
    console.log("Printing wish list items",wishListItems);

    const p = product?.data?.[0].attributes;
    // console.log("product data ", product)
    //search for item in cart ..if it already in cart then show different button
    const item = cartItems?.find((p) =>
        p.id == product?.data?.[0].id)

    // wishlist items check
    const presentInWish = wishListItems?.find((q) =>
        q?.id == product?.data?.[0].id)
    console.log("present in wish list ",presentInWish);

    const notifyCart = () => {
        toast.success('Successfully added to cart', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    const notifyAddedToWish = () => {
        toast('Added to WishList ❤️', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    const notifyRemoveWish = () => {
        toast('Removed from WishList 💔', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    return (
        <div className="w-full md:py-20">
            <ToastContainer />
            <Wrapper>
                <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                    {/* ------------------------------left column start------------------------------ */}
                    <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                        <ProductDetailsCarousel images={p.image.data} />
                    </div>
                    {/* left column end */}
                    {/* -----------------------right column start ---------------------*/}
                    <div className="flex-[1] py-3">
                        {/* PRODUCT TITLE */}
                        <div className="text-[34px] font-semibold mb-2 leading-tight">
                            {p.name}
                        </div>
                        {/* PRODUCT SUBTITLE */}
                        <div className="text-lg font-semibold mb-5">
                            {p.subtitle}
                        </div>
                        {/* PRODUCT PRICE */}
                        <div className="flex items-center">
                            <p className="mr-2 text-lg font-semibold">
                                MRP:&#8377;{p?.price}
                            </p>
                            {p.original_price && (
                                <>
                                    <p className="text-base  font-medium line-through">
                                        &#8377;{p.original_price}
                                    </p>
                                    <p className="ml-auto text-base font-medium text-green-500">
                                        {getDiscountPErcentage(
                                            p.original_price,
                                            p.price
                                        )}
                                        % off
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="text-md font-medium text-black/[0.5]">
                            incl. of taxes
                        </div>
                        <div className="text-md font-medium text-black/[0.5] mb-20">
                            {`(Also includes all applicable duties)`}
                        </div>
                        {/* ---------------PRODUCT SIZE RANGE START -----------*/}
                        <div className="mb-10">
                            {/* HEADING START */}
                            <div className="flex justify-between mb-2">
                                <div className="text-md font-semibold">
                                    Select Size
                                </div>
                                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                                    Select Guide
                                </div>
                            </div>
                            {/* HEADING END */}

                            {/* SIZE START */}
                            <div
                                id="sizesGrid"
                                className="grid grid-cols-3 gap-2"
                            >

                                {p?.size?.data.map((item, i) => (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            setShowError(false);
                                            setSizeSelect(item.size);
                                        }}
                                        className={`border rounded-md text-center py-3 font-medium ${item.enabled ?
                                            "hover:border-black cursor-pointer" :
                                            "cursor-not-allowed bg-black/[0.1] opacity-40 "}
                                            ${sizeSelect === item.size ? "border-black border-2" : ""}`
                                        }>
                                        {item.size}
                                    </div>
                                ))}

                            </div>
                            {/* SIZE END */}

                            {/* SHOW ERROR START */}

                            {showError && (!item) && <div className="text-red-600 mt-1">
                                Size selection is required
                            </div>}

                            {/* SHOW ERROR END */}
                        </div>
                        {/* PRODUCT SIZE RANGE END */}

                        {/* ADD TO CART BUTTON START */}
                        {item ?
                            <button
                                className="w-full py-4 group rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 
                            mb-3 hover:opacity-75"
                                onClick={() => {
                                    router.push("/cart");
                                }}
                            >
                                <h1 className='block group-hover:hidden'>Item In Cart</h1>
                                <h1 className="hidden group-hover:block">View Cart</h1>
                            </button> :
                            <button
                                className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95
                                mb-3 hover:opacity-75"
                                onClick={() => {
                                    if (!sizeSelect) {
                                        setShowError(true);
                                        document.getElementById("sizesGrid").scrollIntoView({
                                            block: "center",
                                            behavior: "smooth"
                                        })
                                    }
                                    else {
                                        dispatch(addToCart({
                                            ...product?.data?.[0],
                                            sizeSelect,
                                            singleItemPrice: p.price
                                        }))
                                        notifyCart();
                                    }
                                }}
                            >
                                Add To Cart
                            </button>}


                        {/* ADD TO CART BUTTON END */}

                        {/* WHISHLIST BUTTON START */}
                        {
                            presentInWish ?
                                <button className="w-full 00 py-4 rounded-full border border-black text-lg font-medium transition-transform
                            active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10"
                                    onClick={() => {
                                        dispatch(removeFromWishList({ id: presentInWish?.id }));
                                        // router.push("/wishList");
                                        notifyRemoveWish();
                                    }}
                                >
                                    Whishlist
                                    <AiFillHeart className='text-red-600' size={22} />
                                </button>
                                :
                                <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform
                                                active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10"
                                    onClick={() => {
                                        dispatch(addToWishList({
                                            ...product?.data?.[0]
                                        }));
                                        // router.push("/wishList");
                                        notifyAddedToWish();
                                    }}
                                >
                                    Whishlist
                                    <IoMdHeartEmpty  size={22} />
                                </button>

                        }



                        {/* WHISHLIST BUTTON END */}

                        <div>
                            <div className="text-lg font-bold mb-5">
                                Product Details
                            </div>
                            <div className="markdown text-md mb-5">
                                <ReactMarkdown>
                                    {p.description}

                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                    {/* right column end */}
                </div>
                <RelatedProducts products={products} />
            </Wrapper>
        </div>
    )
}
export default ProductDetails




export async function getStaticPaths() {
    const products = await fetchDataFromApi("/api/products?populate=*");
    const paths = products?.data?.map((p) => ({
        params: {
            slug: p.attributes.slug,
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params: { slug } }) {
    const product = await fetchDataFromApi(
        `/api/products?populate=*&filters[slug][$eq]=${slug}`
    );
    const products = await fetchDataFromApi(
        `/api/products?populate=*&[filters][slug][$ne]=${slug}`
    );

    return {
        props: {
            product,
            products
        },
    };
}