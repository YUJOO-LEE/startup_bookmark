import { ChangeEvent, Dispatch, MouseEventHandler, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { userState } from '../recoil/userState';
import CloseBtn from './CloseBtn';
import { TypeError, TypeValue } from '../asset/types';
import { postLogin, postSignup } from '../asset/axiosFunctions';

const Terms = ({setOpenTerms, Values, SelectedOptions, setError, DisableNext}: {
  setOpenTerms: Dispatch<SetStateAction<boolean>>;
  Values: TypeValue;
  SelectedOptions: string[];
  setError: Dispatch<SetStateAction<TypeError>>;
  DisableNext: boolean;
}) => {

  const navigate = useNavigate();
  const setLoginToken = useSetRecoilState(userState);
  const [CheckAll, setCheckAll] = useState<boolean>(false);
  const [SelectedTerms, setSelectedTerms] = useState<string[]>([]);
  const [SignupError, setSignupError] = useState<string>('');
  const [DisableSignup, setDisableSignup] = useState<boolean>(true);

  // 로그인 처리
  const { mutate } = useMutation(postLogin, {
      onSuccess: (res) => {
        const { token } = res.data;
        // API 요청시 헤더에 accessToken 담아 보내도록 설정
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setLoginToken(token);
        navigate('/startup_list');
      },
      onError: () => {
        navigate('/login');
      }
  });

  // 회원가입 처리
  const Signup = useMutation(postSignup, {
      onSuccess: (res) => {
        mutate(res.config.data);
      },
      onError: (err: any) => {
        if (err.request.status === 400) {
          setError(prev => ({
            ...prev,
            email: err.response.data.message
          }));
        }
        setSignupError('회원가입에 실패했습니다');
      }
  });

  // 회원가입 클릭
  const handleSignup: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    Signup.mutate({ 
      email: Values.email,
      password: Values.pw,
      name: Values.name,
      tel: Values.phone,
      interestStartups: SelectedOptions,
      marketingAgreed: DisableSignup
    });
  }

  // 현재 창 닫기
  const CloseTerms: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    if (e.target !== e.currentTarget) return;
    setOpenTerms(false);
  }, []);

  // 전체 선택
  const handleCheckAll = useCallback(() => {
    setCheckAll(prev => {
      if (prev) {
        setSelectedTerms([]);
      } else {
        setSelectedTerms(['Service', 'personalInformation', 'marketingAgreed']);
      }
      return !prev
    })
  }, []);

  // 체크박스 이벤트
  const handleCheck = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const selectedOption = e.target.value;
    let newSelectedOptions: string[];

    if (SelectedTerms.includes(selectedOption)) {
      newSelectedOptions = SelectedTerms.filter(option => option !== selectedOption);
    } else {
      newSelectedOptions = [...SelectedTerms, selectedOption];
    }

    setSelectedTerms(newSelectedOptions);
  }, [SelectedTerms]);

  // 필수 선택 시 회원가입 버튼 활성화
  useEffect(() => {
    if (SelectedTerms.includes('Service') && SelectedTerms.includes('personalInformation') && !DisableNext) {
      setDisableSignup(false);
    } else {
      setDisableSignup(true);
    }
  }, [SelectedTerms]);

  return (
    <BackGround onClick={CloseTerms}>
      <TermsWrap>
        <CloseBtn onClick={CloseTerms} />
        <h3>약관동의<span>*</span></h3>
        <TermsList>
          <div className='checkAll'>
            <input type='checkbox' id='checkAll'
              checked={CheckAll}
              onChange={handleCheckAll}
            />
            <label htmlFor='checkAll'>
              <p>모두 동의합니다.</p>
            </label>
          </div>
          <div>
            <input type='checkbox' id='Service' 
              value='Service'
              onChange={handleCheck}
              checked={SelectedTerms.includes('Service')}
            />
            <label htmlFor='Service'>
              <p>[필수] <Link to='#'>서비스 이용 약관</Link>에 동의합니다.</p>
            </label>
          </div>
          <div>
            <input type='checkbox' id='personalInformation' 
              value='personalInformation'
              onChange={handleCheck}
              checked={SelectedTerms.includes('personalInformation')}
            />
            <label htmlFor='personalInformation'>
              <p>[필수] <Link to='#'>개인정보수집 및 이용</Link>에 동의합니다.</p>
            </label>
          </div>
          <div>
            <input type='checkbox' id='marketingAgreed'
              name='marketingAgreed'
              value='marketingAgreed'
              onChange={handleCheck}
              checked={SelectedTerms.includes('marketingAgreed')}
            />
            <label htmlFor='marketingAgreed'>
              <p>[선택] <Link to='#'>마케팅 활용 동의</Link> 및 광고 수신에 동의합니다.</p>
              <span>스타트업과 투자 생태계의 인사이트가 담긴 뉴스레터, 데모데이 및 행사/이벤트 등 다양한 정보를 제공합니다.</span>
            </label>
          </div>
        </TermsList>
        {SignupError &&
          <LoginErrorWrap>{SignupError}</LoginErrorWrap>}
        <button disabled={DisableSignup || Signup.isLoading} onClick={handleSignup}>회원가입</button>
      </TermsWrap>
    </BackGround>
  )
}

export default Terms;

const LoginErrorWrap = styled.div`
  width: 320px;
  text-align: center;
  font-size: 12px;
  color: red;
`;

const BackGround = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;

const TermsWrap = styled.div`
  width: 360px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -10px 10px rgba(0, 0, 0, 0.1);

  h3{
    width: 100%;
    font-size: 16px;
    font-weight: normal;
    line-height: 2;

    span{
      color: red;
    }
  }

  button{
    margin-top: 20px;
  }
`;

const TermsList = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  >div{
    display: flex;
    align-items: flex-start;
    gap: 10px;

    &.checkAll{
      padding-bottom: 10px;
      border-bottom: 1px solid #D6DAE0;
    }
  }

  label{
    p{
      font-size: 14px;
      color: #616161;
      word-break: keep-all;
      a{
        color: #006EFF;
        text-decoration: none;
      }
    }

    span{
      display: inline-block;
      font-size: 12px;
      color: #B3B3B3;
      padding-top: 10px;
      margin-bottom: 10px;
    }
  }
`;
