
import React from 'react';
import GlobalLayout from './pages/_layout'

const DynamicIndex = React.lazy(() => import('./pages/index'));
const DynamicBookmark = React.lazy(() => import('./pages/bookmark'));
const DynamicLogin = React.lazy(() => import('./pages/login'));
const DynamicSignup = React.lazy(() => import('./pages/signup'));
const DynamicStartups = React.lazy(() => import('./pages/startups'));


export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/', element: <DynamicIndex />, index: true},
      { path: '/bookmark', element: <DynamicBookmark />, },
      { path: '/login', element: <DynamicLogin />, },
      { path: '/signup', element: <DynamicSignup />, },
      { path: '/startups', element: <DynamicStartups />, },
    ]
  }
]

export const pages = [
  { route: '/' },
  { route: '/bookmark' },
  { route: '/login' },
  { route: '/signup' },
  { route: '/startups' },
]
