import React, { useState, useEffect } from 'react';
import styles from './index.less';
import ColorfulTitle from '@/components/ColorfulTitle';
import Pic from '@/assets/home/cases/pic.png';
import { List, Tag, message } from 'antd';
import { history } from 'umi';
import { storageRecommendations } from '@/services/lib';

const Cases: React.FC = () => {
  const [caseListData, setCaseListData] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await storageRecommendations({
        industryId: 0,
        size: '4',
        status: '3',
        page: 1,
      });
      if (res.status === 200) {
        setCaseListData(res.data.content);
      } else {
        message.error('加载行业领域菜单出错，请重试~');
      }
    })();
  }, []);

  // 左侧区域
  const ExcellentCases = () => {
    return (
      <div className={styles.excellentCases}>
        <div className={styles['excellentCases-container']}>
          <span>优秀方案</span>
          <span>沉淀公司政企业务的营销经验，实现优质方案资源实现全国共享</span>
          <div
            className={styles['excellentCases-container-btn']}
            onClick={() => history.push(`/appStorage`)}
          >
            更多优秀方案
          </div>
          <img src={Pic} alt="Pic" />
        </div>
      </div>
    );
  };

  // 右侧区域
  const CaseList = () => {
    return (
      <div className={styles.caseList}>
        <List
          grid={{ gutter: 24, column: 2 }}
          dataSource={caseListData}
          renderItem={(item: any) => (
            <List.Item>
              <div
                className={styles['caseList-card']}
                onClick={() => history.push(`/appStorage/${item.id}`)}
              >
                <div>
                  <Tag>{item.industryName}</Tag>
                  <div>{item.title}</div>
                  <div dangerouslySetInnerHTML={{ __html: item.brief }} />
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  };

  return (
    <div className={styles.cases}>
      <ColorfulTitle title="行业优秀案例" color="#1b70e4" />
      <div className={styles['cases-container']}>
        <ExcellentCases />
        <CaseList />
      </div>
    </div>
  );
};

export default Cases;
