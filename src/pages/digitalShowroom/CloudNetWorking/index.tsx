import React from 'react';
import styles from './index.less';
import CloudNetList from './components/CloudNetList';

const DigitalShowroom: React.FC = () => {
  const DigitalBanner = () => {
    return (
      <div className={styles.banner}>
        <div>
          <span>云联网·CloudBond</span>
          <span>
            实现企业office、公有云、数据中心等专有网络互联，满足一点入云、云间互联、全国组网等业务需求。
          </span>
          <span>
            中国联通云联网业务（DCI &
            CloudBond）是以联通集团骨干网（产业互联网）为承载网络，使用SDN技术，为混合云场景（含公有云、私有云及数据中心托管）提供可自服务的快捷、弹性、随选
            的全国组网方案，解决不同地域，不同网络环境间多云互联的问题，实现异构混合云组网。
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.cloudNet}>
      <DigitalBanner />
      <CloudNetList />
    </div>
  );
};

export default DigitalShowroom;
