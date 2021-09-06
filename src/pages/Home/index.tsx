import React from 'react';
import HomeBanner from './components/HomeBanner';
import ChangePartners from './components/ChangePartners';
import Member from './components/Member';
import styles from './index.less';
import SixEmpowerments from './components/SixEmpowerments';
import ColorfulTitle from '@/components/ColorfulTitle';
import Cases from './components/Cases';
import { Carousel } from 'antd';
import MecBanner from './components/MecBanner';
// import ExperiencePackage from './components/ExperiencePackage/index';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <Carousel autoplay autoplaySpeed={10000} pauseOnHover={false} pauseOnDotsHover={true}>
        <MecBanner />
        <HomeBanner />
      </Carousel>
      <div className={styles.partners}>
        <div className={styles['max-width-1200']}>
          <ColorfulTitle title="联盟成员" color="#1b70e4" />
          <ChangePartners />
        </div>
      </div>
      <div className={styles.empowerments}>
        <div className={styles['max-width-1200']}>
          <ColorfulTitle title="6大赋能" color="#01c4d8" />
          <SixEmpowerments />
        </div>
      </div>
      <div className={styles.cases}>
        <div className={styles['max-width-1200']}>
          <Cases />
        </div>
      </div>
      {/* 体验包此版本暂缓 */}
      {/* <div className={styles.exPackage}>
        <div className={styles['max-width-1200']}>
          <ExperiencePackage />
        </div>
      </div> */}
      <div className={styles.coMembers}>
        <div className={styles['max-width-1200']}>
          <Member />
        </div>
      </div>
    </div>
  );
};

export default Home;
