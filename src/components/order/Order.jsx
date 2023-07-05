import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import Loading from '.././loading';
import { styled } from 'styled-components';
import { Content } from '../UI/Content.style';
import { Center } from '../UI/Center.style';
import Product from './Product';

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
    <Loading />
  ) : (
    <Content>
      <Center id='content'>
        {products.map((product) => {
          return (
            <Product
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              description={product.description}
              image={product.image}
            />
          );
        })}
      </Center>
    </Content>
  );
}

export default Order;
