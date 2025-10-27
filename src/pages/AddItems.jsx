import axios from 'axios'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import FormAddProduct from '../components/FormAddProduct/FormAddProduct'

//Component for adding a product
const AddItems = () => {
    const navigate = useNavigate()
    const [data , setData] = useState({})
    useEffect(()=>{
         // Only send request if product name exists (i.e., form was submitted)
        if(data.name){
            axios.post("https://vica.website/api/items" , data , {
                headers : {
                    "Authorization" : "Bearer " + localStorage.getItem("token"),
                    "Content-Type" : "multipart/form-data"
                }
            })
            .then(res => {
                console.log(res) 
                toast.success("Product added successfully", {
                    position: "top-right",
                    autoClose: 2000, 
                })
                setTimeout(() => {
                    navigate("/items");
                }, 2500)
            })
            .catch(err => console.log(err))
        }
    },[data])
    // Input configuration passed to FormAddProduct componentt
    const inputs =[
        {
            title : "Product Name:",
            type: "text" ,
            name : "name",
            placeholder : "Enter Product Name"
        },
        {
            title : "Product Price:",
            type: "text" ,
            name : "price",
            placeholder : "Enter Product Price"
        },
        {
            type: "file" ,
            name : "image",
        }
    ]
    return (
        <div>
            <h1 className=' text-3xl font-semibold mb-8'>Create Product</h1>
            {/* Reusable form component for adding a product */}
            <FormAddProduct setData={setData}  inputs={inputs} btn ="create"/>
            <ToastContainer />
        </div>
    )
}

export default AddItems

