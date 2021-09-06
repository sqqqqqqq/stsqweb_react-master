import React, { useEffect, useState } from 'react';
import { connect, history } from 'umi';
import type { CurrentUser } from '@/models/user';
// import { Spin } from 'antd';
// import styles from './index.less';
// import { getPathName } from '@/utils/utils';
// import LoginConfirm from '@/components/LoginConfirm';

interface Props {
  CurrentUser: CurrentUser;
}

const AppMall: React.FC<Props> = (props: any) => {
  // const [frameLoading, setFrameLoading] = useState(true);
  const [loginToken, setLoginToken] = useState('');
  const jumpToOrder = (e: any) => {
    history.push(e.data);
  };
  useEffect(() => {
    const homeFooter = window.document.getElementById('homeFooter');
    if (homeFooter) {
      homeFooter.style.display = 'none';
    }

    const {
      user: { currentUser },
    } = props;

    setLoginToken(currentUser.remark?.split('&')[0] || '');
    // if (currentUser.message === '用户未登录') {
    //   LoginConfirm({ pathname: getPathName() });
    // }
    // window.setInterval(() => {
    //   const frame = document.getElementById('testFrame');
    //   // setFrameHeight('0px');
    //   const bHeight = frame.contentWindow.document.body?.scrollHeight;
    //   const dHeight = frame.contentWindow.document.documentElement?.scrollHeight;
    //   const height = Math.max(bHeight, dHeight);
    //   console.log(height);
    //   setFrameHeight(`${height}px`);
    // }, 200);
    return () => {
      if (homeFooter) {
        homeFooter.style.display = 'block';
      }
      window.removeEventListener('message', jumpToOrder);
    };
  }, [props]);

  return (
    <div style={{ width: '100vw', height: '100%' }}>
      {/* <div
        style={{
          position: 'absolute',
          height: '100%',
          zIndex: 2,
          width: '100%',
          display: frameLoading ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin spinning={frameLoading} size="large"></Spin>
      </div> */}
      <iframe
        id="testFrame"
        src={`/partners/appstore/?func=appstore_index${
          loginToken === '' ? '' : `&loginToken=${loginToken}`
        }`}
        style={{ position: 'absolute', width: '100vw', height: '100%' }}
        // className={`${frameLoading ? styles.filter : ''}`}
        frameBorder="false"
        onLoad={() => {
          // setFrameLoading(false);
          window.addEventListener('message', jumpToOrder);
        }}
      ></iframe>
    </div>
  );
};
export default connect(({ user }: { user: any }) => ({ user }))(AppMall);
