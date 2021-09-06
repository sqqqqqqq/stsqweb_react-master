import React from 'react';
import ApplyBtn from '../ApplyBtn';
import { baseUrl } from '@/config/env';
import styles from './index.less';

export interface BannerDataType {
  title1: string;
  title2: string;
  imgUrl: string;
  btnText: string;
}

export const BannerDataInit = {
  title1: '',
  title2: '',
  imgUrl: '',
  btnText: '',
};

interface EnrollmentBannerPropsType {
  bannerData: BannerDataType;
}

const Banner: React.FC<EnrollmentBannerPropsType> = (props) => {
  const { bannerData } = props;

  return (
    <div
      className={styles['enrollment-banner']}
      style={{ backgroundImage: `url(${baseUrl + bannerData.imgUrl})` }}
    >
      <div>
        <span>{bannerData.title1}</span>
        <span>{bannerData.title2}</span>
        <ApplyBtn btnText={bannerData.btnText} />
      </div>
    </div>
  );
};

export default Banner;
