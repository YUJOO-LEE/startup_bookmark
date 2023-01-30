import { MouseEventHandler, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/userState';
import styled from '@emotion/styled';
import CloseBtn from './CloseBtn';
import axios from 'axios';

const MobileNav = ({IsShowMobileNav, OnClick}: {IsShowMobileNav: boolean; OnClick: MouseEventHandler}) => {

  const [LoginToken, setLoginToken] = useRecoilState(userState);

  // 로그아웃 버튼 클릭 이벤트
  const LogoutBtn = useCallback(() => {
    document.cookie = 'auth=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/';
    setLoginToken(null);
    axios.defaults.headers.common['Authorization'] = null;
  }, []);

  return (
    <MobileNavWrap className={IsShowMobileNav ? 'on' : undefined}>
      <ul>
        <CloseBtn onClick={OnClick} />
        <h2>
          메뉴
        </h2>
        <li><Link to='/'>홈</Link></li>
        <li><Link to='/bookmark'>북마크</Link></li>
        {LoginToken &&
          <li><Link to='#' onClick={LogoutBtn}>로그아웃</Link></li>}
      </ul>
    </MobileNavWrap>
  )
}

export default MobileNav;

const MobileNavWrap = styled.aside`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: #fff;
  display: none;
  flex-direction: column;
  align-items: center;

  i{
    margin: 20px 40px;
    float: right;

    @media screen and (max-width: 640px) {
      position: absolute;
      right: 0;
      margin: 10px 20px;
    }
  }

  h2{
    width: 100%;
    padding: 100px 0 20px;
    font-size: 30px;
    text-align: center;
    border-bottom: 1px solid #E8ECF2;

    @media screen and (max-width: 640px) {
      height: 44px;
      font-size: 20px;
      padding: 13px 0 0;
    }
  }

  ul{
    width: 100%;

    li{
      padding: 50px 0;
      border-bottom: 1px solid #E8ECF2;

      @media screen and (max-width: 640px) {
        padding: 30px 0;
      }

      a{
        display: block;
        font-size: 20px;
        text-align: center;
        text-decoration: none;
        color: #989898;
      }
    }
  }

  &.on{
    display: flex;
  }
`;