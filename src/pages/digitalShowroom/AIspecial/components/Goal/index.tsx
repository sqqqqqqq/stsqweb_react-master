import React from 'react';
import AItitle from '../AItitle';
import styles from './index.less';
import { List } from 'antd';
import env from '@/config/env';

const Goal = (dataProps: any) => {
  const { data } = dataProps;

  const gridSetting: any = { column: data.length, gutter: 24, md: 3, sm: 2, xs: 1 };
  return (
    <div id="4" className={styles.techno}>
      <div className={styles.technoWrap}>
        <AItitle title="目标客户" />
        <List
          grid={gridSetting}
          dataSource={data}
          renderItem={(item: any) => (
            <List.Item key={item.id}>
              <div className={`${styles.technoType} hoverCard`}>
                <img src={env.baseUrl + item.icon} alt="icon" />
                <div>
                  <p>{item.title}</p>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Goal;
