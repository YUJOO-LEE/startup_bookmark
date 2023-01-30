import axios from 'axios';
import { LoginPayload, SignupPayload } from '__mock__/types/user';

// 회원가입
export const postSignup = (payload: SignupPayload) => {
  return axios.post('/api/signup', payload);
}

// 휴대폰 번호 확인
export const postCheckTel = (payload: string) => {
  return axios.post('/api/check-tel', {tel: payload});
}

// 로그인
export const postLogin = (payload: LoginPayload) => {
  return axios.post('/api/login', payload);
}

// 유저 정보 출력
export const getUserInfo = () => {
  return axios.get('/api/userinfo');
}

// 스타트업 정보 출력
export const getStartups = ({ pageParam = 0}) => {
  const params = { offset: pageParam };
  return axios.get('/api/startups', { params });
};

// 북마크 정보 출력
export const getBookmark = () => {
  return axios.get('/api/startups/bookmark');
}

// 북마크 정보 저장
export const postBookmark = (payload: string) => {
  return axios.post('/api/startups/bookmark', { id: payload });
}
