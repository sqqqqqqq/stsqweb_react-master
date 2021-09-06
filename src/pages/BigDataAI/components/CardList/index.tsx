import React, { useEffect, useState } from 'react';
import { baseUrl } from '@/config/env';
import styles from './index.less';
import type { CommonDataType } from '../..';

interface CardListPropsType {
  cardListData: CommonDataType[];
}

export default (props: CardListPropsType) => {
  const { cardListData: propsCardList } = props;

  const [cardListData, setCardListData] = useState<CommonDataType[]>(propsCardList);

  useEffect(() => {
    setCardListData(propsCardList);
  }, [propsCardList]);

  return (
    <div className={styles['big-data-card-list-container']}>
      {cardListData.map((item: CommonDataType) => (
        <div className={styles['card-list']} key={item.icon}>
          <div>
            <img src={baseUrl + item.icon} alt="icon" />
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
