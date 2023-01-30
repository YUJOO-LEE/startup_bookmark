import styled from '@emotion/styled';
import { Company } from '__mock__/types/company';
import StartupItem from './StartupItem';

const StartupList = ({ pages }: { pages?: { data: { startups: (Company & { bookmarked: boolean; })[]; }; }[] }) => {
  return (
    <ListWrap>
      {pages?.map((page) => 
        page.data.startups.map((item) => (
          <StartupItem {...item} key={item.id} />
      )))}
    </ListWrap>
  )
}

export default StartupList;


const ListWrap = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 70px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;

  @media screen and (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
    padding: 20px;
  }

  @media screen and (max-width: 360px) {
    grid-template-columns: 1fr;
  }
`;