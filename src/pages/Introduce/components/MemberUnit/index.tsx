import React, { useEffect, useState } from 'react';
import { Button, Spin } from 'antd';
import { frameworkMemberUnitInfo } from '@/services/vip';
import styles from './index.less';

const partnersListInit = {
  全部: [],
};

const menuList = [
  '全部',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

const MemberUnit = () => {
  const [activityIndex, setActivityIndex] = useState<string>('全部');
  const [partnersList, setPartnersList] = useState(partnersListInit);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    frameworkMemberUnitInfo().then((res) => {
      setLoading(false);

      if (res.status === 200) {
        const result = { ...res.data };

        result['全部'] = [];

        Object.keys(res.data).forEach((item) => {
          result[item] = [...new Set(result[item])]; // 去重

          result['全部'] = result['全部'].concat(result[item]); // 拼接
        });

        setPartnersList(result);
      }
    });
  }, []);

  const ListItem = () => {
    return partnersList[activityIndex]?.length > 0 ? (
      <div className={styles.list}>
        {partnersList[activityIndex]?.map((item: string) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    ) : (
      <div className={styles['no-data']}>暂无数据</div>
    );
  };

  return (
    <div className={styles['member-unit-container']}>
      <ul className={styles.menu}>
        {menuList.map((item) => (
          <li className={styles['menu-item']} key={item}>
            <Button
              className={activityIndex === item ? styles['is-active'] : ''}
              onClick={() => setActivityIndex(item)}
            >
              {item}
            </Button>
          </li>
        ))}
      </ul>
      <div className={styles['member-unit-table-container']}>
        <div className={styles.title}>{activityIndex}</div>
        {loading ? (
          <div className={styles.loading}>
            <Spin tip="加载中..." />
          </div>
        ) : (
          <ListItem />
        )}
      </div>
    </div>
  );
};

export default MemberUnit;
