import React from 'react';
import logoImg from '@/assets/home/homeIcon.png';
import styles from './index.less';

const Logo: React.FC = () => {
  return (
    <div className={styles.logoDiv}>
      <img className={styles.logoImg} src={logoImg} alt="logo" />
      <span className={styles.homePageIcon}>
        <span>创新联盟</span>
      </span>
    </div>
  );
};

export default Logo;
