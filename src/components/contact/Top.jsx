import React from 'react';
import { styled } from 'styled-components';

export default function Top() {
  return (
    <TopStyle>
      <div className='left-container'>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className='right-container'>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </TopStyle>
  );
}

const TopStyle = styled.div`
  width: 100%;
  height: 24px;
  background: #aeaeae;
  border-top-left-radius: 4vw;
  border-top-right-radius: 4vw;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & .left-container {
    width: 22%;
    max-width: 58px;
    justify-content: center;

    & ul {
      display: flex;
      justify-content: center;
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: space-evenly;

      & li {
        width: 8px;
        height: 8px;
        border-radius: 100%;

        &:nth-child(1) {
          background: pink;
        }

        &:nth-child(2) {
          background: yellow;
        }

        &:nth-child(3) {
          background: greenyellow;
        }
      }
    }
  }

  & .right-container {
    width: 11%;
    justify-content: center;

    & ul {
      display: flex;
      justify-content: center;
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;

      & li {
        width: 1vw;
        height: 1vw;
        border-radius: 100%;
        background: #999;
        margin-left: 1vw;
      }
    }
  }

  @media (min-width: 550px) {
    min-height: 38px;
    border-radius: 32px 32px 0 0;

    & .left-container {
      align-items: center;
      display: flex;

      & ul {
        width: 70%;
      }
    }

    & .right-container {
      & ul {
        & li {
          width: 4px;
          height: 4px;
          margin-left: 4px;
        }
      }
    }
  }
`;
