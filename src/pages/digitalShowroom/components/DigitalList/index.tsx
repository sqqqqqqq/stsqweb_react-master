import React from 'react';
import styles from './index.less';
import { List } from 'antd';

import Card1 from '@/assets/digitalShowroom/card1.png';
import Card2 from '@/assets/digitalShowroom/card2.png';
import Card3 from '@/assets/digitalShowroom/card3.png';
import ThreeD from '@/assets/digitalShowroom/3D.png';

const DigitalList: React.FC = () => {
  const listData = [
    {
      title: '2020[5G世界大会展厅]',
      img: Card1,
      icon: ThreeD,
      link: 'http://beyond.3dnest.cn/play/?m=4e55eb1a_6zCK_b6f9_1',
    },
    {
      title: '2020[中国联通3D展厅]',
      img: Card2,
      icon: ThreeD,
      link: 'https://api.match.ccb.com/dh/fztest/company/zhongguoliantong/index.html',
    },
    {
      title: '敬请期待',
      img: Card3,
      icon: '',
      link: '',
    },
  ];

  return (
    <div className={styles.digitalList}>
      <List
        grid={{
          gutter: 30,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        dataSource={listData}
        renderItem={(item, index) => (
          <List.Item>
            <div
              className={styles.card}
              onClick={() => {
                if (index === 0 || index === 1) window.open(item.link);
              }}
            >
              <img src={item.img} alt={item.img} />
              <div>
                <img src={item.icon} alt={item.icon} />
                <span>{item.title}</span>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default DigitalList;
