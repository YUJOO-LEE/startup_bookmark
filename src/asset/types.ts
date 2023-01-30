import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

export type TypeValue = {
  [index: string]: string,
  email: string,
  pw: string,
  pw2: string,
  name: string,
  phone: string,
}

export type TypeError = {
  [index: string]: string | ReactJSXElement,
  email: string,
  pw: string,
  pw2: string,
  name: string,
  phone: string,
}
