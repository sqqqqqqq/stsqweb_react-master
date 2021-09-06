import { Tabs } from 'antd';
import React from 'react';
import Enterprise from './components/Enterprise';
import Team from './components/Team';
import Person from './components/Person';
import styles from './index.less';

const { TabPane } = Tabs;

const Bloom = () => {
  return (
    <div className={styles['bloom-container']}>
      <h1 className={styles['first-title']}>参赛报名表</h1>
      <Tabs defaultActiveKey="1" onChange={() => {}} className={styles['tabs-container']}>
        <TabPane tab="企业" key="1">
          <Enterprise />
        </TabPane>
        <TabPane tab="团队" key="2">
          <Team />
        </TabPane>
        <TabPane tab="个人" key="3">
          <Person />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Bloom;
