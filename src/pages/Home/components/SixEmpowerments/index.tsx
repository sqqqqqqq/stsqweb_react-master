import React from 'react';
import styles from './index.less';
import Bg1 from '@/assets/home/sixEmpowerments/bg1.png';
import Bg2 from '@/assets/home/sixEmpowerments/bg2.png';
import Bg3 from '@/assets/home/sixEmpowerments/bg3.png';
import Bg4 from '@/assets/home/sixEmpowerments/bg4.png';
import Bg5 from '@/assets/home/sixEmpowerments/bg5.png';
import Bg6 from '@/assets/home/sixEmpowerments/bg6.png';

const SixEmpowerments: React.FC = () => {
  const empowermentData = [
    {
      id: 1,
      title: '网络赋能',
      description: '5G云网融合产品，为生态合作伙伴提供高质量网络服务',
      imageUrl: Bg1,
    },
    {
      id: 2,
      title: '平台赋能',
      description: '以数据要素为核心，构建物联、智网、云基、数智、安全五大核心创新能力',
      imageUrl: Bg2,
    },
    {
      id: 3,
      title: 'AI赋能',
      description:
        '以云平台、5G边缘、loT终端为基础，以工业AI中台为核心，支撑智慧产线及智慧工厂系统，从技术层面有力助推工业领域高质量、高效能发展',
      imageUrl: Bg3,
    },
    {
      id: 4,
      title: '安全赋能',
      description: '全面构建专业化、差异化、一体化的信息安全综合服务能力，推动各产业的健康发展',
      imageUrl: Bg4,
    },
    {
      id: 5,
      title: '渠道赋能',
      description:
        '拥有政企线6万余员工、20多家专业子公司，服务范围覆盖全国所有地市及区县。生态合作伙伴共享联通一体化的咨询设计、建设实施、集成交付、运营维护等服务',
      imageUrl: Bg5,
    },
    {
      id: 6,
      title: '资本赋能',
      description: '联通5G创新母基金100亿+，投资垂直领域子基金，撬动杠杆500亿',
      imageUrl: Bg6,
    },
  ];

  return (
    <div className={styles.sixEmpowerments}>
      <div className={styles.container}>
        {empowermentData.map((item) => (
          <div style={{ backgroundImage: `url(${item.imageUrl})` }} key={item.id}>
            <span>{item.title}</span>
            <span>{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SixEmpowerments;
