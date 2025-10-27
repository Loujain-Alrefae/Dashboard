import { Outlet, useLocation, useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar/NavBar"
import SidBar from "../components/SidBar/SidBar"
import { AiOutlineProduct } from "react-icons/ai"
import { CiHeart } from "react-icons/ci"
import { BsListCheck } from "react-icons/bs"
import { CgLogOff } from "react-icons/cg"
import { useEffect, useRef, useState } from "react"
import { toast, ToastContainer } from 'react-toastify'




// Main layout component for the /items route and its nested pages
const Items = () => {
    // Theme mode state (light/dark), initialized from localStorage
        const [mode , setMode] = useState(() => {
                const theme = localStorage.getItem("mode");
                return theme === "true"
        })
        // Update localStorage whenever mode changes
        useEffect(()=>{
            localStorage.setItem("mode" ,mode.toString())
        },[mode])

    return (
        <>
            <div className={`w-screen h-screen ${mode ? "dark" : ""} dark:bg-[#1A2432]` }>
                <div >
                    {/* Top navigation bar */}
                    <NavBar setMode ={setMode} mode={mode}/>
                </div>
                {/* Main content area sidebar + page content */}
                <div className=" w-screen h-[89vh] flex ">
                    <div className=" w-[20%]  h-full ">
                        <SidBar  defColor ="Dash" title ="Stack" 
                        itemes = {[
                            {icon : <AiOutlineProduct className=" text-[25px]"/> , content : "Products" , url : "/items"},
                            {icon : <CiHeart className=" text-[25px]"/> , content : "Favorites" , url : "/items/favorites"},
                            {icon : <BsListCheck className=" text-[25px]"/> , content : "Order Lists" , url : "/items/orderlist"}
                        ]}
                        btn = {{icon : <CgLogOff className=" text-[25px]"/> , content : "Logout" }}
                        />
                    </div>
                    <div className='flex-1 overflow-y-auto p-6 bg-bginput dark:bg-[#1A2432] dark:text-white'>
                        {/* Renders nested routes inside /items */}
                        <Outlet  />
                    </div>
                </div>
                <ToastContainer />
            </div>
            
        </>
    )
}

export default Items

