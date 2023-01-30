import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { useSetRecoilState } from 'recoil';
import { userState } from './recoil/userState';
import { useEffect } from 'react';
import axios from 'axios';

// 쿠키 내 토큰 불러오기
const getCookie = (name: string) => {
  const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? value[2] : null;
};

const App = () => {
  const element = useRoutes(routes);
  const setLoginToken = useSetRecoilState(userState);

  // 토큰 있으면 api 헤더 및 전역상태로 공유
  useEffect(()=>{
    const Token = getCookie('auth');
    if (!Token) return;
    setLoginToken(Token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${Token}`;
  }, []);

  return element;
};

export default App;
