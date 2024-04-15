import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from './Product'; // Assuming you have a Product component
import ProductModel from '../Interfaces/ProductModel';
import { setProduct } from '../Redux/ProductSlice';
import { useGetAllProductsQuery } from '../apis/ProductAPI';
import { RootState } from '../Redux/store'; 
import { Link } from 'react-router-dom';

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]);
  const data:ProductModel[] = useSelector((state: RootState) => state.ProductStore.Products);
  const dispatch = useDispatch();
  const { data: prodData, refetch: refetchProducts } = useGetAllProductsQuery(null);
const onChangeProduct=()=>{

}
  useEffect(() => {
    dispatch(setProduct(prodData));
  }, [dispatch, prodData]);

  // Function to filter products based on search term
  const filterProducts = useCallback(() => {
    if (!searchTerm) {
      setFilteredProducts(data); // If search term is empty, display all products
    } else {
      const filtered = data.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [data, searchTerm]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div className='flex space-around py-2'>
        <div className="filter">By Category</div>
        <div className="search flex align-center">
          <input
            type="text"
            className='form-control'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleInputChange}
          />
          <i className=' px-2 bi bi-search'></i>
        </div>
      </div>
      <div className='ProductGrid mx-4 my-4'>
        {filteredProducts.map((product: ProductModel, index: number) => (
          <Link style={{ textDecoration: "none", color: "black" }} to={`/${product.id}`} key={index}>
            <Product product={product} onChangeProduct={onChangeProduct} />
          </Link>
        ))}
      </div>
    </div>
  );
}
