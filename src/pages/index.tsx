import useMovePageWithLogin from '../hooks/useMovePageWithLogin';

const MainPage = () => {
  useMovePageWithLogin({ifLogged: true, targetPage: '/startups'});
  useMovePageWithLogin({ifLogged: false, targetPage: '/login'});

  return (
    <div>Loading...</div>
  )
}

export default MainPage;