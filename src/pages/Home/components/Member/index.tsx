import React from 'react';
import ColorfulTitle from '@/components/ColorfulTitle';
import { Row, Col, message } from 'antd';
import { joinTheLeague } from '@/services/portal';
import { history } from 'umi';
import styles from './index.less';
import LoginConfirm from '@/components/LoginConfirm';
import { getPathName } from '@/utils/utils';

export const handleJoinUsClick = () => {
  joinTheLeague()
    .then((res) => {
      if (res.status === '200') {
        window.location.href = res.toInAmnt;
      } else if (res.status === '500') {
        window.location.href = res.toInNot;
      } else if (res.status === '300') {
        message.success('您已申请5G创新联盟会员，工作人员正在审核中！', 1.5);
      } else if (res.status === '100') {
        message.success('您已经是5G创新联盟会员了！', 1.5);
      } else if (res.status === '400') {
        LoginConfirm({ pathname: getPathName() });
      } else {
        message.error('出错了，请稍后再试');
      }
    })
    .catch((e) => console.log(e));
};

const Member = () => {
  return (
    <div className={styles['member-container']}>
      <ColorfulTitle title="合作会员" color="#01c4d8" />
      <Row>
        <Col span={6} className={styles['member-container-row']} onClick={handleJoinUsClick}>
          <i className="iconfont iconhuoban" />
          <span>成为会员</span>
        </Col>
        <Col
          span={6}
          className={styles['member-container-row']}
          onClick={() => {
            history.push('/introduce');
          }}
        >
          <i className="iconfont iconweibiaoti" />
          <span>了解加入流程</span>
        </Col>
        <Col span={8} className={styles['member-container-row']}>
          <span>成为联通5G</span>
          <span>应用创新联盟合作会员</span>
          <span>共赢5G美好未来</span>
          <i />
          <i />
          <i />
          <i />
        </Col>
      </Row>
    </div>
  );
};

export default Member;
