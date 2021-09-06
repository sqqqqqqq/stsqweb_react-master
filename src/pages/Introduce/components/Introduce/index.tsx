import React from 'react';
import { Button } from 'antd';
// import fiveImg from '@/assets/introduce/Introduce/5.png';
// import sixImg from '@/assets/introduce/Introduce/6.png';
import introduceTimeLine from '@/assets/introduce/Introduce/introduceTimeLine.png';
import applyLine from '@/assets/introduce/Introduce/circle@2x.png';
// import applyProcessBG from '@/assets/introduce/Introduce/group5@2x.png';
import applyProcess1 from '@/assets/introduce/Introduce/group6@2x.png';
import applyProcess2 from '@/assets/introduce/Introduce/group7@2x.png';
import applyProcess3 from '@/assets/introduce/Introduce/group8@2x.png';
import applyProcess4 from '@/assets/introduce/Introduce/group9@2x.png';
import applyProcess5 from '@/assets/introduce/Introduce/group10@2x.png';
import BriefMain from '@/assets/introduce/Introduce/BriefMain.png';
import styles from './index.less';
import { handleJoinUsClick } from '@/pages/Home/components/Member';
// import { baseUrl, cu5gaia } from '@/config/env';
import SixEmpowerments from '@/pages/Home/components/SixEmpowerments';
import ChangePartners from '@/pages/Home/components/ChangePartners';

const Introduce = () => {
  // const fivePlanMenu = [
  //   {
  //     key: 1,
  //     icon: 'iconfont icon_list_item iconchanpin',
  //     text: '打造200+ 5G 示范项目',
  //   },
  //   {
  //     key: 2,
  //     icon: 'iconfont icon_list_item iconyingyong',
  //     text: '制订20+ 5G应用标准',
  //   },
  //   {
  //     key: 3,
  //     icon: 'iconfont icon_list_item iconshiyanshi',
  //     text: '建立50+ 5G开放实验室',
  //   },
  //   {
  //     key: 4,
  //     icon: 'iconfont icon_list_item iconchengyuan-selected',
  //     text: '聚合1000+成员单位',
  //   },
  //   {
  //     key: 5,
  //     icon: 'iconfont icon_list_item iconchanpin1',
  //     text: '孵化100+ 5G创新应用',
  //   },
  // ];

  // const sixEnable = [
  //   {
  //     key: 1,
  //     title: '网络和平台赋能',
  //     brief1: '5G+AI能力 | 边缘计算能力',
  //     brief2: '物联网使能平台能力 | 云网融合能力',
  //   },

  //   {
  //     key: 2,
  //     title: '产品孵化赋能',
  //     brief1: '网络及产品开放测试 | 10000+测试终端',
  //     brief2: '200+高级专家支撑',
  //   },
  //   {
  //     key: 3,
  //     title: '商业创新赋能',
  //     brief1: '商业模式联合创新研究中心',
  //     brief2: '1000+场次联合商业推广',
  //   },
  //   {
  //     key: 4,
  //     title: '营销资源赋能',
  //     brief1: '全国四级营销网络',
  //     brief2: '60000+ 营销队伍',
  //   },
  //   {
  //     key: 5,
  //     title: '创投资本赋能',
  //     brief1: '组织百亿级资金用于孵化5G项',
  //     brief2: '联合投资及运营',
  //   },
  //   {
  //     key: 6,
  //     title: '服务支撑赋能',
  //     brief1: '5G创新中心',
  //     brief2: '20+专业子公司及产互公司',
  //   },
  // ];

  const hatchCircle1 = [
    'iconfont icon_font iconchanpin',
    'iconfont icon_font iconzijin',
    'iconfont icon_font iconshichang',
  ];

  const hatchCircle2 = [
    'iconfont icon_font iconxiaoshouzhongxin',
    'iconfont icon_font iconxiaorentou',
    'iconfont icon_font iconshouhoucopy',
  ];

  const applyProcess = [
    { key: 1, icon: applyProcess1, text: '01注册网站用户' },
    { key: 2, icon: applyProcess3, text: '02提交企业信息进行审核' },
    { key: 3, icon: applyProcess2, text: '03初审后成为合作伙伴' },
    { key: 4, icon: applyProcess4, text: '04绑定生态圈' },
    { key: 5, icon: applyProcess5, text: '05提交申请5G创新联盟成员' },
  ];

  return (
    <div className={styles['introduce-comp-container']}>
      {/* <div className={styles['five-plan']}>
        <div>
          <span>领航计划</span>
          <img src={fiveImg} alt="five" />
          <span>大目标</span>
        </div>
        <div>
          {fivePlanMenu.map((item) => (
            <div key={item.key}>
              <i className={item.icon} />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div> */}
      <div className={styles['introduce-brief']}>
        <div>
          <img src={BriefMain} alt="BriefMain" />
          <div className={styles['introduce-brief-content']}>
            <div>
              <div>中国联通5G应用创新联盟</div>
              <div>英文名称为China Unicom 5G Applications Innovation Alliance，简称CU5GAIA。</div>
              <span>
                中国联通5G应用创新联盟于2019年4月23日成立，旨在打造5G应用万亿新市场、建设5G行业新生态、树立5G企业新标杆、构筑5G商业新模式，开创5G产业新未来，促进相关主体间的交流和深度合作。联盟致力于成为“新蓝海的试验场，独角兽的孵化器”。
              </span>
              <span>
                为更好的建设生态、赋能行业，联盟先后发布了三大联合行动（5G应用场景联合创新行动、5G行业终端联合创新行动、5G商业化落地联合推广行动）以及六大赋能行动（网络赋能、AI赋能、安全赋能、平台赋能
                、渠道赋能、资本赋能）。
              </span>
              <span>
                目前，联盟的注册企业已达1000余家。会员单位在联盟的平台上共筑了双向互动，供需对接、技术革新、知识共享、联合创新的良好生态。有效促进5G应用的繁荣，助力5G行业发展并实现与行业客户、合作伙伴等多方的共建、共筑、共享和共赢。
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={styles['six-enable']}>
        <div>
          {sixEnable.map((item) => (
            <div key={item.key}>
              <h2>{item.title}</h2>
              <p>{item.brief1}</p>
              <p>{item.brief2}</p>
            </div>
          ))}
          <div>
            <img src={sixImg} alt="six" />
            <span>大赋能</span>
          </div>
        </div>
      </div> */}
      <div className={styles['six-empowerments']}>
        <div>
          <p>6大赋能</p>
          <SixEmpowerments />
        </div>
      </div>
      <div className={styles['innovation-hatch']}>
        <p>创新孵化流程</p>
        <div
          className={styles['hatch-process']}
          style={{ backgroundImage: `url(${introduceTimeLine})` }}
        >
          <div className={styles.circle}>
            {hatchCircle1.map((item) => (
              <i className={item} key={item} />
            ))}
            铁三角机制
          </div>
          <div className={styles.circle}>
            {hatchCircle2.map((item) => (
              <i className={item} key={item} />
            ))}
            一体化信息
          </div>
        </div>
      </div>
      <div className={styles['apply-process']}>
        <div>
          <p>申请流程</p>
          <div className={styles['apply-line']} style={{ backgroundImage: `url(${applyLine})` }}>
            {applyProcess.map((item) => (
              <div key={item.key}>
                <img src={item.icon} alt="img" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          <Button onClick={handleJoinUsClick}>加入我们</Button>
          {/* <a href={
            `${baseUrl}/${cu5gaia}/lib/whiteBook/download?` +
            'fileKey=application/202008/中国联通5G应用创新联盟章程.pdf&type=attachment&id=698'
          }>下载操作指引</a> */}
        </div>
      </div>
      <div className={styles['alliance-partners']}>
        <p>联盟成员</p>
        <ChangePartners />
      </div>
    </div>
  );
};

export default Introduce;
