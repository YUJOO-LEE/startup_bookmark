import { MouseEvent, useCallback } from 'react';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { Company } from '__mock__/types/company';
import { postBookmark } from '../asset/axiosFunctions';
import BookmarkIcon from '../asset/bookmark';

const StartupItem = ({
  id,
  title,
  tag,
  thumbnailImageUrl,
  thumbnailFallbackColor,
  description,
  bookmarked
}: (Company & { bookmarked: boolean; })
) => {

  // 북마크 등록
  const { mutate } = useMutation(postBookmark);

  const handleBookmark = useCallback((id: string) => (e: MouseEvent<HTMLSpanElement>) => {
    try {
      mutate(id);
      e.currentTarget.classList.toggle('marked');
    } catch {
      console.log('저장 실패');
    }
  }, []);

  return (
    <ListItem key={id}>
      <ImageWrap style={{backgroundColor: thumbnailFallbackColor}}>
        <span>{tag}</span>
        <img src={thumbnailImageUrl} alt={title} />
      </ImageWrap>
      <TextWrap>
        <h3>{title}</h3>
        <p>{description}</p>
        <span className={bookmarked ? 'marked' : undefined}
          onClick={handleBookmark(id)}
        ><BookmarkIcon /></span>
      </TextWrap>
    </ListItem>
  )
}

export default StartupItem;

const ListItem = styled.article`
  max-width: 290px;
  margin: 0 auto;
  border: 1px solid #E8ECF2;
  border-radius: 5px;
  overflow: hidden;
`;

const ImageWrap = styled.div`
  width: 100%;
  height: 190px;
  overflow: hidden;
  position: relative;

  @media screen and (max-width: 640px) {
    height: 120px;
  }

  span{
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #FEFEFE;
    border-radius: 5px;
    font-size: 12px;
    line-height: 1;
    padding: 5px 5px 3px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TextWrap = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (max-width: 640px) {
    padding: 10px 20px;
    gap: 5px;
  }

  h3{
    font-size: 18px;
    font-weight: normal;
  }

  p{
    font-size: 14px;
    color: #595959;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap: break-word; 
    word-break: break-all;
  }

  span{
    align-self: flex-end;
    width: 24px;
    height: 24px;
    padding: 3px 5px;
    cursor: pointer;

    svg{
      stroke: #616161;
    }

    &.marked{
      svg{
        stroke: none;
        fill: #006CFF;
      }
    }
  }
`;