import React from 'react';
import styles from './index.less';
import Title from '@/assets/home/bannerPics/MEC/title.png';
import Btn from '@/assets/home/bannerPics/MEC/btn.png';
import { history } from 'umi';

const MecBanner: React.FC = () => {
  return (
    <div className={styles.mecBanner}>
      <div className={styles['mecBanner-container']}>
        <img src={Title} alt="title" />
        <img onClick={() => history.push('/appMall')} src={Btn} alt="btn" />
      </div>
    </div>
  );
};

export default MecBanner;
