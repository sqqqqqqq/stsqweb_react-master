import React from 'react';
import styles from './index.less';
import MenuBanner from './components/MenuBanner/index';
import DigitalList from './components/DigitalList/index';
import { CloudCardList } from './CloudNetWorking/components/CloudNetList';
import { history } from 'umi';
import AI from './components/AI';

const DigitalShowroom: React.FC = () => {
  // 云网赋能专区（下个版本内容）
  // const DigitalCloud = () => {
  //   return (
  //     <div className={styles['digital-cloud-empowerment']}>
  //       <div className={styles['digital-cloud-empowerment-left']}>
  //         <div>
  //           <div>物联网产品体验包</div>
  //           <div className={styles['digital-cloud-empowerment-left-list']}>
  //             <span>3张中国联通物联网SM卡</span>
  //             <span>3个月内每张SIM卡每月有50M流量</span>
  //             <span>3个月内每张SIM卡每月含有30条短信</span>
  //           </div>
  //           <div
  //             className={styles['digital-cloud-empowerment-left-button']}
  //             onClick={() => {
  //               history.push('/digitalShowroom/CloudNetWorking');
  //             }}
  //           >
  //             了解更多
  //             <div className={styles.rightArrow} />
  //           </div>
  //         </div>
  //       </div>
  //       <div className={styles['digital-cloud-empowerment-right']}>
  //         <span>中国联通物联网</span>
  //         <span>
  //           随着联网设备的数量激增，行业领导者了解物联网（IoT）的真正价值不在于设备本身，而是它们所提供的服务
  //           - 以及这些服务所 带来的源源不断的价值。
  //           中国联通围绕物联网业务重点领域，持续推进网络技术、支撑平台、运营模式、营销体系及服务内容的创新，重点打造自服务的连接管理、开放的应用集成以及一点接入全球部署的核心竞争力，为不同领域客户提供包含物联网连接、
  //           应用、终端的端到端全套解决方案和服务，帮助客户从传统的产品制造与销售者转型为服务提供与运营者，不断为客户创造新的价值。
  //         </span>
  //       </div>
  //     </div>
  //   );
  // };

  // 云网赋能（0511版本）
  const DigitalEmpowerment = () => {
    return (
      <div className={styles['cloud-empowerment']}>
        <div className={styles['cloud-empowerment-banner']}>
          <div>
            <span>云联网·CloudBond</span>
            <span>
              实现企业office、公有云、数据中心等专有网络互联，满足一点入云、云间互联、全国组网等业务需求。
            </span>
          </div>
        </div>
        <div className={styles['cloud-empowerment-list']}>
          <div>
            <CloudCardList />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.digital}>
      <MenuBanner />
      <div className={styles['digital-hall']}>
        <div>
          <span
            className={styles.title}
            onClick={() => {
              history.push('/digitalShowroom/ExhibitionHall');
            }}
          >
            数字展厅
          </span>
          <DigitalList />
        </div>
      </div>
      <div className={styles['digital-cloud']}>
        <div>
          <span
            className={styles.title}
            onClick={() => {
              history.push('/digitalShowroom/CloudNetWorking');
            }}
          >
            云网赋能
          </span>
          {/* <DigitalCloud /> */}
          <DigitalEmpowerment />
        </div>
      </div>
      <div className={styles['digital-bigData']}>
        <div>
          <span
            className={styles.title}
            onClick={() => {
              history.push('/digitalShowroom/AIspecial');
            }}
          >
            AI赋能
          </span>
          <AI />
        </div>
      </div>
    </div>
  );
};

export default DigitalShowroom;
