import React from 'react';
import { history } from 'umi';
import styles from './index.less';
import img1 from '../../../../assets/case/1.png';
import img2 from '../../../../assets/case/2.png';
import img3 from '../../../../assets/case/3.png';
import img4 from '../../../../assets/case/4.png';
import img5 from '../../../../assets/case/5.png';
import img6 from '../../../../assets/case/6.png';

export const HotCase = () => {
  const hotCaseColumns = [
    {
      industryName: '智慧教育',
      brief: '打造智慧教育应用新典范',
      imageUrl: img1,
      id: 17,
    },
    {
      industryName: '智慧医疗',
      brief: '开启智慧医疗新时代',
      imageUrl: img2,
      id: 20,
    },
    {
      industryName: '泛在低空',
      brief: '打造天、空、地一体化通信能力',
      imageUrl: img3,
      id: 10,
    },
    {
      industryName: '工业互联网',
      brief: '打造全连接智慧工厂',
      imageUrl: img4,
      id: 11,
    },
    {
      industryName: '新媒体',
      brief: '开创视界新未来',
      imageUrl: img5,
      id: 13,
    },
    {
      industryName: '智慧交通',
      brief: '为自动驾驶、安全畅行赋能',
      imageUrl: img6,
      id: 16,
    },
  ];

  return (
    <div className={styles.hotCase}>
      <div>
        <div>热门创新应用</div>
        <div className={styles.container}>
          {hotCaseColumns.map((item) => (
            <div
              style={{ backgroundImage: `url(${item.imageUrl})` }}
              key={item.id}
              onClick={() => {
                history.push(`/case?industryId=${item.id}`);
              }}
            >
              <span>{item.industryName}</span>
              <span>{item.brief}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotCase;
