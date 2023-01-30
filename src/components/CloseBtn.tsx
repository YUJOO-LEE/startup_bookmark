import { MouseEventHandler } from 'react';
import styled from '@emotion/styled';

const CloseBtn = ({ onClick }: { onClick?: MouseEventHandler}) => {
  return (
    <Button onClick={onClick} />
  )
}

export default CloseBtn;

const Button = styled.i`
  display: block;
  width: 24px;
  height: 24px;
  position: relative;
  cursor: pointer;

  &::before,&::after{
    content: '';
    display: block;
    width: 1px;
    height: 25px;
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: #616161;
  }

  &::before{
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::after{
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;