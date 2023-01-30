import styled from '@emotion/styled';
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useRef } from 'react';

const options = ['메타버스', '펫테크', 'NFT', '트래블테크', '헬스케어'];

const SelectBox = (
  {SelectedOptions, setSelectedOptions, printError}:
  {SelectedOptions: string[], 
  setSelectedOptions: Dispatch<SetStateAction<string[]>>, 
  printError: (type: string, value: string) => void}
) => {
  const SelectBox = useRef<HTMLDivElement>(null);

  // 셀렉트박스 포커스 시 옵션 오픈 이벤트
  const openOptions = () => {
    SelectBox.current?.classList.add('on');
  };

  // 옵션 펼침 버튼 토글 이벤트
  const toggleOptions = () => {
    SelectBox.current?.classList.toggle('on');
  };

  // 체크박스 이벤트
  const OnSelect = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const selectedOption = e.target.value;
    let newSelectedOptions: string[];

    if (SelectedOptions.includes(selectedOption)) {
      newSelectedOptions = SelectedOptions.filter(option => option !== selectedOption);
    } else {
      newSelectedOptions = [...SelectedOptions, selectedOption];
    }

    setSelectedOptions(newSelectedOptions);

    printError('startup', newSelectedOptions.join(''));
  }, [SelectedOptions]);

  return (
    <>
      <SelectDiv id='startup' tabIndex={6} ref={SelectBox} onFocus={openOptions}>
        {!SelectedOptions.length
          ? '선택해주세요' 
          : SelectedOptions.map((option, idx) => 
            <span key={'selected' + idx}>{option}</span>)}
        <OptionsDiv>
          {options.map((option, idx) => (
            <label key={option + idx}>
              <input type='checkbox'
                value={option}
                onChange={OnSelect}
                tabIndex={7 + idx}
                checked={SelectedOptions.includes(option)}
              />
              {option}
            </label>
          ))}
        </OptionsDiv>
      </SelectDiv>
      <OpenButton onClick={toggleOptions}></OpenButton>
  </>
  )
}

export default SelectBox;


const SelectDiv = styled.div`
  width: 320px;
  height: 48px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px;
  border: 1px solid #D1D1D1;
  border-radius: 5px;
  font-size: 14px;
  line-height: 28px;
  color: #888;

  &.error{
    border: 1px solid red;
  }

  span{
    flex: 0 0 auto;
    padding: 2px 6px;
    height: 24px;
    background: #F0F6FF;
    border-radius: 5px;
    font-size: 14px;
    line-height: 24px;
    color: #338BFF;
  }

  &.on{
    >div{
      display: flex;
    }
    
    ~i{
      &::before{
        transform: rotate(45deg);
      }

      &::after{
        transform: rotate(-45deg);
      }
    }
  }
`;

const OptionsDiv = styled.div`
  width: 320px;
  padding: 15px;
  position: absolute;
  bottom: 48px;
  left: -1px;
  background-color: #F4F5F7;
  display: none;
  flex-direction: column;
  gap: 10px;

  label{
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: #000;
  }
`;

const OpenButton = styled.i`
width: 25px;
height: 25px;
display: inline-block;
position: absolute;
top: 12px;
right: 10px;
z-index: 1;
background-color: #fff;
cursor: pointer;

&::before{
  content: '';
  display: block;
  width: 10px;
  height: 1px;
  position: absolute;
  top: 12px;
  right: 2px;
  background-color: #888;
  transform: rotate(-45deg);
}

&::after{
  content: '';
  display: block;
  width: 10px;
  height: 1px;
  position: absolute;
  top: 12px;
  right: 9px;
  background-color: #888;
  transform: rotate(45deg);
}
`;