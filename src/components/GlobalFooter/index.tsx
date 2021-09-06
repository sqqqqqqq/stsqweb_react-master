import React from 'react';
// import { DefaultFooter } from '@ant-design/pro-layout';
import styles from './index.less';
import footerLogo02 from '../../assets/globalFooter/footer_logo02.png';
import footerLogo02Light from '../../assets/globalFooter/footer_logo02_light.png';
import footerLogo03 from '../../assets/globalFooter/footer_logo03.png';
import footerLogo03Light from '../../assets/globalFooter/footer_logo03_light.png';

const FooterTextMsg = [
  {
    url: 'http://iservice.10010.com/e4/Copyright_n/index3.html',
    text: '企业法人营业执照',
  },
  {
    url: 'http://iservice.10010.com/e4/Copyright_n/index2.html',
    text: '基础电信业务经营许可证',
  },
  {
    url: 'http://iservice.10010.com/e4/Copyright_n/index.html',
    text: '增值电信业务经营许可证',
  },
  {
    url: 'http://iservice.10010.com/e4/Copyright_n/index4.html',
    text: '网络文化经营许可证',
  },
];

const FooterImgMsg = [
  {
    url: 'https://search.szfw.org/cert/l/CX20111216001076001118',
    img: footerLogo02,
    lightImg: footerLogo02Light,
    alt: '诚信网站',
  },
  {
    url: 'https://ss.knet.cn/verifyseal.dll?sn=e13013011010039034ki4j000000&ct=df&a=1&pa=812015',
    img: footerLogo03,
    lightImg: footerLogo03Light,
    alt: '可信网站',
  },
];

const GlobalFooter = () => {
  return (
    <div id="homeFooter" className={`${styles.homeFooter} ${styles.whiteTheme}`}>
      <div className={styles.siteFooterCert}>
        {FooterTextMsg.map((item) => (
          <a href={item.url} target="_blank" rel="noopener noreferrer" key={item.url}>
            {item.text}
          </a>
        ))}
      </div>
      <p>
        Copyright© 1999-2019 中国联通 版权所有
        <br />
        中华人民共和国增值电信业务经营许可证编号：A2.B1.B2-20090003
      </p>
      <div className={styles.siteFooterLogo}>
        {FooterImgMsg.map((item) => (
          <a key={item.url}>
            <img src={item.lightImg} alt={item.alt} />
          </a>
        ))}
      </div>
    </div>
  );
};

// const GlobalFooter = () => {
//   return (
//     <DefaultFooter
//       className={styles.footerContent}
//       copyright="2019 联通5G应用创新联盟 版权所有 京ICP备11000964号"
//       links={[
//         {
//           key: '邮箱hqs-cu5gaia@chinaunicom.cn',
//           title: '邮箱hqs-cu5gaia@chinaunicom.cn',
//           href: '/',
//         },
//       ]}
//     />
//   );
// };

export default GlobalFooter;
