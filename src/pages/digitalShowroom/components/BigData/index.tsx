import React, { useEffect, useState } from 'react';
import env from '@/config/env';
import { getBigDataInfo } from '@/services/lib';
import { Tabs } from 'antd';
import styles from './index.less';

const { TabPane } = Tabs;

interface CardListPropsType {
  title: string;
  detail: string;
  icon: string;
}

const BigData: React.FC = () => {
  const [woCloud, setWoCloud] = useState<CardListPropsType[]>([]);
  const [bigData, setBigData] = useState<CardListPropsType[]>([]);
  const [cardListData, setCardListData] = useState<CardListPropsType[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getBigDataInfo();

      if (res.succeed === true) {
        if (typeof res.data !== 'undefined') {
          setWoCloud(res.data.woCloudAdvantage.aiAdvantage);
          setBigData(res.data.bigDataAdvantage.bigDataAdvantage);
          setCardListData(res.data.woCloudAdvantage.aiAdvantage);
        }
      }
    })();
  }, []);

  const CardList = () => {
    return (
      <div className={styles['big-data-card-list-container']}>
        {cardListData.map((item: CardListPropsType) => (
          <div className={styles['card-list']} key={item.icon}>
            <div>
              <img src={env.baseUrl + item.icon} alt="icon" />
            </div>
            <div>
              <span>{item.title}</span>
              <span>{item.detail}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Tabs
      className={styles['big-data-ai-tabs']}
      defaultActiveKey="1"
      onTabClick={(key: string) => {
        if (key === '1') {
          setCardListData(woCloud);
        } else {
          setCardListData(bigData);
        }
      }}
    >
      <TabPane tab="新沃云AI能力优势" key="1">
        <CardList />
      </TabPane>
      <TabPane tab="大数据组件优势" key="2">
        <CardList />
      </TabPane>
    </Tabs>
  );
};

export default BigData;
