import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import styled from '@emotion/styled';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { useMutation } from '@tanstack/react-query';
import { userState } from '../recoil/userState';
import useMovePageWithLogin from '../hooks/useMovePageWithLogin';
import { OnKeyUp } from '../asset/onKeyEnter';
import { postLogin } from '../asset/axiosFunctions';
import validation from '../asset/validation';

const Login = () => {

  useMovePageWithLogin({ifLogged: true, targetPage: '/startups'});

  const navigate = useNavigate();
  const setLoginToken = useSetRecoilState(userState);
  const [Email, setEmail] = useState<string>('');
  const [EmailError, setEmailError] = useState<string | ReactJSXElement>('');
  const [Pw, setPw] = useState<string>('');
  const [PwError, setPwError] = useState<string | ReactJSXElement>('');
  const [DisableLogin, setDisableLogin] = useState<boolean>(true);
  const [LoginError, setLoginError] = useState<string>('');

  // 로그인 처리
  const { mutate, isLoading } = useMutation(postLogin, {
    onSuccess: (res) => {
      const { token } = res.data;
      // API 요청시 헤더에 accessToken 담아 보내도록 설정
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setLoginToken(token);
      navigate('/startups');
    },
    onError: (err: any) => {
      setLoginError(err.response.data.message);
    }
  });

  // 로그인 버튼 클릭
  const OnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ email: Email, password: Pw });
  }

  // 이메일 입력값 체크 및 에러 출력
  const OnInputEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const errorMessage = validation({ type: 'email', value: e.target.value });
    if (errorMessage) {
      e.target.classList.add('error');
      setEmailError(errorMessage);
    } else {
      setEmailError('');
      e.target.classList.remove('error');
    }
  }, []);

  // 비밀번호 입력값 체크 및 에러 출력
  const OnInputPw = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
    const errorMessage = validation({ type: 'pw', value: e.target.value });
    if (errorMessage) {
      e.target.classList.add('error');
      setPwError(errorMessage);
    } else {
      setPwError('');
      e.target.classList.remove('error');
    }
  }, []);

  // 회원가입 버튼 클릭 시 이동
  const OnClickSignup = useCallback(() => {
    navigate('/signup');
  }, []);

  // 입력 후 에러 없으면 로그인 버튼 활성화
  useEffect(() => {
    if(Email && Pw && !EmailError && !PwError) {
      setDisableLogin(false);
    }
  }, [Email, Pw, EmailError, PwError]);

  return (
    <div className='inner flexCenter'>
      <Form onSubmit={OnSubmit}>
        <h2>로그인</h2>
        <div>
          <label htmlFor='email' className='hidden'>이메일</label>
          <input
            type='email' name='email' id='email' autoFocus
            placeholder='이메일 계정을 입력해주세요.'
            value={Email}
            onInput={OnInputEmail}
            onKeyUp={OnKeyUp('pw')}
            maxLength={50}
          />
          {EmailError && 
            <p className='errorMsg'>{EmailError}</p>}
        </div>
        <div>
          <label htmlFor='pw' className='hidden'>비밀번호</label>
          <input
            type='password' name='pw' id='pw'
            placeholder='비밀번호를 입력해주세요.'
            value={Pw}
            onInput={OnInputPw}
            maxLength={15}
          />
          {PwError && 
            <p className='errorMsg'>{PwError}</p>}
        </div>
        {LoginError && <LoginErrorWrap>{LoginError}</LoginErrorWrap>}
        <div>
          <button type='submit' disabled={DisableLogin || isLoading}>로그인</button>
        </div>
        <div className='signup'>
          <p>아직 회원이 아니신가요?</p>
          <button type='button' className='white' onClick={OnClickSignup}>회원가입 하기</button>
        </div>
      </Form>
    </div>
  )
}

export default Login;

const LoginErrorWrap = styled.div`
  width: 320px;
  padding-top: 10px;
  text-align: center;
  font-size: 12px;
  color: red;
`;

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  h2{
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
  }

  button{
    margin: 10px 0;
  }

  .signup{
    &::before{
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      margin: 0 0 30px;
      background-color: #E1E1E1;
    }

    p{
      text-align: center;
      font-size: 12px;
    }
  }
`;