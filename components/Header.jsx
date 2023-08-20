import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";


import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { fetchDataFromApi } from "@/utils/api"
import { FaChessKing } from "react-icons/fa";
import { useSelector } from "react-redux";


const Header = () => {
    const { cartItems } = useSelector((state => state.cart))
    const { wishListItems } = useSelector((state => state.wishList))
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showCatMenu, setShowCatMenu] = useState(false);
    const [show, setShow] = useState("translate-y-0");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [categories, setCategories] = useState(null);

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("-translate-y-[80px]");
            } else {
                setShow("shadow-sm");
            }
        } else {
            setShow("translate-y-0");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    useEffect(() => {
        fetchCategoriesData();
    }, []);

    const fetchCategoriesData = async () => {
        const { data } = await fetchDataFromApi("/api/categories?populate=*")
        setCategories(data)
    };
    return (

        <header className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between sticky z-20 top-0 transition-transform
        duration-300 ${show}`}><Wrapper className="flex justify-between h-[60px] items-center">
                <Link href={"/"}>
                    <img src="/logo.png" className="w-[100px] md:w-[130px]" alt="FootPrint" />
                </Link>


                <Menu
                    showCatMenu={showCatMenu}
                    setShowCatMenu={setShowCatMenu}
                    categories={categories} />

                {mobileMenu &&

                    <MenuMobile
                        showCatMenu={showCatMenu}
                        setShowCatMenu={setShowCatMenu}
                        setMobileMenu={setMobileMenu}
                        categories={categories}
                    />


                }
                <div className="flex items-center text-black gap-2">
                    {/*-------------------------------- icon start------------------------------ */}
                    <Link href={"/wishList"}>
                    <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center
            items-center hover:bg-black/[0.05] cursor-pointer relative">
                        <IoMdHeartEmpty className="text-[21px] md:text-[26px]" />
                        <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute
                    top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                           {wishListItems?.length}
                        </div>
                    </div>
                    </Link>
                    <Link href={"/cart"}>
                        <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center
            items-center hover:bg-black/[0.05] cursor-pointer relative">
                            <BsCart className="text-[15px] md:text-[20px]" />
                            <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute
                    top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                                {cartItems?.length}
                            </div>
                        </div>
                    </Link>
                    {/* --------------------------------icon end -----------------------------------*/}


                    {/* --------------------------------Mobile menu icon start -----------------------------------*/}
                    <div className="w-8 md:w-12 h-8 md:h-12 rounded-full md:hidden flex justify-center
            items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
                        {
                            mobileMenu ? (
                                <VscChromeClose className="tect-[16px]"
                                    onClick={() => setMobileMenu(false)} />
                            ) :
                                (<BiMenuAltRight className="tect-[20px]"
                                    onClick={() => setMobileMenu(true)} />)
                        }
                    </div>
                    {/* --------------------------------Mobile menu icon End -----------------------------------*/}




                </div>
            </Wrapper>
        </header>);
};

export default Header;
