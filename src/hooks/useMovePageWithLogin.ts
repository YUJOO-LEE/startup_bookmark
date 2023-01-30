import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/userState';
import { useNavigate } from 'react-router-dom';

const useMovePageWithLogin = ({ifLogged, targetPage}: {ifLogged: boolean; targetPage: string}) => {
  const navigate = useNavigate();
  const LoginToken = useRecoilValue(userState);

  // 로그인 여부 확인
  useEffect(() => {
    if ((LoginToken && ifLogged) || (!LoginToken && !ifLogged)) {
      navigate(targetPage);
    }
  }, [LoginToken]);
}

export default useMovePageWithLogin;