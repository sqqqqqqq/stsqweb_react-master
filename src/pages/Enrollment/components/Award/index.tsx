import React from 'react';
import type { ComponentComPropsType } from '../..';
import ComHeader from '../ComHeader';
import AwardIcon1 from '@/assets/enrollment/AwardIcon1.png';
import AwardIcon2 from '@/assets/enrollment/AwardIcon2.png';
import AwardIcon3 from '@/assets/enrollment/AwardIcon3.png';
import AwardIcon4 from '@/assets/enrollment/AwardIcon4.png';
import AwardIcon5 from '@/assets/enrollment/AwardIcon5.png';
import styles from './index.less';
import CardCarousel from '../CardCarousel';

interface platformTextItemType {
  key: number;
  rank: string | number;
  icon: string;
  note: string;
  money?: string;
}

const platformText: platformTextItemType[] = [
  {
    key: 1,
    rank: '',
    icon: AwardIcon1,
    note: '优秀创新奖若干名',
  },
  {
    key: 2,
    rank: 2,
    icon: AwardIcon2,
    note: '二等奖5名',
    money: '奖金XXXXX',
  },
  {
    key: 3,
    rank: 1,
    icon: AwardIcon3,
    note: '一等奖3名',
    money: '奖金XXXXX',
  },
  {
    key: 4,
    rank: 3,
    icon: AwardIcon4,
    note: '三等奖8名',
    money: '奖金XXXXX',
  },
  {
    key: 5,
    rank: '',
    icon: AwardIcon5,
    note: '若干特色奖项',
  },
];

const awardTexts: string[] = [
  '工信部总决赛直通推荐',
  '联通全国产品推广平台',
  '高规格大赛证书',
  '智慧园区入驻优惠政策',
  '特享5G新蓝海实验场',
  '冬奥业务独家对接机会',
  '高端媒体全程宣传报道',
];

export default (props: ComponentComPropsType) => {
  const { title, id } = props;

  return (
    <div id={id} className={styles['enrollment-award-container']}>
      <ComHeader title={title} />
      <div className={styles.platform}>
        {platformText.map((item: platformTextItemType) => (
          <div key={item.key} className={styles['platform-item']}>
            <img className={styles['platform-item-rank']} src={item.icon} />
            <span className={styles['platform-item-note']}>{item.note}</span>
          </div>
        ))}
      </div>
      <div className={styles['ultimate-award']}>
        <CardCarousel />

        <div className={styles['ultimate-award-texts']}>
          <div>最终获奖项目，将有机会获得以下权益：</div>
          <div>
            {awardTexts.map((item: string) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
