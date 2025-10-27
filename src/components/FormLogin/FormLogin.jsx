import { Link } from 'react-router-dom'

// Reusable form component for login or registration
const FormLogin = ({setData , title , descraption , inputs , message , account , btn}) => {
     // Object to collect form data before submission
    let data = {}
    const sendData = (event) =>{
            event.preventDefault()
            // Pass collected data to parent component
            setData(data)
        }
    return (
        <>
            {/* Fullscreen container with centered content */}
            <div className='  w-screen h-screen relative flex justify-center items-center'>
                {/* Background image covering the entire screen */}
                <img src="/Dashboard/assets/image/bgForm.jpg" alt="" className=' w-[100%] h-[100%] object-cover absolute top-0 left-0 -z-[1]' />
                {/* White form box with padding and rounded corners */}
                <div className=' relative bg-white p-6 rounded-2xl w-[500px] h-[650px]'>
                    <h1 className='  text-center text-3xl font-semibold mb-4'>{title}</h1>
                    <p className=' text-center text-[#4A5153] mb-12'>{descraption}</p>
                    <form onSubmit={sendData} className='  flex flex-col justify-between'>
                        {/* Dynamically render input fields based on the inputs array */}
                        {inputs?.map((input , index) => {
                            return(
                                <div key={index} className=' flex flex-col'>
                                    <p className=' text-[#4F5255] mb-3'>{input.title}</p>
                                    <input className=' p-4 mb-7  border border-solid border-[#d7d7d7] outline-[#d7d7d7] rounded-2xl bg-bginput'
                                        type={input.type} name={input.name} placeholder={input.placeholder} defaultValue={input.value}
                                        onChange={(event) => (data = {...data , [input.name] : input.type != "file" ? event.target.value : event.target.files[0] })} 
                                    />
                                </div>
                            )
                        })}
                        {/* Submit button and bottom message with link */}
                        <div className='absolute bottom-0 left-[50%] -translate-[50%]'>
                             {/* Submit button */}
                            <input type="submit" value={btn} className='  w-[350px] py-3 mx-auto mb-2 text-white bg-myprimary rounded-2xl text-xl font-semibold cursor-pointer'/>
                            <div className=' flex justify-center'>
                                <p className=' text-[#4A5153] '>{message}</p>
                                <Link to="/" className=' text-myprimary underline'>{account}</Link>
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
        </>
    )
}

export default FormLogin
