import React, { useEffect, useState } from 'react';
import { Tabs, Card, List, Spin, Button } from 'antd';
import { baseUrl } from '@/config/env';
import { history } from 'umi';
import type { IndustryItemType, IndustryDetails, IndustryCards } from './data';
import styles from './index.less';
import { getAllDictionaryByClazz, getIndustryInfo, getIndustryReommendations } from './service';
import { goDetailClick } from '@/pages/Home/components/Achievement';

const { TabPane } = Tabs;

const TabsCard: React.FC<any> = () => {
  const [industryList, setIndustryList] = useState<IndustryItemType[]>([]);
  const [industryId, setIndustryId] = useState<string>('');
  const [industryInfo, setIndustryInfo] = useState<IndustryDetails>({});
  const [industryCard, setIndustryCard] = useState<IndustryCards[]>([{}]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isUnmountInit = false;
    (async () => {
      const res = await getAllDictionaryByClazz();
      if (res.succeed === true) {
        if (typeof res.data !== 'undefined') {
          if (typeof res.data.Dict !== 'undefined') {
            if (!isUnmountInit) {
              setIndustryList(res.data.Dict);
              setIndustryId(res.data.Dict[0].id.toString());
            }
          }
        }
      }
      if (!isUnmountInit) setIsLoading(true);

      if (industryId !== '') {
        const resInfo = await getIndustryInfo({ industryId });
        if (resInfo.succeed === true) {
          if (typeof resInfo.data !== 'undefined') {
            if (!isUnmountInit) setIndustryInfo(resInfo.data);
          }
        }

        const resCard = await getIndustryReommendations({ industryId, size: '3', status: '3' });
        if (resCard.succeed === true) {
          if (typeof resCard.data !== 'undefined') {
            if (typeof resCard.data.content !== 'undefined') {
              if (!isUnmountInit) setIndustryCard(resCard.data.content);
            }
          }
        }
        if (!isUnmountInit) setIsLoading(false);
      }
    })();
    return () => {
      isUnmountInit = true;
    };
  }, []);

  useEffect(() => {
    let isUnmount = false;
    (async () => {
      if (industryId !== '') {
        const resInfo = await getIndustryInfo({ industryId });

        if (resInfo.succeed === true) {
          if (typeof resInfo.data !== 'undefined') {
            if (!isUnmount) setIndustryInfo(resInfo.data);
          }
        }

        const resCard = await getIndustryReommendations({ industryId, size: '3', status: '3' });
        if (resCard.succeed === true) {
          if (typeof resCard.data !== 'undefined') {
            if (typeof resCard.data.content !== 'undefined') {
              if (!isUnmount) setIndustryCard(resCard.data.content);
            }
          }
        }
        if (!isUnmount) setIsLoading(false);
      }
    })();
    return () => {
      isUnmount = true;
    };
  }, [industryId]);

  return (
    <div className={styles.container}>
      <div>5G行业应用</div>
      <div className={styles.tabs}>
        <Tabs
          size="large"
          centered
          onTabClick={(key: string) => {
            setIsLoading(true);
            setIndustryId(key);
          }}
        >
          {industryList.map((value: IndustryItemType) => {
            return (
              <TabPane tab={value.industryName} key={value.id}>
                <Spin spinning={isLoading}>
                  <div className={styles.tabDetails}>
                    <div>
                      <span>行业描述</span>
                      <div>{industryInfo.summary}</div>
                    </div>
                    <List
                      grid={{ gutter: 16, column: 3 }}
                      dataSource={industryCard}
                      renderItem={(item) => (
                        <List.Item>
                          <Card onClick={() => goDetailClick(item)}>
                            <img src={baseUrl + item.icon} alt="封面" />
                            <div>{item.title}</div>
                          </Card>
                        </List.Item>
                      )}
                    />
                  </div>
                </Spin>
              </TabPane>
            );
          })}
        </Tabs>
        <Button
          type="primary"
          className={styles.industryDetailsBtn}
          onClick={() => {
            history.push(`/case?industryId=${industryId}`);
          }}
        >
          了解行业详情
        </Button>
      </div>
    </div>
  );
};

export default TabsCard;
