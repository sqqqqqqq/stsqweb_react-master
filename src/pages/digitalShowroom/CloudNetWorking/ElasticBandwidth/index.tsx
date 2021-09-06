import React from 'react';
import { Button, List } from 'antd';
import icon2 from '@/assets/digitalShowroom/CloudNetWorking/ElasticBandwidth/icon2.png';
import icon3 from '@/assets/digitalShowroom/CloudNetWorking/ElasticBandwidth/icon3.png';
import icon4 from '@/assets/digitalShowroom/CloudNetWorking/ElasticBandwidth/icon4.png';
import icon5 from '@/assets/digitalShowroom/CloudNetWorking/ElasticBandwidth/icon5.png';
import icon6 from '@/assets/digitalShowroom/CloudNetWorking/ElasticBandwidth/icon6.png';
import icon7 from '@/assets/digitalShowroom/CloudNetWorking/ElasticBandwidth/icon7.png';
import icon8 from '@/assets/digitalShowroom/CloudNetWorking/ElasticBandwidth/icon8.png';
import icon9 from '@/assets/digitalShowroom/CloudNetWorking/ElasticBandwidth/icon9.png';
import styles from './index.less';

const ElasticBandwidth: React.FC = () => {
  const cardData = [
    {
      anim: 1,
      title: '确定弹性阶梯',
      icon: icon3,
      description: ['2M-100M', '100M-1G', '1G-10G'],
    },
    {
      anim: 2,
      title: '确定弹性范围',
      icon: icon4,
      description: ['最高带宽', '最低带宽', '不超过10倍'],
    },
    {
      anim: 3,
      title: '自助服务弹性调整',
      icon: icon5,
      description: ['在线服务/无需审核', '即时生效/预约生效', '日内多次调整'],
    },
  ];

  const contentData = [
    {
      anim: 1,
      title: '按日计算',
      icon: icon6,
    },
    {
      anim: 2,
      title: '按日使用天数计算',
      icon: icon7,
    },
    {
      anim: 3,
      title: '日内最高带宽计算',
      icon: icon8,
    },
    {
      anim: 4,
      title: '日租期=月租费/当月天数',
      icon: icon9,
    },
  ];

  const gridSetting: any = { column: 3, gutter: 24, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 };
  const gridSetting1: any = { column: 4, gutter: 30, md: 4, xs: 1 };
  return (
    <div className={styles.container}>
      <div className={styles['container-top']}>
        <div className={styles['container-top-left']}>
          <span>变更带宽</span>
          {/* <span></span> */}
          <span>免审，无需审核环节，分钟级秒级弹性宽带操作</span>
          <span>支持包日/包月变更带宽，用户操作后立即生效</span>
          <ul>
            <li>按需自主选择，试商用期促销价资费更优惠</li>
            <li>试商用期开通前可免费试用1个月</li>
          </ul>
          <Button>变更带宽演示</Button>
        </div>
        <div className={styles['container-top-right']}>
          <img src={icon2} alt="House" />
        </div>
      </div>

      <div className={styles['content-card']}>
        <div>
          <List
            grid={gridSetting}
            dataSource={cardData}
            renderItem={(item) => (
              <List.Item>
                <div className={`${styles.typeCard} hoverCard`}>
                  <img src={item.icon} alt="icon" />
                  <div>
                    <span>{item.title}</span>
                    <ul>
                      {item.description.map((cur: any) => (
                        <li key={cur}>{cur}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>

      <div className={styles.detail}>
        <div>
          <div>弹性计算</div>
          <List
            grid={gridSetting1}
            dataSource={contentData}
            renderItem={(item) => (
              <List.Item>
                <div className={`${styles.card} hoverCard`}>
                  <img src={item.icon} alt="icon" />
                  <span>{item.title}</span>
                </div>
              </List.Item>
            )}
          />
          <div>
            <Button>变更宽带演示</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ElasticBandwidth;
