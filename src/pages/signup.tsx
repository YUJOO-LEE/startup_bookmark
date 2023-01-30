import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import SelectBox from '../components/SelectBox';
import Terms from '../components/Terms';
import useMovePageWithLogin from '../hooks/useMovePageWithLogin';
import { OnKeyUp } from '../asset/onKeyEnter';
import { postCheckTel } from '../asset/axiosFunctions';
import validation, { checkPwSafetyLevel } from '../asset/validation';
import { TypeError, TypeValue } from '../asset/types';

const ValueInit = {
  email: '',
  pw: '',
  pw2: '',
  name: '',
  phone: '',
}

const Signup = () => {

  useMovePageWithLogin({ifLogged: true, targetPage: '/startups'});

  const [Values, setValues] = useState<TypeValue>(ValueInit);
  const [Error, setError] = useState<TypeError>(ValueInit);
  const [DisableNext, setDisableNext] = useState<boolean>(true);
  const [PwSafetyLevel, setPwSafetyLevel] = useState<ReactJSXElement | null>(null);
  const [SelectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [SelectError, setSelectError] = useState<string>('');
  const [OpenTerms, setOpenTerms] = useState<boolean>(false);

  // 핸드폰 번호 중복 확인
  const checkTel = useMutation(postCheckTel, {
    onError: (err: any) => {
      if (err.request.status === 400) {
        setError(prev => ({ ...prev,
          phone: err.response.data.message
        }));
      }
    }
  });

  // 입력값 체크 및 에러 출력
  const OnInput = useCallback((type: string) => (e: ChangeEvent<HTMLInputElement>)=> {
    // 핸드폰 번호 포매팅
    if (type === 'phone') {
      e.target.value = e.target.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    }

    // 현재 input value 변경 및 에러 확인
    setValues((prv) => ({ ...prv, [type]: e.target.value }));
    printError(type, e.target.value);
  }, []);


  // 다음 버튼 클릭 시 발생 이벤트
  const checkEmpty = ()=> {
    // 전체 value 에러 여부 확인 (startup 제외)
    Object.keys(Values).forEach((type) => {
      printError(type, Values[type]);
    });

    // startup 에러 여부 별도 확인
    printError('startup', SelectedOptions.join(''));

    // 에러 없음 / value 빈값 없으면 약관 컴포넌트 출력
    if (
      !Object.values(Error).filter(v => v.toString().length).length &&
      Object.values(Values).filter(v => v.length).length === 5 &&
      SelectedOptions.length > 0
    ) {
      setOpenTerms(true);
    }
  };

  // 에러 처리
  const printError = (type: string, value: string) => {
    const value2 = (type === 'pw2') ? Values.pw : undefined;

    // 에러 검증
    const errorMessage = validation({ type, value, value2 }) || '';

    // 에러 출력
    setError((prv) => ({ ...prv, [type]: errorMessage }));

    // 인풋 스타일 지정
    const input = document.querySelector('#' + type)!.classList;
    errorMessage ? input.add('error') : input.remove('error');

    // 스타트업 선택 여부 체크
    if (type === 'startup') setSelectError(errorMessage);

    // 휴대폰 중복 가입 여부 체크
    if (type === 'phone' && !errorMessage) checkTel.mutate(value);

    // 비밀번호 안전도 체크
    if (type === 'pw' && !errorMessage) {
      setPwSafetyLevel(checkPwSafetyLevel(value));
    }
  }

  // 입력 후 에러 없으면 가입 버튼 활성화
  useEffect(() => {
    // 전체 인풋 입력 여부 확인
    if (Object.values(Values).filter(v => v.length).length < 5 || SelectedOptions.length < 1) {
      setDisableNext(true);
      return;
    };

    // 에러 유무 확인
    if (!Object.values(Error).filter(v => v.toString().length).length) {
      setDisableNext(false);
    } else {
      setDisableNext(true);
    }
  }, [Error, Values, SelectedOptions]);

  // 비밀번호 재입력값 동일여부 실시간 확인
  useEffect(() => {
    if (Values.pw.length < 8 || !Values.pw2) return;

    printError('pw2', Values.pw2);
  }, [Values.pw, Values.pw2])

  return (
    <div className='inner flexCenter'>
      <Form>
        <h2>회원가입</h2>
        <p>
          <Link to='/'>이미 계정이 있으신가요?</Link>
        </p>
        <div>
          <label htmlFor='email'>이메일 (아이디)<span>*</span></label>
          <input
            type='email' name='email' id='email' autoFocus
            placeholder='이메일 주소를 입력해주세요'
            value={Values.email}
            onInput={OnInput('email')}
            onKeyUp={OnKeyUp('pw')}
            maxLength={50}
            tabIndex={1}
          />
          {Error.email && 
            <p className='errorMsg'>{Error.email}</p>}
        </div>
        <div>
          <label htmlFor='pw'>비밀번호 (8자 이상)<span>*</span></label>
          <input
            type='password' name='pw' id='pw'
            placeholder='비밀번호를 입력해주세요 (8자리 이상)'
            value={Values.pw}
            onInput={OnInput('pw')}
            onKeyUp={OnKeyUp('pw2')}
            maxLength={15}
            tabIndex={2}
          />
          {Error.pw 
            ? <p className='errorMsg'>{Error.pw}</p>
            : PwSafetyLevel}
        </div>
        <div>
          <label htmlFor='pw2' className='hidden'>비밀번호 (8자 이상)<span>*</span></label>
          <input
            type='password' name='pw2' id='pw2'
            placeholder='다시 한 번 비밀번호를 입력해주세요'
            value={Values.pw2}
            onInput={OnInput('pw2')}
            onKeyUp={OnKeyUp('name')}
            maxLength={15}
            tabIndex={3}
          />
          {Error.pw2 && 
            <p className='errorMsg'>{Error.pw2}</p>}
        </div>
        <div>
          <label htmlFor='name'>이름<span>*</span></label>
          <input
            type='text' name='name' id='name'
            placeholder='예) 홍길동'
            value={Values.name}
            onInput={OnInput('name')}
            onKeyUp={OnKeyUp('phone')}
            maxLength={15}
            tabIndex={4}
          />
          {Error.name && 
            <p className='errorMsg'>{Error.name}</p>}
        </div>
        <div>
          <label htmlFor='phone'>휴대폰 번호<span>*</span></label>
          <input
            type='tel' name='phone' id='phone'
            placeholder='휴대폰 번호를 입력해주세요'
            value={Values.phone}
            onInput={OnInput('phone')}
            onKeyUp={OnKeyUp('startup')}
            maxLength={13}
            tabIndex={5}
          />
          {Error.phone && 
            <p className='errorMsg'>{Error.phone}</p>}
        </div>
        <div>
          <label htmlFor='startup'>관심 스타트업 분야<span>*</span></label>
          <SelectWrap>
            <SelectBox SelectedOptions={SelectedOptions} setSelectedOptions={setSelectedOptions} printError={printError} />
            {SelectError && 
              <p className='errorMsg'>{SelectError}</p>}
          </SelectWrap>
        </div>
        <div>
          <button type='button' onClick={checkEmpty} className={DisableNext ? 'disabled' : undefined}>다음</button>
        </div>
      </Form>
      {OpenTerms &&
        <Terms setOpenTerms={setOpenTerms} Values={Values} SelectedOptions={SelectedOptions} setError={setError} DisableNext={DisableNext} />}
    </div>
  )
}

export default Signup;

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  h2{
    text-align: center;
    font-size: 30px;
  }

  a{
    display: block;
    text-align: center;
    font-size: 12px;
    color: #0052CE;
    margin-bottom: 10px;
  }

  label{
    display: block;
    font-size: 16px;
    line-height: 2;

    span{
      color: red;
    }
  }

  button{
    margin: 10px 0;
  }

  .errorMsg{
    &.high{
      color: #006EFF;
    }
    &.normal{
      color: #F09A00;
    }
  }
`;

const SelectWrap = styled.div`
  position: relative;
`;
