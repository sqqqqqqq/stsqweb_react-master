import { List } from 'antd';
import React from 'react';
import styles from './index.less';
import icon1 from '../../../../../assets/digitalShowroom/AIspecial/icon1.png';
import icon2 from '../../../../../assets/digitalShowroom/AIspecial/icon2.png';
import icon3 from '../../../../../assets/digitalShowroom/AIspecial/icon3.png';
import AItitle from '../AItitle';

const ProductForm = () => {
  const formData = [
    {
      id: 1,
      title: '在线调用api',
      icon: icon1,
    },
    {
      id: 2,
      title: '离线识别SDK',
      icon: icon2,
    },
    {
      id: 3,
      title: '私有化部署',
      icon: icon3,
    },
  ];
  const gridSetting: any = { column: 3, gutter: 24, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 };

  return (
    <div id="3" className={styles.Form}>
      <div className={styles.FormWrap}>
        <AItitle title="使用方式" />
        <List
          grid={gridSetting}
          dataSource={formData}
          renderItem={(item: any) => (
            <List.Item key={item.id}>
              <div className={`${styles.FormType} hoverCard`}>
                <img src={item.icon} alt="icon" />
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

export default ProductForm;
