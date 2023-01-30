import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import BookmarkList from '../components/BookmarkList';
import useMovePageWithLogin from '../hooks/useMovePageWithLogin';
import { getBookmark } from '../asset/axiosFunctions';

const bookmarkList = () => {

  useMovePageWithLogin({ifLogged: false, targetPage: '/login'});

  // 북마크 정보 불러오기
  const { data } = useQuery(['getBookmark'], getBookmark);

  return (
    <div className='inner'>
      <PageTitle>북마크</PageTitle>
      <BookmarkList data={data?.data} />
      <FetchMore />
    </div>
  )
}

export default bookmarkList;

const PageTitle = styled.h2`
  margin-top: 100px;
  font-size: 30px;
  text-align: center;
  color: #222;

  @media screen and (max-width: 640px) {
    position: absolute;
    top: 13px;
    left: 50%;
    font-size: 20px;
    margin: 0;
    transform: translateX(-50%);
  }
`;

const FetchMore = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 50px;
`;
