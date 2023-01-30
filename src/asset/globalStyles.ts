import normalize from 'emotion-normalize';
import { css } from '@emotion/react';

const GlobalStyles = css`
  ${normalize}

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul,ol,li{
    list-style: none;
  }

  .hidden{
    position: absolute;
    top: -9999px;
    left: -9999px;
    text-indent: -99999;
  }

  input[type='text'],input[type='tel'],input[type='email'],input[type='password']{
    width: 320px;
    height: 48px;
    padding: 10px;
    border: 1px solid #D1D1D1;
    border-radius: 5px;
    font-size: 14px;

    &.error{
      border: 1px solid red;
    }
  }

  button{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px 20px;
    gap: 10px;

    width: 320px;
    height: 48px;
    border: 1px solid #006EFF;
    border-radius: 5px;
    background-color: #006EFF;
    color: #fefefe;
    font-size: 14px;
    cursor: pointer;

    &:disabled,&.disabled{
      opacity: 0.5;
      cursor: default;
    }

    &.white{
      background-color: #fefefe;
      color: #006EFF;
    }
  }

  .inner{
    max-width: 1920px;
    margin: 0 auto;
  }

  .flexCenter{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .textCenter{
    text-align: center;
  }

  .errorMsg{
    margin: 10px 10px 0;
    font-size: 12px;
    line-height: 1;
    color: red;
  }
`;


export default GlobalStyles;