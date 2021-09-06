import React from 'react';
import styles from './index.less';
import { List } from 'antd';
import Pic1 from '@/assets/home/experiencePackage/pic1.png';
import Pic2 from '@/assets/home/experiencePackage/pic2.png';
import ColorfulTitle from '@/components/ColorfulTitle';

const ExperiencePackage: React.FC = () => {
  const packageData = [
    {
      title: '云网服务标题',
      introduction: '5G技术，为新时期医疗行业快速发展提供了条件。为推动东营市医疗水平…',
      image: Pic1,
    },
    {
      title: '云网服务标题',
      introduction: '5G技术，为新时期医疗行业快速发展提供了条件。为推动东营市医疗水平…',
      image: Pic2,
    },
  ];

  return (
    <div className={styles.experiencePackage}>
      <ColorfulTitle title="合作伙伴体验包" color="#01c4d8" />
      <List
        grid={{ gutter: 24, column: 2 }}
        dataSource={packageData}
        renderItem={(item: any) => (
          <List.Item>
            <div className={styles['experiencePackage-card']}>
              <div className={styles['experiencePackage-card-body']}>
                <div>
                  <span>{item.title}</span>
                  <span>{item.introduction}</span>
                  <div className={styles['experiencePackage-card-body-btn']}>点击体验</div>
                </div>
                <img src={item.image} alt="image" />
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ExperiencePackage;
