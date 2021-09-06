import React from 'react';
import AItitle from '../AItitle';
import styles from './index.less';
import { List } from 'antd';
import env from '@/config/env';

const Feature = (dataProps: any) => {
  const { data } = dataProps;

  const gridSetting: any = { column: data.length, gutter: 24, md: 3, sm: 2, xs: 1 };
  return (
    <div id="3" className={styles.Scene}>
      <div className={styles.SceneWrap}>
        <AItitle title="产品特点" />
        <List
          grid={gridSetting}
          dataSource={data}
          renderItem={(item: any) => (
            <List.Item key={item.id}>
              <div
                className={styles.SceneType}
                // style={{ margin: scenedata.length === 2 ? '0 90px ' : '0 0' }}
              >
                <img src={env.baseUrl + item.icon} alt="icon" />
                <div>
                  <p>{item.title}</p>
                  <p>{item.detail}</p>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Feature;
