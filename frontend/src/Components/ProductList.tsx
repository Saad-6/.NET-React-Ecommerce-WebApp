import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import ProductModel from '../Interfaces/ProductModel'; // Assuming you have a ProductModel interface
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteProductByIdMutation, useGetAllProductsQuery } from '../apis/ProductAPI';
import { setProduct } from '../Redux/ProductSlice';
import UserModel from '../Interfaces/UserModel';

const ProductList: React.FC = () => {
  const productList: ProductModel[] = useSelector((state: RootState) => state.ProductStore.Products);
  const userData:UserModel=useSelector((state:RootState)=>state.UserStore)
    const dispatch=useDispatch()
    
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteProductId, setDeleteProductId] = useState<number>(0);
  const navigatte=useNavigate();
  // Filtered products based on search query
  const filteredProducts = productList.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
//----------------------------------------
const { data: prodData, refetch: refetchProducts } = useGetAllProductsQuery(null);
const handleCartChange = useCallback(() => {
  refetchProducts();
}, [refetchProducts]);
useEffect(()=>{
dispatch(setProduct(prodData))
},[prodData,showModal,deleteProductId,searchQuery,productList])



//--------------------------------------------
  // Handle search input change
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Determine whether to display filtered products or all products
  const displayProducts = searchQuery ? filteredProducts : productList;

  // Function to handle delete button click
  const handleDeleteButtonClick = (productId: number) => {
    console.log("HandleDeleteButton clicked");
    setDeleteProductId(productId);
    setShowModal(true);
  };

  // Function to confirm deletion and execute delete endpoint
  const [deleteProductById] = useDeleteProductByIdMutation(); // Get the mutation function from the hook

const handleConfirmDelete = async () => {
  try {
    await deleteProductById(deleteProductId); // Call the mutation function with the product ID
    console.log(`Product with ID ${deleteProductId} deleted successfully`);
    // After deletion, close the modal
    setShowModal(false);
  } catch (error) {
    console.error(`Error deleting product with ID ${deleteProductId}:`, error);
    // Optionally, handle the error here (e.g., display an error message to the user)
  }
setShowModal(false);
navigatte("/products")


};
if(userData.role!="Admin"){
  return(<div>Access Denied</div>)
}
console.log("showmodal"+showModal)
  return (
    <div>
        {showModal && (

<div className="modaal-overlay">
<div className="modaal">
            <p>Are you sure you want to delete this product?</p>
            <button className='btn btn-danger px-3' onClick={handleConfirmDelete}>Yes</button>
            <button className=' mx-4 btn btn-secondary px-3' onClick={() => setShowModal(false)}>No</button>
          </div>



</div>

        )}
      <div className="table p-5">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="text-success">MenuItem List</h1>
          <div className="search1 flex">
            <input
              className='form-control'
              type="text"
              placeholder='Search ...'
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <span ><i className='bi bi-search'></i></span >
          </div>
          <button onClick={()=>navigatte("/AddProduct")} className="btn btn-success">Add New</button>
        </div>
        <div className="p-2">
          <div className="row border">
            <div className="col-2">Image</div>
            <div className="col-1">Stock</div>
            <div className="col-2">Name</div>
            <div className="col-2">Category</div>
            <div className="col-1">Price</div>
            <div className="col-2">Fake Price</div>
            <div className="col-1">Action</div>
          </div>

          {displayProducts.map((product, index) => (
            <div key={index} className="row border">
              <div className="col-2">
                <img
                  src={product.image}
                  alt="no content"
                  style={{ maxHeight: "150px", maxWidth: "150px",minHeight:"150px",minWidth:"150px" }}
                />
              </div>
              <div className="col-1">{product.stock}</div>
              <div className="col-2">{product.name}</div>
              <div className="col-2">{product.category}</div>
              <div className="col-1">{product.price}</div>
              <div className="col-2">{product.gimmickPrice}</div>
              <div className="col-1 text-center">
                <Link to={`/ProductEdit/${product.id}`}>
                  <button className="my-2 btn btn-success">
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                </Link>
                <button className="btn btn-danger mx-2" onClick={() => handleDeleteButtonClick(product.id!)}>
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

     
    </div>
  );
};

export default ProductList;
