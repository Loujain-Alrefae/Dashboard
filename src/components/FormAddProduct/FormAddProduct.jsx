import { useRef, useState } from "react"
import { LuUpload } from "react-icons/lu"

// Component for adding a new product. Accepts props: setData to update state, inputs to define fields, and btn for submit button text.
const FormAddProduct = ({setData , inputs , btn}) => {
    // State to store the preview of the uploaded image
    const [preview , setPreview] = useState()
    // Ref to collect form data without triggering re-renders
    const dataRef = useRef({})
    // Form submission handler prevents page reload and sends data to parent
    const sendData = (event) =>{
            event.preventDefault()
            let data = dataRef.current
            setData(data)
        }
    return (
        <>
            <div>
                <form onSubmit={sendData} >
                    <div className=" flex gap-7 flex-wrap">
                        <div className=" flex flex-col ">
                            {/* Render and format text input fields */}
                            {inputs?.filter((input) => input.type !== "file")?.map((input , index) => {
                                return(
                                    <div key={index} className=" flex flex-col w-[500px]">
                                            {/* Input label */}
                                        <label className="text-lg mb-2.5 ">{input.title}</label>
                                        {/* Text input field */}
                                            <input className=" p-4 mb-7 border divide-solid border-[#d7d7d7] outline-[#d7d7d7] rounded-2xl text-[#494546] dark:text-white"
                                                type={input.type} name={input.name} placeholder={input.placeholder} defaultValue={input.value}
                                                onChange={(event) => (dataRef.current = {...dataRef.current , [input.name] : event.target.value  })} 
                                                />
                                    </div>
                                    )
                                    })}
                        </div>
                            {/* Render file input (image upload) with preview */}  
                        {inputs?.filter((input)=> input.type === "file")?.map((input , index)=> {
                            return(
                                <div key={index} className="w-[620px] h-[300px] border-2 border-dashed border-myprimary rounded-2xl flex items-center justify-center cursor-pointer relative">
                                    {/* Image preview inside label */}
                                    <label htmlFor="image-upload" className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-10">
                                        {preview && (
                                            <img src={preview} alt="Preview" className="h-[180px] object-contain rounded-xl mb-4 z-20"/>
                                        )}
                                        
                                    </label>
                                    {/* Upload icon and instructions */}
                                    <div className=" flex flex-col  justify-center items-center text-center">
                                        <LuUpload className="text-8xl text-myprimary " />
                                        <p className="text-[#494546] dark:text-white font-medium mt-2 text-center">Upload Product Image</p>
                                    </div>
                                    {/* Hidden file input */}
                                    <input  className=" hidden" id="image-upload"
                                        type={input.type} name={input.name} placeholder={input.placeholder} defaultValue={input.value}
                                        onChange={(event) => {
                                            const file = event.target.files[0];
                                            if (file) {
                                            setPreview(URL.createObjectURL(file));
                                            dataRef.current = { ...dataRef.current, [input.name]: file }
                                            }
                                        }}
                                    />
                                </div>
                            )
                        }) }

                    </div>
                    <input type="submit" value={btn} className=" w-[200px] h-11 bg-[#E0EAF8] dark:bg-[#4A5668] rounded-[8px] cursor-pointer"/>
                </form>
            </div>
        </>
    )
}

export default FormAddProduct
