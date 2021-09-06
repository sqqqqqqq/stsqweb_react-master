import React from 'react';
import styles from './index.less';
import { Button } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import { connect, history } from 'umi';
import LoginConfirm from '@/components/LoginConfirm';
import { getPathName } from '@/utils/utils';

const HoverButton = (props: any) => {
  const handleImgClick = () => {
    const {
      user: { currentUser },
    } = props;

    // 已登录
    if (currentUser.name) {
      history.push(`/square/order`);
    } else {
      LoginConfirm({ pathname: getPathName() });
    }
  };

  return (
    <div className={styles.hoverButton}>
      <Button type="primary" onClick={handleImgClick}>
        <CommentOutlined />
        <p> 联系我们获取方案</p>
      </Button>
    </div>
  );
};
export default connect(({ user }: { user: any }) => ({ user }))(HoverButton);
