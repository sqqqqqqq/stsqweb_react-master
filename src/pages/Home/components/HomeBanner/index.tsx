import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import styles from './index.less';
import HomePic from '@/assets/home/bannerPics/homePic.png';
import Pic1 from '@/assets/home/bannerPics/1.png';
import Pic2 from '@/assets/home/bannerPics/2.png';
import Pic3 from '@/assets/home/bannerPics/3.png';
import Title from '@/assets/home/bannerPics/title.png';
import TextTop from '@/assets/home/bannerPics/textTop.png';

export const IE_GRADIENT = 'ie-gradient';

export const isIE = () => {
  // 选一种即可
  if ('ActiveXObject' in window) return true;

  if (window.navigator && window.navigator.msSaveOrOpenBlob) return true;

  return false;
};

const HomeBanner: React.FC = () => {
  const [ieClassName, setIeClassName] = useState<string>('');

  useEffect(() => {
    if (isIE()) {
      setIeClassName(IE_GRADIENT);
    } else {
      setIeClassName('');
    }
  }, []);

  return (
    <div className={styles.homeBanner}>
      <div className={styles['homeBanner-contain']}>
        <div className={styles['homeBanner-contain-left']}>
          <div className={styles.contain}>
            <img src={Title} alt="Title" />
            <img src={TextTop} alt="TextTop" />
            <span>中国联通5G应用创新联盟</span>
            <img src={TextTop} alt="TextTop" />
            <div className={`${styles.list} ${styles[ieClassName]}`}>
              <span>成熟的创新孵化机制</span>
              <span>庞大的联盟成员团体</span>
              <span>一流的行业赋能平台</span>
            </div>
            <div
              className={styles.join}
              onClick={() => {
                history.push('/introduce');
              }}
            >
              期待你的加入
            </div>
          </div>
        </div>
        <div className={styles['homeBanner-contain-right']}>
          <img src={HomePic} alt="HomePic" />
          <div className={styles['homeBanner-contain-right-lights']}>
            <img src={Pic1} alt="Pic1" />
            <img src={Pic1} alt="Pic1" />
            <img src={Pic2} alt="Pic2" />
            <img src={Pic3} alt="Pic3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
