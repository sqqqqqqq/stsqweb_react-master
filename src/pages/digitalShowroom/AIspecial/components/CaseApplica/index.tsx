import React from 'react';
import AItitle from '../AItitle';
import styles from './index.less';
import { Tabs } from 'antd';
import env from '@/config/env';

const { TabPane } = Tabs;

const CaseApplica = (dataProps: any) => {
  const { data } = dataProps;

  return (
    <div id="5" className={styles.Core}>
      <div className={styles.CoreWrap}>
        <AItitle title="应用案例" />
        <div className={styles.Coredetail}>
          <Tabs defaultActiveKey="1" centered>
            {data.map((pane: any) => (
              <TabPane tab={pane.title} key={pane.id}>
                <div>
                  <span>{pane.title}</span>
                  <span>{pane.detail}</span>
                </div>
                <div>
                  <img src={env.baseUrl + pane.icon} alt="img" />
                </div>
              </TabPane>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export default CaseApplica;
