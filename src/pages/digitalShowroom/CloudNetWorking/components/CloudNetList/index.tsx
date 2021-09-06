import React from 'react';
import styles from './index.less';
import { List } from 'antd';
import icon1 from '@/assets/digitalShowroom/CloudNetWorking/icon1.png';
import icon2 from '@/assets/digitalShowroom/CloudNetWorking/icon2.png';
import icon3 from '@/assets/digitalShowroom/CloudNetWorking/icon3.png';
import icon4 from '@/assets/digitalShowroom/CloudNetWorking/icon4.png';
import icon5 from '@/assets/digitalShowroom/CloudNetWorking/icon5.png';
import icon6 from '@/assets/digitalShowroom/CloudNetWorking/icon6.png';
import icon7 from '@/assets/digitalShowroom/CloudNetWorking/icon7.png';
import icon8 from '@/assets/digitalShowroom/CloudNetWorking/icon8.png';
import { history } from 'umi';

export const CloudCardList = () => {
  const cardData = [
    {
      title: '资源分布',
      icon: icon1,
      description: '预接入TOP10大云商资源、联通数据中心资源，覆盖类型全面、覆盖通达全球',
      link: '/digitalShowroom/CloudNetWorking/resourceDistribution',
    },
    {
      title: '丰富的接入资源',
      icon: icon8,
      description: '云联网节点类型的丰富性：云、专线、数据中心、NNI、SD-WAN、物联网、5G',
      link: '/digitalShowroom/CloudNetWorking/richResourceAccess',
    },
    {
      title: '弹性宽带流量监控',
      icon: icon2,
      description: '提供客户自助调速、实时生效以及流量监控管理能力',
      link: '/digitalShowroom/CloudNetWorking/ElasticBandwidth',
    },
    {
      title: '最短时延',
      icon: icon4,
      description: '最短时延在友商中具有较高的竞争优势',
      link: '',
    },
    {
      title: '增值服务',
      icon: icon5,
      description: '提供客户“云管家”等全方位增值服务能力',
      link: '',
    },
    {
      title: '云商API自动化对接能力',
      icon: icon6,
      description: '提供客户云商侧虚拟网络的自动化配置能力',
      link: '',
    },
    {
      title: 'SDN化',
      icon: icon7,
      description: '提供客户云节点的自动化、一天内快速地开通能力',
      link: '',
    },
    {
      title: '网络监控',
      icon: icon3,
      description: '提供客户所有VPN节点的网络监控能力',
      link: '',
    },
  ];

  const gridSetting: any = { gutter: [20, 4], xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4 };

  return (
    <List
      grid={gridSetting}
      dataSource={cardData}
      renderItem={(item, index) => (
        <List.Item>
          <div
            className={`${styles.card} hoverCard`}
            onClick={() => {
              if (index === 0 || index === 1) history.push(item.link);
            }}
          >
            <img src={item.icon} alt="icon" />
            <span>{item.title}</span>
            <span>{item.description}</span>
          </div>
        </List.Item>
      )}
    />
  );
};

const CloudNetList = () => {
  return (
    <div className={styles.cloudNetList}>
      <div>
        <div>业务场景</div>
        <CloudCardList />
      </div>
    </div>
  );
};

export default React.forwardRef(CloudNetList);
