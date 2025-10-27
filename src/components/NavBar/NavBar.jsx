import { useContext } from "react"
import { FaMoon } from "react-icons/fa"
import { IoIosSearch } from "react-icons/io"
import { SearchContext } from "../SearchProvider/SearchProvider"
import { FiSun } from "react-icons/fi"

// NavBar component receives setMode and mode as props to control theme switching
const NavBar = ({setMode , mode}) => {
    // Retrieve user data from localStorage and parse it
    const userData =JSON.parse( localStorage.getItem("userData"))
     // Access setSearchProduct from SearchContext to update search input value
    const {setSearchProduct} = useContext(SearchContext)
    return (
        // Navigation bar container with dark mode background support
        <nav className=" flex justify-between items-center h-[80px] px-[70px] dark:bg-[#253143]  ">
            <div>
                <div className=" flex gap-[120px] ">
                    <p className=" text-3xl font-bold"><span className=" text-myprimary ">Dash</span>Stack</p>
                    {/* Search input with icon */}
                    <div className=" relative">
                        <IoIosSearch className=" absolute left-[3%] top-[25%] text-lg" />
                        <input className=" w-[400px] px-9 py-1 rounded-3xl border-solid border-[2px] border-[#d7d7d7] outline-[#bebec0] bg-bginput"
                            type="search" placeholder='Search a Product ...' onChange={(event)=> setSearchProduct(event.target.value)}/>
                    </div>
                </div>
            </div>
            {/* Right section User info and theme toggle */}
            <div className=" flex gap-6 justify-between items-center ">
                 {/* User profile info with image and name */}
                <div className=" flex gap-6 pr-[24px] border-solid border-r-[2px] border-black dark:border-white">
                    <img src={userData?.profile_image_url} alt="" className=" w-14 h-14 rounded-[50%] " />
                    <div >
                        <span className=" dark:text-white">{userData?.first_name}</span>
                        <span className=" dark:text-white">{" " + userData?.last_name}</span>
                        <p className=" dark:text-white">{userData?.user_name}</p>
                    </div>
                </div>
                 {/* Theme toggle button: switches between light and dark mode */}
                <button onClick={()=>setMode(prev => !prev)} >{mode ? <FiSun className=" text-2xl cursor-pointer dark:text-white"/> : <FaMoon  className=" text-xl cursor-pointer "/>}</button>
            </div>
            
        </nav>
    )
}

export default NavBar
