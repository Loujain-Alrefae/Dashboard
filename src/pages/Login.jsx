import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify'
import FormLogin from "../components/FormLogin/FormLogin"

// Login component to authenticate users
const Login = () => {
    // State to hold form data submitted from FormLogin
    const [data , setData] = useState({})
    const navigate = useNavigate()
    useEffect(()=>{
        // Only send login request if email is present
        if (data.email) {
            axios.post("https://vica.website/api/login", data, {
                headers : {
                    "Accept" : "application/json"
                }
            })
            .then(res => {
                console.log(res)
                localStorage.setItem("token" , res.data.token)
                localStorage.setItem("userData" , JSON.stringify(res.data.user))
                navigate("/items")
                setTimeout(() => {
                    toast.success("You have been logged in successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    })
                }, 500)
            })
            .catch(err => console.log(err))
        }
        
    },[data])
     // Input configuration passed to FormLogin component
    const inputs = [
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
        }
    ]
    return (
        <div>
             {/* Reusable login form component */}
            <FormLogin setData={setData} title="Login to Account" descraption="Please enter your email and password to continue" inputs={inputs} message="Don't have an account?" account="CreatAccount" btn = "Sign in"/>
            <ToastContainer />
        </div>
    )
}

export default Login
