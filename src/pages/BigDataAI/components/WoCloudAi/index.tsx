import React, { useState } from 'react';
import { Player } from 'video-react';
import type { AiCaseMenuType, productCaseMenuType, WoCloudDataType } from '../..';
import productCaseBanner from '@/assets/bigDataAI/productCaseBanner.png';
import CardList from '../CardList';
import ComHeader from '../ComHeader';
import styles from './index.less';
import { Button, Menu } from 'antd';
import { baseUrl } from '@/config/env';

interface WoCloudAiPropsType {
  woCloudData: WoCloudDataType;
  productCaseMenu: productCaseMenuType[];
  aiCaseMenu: AiCaseMenuType[];
}

export default (props: WoCloudAiPropsType) => {
  const {
    woCloudData: { aiAdvantage, productCase, applicationCase },
    productCaseMenu,
    aiCaseMenu,
  } = props;

  const [productCaseIndex, setProductCaseIndex] = useState<string>('0');

  const [aiCaseIndex, setAiCaseIndex] = useState<string>('0');

  return (
    <div className={styles['wo-cloud-ai-container']}>
      <CardList cardListData={aiAdvantage} />
      <div
        className={styles['product-case-container']}
        style={{ backgroundImage: `url(${productCaseBanner})` }}
      >
        {/* 垂直功能产品案例 */}
        <ComHeader title="垂直功能产品案例" color="#fff" />
        <Menu
          mode="horizontal"
          selectedKeys={[productCaseIndex]}
          onClick={(item: any) => setProductCaseIndex(item.key)}
        >
          {productCaseMenu.map((item: productCaseMenuType) => (
            <Menu.Item key={item.key}>{item.name}</Menu.Item>
          ))}
        </Menu>

        <div className={styles['case-item']}>
          <Player
            fluid={false}
            width={425}
            height={200}
            poster={productCase[productCaseIndex].icon}
          >
            <source src={baseUrl + productCase[productCaseIndex].video} />
          </Player>
          <div>
            <h3>{productCase[productCaseIndex].title}</h3>
            <span>{productCase[productCaseIndex].detail}</span>
          </div>
        </div>
      </div>
      <div className={styles['ai-case-container']}>
        <ComHeader title="AI应用案例" color="#333" />
        <ul className={styles.menu}>
          {aiCaseMenu.map((item: AiCaseMenuType, index: number) => (
            <li key={item.key}>
              <Button
                className={`${index}` === aiCaseIndex ? styles['is-active'] : ''}
                onClick={() => {
                  setAiCaseIndex(`${index}`);
                  document.querySelector(`#appCaseItem${index}`)?.scrollIntoView({
                    behavior: 'smooth',
                  });
                }}
              >
                <img
                  src={baseUrl + (aiCaseIndex === `${index}` ? item.activeIcon : item.defaultIcon)}
                />
                {item.name}
              </Button>
            </li>
          ))}
        </ul>
        {applicationCase.map((item, index: number) => (
          <div key={item.title} className={styles['app-case-item']} id={`appCaseItem${index}`}>
            {index % 2 === 0 ? (
              <div className={styles['app-case-item-video']}>
                <Player
                  fluid={false}
                  width={360}
                  height={200}
                  poster={applicationCase[aiCaseIndex].icon}
                >
                  <source src={baseUrl + productCase[aiCaseIndex].video} />
                </Player>
              </div>
            ) : null}
            <div className={styles['app-case-item-text']}>
              <h3>{item.title}</h3>
              <span>{item.detail}</span>
            </div>
            {index % 2 !== 0 ? (
              <div className={styles['app-case-item-video']}>
                <Player
                  fluid={false}
                  width={360}
                  height={200}
                  poster={applicationCase[aiCaseIndex].icon}
                >
                  <source src={baseUrl + productCase[aiCaseIndex].video} />
                </Player>
              </div>
            ) : null}{' '}
          </div>
        ))}
      </div>
    </div>
  );
};
