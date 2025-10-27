import axios from 'axios'
import { useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

// Card component to display a single produc
const Card = ({item , setDeleteProduct}) => {
    /// State to control visibility of the delete confirmation popup
    const [popup , setPopup] = useState(false)
    const show = () =>{
        setPopup(!popup)
    }
     // Function to delete a product by its ID
    const deleteProduct =(id) => {
        axios.delete(`https://vica.website/api/items/${id}` , {
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token"),
                "Accept" : "application/json"
            }
        })
        .then(res =>{
            console.log(res)
            setDeleteProduct(id)
            toast.success("Product deleted successfully")
        })
        .catch(err => console.log(err))
        // Close popup and trigger re-render
        setPopup(false)
        setDeleteProduct(id)
    }
    return (
        <>
        {/* Product card layout */}
            <div className=' w-[330px]  p-5 flex flex-col gap-4 bg-white dark:bg-[#253143] dark:text-white rounded-2xl shadow-md'>
                <div className='   '>
                    <img src={item.image_url} alt="proudects"  className=' h-[220px] w-[100%]' />
                </div>
                <div>
                    <h2 className=' text-2xl font-semibold mb-[8px]'>{item.name}</h2>
                    <p className=' text-myprimary text-xl font-medium'>${item.price}</p>
                </div>
                <div className=' flex justify-between '>
                    <Link to={`/items/editeitems/${item.id}`} className=' w-[160px] bg-[#E0EAF9] dark:bg-[#4A5668] py-2 rounded-2xl text-center'>Edit Product</Link>
                    <button onClick={show} ><RiDeleteBin6Line className=' text-[25px] cursor-pointer '/></button>
                </div>
            </div>
            {/* Delete confirmation popup */}
            {popup && 
                <div className='  w-screen h-screen bg-[#000000b2] fixed top-0 left-0 z-10 '>
                    <div className=' w-[400px]  p-10 bg-white dark:bg-[#1A2434]  flex justify-center items-center flex-col gap-9 absolute top-0 left-[50%] -translate-x-[50%] rounded-b-[8px]'>
                        {/* Confirmation message */}
                        <p className=' w-[250px] text-center text-xl dark:text-white'>Are you sure to delete this product?</p>
                        {/* Confirmation buttons */}
                        <div className=' flex gap-10'>
                            <button onClick={show} className=' w-[100px] py-1.5 rounded-[8px] bg-[#E0EAF8] cursor-pointer dark:text-[#1A2434]'>No</button>
                            {/* Confirm delete button */}
                            <button onClick={()=>deleteProduct(item.id)} className='w-[100px] py-1.5 rounded-[8px] bg-[#C53728] text-white cursor-pointer'>Yes</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
    }

export default Card
