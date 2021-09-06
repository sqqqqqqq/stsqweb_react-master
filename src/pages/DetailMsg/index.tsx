import React, { useEffect } from 'react';
import $ from 'jquery';
import type { Dispatch, DetailState } from 'umi';
import { history, connect } from 'umi';
import { Button, Spin } from 'antd';
// import env from '@/utils/env';
import SideBar from './components/SideBar';
import styles from './index.less';

interface DetailProps {
  DetailModel: DetailState;
  dispatch: Dispatch;
}

const TrendDetail: React.FC<DetailProps> = ({ DetailModel, dispatch }) => {
  useEffect(() => {
    const data = history.location.query;
    dispatch({
      type: 'DetailModel/init',
      payload: data,
    });
  }, []);

  useEffect(() => {
    const imgItems = $('img');
    imgItems.css({ 'max-width': '100%' });
  }, [DetailModel.msgContextData]);

  // const postPraise = (isPraise: string) => {
  //   const data = {
  //     newsId: history.location.query.id,
  //     isPraise,
  //   };
  //   dispatch({
  //     type: 'DetailModel/updateNewsPraise',
  //     payload: {
  //       ...data,
  //     },
  //   });
  // };

  const handleLikeBtnClick = () => {
    // if (!DetailModel.isLogin) {
    //   Modal.confirm({
    //     title: '提示',
    //     content: <span>请先登录</span>,
    //     onOk() {
    //       window.location.href = env.loginUrl + history.location.pathname;
    //     },
    //     onCancel() {},
    //   });
    // } else {
    // postPraise(DetailModel.msgContextData.praiseStatus === 1 ? '0' : '1');
    // }

    const isPraise = DetailModel.msgContextData.praiseStatus === 1 ? '0' : '1';
    const data = {
      newsId: history.location.query.id,
      isPraise,
    };
    dispatch({
      type: 'DetailModel/updateNewsPraise',
      payload: {
        ...data,
      },
    });
  };
  const submitBtnClick = (type: string) => {
    dispatch({
      type: 'DetailModel/save',
      payload: { type },
    });
  };
  return (
    <Spin spinning={DetailModel.loading}>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.header}>
            <h1>{DetailModel.msgContextData.title}</h1>
          </div>
          <div className={styles.footer}>
            <span style={{ marginRight: '20px' }}>发布时间：{DetailModel.time}</span>
            <span>阅读量：{DetailModel.msgContextData.countBrowse}</span>
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.msgContextArea}>
            <div
              className={styles.newsTextFormat}
              dangerouslySetInnerHTML={{ __html: DetailModel.msgContextData.newsTextFormat }}
            />
            {DetailModel.msgContextData.isPreview ? (
              <div className={styles.submitBtnDiv}>
                <Button
                  className={styles.submitBtn}
                  shape="round"
                  onClick={() => {
                    submitBtnClick('save');
                  }}
                >
                  <span>保存</span>
                </Button>
                <Button
                  className={styles.submitBtn}
                  shape="round"
                  onClick={() => {
                    submitBtnClick('submit');
                  }}
                >
                  <span>提交</span>
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  className={`${styles.likeBtn} ${
                    DetailModel.msgContextData.praiseStatus === 1 ? styles.likeBtnHasClick : ''
                  }`}
                  shape="round"
                  onClick={() => {
                    handleLikeBtnClick();
                  }}
                >
                  <i className="iconfont icondianzan" />
                  <span>点赞</span>
                  <span>
                    (
                    {DetailModel.msgContextData.countPraise > 9999
                      ? `${(DetailModel.msgContextData.countPraise / 10000).toFixed(1)}万`
                      : `${DetailModel.msgContextData.countPraise}`}
                    )
                  </span>
                </Button>
              </div>
            )}
          </div>
          <SideBar />
        </div>
      </div>
    </Spin>
  );
};

const mapStateToProps = ({ DetailModel }: { DetailModel: DetailState }) => {
  return {
    DetailModel,
  };
};
export default connect(mapStateToProps)(TrendDetail);
