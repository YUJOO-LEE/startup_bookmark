import { MouseEventHandler } from 'react';
import styled from '@emotion/styled';

const Hamburger = ({ onClick }: { onClick?: MouseEventHandler}) => {
  return (
    <Button onClick={onClick}>
      <span></span>
    </Button>
  )
}

export default Hamburger;

const Button = styled.i`
  width: 20px;
  height: 20px;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;

  span{
    display: block;
    width: 100%;
    height: 1px;
    background-color: #616161;
  }

  &::before,&::after{
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    position: absolute;
    background-color: #616161;
  }

  &::before{
    top: 2px;
  }

  &::after{
    bottom: 2px;
  }
`;