import React from 'react';
import AItitle from '../AItitle';
import styles from './index.less';
import env from '@/config/env';
import { List } from 'antd';

const Application = (dataProps: any) => {
  const { data } = dataProps;
  const gridSetting2: any = { column: 3, gutter: 24, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 };
  return (
    <div id="2" className={styles.applicat}>
      <div className={styles.applicatWrap}>
        <AItitle title="产品功能" />
        <List
          grid={gridSetting2}
          dataSource={data}
          renderItem={(item: any) => (
            <List.Item key={item.id}>
              <div className={`${styles.typeCard} hoverCard`}>
                <img src={env.baseUrl + item.icon} alt="icon" />
                <div>
                  <span>{item.title}</span>
                  <span>{item.detail}</span>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
export default Application;
