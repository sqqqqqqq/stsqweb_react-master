import React from 'react';
import { Carousel } from 'antd';
import ColorfulTitle from '@/components/ColorfulTitle';
import partners1 from '@/assets/home/1.png';
import partners2 from '@/assets/home/2.png';
import partners3 from '@/assets/home/3.png';
import partners4 from '@/assets/home/4.png';
import partners5 from '@/assets/home/5.png';
import partners6 from '@/assets/home/6.png';
import partners7 from '@/assets/home/7.png';
import partners8 from '@/assets/home/8.png';
import partners9 from '@/assets/home/9.png';
import partners10 from '@/assets/home/10.png';
import partners11 from '@/assets/home/11.png';
import partners12 from '@/assets/home/12.png';
import partners13 from '@/assets/home/13.png';
import partners14 from '@/assets/home/14.png';
import partners15 from '@/assets/home/15.png';
import partners16 from '@/assets/home/16.png';
import partners17 from '@/assets/home/17.png';
import partners18 from '@/assets/home/18.png';
import partners19 from '@/assets/home/19.png';
import partners20 from '@/assets/home/20.png';
import partners21 from '@/assets/home/21.png';
import partners22 from '@/assets/home/22.png';
import partners23 from '@/assets/home/23.png';
import partners24 from '@/assets/home/24.png';
import partners25 from '@/assets/home/25.png';
import partners26 from '@/assets/home/26.png';
import partners27 from '@/assets/home/27.png';
import partners28 from '@/assets/home/28.png';
import partners29 from '@/assets/home/29.png';
import partners30 from '@/assets/home/30.png';
import partners31 from '@/assets/home/31.png';
import partners32 from '@/assets/home/32.png';
import partners33 from '@/assets/home/33.png';
import partners34 from '@/assets/home/34.png';
import partners35 from '@/assets/home/35.png';
import partners36 from '@/assets/home/36.png';
import partners37 from '@/assets/home/37.png';
import partners38 from '@/assets/home/38.png';
import partners39 from '@/assets/home/39.png';
import partners40 from '@/assets/home/40.png';
import partners41 from '@/assets/home/41.png';
import partners42 from '@/assets/home/42.png';
import partners43 from '@/assets/home/43.png';
import partners44 from '@/assets/home/44.png';
import partners45 from '@/assets/home/45.png';
import partners46 from '@/assets/home/46.png';
import partners47 from '@/assets/home/47.png';
import partners48 from '@/assets/home/48.png';
import partners49 from '@/assets/home/49.png';
import partners50 from '@/assets/home/50.png';
import partners51 from '@/assets/home/51.png';
import partners52 from '@/assets/home/52.png';

import styles from './index.less';

const partnerArray1 = [
  { key: 1, img: partners1 },
  { key: 2, img: partners2 },
  { key: 3, img: partners3 },
  { key: 4, img: partners4 },
  { key: 5, img: partners5 },
  { key: 6, img: partners6 },

  { key: 7, img: partners7 },
  { key: 8, img: partners8 },
  { key: 9, img: partners9 },
  { key: 10, img: partners10 },
  { key: 11, img: partners11 },
  { key: 12, img: partners12 },
];

const partnerArray2 = [
  { key: 1, img: partners13 },
  { key: 2, img: partners14 },
  { key: 3, img: partners15 },
  { key: 4, img: partners16 },
  { key: 5, img: partners17 },
  { key: 6, img: partners18 },

  { key: 7, img: partners19 },
  { key: 8, img: partners20 },
  { key: 9, img: partners21 },
  { key: 10, img: partners22 },
  { key: 11, img: partners23 },
  { key: 12, img: partners24 },
];

const partnerArray3 = [
  { key: 1, img: partners25 },
  { key: 2, img: partners26 },
  { key: 3, img: partners27 },
  { key: 4, img: partners28 },
  { key: 5, img: partners29 },
  { key: 6, img: partners30 },

  { key: 7, img: partners31 },
  { key: 8, img: partners32 },
  { key: 9, img: partners33 },
  { key: 10, img: partners34 },
  { key: 11, img: partners35 },
  { key: 12, img: partners36 },
];

const partnerArray4 = [
  { key: 1, img: partners37 },
  { key: 2, img: partners38 },
  { key: 3, img: partners39 },
  { key: 4, img: partners40 },
  { key: 5, img: partners41 },
  { key: 6, img: partners42 },

  { key: 7, img: partners43 },
  { key: 8, img: partners44 },
  { key: 9, img: partners45 },
  { key: 10, img: partners46 },
  { key: 11, img: partners47 },
  { key: 12, img: partners48 },
];

const partnerArray5 = [
  { key: 1, img: partners49 },
  { key: 2, img: partners50 },
  { key: 3, img: partners51 },
  { key: 4, img: partners52 },
];

const PartnersDiv = (props: any) => {
  return (
    <div className={styles['partners-page-container']}>
      {props.partnerArray.map((item: any) => (
        <div className={styles['partners-item']} key={item.key}>
          <div style={{ backgroundImage: `url(${item.img})` }} key={item.key} />
        </div>
      ))}
    </div>
  );
};

export const AlliancePartners = () => (
  <div className={styles['partners-carousel']}>
    <Carousel>
      <PartnersDiv partnerArray={partnerArray1} />
      <PartnersDiv partnerArray={partnerArray2} />
      <PartnersDiv partnerArray={partnerArray3} />
      <PartnersDiv partnerArray={partnerArray4} />
      <PartnersDiv partnerArray={partnerArray5} />
    </Carousel>
  </div>
);

const Partners = () => {
  return (
    <div className={styles['partners-container']}>
      <ColorfulTitle title="联盟成员" color="#1b70e4" />
      <AlliancePartners />
    </div>
  );
};
export default Partners;
