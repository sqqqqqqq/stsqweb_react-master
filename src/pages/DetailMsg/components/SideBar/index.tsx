import React, { useState, useEffect } from 'react';
import { getTrend, getCase } from '@/services/trend';
import { Link, history } from 'umi';
import styles from './index.less';

const SideBar: React.FC = () => {
  const [moreTrendData, setMoreTrendData] = useState([]);
  const [moreCaseData, setMoreCaseData] = useState([]);

  useEffect(() => {
    (async () => {
      const params = {
        size: 3,
        status: '3',
        page: 1,
      };
      const moreTrend = await getTrend(params);
      const moreCase = await getCase(params);
      if (moreTrend.data?.content.length !== 0) {
        setMoreTrendData(moreTrend.data?.content);
      }
      if (moreCase.data?.content.length !== 0) {
        setMoreCaseData(moreCase.data?.content);
      }
    })();
  }, []);

  const handleMoreClick = (item: any) => {
    const location = {
      pathname: '/detailmsg',
      search: `?clazz=${item.clazz}&id=${item.id}`,
    };
    const url = history.createHref(location);
    window.open(url, '_blank');
  };
  return (
    <div className={styles.clazzDetailsSide}>
      <div className={`${styles.more} ${styles.dynamic}`}>
        <Link to="/trend">
          <span>更多动态</span>
        </Link>
        {moreTrendData.map((item: any) => (
          <div key={item.id} className={styles.dynamicItem}>
            <h3
              onClick={() => {
                handleMoreClick(item);
              }}
            >
              {item.title}
            </h3>
            <span>{item.brief}</span>
          </div>
        ))}
      </div>
      <div className={`${styles.more} ${styles.application}`}>
        <Link to="/case">
          <span>更多应用</span>
        </Link>
        {moreCaseData.map((item: any) => (
          <div key={item.id} className={styles.dynamicItem}>
            <h3
              onClick={() => {
                handleMoreClick(item);
              }}
            >
              {item.title}
            </h3>
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SideBar;
