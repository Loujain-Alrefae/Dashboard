import axios from "axios"
import { toast, ToastContainer } from 'react-toastify'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from "react"

// Sidebar component that receives a list of navigation items and a logout button
const SidBar = ({ itemes , btn}) => {
    // State to control the visibility of the logout confirmation popup
    const [popup , setPopup] = useState(false)
    const show = () =>{
        setPopup(!popup)
    }
    const  navigate = useNavigate()
     // Logout function sends a POST request to the logout endpoint
    const logout = () =>{
        axios.post("https://vica.website/api/logout" , null ,{
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token"),
                "Accept" : "application/json"
            }
        })
        .then(res => {
            console.log(res)
            // Clear user data from localStorage
            localStorage.removeItem("token")
            localStorage.removeItem("userData")
            // Redirect to login page
            navigate("/login")
            // Show success toast after a short delay
            setTimeout(() => {
                toast.success("You have been logged out successfully", {
                    position: "top-right",
                    autoClose: 3000,
            })}, 500)
        })
        .catch(err => console.log(err))
    }
    return (
        <>
        {/* Sidebar container with dark mode support */}
            <div className=" w-[100%]  h-full relative dark:bg-[#253143] dark:text-white">
                <div className=" flex flex-col  gap-3 py-11 relative">
                    {itemes?.map((item , index) =>{
                        return(
                            <NavLink to={item.url} end={item.url === "/items"}
                                className={({ isActive }) =>
                                    isActive
                                    ? 'relative flex items-center gap-4 px-[70px] h-[45px]'
                                    : 'flex items-center gap-4 px-[70px] h-[45px]'
                                }
                            >{/* Highlight active link with a colored bar */}
                                {({ isActive }) => (
                                    <>
                                        {isActive && (
                                            <span className="absolute left-0 top-0 h-full w-[6px] bg-myprimary transform rounded-r-[8px]"></span>
                                        )}
                                        {item.icon} {item.content}
                                    </>
                                )}
                            </NavLink>
                        )
                    })}
                </div>
                {/* Logout button at the bottom of the sidebar */}
                <button onClick={show} className="  w-[230px] mx-auto h-11 mt-auto mb-4 flex justify-center items-center gap-2 bg-myprimary text-white rounded-lg font-semibold cursor-pointer text-lg absolute bottom-0 left-[50%] -translate-[50%]">{btn?.icon} {btn?.content}</button>
                <ToastContainer />
            </div>
            {/* Logout confirmation popup */}
            {popup && 
                <div className='  w-screen h-screen bg-[#000000b2] fixed top-0 left-0 z-10 '>
                    <div className=' w-[400px] p-10 bg-white dark:bg-[#1A2432] dark:text-white flex justify-center items-center flex-col gap-9 absolute top-0 left-[50%] -translate-x-[50%] rounded-b-2xl'>
                        <p className=" text-xl">Do you want to logout?</p>
                        <div className=' flex gap-10'>
                            {/* Cancel button */}
                            <button onClick={show} className=' w-[100px] py-1.5 rounded-[8px] bg-[#E0EAF8] cursor-pointer dark:text-[#1A2434]'>No</button>
                            {/* Confirm logout button */}
                            <button onClick={logout} className='w-[100px] py-1.5 rounded-[8px] bg-[#C53728] text-white cursor-pointer'>Yes</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SidBar
