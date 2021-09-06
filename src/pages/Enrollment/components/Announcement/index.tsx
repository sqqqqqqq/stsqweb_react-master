import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import ComHeader from '../ComHeader';
import { searchTrend } from '@/services/lib';
import { baseUrl } from '@/config/env';
import styles from './index.less';
import type { ComponentComPropsType } from '../..';
import { Carousel } from 'antd';

interface announceListItemType {
  title: string;
  time: string;
  brief: string;
  icon: string;
  id: number;
  clazz: string;
}

export default (props: ComponentComPropsType) => {
  const [announceList, setAnnounceList] = useState<announceListItemType[]>([]);

  const { id, title } = props;

  useEffect(() => {
    let isUnmount = false;
    searchTrend({ keyWord: '绽放杯' }).then((res) => {
      if (res.status === 200 && !isUnmount) {
        const announceListTemp = res.data.content?.slice(0, 3).map((item: any) => {
          const time = item.createTimeStr;
          return {
            ...item,
            time: `${time.slice(0, 4)}-${time.slice(4, 6)}-${time.slice(6, 8)}`,
          };
        });
        setAnnounceList(announceListTemp);
      }
    });

    return () => {
      isUnmount = true;
    };
  }, []);

  const handleCarouselClick = (item: announceListItemType) => {
    history.push(`/detailmsg?clazz=${item.clazz}&id=${item.id}`);
  };

  return (
    <div className={styles['enrollment-announcement-container']} id={id}>
      <ComHeader title={title} />
      <Carousel autoplay={false}>
        {announceList.map((item) => (
          <div key={item.id} className={styles['announce-text']}>
            <img src={baseUrl + item.icon} onClick={() => handleCarouselClick(item)} />
            <div className={styles['right-content']}>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.time}>{item.time}</span>
              <span className={styles.text}>{item.brief}</span>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
