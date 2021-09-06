import React, { useEffect, useState } from 'react';
import { connect, history } from 'umi';
import type { CurrentUser } from '@/models/user';
import { message } from 'antd';
import env from '@/utils/env';

interface Props {
  CurrentUser: CurrentUser;
}

const MEC: React.FC<Props> = (props: any) => {
  const [loginToken, setLoginToken] = useState('');
  const {
    user: { currentUser },
  } = props;
  const jump = (e: any) => {
    if (e.data === 'jump') {
      if (loginToken === '') {
        message.info('您未登录，请登录', 2).then(() => {
          window.location.href = env.loginUrl + history.location.pathname;
        });
      } else if (!currentUser.stpartyCode) {
        message.info('您未成为合作伙伴，请前往用户中心关联企业信息', 2).then(() => {
          window.location.href = env.consoleUrl;
        });
      } else {
        window.location.href = env.consoleUrl;
      }
    }
  };

  useEffect(() => {
    const homeFooter = window.document.getElementById('homeFooter');
    if (homeFooter) {
      homeFooter.style.display = 'none';
    }

    // const {
    //   user: { currentUser },
    // } = props;
    setLoginToken(currentUser.remark?.split('&')[0] || '');
    return () => {
      if (homeFooter) {
        homeFooter.style.display = 'block';
      }
      window.removeEventListener('message', jump);
    };
  }, [props]);

  return (
    <div style={{ width: '100vw', height: '100%' }}>
      <iframe
        id="testFrame"
        src={`/partners/developer/?func=developer_home${
          loginToken === '' ? '' : `&loginToken=${loginToken}`
        }`}
        style={{ position: 'absolute', width: '100vw', height: '100%' }}
        frameBorder="false"
        onLoad={() => {
          // setFrameLoading(false);
          window.addEventListener('message', jump);
        }}
      ></iframe>
    </div>
  );
};
export default connect(({ user }: { user: any }) => ({ user }))(MEC);
