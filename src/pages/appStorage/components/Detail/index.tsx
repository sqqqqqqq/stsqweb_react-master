import React, { useEffect, useState } from 'react';
import { Button, Card, List, message, Tag } from 'antd';
import { connect } from 'umi';
import moment from 'moment';
import { history } from 'umi';
import env from '@/config/env';
import { getPathName } from '@/utils/utils';
import { getWarehouseRelatedCase, getWarehouseDetail, getCheckIntent } from '@/services/lib';
import LoginConfirm from '@/components/LoginConfirm';
import coverImgPlaceholder from '@/assets/appStorage/detailImg.png';
import FooterBanner from '../FooterBanner';
import type { DetailType } from '../DetailMain';
import DetailMain, { initDetailObj } from '../DetailMain';
import styles from './index.less';

const AppStorageDetail = (props: any) => {
  const [appCaseDetail, setAppCaseDetail] = useState<DetailType>(initDetailObj);

  // 相关案例卡片初始加载状态
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [relatedCase, setRelatedCase] = useState([]);

  const fetchWarehouseRelatedCase = async (industryId: number, currentId: number) => {
    const res = await getWarehouseRelatedCase({ industryId, currentId });
    if (res.status === 200) {
      setRelatedCase(res.data.content);
    } else {
      message.error('获取相关案例出错啦~');
    }
    setInitLoading(false);
  };

  const applyCooperation = () => {
    const {
      user: { currentUser },
    } = props;

    const { id } = appCaseDetail;

    // 已登录
    if (currentUser.name) {
      history.push(`/appStorage/wishOrder/${id}`);
    } else {
      LoginConfirm({ pathname: getPathName() });
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getWarehouseDetail({ id: props.match.params.id });
      if (res.status === 200) {
        const time = res.data.createTimeStr;
        const data = {
          ...res.data,
          createTimeStr: `${time.slice(0, 4)}-${time.slice(4, 6)}-${time.slice(6, 8)}`,
        };

        // 封面占位
        if (res.data.imageList?.length > 0) {
          setAppCaseDetail({ ...data, coverImg: data.imageList[0] });
        } else {
          setAppCaseDetail({ ...data, coverImg: coverImgPlaceholder });
        }

        // 获取相关案例
        fetchWarehouseRelatedCase(data.industryId, data.id);
      } else {
        message.error('获取详情出错啦，请重试~');
      }

      // 判断登录后用户是否已经报名
      const {
        user: { currentUser },
      } = props;

      if (currentUser.name) {
        const result = await getCheckIntent({ warehouseId: props.match.params.id });
        if (result.status === 200) {
          setBtnDisabled(false);
        } else if (result.status === 500) {
          setBtnDisabled(true);
        } else {
          setBtnDisabled(true);
          message.error(result.message || '出错了');
        }
      }
    })();
  }, [props]);

  return (
    <div className={styles['app-storage-detail-container']}>
      <DetailMain detail={appCaseDetail} />
      <Button
        type="primary"
        className={styles['apply-cooperation-btn']}
        onClick={applyCooperation}
        disabled={btnDisabled}
      >
        {btnDisabled ? '已报名' : '报名合作'}
      </Button>
      <div className={styles['related-case']}>
        <p className={styles['text-container-title']}>相关案例</p>
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={relatedCase}
          className={styles['app-storage-related-list']}
          loading={initLoading}
          renderItem={(item: any) => (
            <List.Item>
              <Card onClick={() => window.open(`${env.baseUrl}/appStorage/${item.id}`)}>
                <div>{item.title}</div>
                <Tag>{item.industryName}</Tag>
                <div dangerouslySetInnerHTML={{ __html: item.brief }} />
                <span className="time">{moment(item.createTime).format('YYYY-MM-DD')}</span>
              </Card>
            </List.Item>
          )}
        />
      </div>
      <FooterBanner />
    </div>
  );
};
// export default AppStorageDetail;
export default connect(({ user }: { user: any }) => ({ user }))(AppStorageDetail);
