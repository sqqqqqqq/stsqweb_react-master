import React from 'react';
import { history } from 'umi';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { loginUrlRedirect } from '@/config/env';
import styles from './index.less';

interface LoginConfirmPropsType {
  pathname: string;
  content?: string;
  okUrl?: string;
  cancelUrl?: string;
}

const LoginConfirm = (props: LoginConfirmPropsType) => {
  const {
    pathname,
    content = '尚未登录，请登录',
    okUrl = `${loginUrlRedirect}${pathname}`,
    cancelUrl,
  } = props;

  Modal.confirm({
    className: styles.LoginConfirmModal,
    title: '提示',
    icon: <ExclamationCircleOutlined className={styles.warn} />,
    content,
    getContainer: false,
    okText: '确认',
    cancelText: '取消',
    autoFocusButton: null,
    onCancel: () => {
      if (cancelUrl) {
        history.push(cancelUrl);
      } else {
        history.goBack();
      }
    },
    onOk: () => {
      window.open(okUrl, '_self');
    },
  });
};

export default LoginConfirm;
