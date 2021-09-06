import React, { useEffect, useState } from 'react';
import { baseUrl } from '@/config/env';
import TitleLeft from '@/assets/case/titleLeft.png';
import TitleRight from '@/assets/case/titleRight.png';
import Bg from '@/assets/case/bg.png';
import { List, Card, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { goDetailClick } from '@/pages/Home/components/Achievement';
import type { IndustryInfoType, DetailFeaturesType } from './data';
import type { IndustryCards } from '../TabsCard/data';
import { getIndustryInfo, getIndustryReommendations } from '../TabsCard/service';
import styles from './index.less';

interface DetailsIndustryId {
  isDetailsIndustry: string;
}

const CaseDetails = (props: DetailsIndustryId) => {
  const [industryInfo, setIndustryInfo] = useState<IndustryInfoType>({});
  const [industryReommendations, setIndustryReommendations] = useState<IndustryCards[]>([{}]);
  const [industryPage, setIndustryPage] = useState<number>(2);
  const [detailFeatures, setDetailFeatures] = useState<DetailFeaturesType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [firstLoad, setFirstLoad] = useState(false);

  const { isDetailsIndustry } = props;

  useEffect(() => {
    (async () => {
      const res = await getIndustryInfo({ industryId: isDetailsIndustry });
      if (typeof res !== 'undefined') {
        if (res.succeed === true) {
          if (typeof res.data !== 'undefined') {
            setIndustryInfo(res.data);
            setDetailFeatures(res.data.features);
          } else {
            message.error('出错啦,请重试~');
          }
        } else {
          message.error('出错啦,请重试~');
        }
      } else {
        message.error('网络出错啦~');
      }

      const detailRes = await getIndustryReommendations({
        industryId: isDetailsIndustry,
        page: 1,
        size: '5',
        status: '3',
      });
      if (typeof detailRes !== 'undefined') {
        if (detailRes.succeed === true) {
          if (typeof detailRes.data !== 'undefined') {
            setIndustryReommendations(detailRes.data.content);
            setFirstLoad(true);
          } else {
            message.error('出错啦,请重试~');
          }
        } else {
          message.error('出错啦,请重试~');
        }
      } else {
        message.error('网络出错啦~');
      }
    })();
  }, []);

  // banner组件
  const DetailsBanner = () => {
    return (
      <div
        className={styles.DetailsBanner}
        style={{ backgroundImage: `url(${baseUrl}${industryInfo.backGroundImage})` }}
      >
        <div>
          <span>{industryInfo.industryTitle}</span>
          <span>{industryInfo.subTitle}</span>
          <span>{industryInfo.summary}</span>
        </div>
      </div>
    );
  };

  // 小标题组件
  const DetailTitle = (titleProps: any) => {
    const { title } = titleProps;

    return (
      <div className={styles.DetailTitle}>
        <img src={TitleLeft} alt="titleLeft" />
        <span>{title}</span>
        <img src={TitleRight} alt="titleRight" />
      </div>
    );
  };

  // 价值特点组件
  const DetailFeatures = () => {
    return (
      <div className={styles.DetailFeatures}>
        <DetailTitle title="价值特点" />
        <List
          className={styles.cardList}
          grid={{ gutter: 16, column: detailFeatures.length }}
          dataSource={detailFeatures}
          renderItem={(item) => (
            <List.Item>
              <Card>
                <div className={styles.card}>
                  <img src={baseUrl + item.icon} alt="icon" />
                  <span>{item.featureTitle}</span>
                  <span>{item.featureDetail}</span>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  };

  // 应用案例组件
  const ApplicationCase = () => {
    const loadMore = () => {
      if (firstLoad) {
        setIsLoading(true);
        (async () => {
          const moreRes = await getIndustryReommendations({
            industryId: isDetailsIndustry,
            page: industryPage,
            size: '3',
            status: '3',
          });
          if (typeof moreRes !== 'undefined') {
            if (moreRes.succeed === true) {
              if (typeof moreRes.data !== 'undefined') {
                setIndustryReommendations(industryReommendations.concat(moreRes.data.content));
                setIndustryPage(industryPage + 1);
                setIsLoading(false);
                if (moreRes.data.content.length < 3) {
                  setHasMore(false);
                }
              } else {
                message.error('出错啦,请重试~');
                setIsLoading(false);
              }
            } else {
              message.error('出错啦,请重试~');
              setIsLoading(false);
            }
          } else {
            message.error('网络出错啦~');
            setIsLoading(false);
          }
        })();
      }
    };

    return (
      <div className={styles.ApplicationCase}>
        <DetailTitle title="应用案例" />
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={loadMore}
          hasMore={!isLoading && hasMore}
          useWindow
        >
          <List
            dataSource={industryReommendations}
            renderItem={(item, index) => (
              <List.Item
                key={item.id}
                className={styles.caseItem}
                style={{
                  background: `url(${index % 2 === 0 ? Bg : ''})`,
                  backgroundSize: '100% 100%',
                }}
              >
                {index % 2 === 0 ? (
                  <div>
                    <div className={styles.pic}>
                      <img
                        onClick={() => goDetailClick(item)}
                        src={baseUrl + item.icon}
                        alt="icon"
                      />
                    </div>
                    <div className={styles.text}>
                      <span onClick={() => goDetailClick(item)}>{item.title}</span>
                      <span>{item.brief}</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className={styles.text}>
                      <span onClick={() => goDetailClick(item)}>{item.title}</span>
                      <span>{item.brief}</span>
                    </div>
                    <div className={styles.pic}>
                      <img
                        onClick={() => goDetailClick(item)}
                        src={baseUrl + item.icon}
                        alt="icon"
                      />
                    </div>
                  </div>
                )}
              </List.Item>
            )}
          />
        </InfiniteScroll>
        {hasMore ? null : <div className={styles.noMore}>没有更多了哦~</div>}
      </div>
    );
  };

  return (
    <div className={styles.caseDetails}>
      <DetailsBanner />
      <div className={styles.detail}>{industryInfo.detail}</div>
      <DetailFeatures />
      <ApplicationCase />
    </div>
  );
};

export default CaseDetails;
