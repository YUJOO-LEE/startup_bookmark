import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import StartupList from '../components/StartupList';
import useIntersecting from '../hooks/useIntersecting';
import useMovePageWithLogin from '../hooks/useMovePageWithLogin';
import { getStartups } from '../asset/axiosFunctions';

const startupList = () => {
  
  useMovePageWithLogin({ifLogged: false, targetPage: '/login'});

  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const Intersecting = useIntersecting(fetchMoreRef);

  // 스타트업 정보 불러오기
  const { data, isSuccess, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(['getStartup'], getStartups, {
      getNextPageParam: (lastPage) => {
        return lastPage.data.paging.next
      },
    }
  );

  // 다음 데이터 호출
  useEffect(() => {
    if (!Intersecting || !isSuccess || isLoading || !hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [Intersecting])

  return (
    <div className='inner'>
      <PageTitle>스타트업 리스트</PageTitle>
      <StartupList pages={data?.pages} />
      <FetchMore ref={fetchMoreRef} />
    </div>
  )
}

export default startupList;

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
