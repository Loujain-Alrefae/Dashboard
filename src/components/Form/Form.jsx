import { useRef, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { data, Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Reusable form component for registration or profile creation
const Form = ({ setData ,  title , descraption , inputs ,message ,account , btn }) => {
    // Ref to store form data without triggering re-renders
    const dataRef = useRef({})
    // Extract the file input (if any) to handle image preview
    const imageInput = inputs.find((input) => input.type === "file");
    // State to store image preview URL
    const [preview, setPreview] = useState(null);
    // Handle form submission
    const sendData = (event) =>{
        event.preventDefault()
        let data = dataRef.current
        // Validate password confirmation
        if (data.password !== data.password_confirmation) {
            toast.error("Passwords do not match")
            return
        }
        // Send collected data to parent component
        setData(data)
        console.log(data)
    }
    
    return (
        <>
        {/* Fullscreen background with centered form */}
            <div className=' w-screen h-screen relative flex justify-center items-center'>
                {/* Background image */}
                <img src="/Dashboard/assets/image/bgForm.jpg" alt="" className='w-[100%] h-[100%] absolute top-0 bottom-0 object-cover -z-[1]'/>
                 {/* Title and description */}
                <div className=' w-[800px] h-[660px] relative p-6 rounded-2xl bg-white'>
                    <h1 className='  text-center text-3xl font-semibold mb-4'>{title}</h1>
                    <p className=' text-center text-[#4A5153] mb-12'>{descraption}</p>
                     {/* Form starts here */}
                    <form onSubmit={sendData}>
                        <div className=' flex gap-6'>
                            {/* First row: first 3 inputs */}
                            {inputs?.slice(0,3)?.map((input , index) => {
                                return(
                                    <div key={index} className=' flex-1'>
                                        <p className=' text-[#4F5255] mb-3'>{input.title}</p>
                                        <input className='w-full  p-2.5 bg-bginput border divide-solid border-[#d7d7d7] outline-[#d7d7d7] rounded-2xl'
                                            type={input.type} name={input.name} placeholder={input.placeholder} defaultValue={input.value}
                                            onChange={(event) => (dataRef.current = { ...dataRef.current, [input.name]: event.target.value })} 
                                        />
                                    </div>
                                )
                            })} 
                        </div>
                        {/* Middle input email  */}
                        <div className=' mt-4 mb-4'>
                            {inputs?.slice(3,4)?.map((input , index) => {
                                return(
                                    <div key={index}>
                                        <p className=' text-[#4F5255] mb-3'>{input.title} {input.title}</p>
                                        <input className=' w-full p-2.5 border divide-solid border-[#d7d7d7] outline-[#d7d7d7] rounded-2xl  bg-bginput'
                                            type={input.type} name={input.name} placeholder={input.placeholder} defaultValue={input.value}
                                            onChange={(event) => (dataRef.current = { ...dataRef.current, [input.name]: event.target.value })} 
                                        />
                                    </div>
                                )
                            })}
                        </div>
                        <div className=' flex gap-6'>
                             {/* Last row: password and confirmation */}
                            {inputs?.slice(4,6)?.map((input , index) => {
                                return(
                                    <div key={index} className=' flex-1'>
                                        <p className='  text-[#4F5255] mb-3'>{input.title}</p>
                                        <input className=' w-full flex-1 p-2.5 border divide-solid border-[#d7d7d7] outline-[#d7d7d7] rounded-2xl  bg-bginput'
                                            type={input.type} name={input.name} placeholder={input.placeholder} defaultValue={input.value}
                                            onChange={(event) => (dataRef.current = { ...dataRef.current, [input.name]: event.target.value })} 
                                        />
                                    </div>
                                    
                                )
                            })}
                        </div>
                        {/* Profile image upload with preview */}
                        {imageInput &&
                            <div className=' w-[100px] h-[100px] mt-4 rounded-[50%]'>
                                <label htmlFor="image-upload" className=' cursor-pointer'>
                                    {preview ? <img src={preview} alt="Preview" className="w-full h-full  rounded-[50%] object-contain "  /> : <CgProfile className=' w-full h-full  text-[#a8a7a7] ' /> }
                                </label>
                                {/* Hidden file input */}
                                <input type={imageInput.type} name={imageInput.name} id='image-upload' className=' hidden' 
                                onChange={(event)=> {
                                    const file = event.target.files[0]
                                    if(file){
                                        setPreview(URL.createObjectURL(file))
                                        dataRef.current = { ...dataRef.current, [imageInput.name]: file }
                                    }
                                }}
                                />
                            </div>
                        }
                        <div className='absolute bottom-0 left-[50%] -translate-[50%]'>
                            <input type="submit" value={btn} className='  w-[350px] py-3 mx-auto mb-2 text-white bg-myprimary rounded-2xl text-xl font-semibold cursor-pointer'/>
                            <div className=' flex justify-center'>
                                <p className=' text-[#4A5153] '>{message}</p>
                                <Link to="/login" className=' text-myprimary underline'>{account}</Link>
                            </div>
                        </div>
                    </form>
                    
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default Form


