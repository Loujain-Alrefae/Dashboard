import { useEffect, useState } from "react"
import  Form  from "../components/Form/Form"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify'

// Component for user registration 
const Register = () => {
    // State to hold form data submitted from the Form component
    const [data , setData] = useState({})
    const navigate = useNavigate()
    useEffect(()=>{
        // Only send registration request if first name is present
        if (data.first_name) {
            axios.post("https://vica.website/api/register", data , {
                headers:{
                    "Content-Type" : "multipart/form-data"
                }
            })
            .then(res => { 
                localStorage.setItem("token", res.data.data.token);
                localStorage.setItem("userData" , JSON.stringify(res.data.data.user))
                if (localStorage.getItem("token")) {
                    navigate("/items")
                }
                
                setTimeout(() => {
                    toast.success(" Created your account successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    })
                }, 500)
                setTimeout(() => {
                    toast(`Hi, ${res.data.data.user.first_name} ${res.data.data.user.last_name} 👋🏻😁`, {
                    position: "top-right",
                    autoClose: 3000,
                    })
                }, 6000)
            })
            .catch(err => console.log(err))
        }
        
    },[data])
     // Input configuration passed to the Form component
    const inputs = [
        {
            title : "First Name:",
            type : "text" ,
            name : "first_name",
            placeholder : "First Name"
        },
        {
            title : "Last Name:",
            type : "text" ,
            name : "last_name",
            placeholder : "Last Name"
        },
        {
            title : "User Name:",
            type : "text" ,
            name : "user_name",
            placeholder : "Username"
        },
        {
            title : "Email address:",
            type : "email" ,
            name : "email",
            placeholder : "example@gmail.com"
        },
        {
            title : "Password:",
            type : "password" ,
            name : "password",
            placeholder : "**********"
        },
        {
            title : "Confirmation Password:",
            type : "password" ,
            name : "password_confirmation",
            placeholder : "**********"
        },
        {
            title : "Profile Image:",
            type : "file" ,
            name : "profile_image",
        }
    ]
    return (
        <div>
            {/* Reusable form component for registration */}
            <Form setData={setData} title="Creat an Account" descraption="Creat a account to continue" inputs={inputs} message="Already have an account" account="login"  btn="Sign Up"/>
            <ToastContainer />
        </div>
    )
}

export default Register
