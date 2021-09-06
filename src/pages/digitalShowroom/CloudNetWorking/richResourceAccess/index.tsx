import React from 'react';
import styles from './index.less';

import House from '@/assets/digitalShowroom/CloudNetWorking/richResourceAccess/house.png';
import Cloud from '@/assets/digitalShowroom/CloudNetWorking/richResourceAccess/cloud.png';
import Balloon from '@/assets/digitalShowroom/CloudNetWorking/richResourceAccess/balloon.png';
import Site from '@/assets/digitalShowroom/CloudNetWorking/richResourceAccess/site.png';
import Light from '@/assets/digitalShowroom/CloudNetWorking/richResourceAccess/light.png';
import BlueCloud from '@/assets/digitalShowroom/CloudNetWorking/richResourceAccess/blueCloud.png';
import Num1 from '@/assets/digitalShowroom/CloudNetWorking/richResourceAccess/num1.png';
import Num2 from '@/assets/digitalShowroom/CloudNetWorking/richResourceAccess/num2.png';
import Num3 from '@/assets/digitalShowroom/CloudNetWorking/richResourceAccess/num3.png';
import Num4 from '@/assets/digitalShowroom/CloudNetWorking/richResourceAccess/num4.png';
import Num5 from '@/assets/digitalShowroom/CloudNetWorking/richResourceAccess/num5.png';
import Architecture from '@/assets/digitalShowroom/CloudNetWorking/richResourceAccess/architecture.png';
import Cooperate from '@/assets/digitalShowroom/CloudNetWorking/richResourceAccess/cooperate.png';

const richResourceAccess: React.FC = () => {
  const Banner = () => {
    return (
      <div className={styles.Banner}>
        <div className={styles['Banner-contain']}>
          <div className={styles['Banner-contain-left']}>
            <div>
              <span>丰富资源接入</span>
              <span>-149个IDC，51个国内云资源池，19个境外云资源池</span>
              <span>-接入网络覆盖国内全部334个地市及海外41个POP点</span>
              <span>-物联网全国8个大区接入，5G全国31省接入</span>
            </div>
          </div>
          <div className={styles['Banner-contain-right']}>
            <img src={House} alt="House" />
            <img src={Cloud} alt="Cloud" />
            <img src={Cloud} alt="Cloud" />
            <img src={Balloon} alt="balloon" />
          </div>
        </div>
      </div>
    );
  };

  const Platform = () => {
    const textList = [
      {
        img: Num1,
        text: '全球化网络覆盖及接入能力',
      },
      {
        img: Num2,
        text: '弹性网络分钟级调整能力',
      },
      {
        img: Num3,
        text: '全IP多类型网络混合组网',
      },
      {
        img: Num4,
        text: '云侧网络分钟开通',
      },
      {
        img: Num5,
        text: '云网一体， 同开同停',
      },
    ];

    return (
      <div className={styles.platform}>
        <div className={styles.site}>
          <img src={Site} alt="Site" />
          <img src={Light} alt="Light" />
          <img src={BlueCloud} alt="BlueCloud" />
        </div>
        <div className={styles.textList}>
          {textList.map((item) => {
            return (
              <div className={styles.text}>
                <img src={item.img} alt={item.img} />
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.richResource}>
      <Banner />
      <div className={styles['richResource-contain']}>
        <div className={styles['richResource-contain-safe']}>
          <span className={styles.title}>网络安全可靠</span>
          <Platform />
        </div>
        <div className={styles['richResource-contain-architecture']}>
          <span className={styles.title}>云联网整体网络架构</span>
          <img src={Architecture} alt="Architecture" />
        </div>
        <div className={styles['richResource-contain-cooperate']}>
          <span className={styles.title}>合作云商</span>
          <img src={Cooperate} alt="cooperate" />
        </div>
      </div>
    </div>
  );
};

export default richResourceAccess;
