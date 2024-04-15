import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './Components/Products';
import AddProduct from './Pages/AddProduct';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import AllProducts from './Pages/AllProducts';
import ProductEdit from './Components/ProductEdit';
import ProductList from './Components/ProductList';
import { useGetAllProductsQuery } from './apis/ProductAPI';
import { setProduct } from './Redux/ProductSlice';
import UserModel from './Interfaces/UserModel';
import { jwtDecode } from 'jwt-decode';
import { setUserState } from './Redux/UserSlice';
import ProductDetail from './Pages/ProductDetail';
import UserCart from './Pages/UserCart';
import Profile from './Pages/Profile';
import Checkout from './Pages/Checkout';
import ManangeOrders from './Pages/ManangeOrders';
import OrderPlaced from './Components/OrderPlaced';
import MyOrders from './Pages/MyOrders';
import Analytics from './Pages/Analytics';


function App() {
  const dispatch = useDispatch();
  const { data, isLoading, isError,error } = useGetAllProductsQuery(null);

  useEffect(() => {
    if (!isLoading && !isError) {
      // Ensure data is not undefined before dispatching
      if (data) {
        dispatch(setProduct(data));
      }
    }
  }, [data, isLoading, isError, dispatch]);
useEffect(()=>{
  const token=localStorage.getItem("token");
  if(token){
 
    const {fullName,id,userName,email,role}:UserModel=jwtDecode(token);
         
          dispatch(setUserState({fullName,id,userName,email,role }))
  }
},[])
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log(error)
    return <div>Error fetching data</div>;
  }

  // Ensure data is not undefined before accessing its properties
  if (!data || !data.length) {
    return <div>No products found</div>;
  }
  return (
    <Router> {/* Wrap your entire app with Router */}
      <div className="">
        <Header></Header>
        
        <Routes>
          
          <Route path='/' element={<Home></Home>} />
          <Route path='/Login' element={<Login></Login>} />
          <Route path='/Register' element={<Register></Register>} />
          <Route path='/Products' element={<Products />} />
          <Route path='/Products/List' element={<ProductList></ProductList>} />
          <Route path='/AddProduct' element={<AddProduct />} />
          <Route path='/Cart' element={<UserCart></UserCart>} />
          <Route path='/Analytics' element={<Analytics></Analytics>} />
          <Route path='/ManageOrders' element={<ManangeOrders></ManangeOrders>} />
          <Route path='/Profile' element={<Profile></Profile>} />
          <Route path='/orderconfirmed' element={<OrderPlaced></OrderPlaced>} />
          <Route path='/Checkout' element={<Checkout></Checkout>} />
          <Route path='/MyOrders' element={<MyOrders></MyOrders>} />
          
          <Route path='/AllProducts' element={<AllProducts></AllProducts>} />
          <Route path='/ProductEdit/:prodid' element={<ProductEdit></ProductEdit>} />
          <Route path='/:prodid' element={<ProductDetail></ProductDetail>} />
           
          {/* Add other routes here as needed */}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
