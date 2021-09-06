import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { Card, Spin } from 'antd';
import { videoRecommend } from '@/services/video';
import { Dispatch, connect } from 'umi';
import play from '@/assets/5GLive/play.png';
import playing from '@/assets/5GLive/playing.gif';
import env from '@/utils/env';
import styles from './index.less';

interface Props {
  dispatch: Dispatch;
}

const ReplayList: React.FC<Props> = ({ dispatch }) => {
  const [replayInfo, setReplayInfo] = useState<any>([]);
  const [videoDataPageCount, setVideoDataPageCount] = useState(0);
  const [hasMoreVideoData, setHasMoreVideoData] = useState(true);
  const [loading, setLoading] = useState(false);

  const changeStyle = (id: number) => {
    const replayItems = $('a[class^=replayItem]');
    replayItems.children('img[class^=playingLogo]').css({ display: 'none' });
    replayItems.children('i[class^=playingLogoHover]').css({ display: 'none' });
    replayItems.css({ 'pointer-events': 'auto' });

    replayItems.children(`img#${id}`).css({ display: 'inline' });
    replayItems.children(`i#${id}`).css({ display: 'inline' });
    $(`a#${id}`).css({ 'pointer-events': 'none' });
  };

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
      if (hasMoreVideoData) {
        setVideoDataPageCount((preVideoDataPageCount: number) => {
          return preVideoDataPageCount + 1;
        });
      }
    }
  };

  const componentWillUnmount = () => {
    dispatch({
      type: 'PlayModel/update',
      payload: {
        isPlaying: false,
      },
    });
  };

  useEffect(() => {
    window.onscroll = windowScrollEvent;
    return componentWillUnmount;
  }, []);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const params = {
        size: 3,
        page: videoDataPageCount,
        isLive: '0',
      };
      const result = await videoRecommend(params);
      if (result.data?.content.length !== 0) {
        setReplayInfo([...replayInfo, ...result.data?.content]);
      } else if (hasMoreVideoData) {
        setHasMoreVideoData(false);
      }
      setLoading(false);
    })();
  }, [videoDataPageCount]);

  useEffect(() => {
    // 重新注册onscroll事件，获取新的hasMoreVideoData
    if (!hasMoreVideoData) {
      window.onscroll = null;
    }
  }, [hasMoreVideoData]);

  // 点击事件处理函数
  const changeReplay = (item: any) => {
    changeStyle(item.id);
    window.scrollTo(0, 0);

    dispatch({
      type: 'PlayModel/update',
      payload: {
        isPlaying: true,
        url: item.urlOrigin,
        id: item.id,
        title: item.title,
        type: item.type === null ? 'Live' : 'RePlay',
      },
    });
  };

  return (
    <div className={styles.replayList}>
      <Spin indicator={<i />} spinning={loading}>
        <Card title="往期追溯" headStyle={{ fontSize: '24px', color: '#333', fontWeight: 'bold' }}>
          {replayInfo.map((item: any) => (
            <Card.Grid
              style={{ width: '33.33%', textAlign: 'center', height: '300px' }}
              key={item.id}
            >
              <a
                className={styles.replayItem}
                id={item.id}
                onClick={() => {
                  changeReplay(item);
                }}
              >
                <img className={styles.replayItemImage} src={env.baseUrl + item.icon} alt="alt" />
                <i className={styles.playingLogoHover} id={item.id} />
                <img className={styles.playingLogo} id={item.id} src={playing} alt="alt" />
                <i className={styles.playLogoHover} />
                <img className={styles.playLogo} id="playLogo" src={play} alt="alt" />
                <div className={styles.playItemTitleSpan}>
                  <span>{item.title}</span>
                </div>
              </a>
            </Card.Grid>
          ))}
        </Card>
        <div className={styles.loading}>
          {hasMoreVideoData && loading ? <Spin /> : ''}
          {hasMoreVideoData ? '' : '没有更多了'}
        </div>
      </Spin>
    </div>
  );
};

export default connect()(ReplayList);
