import React, { /* useEffect, */ useState } from 'react';
import { Button } from 'antd';
import { connect, history } from 'umi';
import styles from './index.less';
import LoginConfirm from '@/components/LoginConfirm';
import { getPathName } from '@/utils/utils';

interface ApplyBtnPropsType {
  btnText: string;
  currentUser: any;
}

const ApplyBtn = (props: ApplyBtnPropsType) => {
  const { btnText } = props;

  const [disableApply /* setDisableApply */] = useState(true);

  const { currentUser } = props;

  // useEffect(() => {
  //   const year = new Date().getFullYear();
  //   const month = new Date().getMonth();
  //   const date = new Date().getDate();
  //   if (year > 2020) {
  //     setDisableApply(true);
  //   } else if (month > 7) {
  //     setDisableApply(true);
  //   } else if (month >= 7 && date >= 9) {
  //     setDisableApply(true);
  //   }
  // }, []);

  const handleApplyBtnClick = () => {
    if (btnText === '进入专区') {
      history.push('/enrollment');
    } else if (currentUser.name) {
      history.push('/bloom');
    } else {
      LoginConfirm({ pathname: getPathName() });
    }
  };

  return (
    <Button
      onClick={handleApplyBtnClick}
      disabled={disableApply}
      className={styles['enrollment-banner-btn']}
    >
      {btnText}
    </Button>
  );
};

export default connect(({ user }: { user: any }) => ({ currentUser: user.currentUser }))(ApplyBtn);
