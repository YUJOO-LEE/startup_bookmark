import { v4 as uuidv4 } from 'uuid';
//
import type { Company } from '../types/company';

const initializeCompanies = (length: number): Record<string, Company> => {
  const Company = () => {
    const ret = [
      'Cham',
      'Steven',
      'Chris',
      'Tene',
      'Luca',
      'Hun',
      'Siny',
      'Kay',
      '챔',
      '스티븐',
      '크리스',
      '테네',
      '루카',
      '훈',
      '시니',
      '케이',
    ];

    return ret[~~(Math.random() * ret.length)];
  };

  const CompanyName = () => {
    const ret = ['Inc', 'Incorporation'];
    return ret[~~(Math.random() * ret.length)];
  };

  const Description = () => {
    const ret = [
      '우리는 국내 스타트업 투자 생태계를 혁신합니다.',
      'Duis at vehicula mauris. Duis feugiat aliquam tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque nec semper urna, et eleifend urna. Pellentesque ullamcorper, augue a sollicitudin consectetur, felis sapien tristique lacus, in vestibulum lacus arcu vel lacus. Integer condimentum sem eu aliquam efficitur. Aliquam id orci risus. Fusce efficitur, metus id laoreet viverra, odio nisi convallis tortor, non tempus tortor nunc eu nisi. Fusce ac rutrum felis, at feugiat arcu. Maecenas eu lectus tincidunt, dictum tortor eu, finibus odio',
      'Phasellus ut purus vel sem iaculis hendrerit\n sit amet at lacus. In auctor, felis vitae condimentum\n cursus, eros arcu aliquet ipsum, in condimentum arcu orci et justo.',
    ];
    return ret[~~(Math.random() * ret.length)];
  };

  const Tag = () => {
    const ret = ['생산성', '메타버스', '데이터', '펫테크', '아트테크'];
    return ret[~~(Math.random() * ret.length)];
  };

  const BackgroundImage = () => {
    const ret = [
      `https://i.picsum.photos/id/979/600/387.jpg?hmac=4iMfVmj_P4RIlX7A-rv92E9ea2U1gEjPv-EcsrV-TJ0`,
      `https://i.picsum.photos/id/606/600/387.jpg?hmac=FczHS1-WBn5tjUzl_PKKcIcMCUBm8DOtSfgYWaFwGFg`,
      `https://i.picsum.photos/id/69/600/387.jpg?hmac=mAHMCWJr3yEmdL5vr9Z2aMw-PFi71KevO7xlw_5U-js`,
    ];
    return ret[~~(Math.random() * ret.length)];
  };

  const FallbackColor = () => {
    return (
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
    );
  };

  const ret: Record<string, Company> = {};

  for (let i = 0; i < length; i++) {
    const company: Company = {
      id: uuidv4(),
      title: `${Company()} ${CompanyName()}`,
      description: Description(),
      tag: Tag(),
      thumbnailImageUrl: BackgroundImage(),
      thumbnailFallbackColor: FallbackColor(),
    };

    ret[company.id] = company;
  }
  return ret;
};

export default initializeCompanies;
