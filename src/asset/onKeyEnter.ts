import { KeyboardEvent } from 'react';

// 엔터 시 선택한 요소로 포커스 이동
export const OnKeyUp = (nextEl: string) => (e: KeyboardEvent<HTMLInputElement>)=> {
  e.preventDefault();
  if (e.key !== 'Enter') return;
  document.getElementById(nextEl)?.focus();
};