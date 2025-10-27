import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import FormEdit from "../components/FormEdit/FormEdit"
import { toast, ToastContainer } from 'react-toastify'

// Component for editing an existing product
const EditeItems = () => {
    // State to hold the current product data fetched from the server
    const [item , setItem] = useState({})
    // State to hold the updated data submitted from the form
    const [data , setData] = useState({})
    // Get the product ID from the URL parameters
    const param = useParams()
    const navigate = useNavigate()
    // Fetch product details when the component mounts
    useEffect(()=>{
        axios.get(`https://vica.website/api/items/${param.id}`,{
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token"),
                "Accept" : "application/json"
            }
        })
        .then(res => setItem(res.data))
        .catch(err => console.log(err))
    },[])
     // Send updated product data when data changes
    useEffect(()=>{
        axios.post(`https://vica.website/api/items/${param.id}` , {
            name : data.name ? data.name : item.name,
            price : data.price ? data.price : item.price ,
            image : data.image,
            _method : "PUT"
        } , {
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token"),
                "Content-Type" : "multipart/form-data"
            }
        })
        .then(res => {
            console.log(res)
            toast.success("Product updated successfully", {
                position: "top-right",
                autoClose: 2000, 
            })
            setTimeout(() => {
                navigate("/items");
            }, 2500)
        } )
    },[data])
    // Input configuration passed to the FormEdit component
    const inputs = [
        {
            title : "Product Name:",
            type : "text",
            name : "name",
            placeholder : "Enter Product Name",
            value : item.name
        },
        {
            title : "Product Price:",
            type : "text",
            name : "price",
            placeholder : "Enter Product Price",
            value : item.price
        },
        {
            type : "file",
            name : "image",
            url  : item.image_url
        }
    ]
    return (
        <>
            <h1 className=' text-3xl font-semibold mb-8'>Edit Product</h1>
            <div >
                {/* Form component for editing the product */}
                <FormEdit setData={setData} inputs={inputs} btn ="Update"/>
            </div>
            <ToastContainer />
        </>
    )
}

export default EditeItems


