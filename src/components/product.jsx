import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import Loading from './loading';

function Product() {
  const { productID } = useParams();

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getProduct = async () => {
    try {
      const response = await axios.get(`/products/${productID}`);
      setProduct(response.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log('server error', err.response.data);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return isLoading ? (
   <Loading/>
  ) : (
    <div className='pagOrder-container'>
      <div id='content' className='pagOrder-center-container'>
        <div className='pagOrder'>
          <div className='img-container'>
            <img src={product.image} />
          </div>
          <div className='text-container'>
            <h2>{product.name}</h2>
            <p>{product.Description}</p>
            <h4>price: {product.price} $</h4>
            <button>Pay now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
