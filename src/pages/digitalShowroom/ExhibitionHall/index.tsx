import React from 'react';

import Title from '@/assets/digitalShowroom/ExhibitionHall/title.png';
import Picture from '@/assets/digitalShowroom/ExhibitionHall/picture.png';
import styles from './index.less';
import DigitalList from '../components/DigitalList/index';

const ExhibitionHall: React.FC = () => {
  return (
    <div className={styles.exhibitionHall}>
      <div className={styles['exhibitionHall-banner']}>
        <div className={styles['exhibitionHall-banner-contain']}>
          <div className={styles['exhibitionHall-banner-contain-left']}>
            <div>
              <img src={Title} alt="Title" />
              <span>
                线上数字3D全景交互展厅还与VR虚拟现实技术相结合，精心制作全景交互，满足用户的深度体验交互需求，就仿若主角一般置身展馆之中，获得沉浸式观展体验。
              </span>
            </div>
          </div>
          <div className={styles['exhibitionHall-banner-contain-right']}>
            <img src={Picture} alt="alt" />
          </div>
        </div>
      </div>
      <div className={styles['exhibitionHall-list']}>
        <span>展览列表</span>
        <DigitalList />
      </div>
    </div>
  );
};

export default ExhibitionHall;
