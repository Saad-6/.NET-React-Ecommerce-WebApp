import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../apis/ProductAPI';
import ProductModel from '../Interfaces/ProductModel';
import { useUpdateCartMutation } from '../apis/CartAPI';
import { RootState } from '../Redux/store';
import UserModel from '../Interfaces/UserModel';
import { useSelector } from 'react-redux';

export default function ProductDetail() {
    const [quantity,setQuantity]=useState(1);
    const navigate=useNavigate();
    const prod=useParams();
    const productid=prod.prodid
    const { data, isLoading, isError, error } = useGetProductByIdQuery(productid);
    const userData:UserModel=useSelector((state:RootState)=>state.UserStore);
    const [loginModal,setloginModal]=useState(false)
    const [AddToCart]=useUpdateCartMutation();
    const [product,setProduct]=useState<ProductModel>();
    const [subtotal,setSub]=useState<number>()
    
    useEffect(()=>{
     
        if(data){
            setProduct(data.result)
           

        }

    },[data])

    const plusQuantity=()=>{
setQuantity(quantity+1)


    }
    const minusQuantity=()=>{
        if(quantity>1){

            setQuantity(quantity-1)
            

        }
    }
    const handleAddToCart = async () => {
        if(!userData.id){

          setloginModal(true)



        }else{

            const reponse=await AddToCart({
                userId:userData.id,
                menuItemId:productid,
                updateQuantityBy:quantity
            })
            navigate("/Cart")
        }
    }
  return (
    <div>
      {loginModal && (
 <div
 style={{
   position: 'fixed',
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   backgroundColor: 'rgba(0, 0, 0, 0.5)',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   zIndex: 9999,
 }}
>
 <div
   style={{
     backgroundColor: '#fff',
     padding: '20px',
     borderRadius: '8px',
     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
     maxWidth: '400px',
     width: '100%',
   }}
 >
  <div className='flex space-between'>

   <h2 style={{ textAlign:"start", marginBottom: '10px' }}>Login</h2>
   <h5 onClick={()=>setloginModal(false)} style={{ textAlign:"end", marginBottom: '10px',cursor:"pointer" }}>X</h5>
   
  </div>
   <div className="login">
    <h4>You need to login to add items to your cart</h4>
    <div className="buttons flex space-around cartbtn"><Link style={{color:"black",padding:"6px 12px",border:"1px solid",textDecoration:"none"}} to="/Login">Login</Link>
    <Link style={{color:"white",background:"black",padding:"6px 12px",border:"1px solid",textDecoration:"none"}} to="/products">Continue Shopping</Link>
    </div>
   </div>
 </div>
</div>

      )}
         <div className="container pt-4 pt-md-5">
      <div className="row">
      <div className="col-4">
          <img
            src={product?.image}
            
            style={{ borderRadius: "",maxWidth:"200px" }}
            alt="No content"
          ></img>
        </div>
        <div className="col-8">
          <h2 className="text-success">{product?.name}</h2>
          <span>
            <span
              className="badge text-bg-dark pt-2"
              style={{ height: "40px", fontSize: "20px" }}
            >
              {product?.category}
            </span>
          </span>
          <span>
            <span
              className="badge text-bg-light pt-2"
              style={{ height: "40px", fontSize: "20px" }}
            >
               
            </span>
          </span>
          <p style={{ fontSize: "20px" }} className="pt-2">
          {product?.description}
          </p>
          <span className="h3">Rs :{product?.price}</span> &nbsp;&nbsp;&nbsp;
          <span
            className="pb-2  p-3"
            style={{ border: "1px solid #333", borderRadius: "30px" }}
          >
            <i onClick={minusQuantity}
              className="bi bi-dash p-1"
              style={{ fontSize: "25px", cursor: "pointer" }}
            ></i>
            <span className="h3 mt-3 px-3">{quantity}</span>
            <i onClick={plusQuantity}
              className="bi bi-plus p-1"
              style={{ fontSize: "25px", cursor: "pointer" }}
            ></i>
          </span>
         
          <div className="row pt-4">
            <div className="col-5">
              <button onClick={handleAddToCart} style={{border:"1px solid black",backgroundColor:"",padding:"8px"}} className="cartbtn form-control">
                Add to Cart
              </button>
            </div>

            <div className="col-5 ">
              <button onClick={()=>navigate(-1)} style={{border:"1px solid white",backgroundColor:"black",color:"white",padding:"8px"}} className="cartbtn form-control">
                Back to Home
              </button>
            </div>
          </div>
        </div>
       
      </div>
    </div>
    </div>
  )
}
