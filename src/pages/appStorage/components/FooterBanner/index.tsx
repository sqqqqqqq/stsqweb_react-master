import React from 'react';
import img5G2 from '@/assets/appStorage/5G2.png';
import imgBtn from '@/assets/appStorage/button2.png';
import footerBannerBg from '@/assets/appStorage/banner2.png';
import { connect } from 'umi';
import LoginConfirm from '@/components/LoginConfirm';
import { getPathName } from '@/utils/utils';
import env from '@/config/env';
import styles from './index.less';

const FooterBanner = (props: any) => {
  const handleImgClick = () => {
    const {
      user: { currentUser },
    } = props;

    // 已登录
    if (currentUser.name) {
      window.open(`${env.baseUrl}${env.warehouseEditUrl}`, '_self');
    } else {
      LoginConfirm({ pathname: getPathName() });
    }
  };

  return (
    <div
      className={styles['app-storage-footer-banner']}
      style={{ backgroundImage: `url(${footerBannerBg})` }}
    >
      <div>
        <img src={img5G2} alt="img5G2" />
        <img src={imgBtn} alt="imgBtn" onClick={handleImgClick} />
      </div>
    </div>
  );
};

// export default FooterBanner;
export default connect(({ user }: { user: any }) => ({ user }))(FooterBanner);
