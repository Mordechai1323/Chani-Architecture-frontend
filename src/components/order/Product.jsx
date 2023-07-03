import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export default function Product({ id, name, price, description, image }) {

  return (
    <ProductStyle>
      <Link to={'/product/' + id} key={id}>
        <div className='order'>
          <div className='img-container'>
            <img src={image} alt={'image of' + name} />
          </div>
          <div className='text-container'>
            <h2>{name}</h2>
            <p>{description}</p>
            <h2>price: {price} $</h2>
          </div>
        </div>
      </Link>
    </ProductStyle>
  );
}

const ProductStyle = styled.div`
  width: 80%;
  & a {
    text-decoration: none;

    & .order {
      min-height: 164px;
      border: 1px solid #eaeaeb;
      border-radius: 12px;
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
      }
    }
  }

  @media (min-width: 550px) {
    width: 50%;
    & a {
      & .order {
        margin: 12px 12px;
        min-height: 291px;

        & .img-container {
          width: 60%;
        }

        & .text-container {
          width: 40%;
        }
      }
    }
  }
  @media (min-width: 1300px) {
    width: 40%;
  }
`;
