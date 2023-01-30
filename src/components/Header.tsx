import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/userState';
import Hamburger from './HamburgerBtn';
import MobileNav from './MobileNav';
import { getUserInfo } from '../asset/axiosFunctions';

const Header = () => {

  const { pathname } = useLocation();
  const LoginToken = useRecoilValue(userState);
  const [UserName, setUserName] = useState<string>('');
  const [IsShowMobileNav, setIsShowMobileNav] = useState<boolean>(false);

  // 모바일 메뉴 활성화 이벤트
  const OnClick = useCallback(() => {
    setIsShowMobileNav(!IsShowMobileNav);
  }, [IsShowMobileNav])

  // 유저 정보 불러오기
  const { mutate } = useMutation(getUserInfo, {
      onSuccess: (res) => {
        setUserName(res.data.user.name);
      }
  });

  // 로그인 여부 확인
  useEffect(() => {
    if (LoginToken) {
      mutate();
    }
  }, [LoginToken]);

  // 페이지 이동 시 모바일 메뉴 비활성화
  useEffect(() => {
    setIsShowMobileNav(false);
  }, [pathname]);

  // 모바일 메뉴 활성 상태에 따라 스크롤 차단
  useEffect(() => {
    if (IsShowMobileNav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [IsShowMobileNav]);

  return (
    <HeaderWrap>
      <GNB>
        {
          LoginToken ? <ul className='pc'>
            <li>
              <ProfileIcon>{UserName[0]}</ProfileIcon>
              <ProfileText>{UserName}</ProfileText>
            </li>
            <li><Hamburger onClick={OnClick} /></li>
          </ul> : <ul className='mobile'>
            <li><Link to='/'>로그인</Link></li>
            <li><Link to='/signup' className='signup'>회원가입</Link></li>
            <li><Hamburger onClick={OnClick} /></li>
          </ul>
        }
      </GNB>
      <MobileNav IsShowMobileNav={IsShowMobileNav} OnClick={OnClick} />
    </HeaderWrap>
  )
}

export default Header;

const HeaderWrap = styled.header`
  width: 100%;
  height: 60px;
  padding: 20px 40px;
  border-bottom: 1px solid #E8ECF2;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media screen and (max-width: 640px) {
    height: 44px;
    padding: 20px;
  }
`;

const GNB = styled.nav`
  ul{
    display: flex;
    align-items: center;

    li{
      display: flex;
      align-items: center;

      a{
        text-decoration: none;
        color: #616161;
        font-size: 14px;
        line-height: 1;

        &.signup{
          font-weight: bold;
          color: #006EFF;
        }
      }
    }

    &.pc{
      li{
        @media screen and (max-width: 640px) {
          &:first-of-type{
            display: none;
          }
        }
      }
    }

    &.mobile{
      li{
        &:first-of-type::after{
          content: '';
          display: block;
          width: 1px;
          height: 12px;
          background: #B3B3B3;
          margin: 0 10px;
        }

        &:last-of-type{
          display: none;
        }
        
        @media screen and (max-width: 1199px) {
          display: none;
          &:last-of-type{
            display: block;
          }
        }
      }
    }
  }
`;

const ProfileIcon = styled.i`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  padding-top: 2px;
  margin-right: 5px;
  background-color: #6D7992;
  border-radius: 50%;

  font-size: 14px;
  line-height: 1;
  font-style: normal;
  color: #fff;
`;

const ProfileText = styled.span`
  margin-right: 40px;
  margin-bottom: -5px;

  @media screen and (max-width: 360px) {
    margin-right: 20px;
  }
`;