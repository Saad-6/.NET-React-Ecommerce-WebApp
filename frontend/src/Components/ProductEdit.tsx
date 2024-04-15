import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from '../Layout/Header';
import { useGetProductByIdQuery, useUpdateProductByIdMutation } from '../apis/ProductAPI';
import ProductModel from '../Interfaces/ProductModel'; // Import ProductModel interface

export default function ProductEdit() {
  const { prodid } = useParams<{ prodid: string }>(); // Add type annotation for prodid
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetProductByIdQuery(prodid);
  const [updatedProduct, setUpdatedProduct] = useState<ProductModel | null>(null); // Add type annotation for updatedProduct
  
  useEffect(() => {
    if (data) {
      // Set initial values when data is loaded
      setUpdatedProduct(data.result);
    }
  }, [data]);

  const [updateProductById] = useUpdateProductByIdMutation();

  const handleGoBack = () => {
    navigate(-1); // Navigate back one step in the history stack
  };
  
  const handleUpdate = () => {
    if (!updatedProduct) return; // Add check to ensure updatedProduct is not null
    updateProductById({ id: prodid, data: updatedProduct })
      .unwrap()
      .then(response => {
        console.log('Product updated successfully:', response);
        // Optionally, you can dispatch an action to update the product in the Redux store
        // dispatch(updateProduct(response));
        // Navigate to some other page after successful update
        navigate('/products');
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!updatedProduct) return; // Add check to ensure updatedProduct is not null
    setUpdatedProduct(prevState => ({
      ...(prevState as ProductModel), // Type assertion to ProductModel
      [name]: value
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error:</div>; // Display the actual error message
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const { name, description, image, category, stock, price, gimmickPrice } = data.result;

  return (
    <div>
     
      <div className='container flex-column space-around my-4'>
        <span onClick={handleGoBack} style={{cursor:"pointer"}} className='text-primary'>Go Back</span>
        <div className='text-center'>
          <h3>
            <b>Edit Product</b>
          </h3>
        </div>
        <form method='POST' encType='multipart/form-data'>
          <label htmlFor='ProdName'>Name</label>
          <input name='name' className='form-control' id='ProdName' type='text' value={updatedProduct?.name} onChange={handleChange} />

          <label htmlFor='ProdDesc'>Product Description</label>
          <input name='description' id='ProdDesc' className='form-control' type='text' value={updatedProduct?.description} onChange={handleChange} />

          <label htmlFor='ProdPic'>Picture Url</label>
          <input name='image' className='form-control' id='ProdPic' type='text' value={updatedProduct?.image} onChange={handleChange} />

          <label htmlFor='cat'>Category</label>
          <input name='category' className='form-control' id='cat' type='text' value={updatedProduct?.category} onChange={handleChange} />

          <label htmlFor='ProdStock'>Product Stock</label>
          <input name='stock' className='form-control' id='ProdStock' type='number' value={updatedProduct?.stock} onChange={handleChange} />

          <label htmlFor='ProdPrice'>Price</label>
          <input name='price' className='form-control' id='ProdPrice' type='number' value={updatedProduct?.price} onChange={handleChange} />

          <label htmlFor='ProdGimmickPrice'>Gimmick Price</label>
          <input name='gimmickPrice' className='form-control' id='ProdGimmickPrice' type='number' value={updatedProduct?.gimmickPrice} onChange={handleChange} />

          <button type='button' onClick={handleUpdate} className='mt-2 btn btn-secondary'>
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
