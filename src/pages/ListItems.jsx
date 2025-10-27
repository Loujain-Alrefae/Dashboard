import axios from 'axios'
import  { useContext, useEffect, useState } from 'react'
import Card from '../components/Card/Card'
import { CiCirclePlus } from 'react-icons/ci'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { SearchContext } from '../components/SearchProvider/SearchProvider'

// Component to display and manage the list of products
const ListItems = () => {
    const [products , setProducts] = useState([])
    const {searchProduct} = useContext(SearchContext) 
    const [deleteProduct , setDeleteProduct] = useState(0)
    const filterProducts = products?.filter((product)=> product.name.toLowerCase().includes(searchProduct.toLowerCase()))
    //Load and render products on project initialization 
    useEffect(()=>{
        axios.get("https://vica.website/api/items"  ,{
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {
            setProducts(res.data)
        })
        .catch(err => console.log(err))
    },[deleteProduct])
    
    return (
        <div >
            <div className=' flex justify-between mb-8 '>
                <h1 className=' text-3xl font-semibold'>All Products</h1>
                <Link to = "/items/additems" className=' md:w-[200px] h-12 flex justify-center items-center gap-2 bg-myprimary text-white rounded-lg font-semibold text-lg'><CiCirclePlus className=' text-[25px] ' /> Create Product</Link>
            </div>
            {/* Conditional rendering show message if no products match the search */}
            {filterProducts.length == 0 ? (
                    <div className="flex justify-center items-center h-[300px]">
                        <h1 className=' text-3xl font-semibold absolute top-[50%] left-[50%] '>There are no products ...</h1>
                    </div>
                    ) : (
                    <div className=" flex gap-5 flex-wrap  ">
                        {filterProducts?.map((product) => (
                            <Card item = {product}  key={product.id} setDeleteProduct = {setDeleteProduct} />
                        ))}
                        <ToastContainer />
                    </div>
                )}
            
        </div>
    )
}

export default ListItems
