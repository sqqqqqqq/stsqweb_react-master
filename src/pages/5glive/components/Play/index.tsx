import React from 'react';
import { Card } from 'antd';
import ReactPlayer from 'react-player';
import { connect, PlayerState, Dispatch } from 'umi';
// import env from '@/utils/env';
import styles from './index.less';

interface PlayItemProps {
  PlayModel: PlayerState;
  dispatch: Dispatch;
}

const Play: React.FC<PlayItemProps> = ({ PlayModel, dispatch }) => {
  // useEffect(() => {
  //   dispatch({
  //     type: 'PlayModel/updateUserInfo',
  //   });
  // }, [PlayModel.id])

  // 更新点赞请求,isPraise:"1"表示点赞，"0"表示取消点赞
  // const postPraise = (isPraise: string) => {
  //   const data = {
  //     newsId: PlayModel.id,
  //     isPraise,
  //   };
  //   dispatch({
  //     type: 'PlayModel/updateNewsPraise',
  //     payload: {
  //       ...data,
  //     },
  //   });
  // };
  const handleLikeBtnClick = () => {
    // if (!PlayModel.isLogin) {
    //   Modal.confirm({
    //     title: '提示',
    //     content: <span>请先登录</span>,
    //     onOk() {
    //       window.location.href = env.loginUrl + history.location.pathname;
    //     },
    //     onCancel() {},
    //   });
    // } else {
    //   // 若当前likeFlag是true,则post的接口参数isPraise为 "0"
    //   // 原先是true，更新完后是false
    //   postPraise(PlayModel.praiseStatus ? '0' : '1');
    // }
    const isPraise = PlayModel.praiseStatus ? '0' : '1';
    const data = {
      newsId: PlayModel.id,
      isPraise,
    };
    dispatch({
      type: 'PlayModel/updateNewsPraise',
      payload: {
        ...data,
      },
    });
  };

  return (
    <div className={styles.playDiv}>
      <Card title={PlayModel.title}>
        {PlayModel.type === 'Live' ? (
          <div style={{ paddingBottom: '56.2%', position: 'relative', width: '100%' }}>
            <iframe
              title="play"
              src={PlayModel.url}
              width="100%"
              height="100%"
              allowFullScreen
              frameBorder="0"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                overflow: 'hidden',
              }}
            />
          </div>
        ) : (
          <ReactPlayer url={PlayModel.url} playing width="100%" height="100%" controls />
        )}
        <div className={styles.status}>
          <span
            title={`点赞数${PlayModel.countPraise}`}
            className={styles.like}
            onClick={handleLikeBtnClick}
          >
            <i
              className={`iconfont icondianzan ${styles.icondianzan} ${
                PlayModel.praiseStatus ? styles.likeHasClick : ''
              }`}
            />
            <span className={PlayModel.praiseStatus ? styles.likeHasClick : ''}>
              {PlayModel.countPraise > 9999
                ? `${(PlayModel.countPraise / 10000).toFixed(1)}万`
                : PlayModel.countPraise}
            </span>
          </span>
          <span title={`播放量${PlayModel.countBrowse}`} className={styles.play}>
            <i className="iconfont iconguankancishu" />
            <span>
              {PlayModel.countBrowse > 9999
                ? `${(PlayModel.countBrowse / 10000).toFixed(1)}万播放`
                : `${PlayModel.countBrowse}播放`}
            </span>
          </span>
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ PlayModel }: { PlayModel: PlayerState }) => {
  return {
    PlayModel,
  };
};
export default connect(mapStateToProps)(Play);
