// 에러메세지
const errorMsg:{[key: string]: string}  = {
  email_error: '이메일 형식이 올바르지 않습니다',
  email_length: '이메일 주소를 입력하세요',
  pw_length: '비밀번호는 8자리 이상 15자리 이하입니다',
  pwSafe_error: '비밀번호 안전도 ',
  pw2_error: '비밀번호가 일치하지 않습니다',
  pw2_length: '비밀번호를 다시 입력해주세요',
  name_length: '이름을 입력해주세요',
  phone_error: '잘못된 휴대폰 번호입니다',
  phone_length: '휴대폰 번호를 입력해주세요',
  startup_length: '관심 스타트업 분야를 선택해주세요',
}

// 타입별 검증 처리
const checkValue: {[key: string]: Function} = {
  email: (value: string) => {
    const validationError = isEmailError(value) && 'error';
    const lengthError = checkLength(value, 5) && 'length';
    return lengthError || validationError;
  },
  pw: (value: string) => {
    return checkLength(value, 8, 15) && 'length';
  },
  pw2: (value: string, value2: string) => {
    const validationError = isPw2Error(value, value2) && 'error';
    const lengthError = checkLength(value, 1) && 'length';
    return lengthError || validationError;
  },
  name: (value: string) => {
    return checkLength(value, 1) && 'length';
  },
  phone: (value: string) => {
    const validationError = isPhoneError(value) && 'error';
    const lengthError = checkLength(value, 1) && 'length';
    return lengthError || validationError;
  },
  startup: (value: string) => {
    return checkLength(value, 1) && 'length';
  },
}

// 검증 실행 및 에러 메세지 출력 
const validation = ({ type, value, value2 }: { type: string; value: string; value2?:string }) => {
  const errType = checkValue[type](value, value2);
  return errorMsg[type + '_' + errType];
}

export default validation;

// 이메일 형식 검증
const isEmailError = (value: string) => {
  const max = 50;
  const reg = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-\_]+\.[A-Za-z0-9\-]{2,3}$/;

  if (value.length > max || !reg.test(value)) return true;
  return false;
}

// 연락처 검증
const isPhoneError = (value: string) => {
  const min = 12;
  const max = 13;
  const reg = new RegExp("^010");

  if (value.length < min || value.length > max || !reg.test(value)) return true;
  return false;
}

// 비밀번호 재입력 검증
const isPw2Error = (value: string, value2: string) => {
  if (value !== value2) return true;
  return false;
}

// 문자열 길이 체크
const checkLength = (value: string, min: number, max?: number) => {
  if (value.length < min || (max && value.length > max)) return true;
  return false;
}

// 비밀번호 안전도 분류
const safetyLevel: {[key: string]: string}  = {
  high: '높음',
  normal: '보통',
  low: '낮음',
}

// 비밀번호 안전도 검증
export const checkPwSafetyLevel = (value: string) => {
  const high = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&+=])[A-Za-z0-9!@#$%^&+=]{8,}/;
  const normal = /(?=.*[a-z])(?=.*[A-Z]|[0-9]|[!@#$%^&+=])|(?=.*[A-Z])(?=.*[a-z]|[0-9]|[!@#$%^&+=])|(?=.*[0-9])(?=.*[a-z]|[A-Z]|[!@#$%^&+=])|(?=.*[!@#$%^&+=])(?=.*[a-z]|[A-Z]|[0-9])[A-Za-z0-9!@#$%^&+=]{8,}/;

  const level = high.test(value) ? 'high' : normal.test(value) ? 'normal': 'low';
  return <p className={'errorMsg ' + level}>비밀번호 안전도 {safetyLevel[level]}</p>;
}