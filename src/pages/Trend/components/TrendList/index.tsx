import React, { useState, useEffect } from 'react';
import { Card, Spin } from 'antd';
import { getTrend } from '@/services/trend';
import { history } from 'umi';
// import { Carousel } from 'element-react';
import ReactCardCarousel from 'react-card-carousel';
import 'element-theme-default';
import env from '@/utils/env';
import styles from './index.less';

const TrendList: React.FC = () => {
  const [trendDataPageCount, setTrendDataPageCount] = useState(1);
  const [hasMoreTrendData, setHasMoreTrendData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [trendItemList, setTrendItemList] = useState<any[]>([]);

  const windowScrollEvent = () => {
    // scrollTop 滚动条滚动时，距离顶部的距离
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // windowHeight 可视区的高度
    const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    // scrollHeight 滚动条的总高度
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    // 滚动条到底部的条件，做个范围校验
    if (
      scrollTop + windowHeight < scrollHeight + 1 &&
      scrollTop + windowHeight > scrollHeight - 1
    ) {
      // 加载数据
      if (hasMoreTrendData) {
        setTrendDataPageCount((preTrendDataPageCount: number) => {
          return preTrendDataPageCount + 1;
        });
      }
    }
  };

  useEffect(() => {
    window.onscroll = windowScrollEvent;
  }, []);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const params = {
        size: 6,
        status: '3',
        page: trendDataPageCount,
      };
      const result = await getTrend(params);
      if (result.data?.content.length !== 0) {
        setTrendItemList((preTrendItemList) => {
          return [...preTrendItemList, ...result.data?.content];
        });
      } else if (hasMoreTrendData) {
        setHasMoreTrendData(false);
      }
      setLoading(false);
    })();
  }, [trendDataPageCount]);

  useEffect(() => {
    // 重新注册onscroll事件，获取新的hasMoreTrendData
    if (!hasMoreTrendData) {
      window.onscroll = null;
    }
  }, [hasMoreTrendData]);

  // 点击事件处理函数
  const toTrendDetail = (item: any) => {
    const location = {
      pathname: '/detailmsg',
      search: `?clazz=${item.clazz}&id=${item.id}`,
    };
    const url = history.createHref(location);
    window.open(url, '_blank');
  };

  const timeStamp2String = (time: number) => {
    const datetime = new Date();
    datetime.setTime(time);
    const year = datetime.getFullYear();
    const month = datetime.getMonth() + 1;
    const date = datetime.getDate();
    return `${year}-${month}-${date}`;
  };

  return (
    <div className={styles.trendList}>
      <div
        style={{
          position: 'relative',
          height: '400px',
          width: '100%',
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'middle',
          margin: '10px 0',
        }}
      >
        <ReactCardCarousel autoplay autoplay_speed={2500}>
          {trendItemList.slice(0, 3).map((item: any) => (
            <div className={styles.elCarousel} key={item.id}>
              <img
                src={env.baseUrl + item.icon}
                alt="alt"
                onClick={() => {
                  toTrendDetail(item);
                }}
                className={styles.elCarouselImg}
              />
              <div
                className={styles.elCarouselFooter}
                onClick={() => {
                  toTrendDetail(item);
                }}
              >
                {item.title}
              </div>
            </div>
          ))}
        </ReactCardCarousel>
      </div>
      {/* <Carousel className={styles.elCarousel} interval="2000" type="card" height="450px">
        {trendItemList.slice(0, 3).map((item: any) => (
          <Carousel.Item key={item.id}>
            <img
              className={styles.elCarouselImg}
              src={env.baseUrl + item.icon}
              alt="alt"
              onClick={() => {
                toTrendDetail(item);
              }}
            />
            <div
              className={styles.elCarouselFooter}
              onClick={() => {
                toTrendDetail(item);
              }}
            >
              {item.title}
            </div>
          </Carousel.Item>
        ))}
      </Carousel> */}
      <Spin indicator={<i />} spinning={loading}>
        <Card
          title="联盟动态"
          headStyle={{
            fontSize: '24px',
            color: '#333',
            fontWeight: 'bold',
            borderLeft: '4px solid #1890ff',
          }}
        >
          {trendItemList.map((item: any) => (
            <Card.Grid style={{ width: '33.33%', height: '460px' }} key={item.id}>
              <a
                className={styles.trendItem}
                id={item.id}
                onClick={() => {
                  toTrendDetail(item);
                }}
              >
                <img className={styles.trendItemImage} src={env.baseUrl + item.icon} alt="alt" />
                <span className={styles.trendItemTitle}>{item.title}</span>
                <span className={styles.trendItemTime}>
                  发布时间：{timeStamp2String(item.createTime)}
                </span>
              </a>
            </Card.Grid>
          ))}
        </Card>
        <div className={styles.loading}>
          {hasMoreTrendData && loading ? <Spin /> : ''}
          {hasMoreTrendData ? '' : '没有更多了'}
        </div>
      </Spin>
    </div>
  );
};

export default TrendList;
