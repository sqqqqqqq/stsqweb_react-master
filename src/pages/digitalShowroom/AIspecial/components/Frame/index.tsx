import React from 'react';
import AItitle from '../AItitle';
import styles from './index.less';
import env from '@/config/env';

const Case = (dataProps: any) => {
  const { data } = dataProps;
  return (
    <div id="1" className={styles.frame}>
      <div className={styles.frameWrap}>
        <AItitle title="平台展示" />
        <div className={styles.frameContent}>
          <img src={env.baseUrl + data[0]?.icon} alt="" />
        </div>
      </div>
    </div>
  );
};
export default Case;
