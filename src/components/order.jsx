import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import Loading from './loading';

function Order() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = async () => {
    try {
      const response = await axios.get('/products');
      setProducts(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log('server error', err.response.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return isLoading ? (
    <Loading/>
  ) : (
    <div className='order-container'>
      <div id='content' className='order-center-container'>
        {products.map((product) => {
          return (
            <Link to={'/product/' + product._id} key={product._id}>
              <div className='order'>
                <div className='img-container'>
                  <img src={product.image} alt={'image of' + product.name} />
                </div>
                <div className='text-container'>
                  <h2>{product.name}</h2>
                  <p>{product.Description}</p>
                  <h2>price: {product.price} $</h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Order;
