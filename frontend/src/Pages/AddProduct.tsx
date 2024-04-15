import React, { useState, useEffect } from 'react';
import CreateProductModel from '../Interfaces/CreateProductModel';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetAllProductsQuery } from '../apis/ProductAPI';



export default function AddProduct() {
    const [productModel, setProduct] = useState<CreateProductModel | null>(null);
    const [isAdded, setIsAdded] = useState(false);
    const navigate = useNavigate();
    const dispatch=useDispatch();
    
    useEffect(() => {
        // Only call postData if productModel is not null and isAdded is true
        if (productModel && isAdded) {
            postData();
        }
    }, [productModel, isAdded]);

    const postData = async () => {
        try {
            const response = await fetch('https://localhost:44360/api/MenuItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productModel)
            });

            if (!response.ok) {
                throw new Error('Failed to add product');
            }

            
            console.log('Product added successfully:', response);
           
            navigate("/products");
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newProduct: CreateProductModel = {
            Name: formData.get('name') as string,
            Price: parseFloat(formData.get('price') as string),
            Description: formData.get('desc') as string,
            Category: formData.get('cat') as string,
            Image: formData.get('url') as string,
            Stock: parseInt(formData.get('stock') as string),
            GimmickPrice: parseInt(formData.get('GimmickPrice') as string),
        };
        setProduct(newProduct);
        setIsAdded(true);
    };
    
    useEffect(()=>{

                
    },[isAdded])

  return (
    
    <div className='container flex-column space-around my-4'>
       
       {isAdded && (
                <div className="bg-success">
                    Product added successfully!
                </div>
            )}
     <div><h3><b>Add Product</b></h3></div>
     <form method="POST" encType='multipart/form-data' onSubmit={handleSubmit}>
     <label htmlFor="ProdName">Product Name</label>
        <input name="name" className='form-control'id="ProdName" type="text" placeholder='Product Name...' />
    
        <label htmlFor="ProdDesc">Product Description</label>
        <input name="desc" id="ProdDesc" className='form-control' type="text" placeholder='Description...' />
    
        <label htmlFor="ProdPic">Picture Url</label>
        <input name="url" className='form-control'id="ProdPic" type="text" placeholder='Picture Url...' />
    
    
        <label htmlFor="cat">Category</label>
        <input name="cat" className='form-control'id="cat" type="text" placeholder='Picture Url...' />
    
        <label htmlFor="ProdStock">Product Stock</label>
        <input name="stock" className='form-control'id="ProdStock" type="number" placeholder='Stock...' />
    
        <label htmlFor="ProdPrice">Price</label>
        <input  name="price" className='form-control'id="ProdPrice" type="number" placeholder='Price...' />
    
        <label htmlFor="ProdPrice">Gimmick Price</label>
        <input  name="GimmickPrice" className='form-control'id="ProdPrice" type="number" placeholder='Price...' />
    
    
    <button type="submit" className='btn btn-secondary'>Add Product</button>



     </form>
            </div>
  )
}
