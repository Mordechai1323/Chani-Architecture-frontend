import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import Loading from './loading';
import { styled } from 'styled-components';

export default function Product() {
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
    <Loading />
  ) : (
    <ProductStyle>
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
    </ProductStyle>
  );
}

const ProductStyle = styled.div`
  width: 100%;
  min-height: 550px;
  background: #3e3e3e;
  display: flex;
  justify-content: center;
  align-items: center;

  & .pagOrder-center-container {
    width: 80%;

    & .pagOrder {
      min-height: 450px;
      display: flex;
      flex-wrap: wrap;
      margin: 8px 0;

      & .img-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        & img {
          width: 95%;
          height: 90%;
          border-radius: 12px;
        }
      }

      & .text-container {
        width: 100%;
        font-family: 'Montserrat', sans-serif;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        color: #eaeaeb;

        & h2 {
          font-size: 1.25em;
          width: 100%;
        }

        & p {
          font-size: 0.75em;
          width: 100%;
        }

        & h4 {
          font-size: 1em;
          width: 100%;
        }

        & button {
          border: none;
          background: #eaeaeb;
          color: #3e3e3e;
          border-radius: 20px;
          width: 45%;
          font-size: 1.75em;
          font-weight: bold;
        }
      }
    }
  }

  @media (min-width: 550px) {
    & .pagOrder-center-container {
      & .pagOrder {
        & .img-container {
          width: 60%;
        }

        & .text-container {
          width: 40%;

          & h2 {
            font-size: 2.5em;
          }

          & p {
            font-size: 1.5em;
          }

          & h4 {
            font-size: 2.5em;
          }

          & button {
            width: 45%;
            font-size: 1.75em;
          }
        }
      }
    }
  }

  @media (min-width: 1300px) {
    min-height: 850px;
    & .pagOrder-center-container {
      & .pagOrder {
        & .img-container {
          width: 50%;
        }
        & .text-container {
          width: 50%;
        }
      }
    }
  }
`;
