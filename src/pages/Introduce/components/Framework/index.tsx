import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import frameworkImg from '@/assets/introduce/Framework/FrameworkImg.png';
import ExpertsCommitteeDefault from '@/assets/introduce/Framework/ExpertsCommitteeDefault.png';
import ExpertsCommitteeActive from '@/assets/introduce/Framework/ExpertsCommitteeActive.png';
import AllianceAdvisorDefault from '@/assets/introduce/Framework/AllianceAdvisorDefault.png';
import AllianceAdvisorActive from '@/assets/introduce/Framework/AllianceAdvisorActive.png';
import CouncilDefault from '@/assets/introduce/Framework/CouncilDefault.png';
import CouncilActive from '@/assets/introduce/Framework/CouncilActive.png';
import SecretariatDefault from '@/assets/introduce/Framework/SecretariatDefault.png';
import SecretariatActive from '@/assets/introduce/Framework/SecretariatActive.png';
import MemberUnitDefault from '@/assets/introduce/Framework/MemberUnitDefault.png';
import MemberUnitActive from '@/assets/introduce/Framework/MemberUnitActive.png';
import { frameworkUnionInfo } from '@/services/lib';
import CusTable from '../CusTable';
import MemberUnit from '../MemberUnit';
import styles from './index.less';

const menuList = [
  {
    key: 0,
    label: '专家委员会',
    name: 'ExpertsCommittee',
    iconUrlDefault: ExpertsCommitteeDefault,
    iconUrlActive: ExpertsCommitteeActive,
  },
  {
    key: 1,
    label: '联盟顾问',
    name: 'AllianceAdvisor',
    iconUrlDefault: AllianceAdvisorDefault,
    iconUrlActive: AllianceAdvisorActive,
  },
  {
    key: 2,
    label: '理事会',
    name: 'Council',
    iconUrlDefault: CouncilDefault,
    iconUrlActive: CouncilActive,
  },
  {
    key: 3,
    label: '秘书处',
    name: 'Secretariat',
    iconUrlDefault: SecretariatDefault,
    iconUrlActive: SecretariatActive,
  },
  {
    key: 4,
    label: '会员单位',
    name: 'MemberUnit',
    iconUrlDefault: MemberUnitDefault,
    iconUrlActive: MemberUnitActive,
  },
];

const comColumns = {
  title: '',
  dataIndex: 'position',
  width: '70%',
};

const unionColumns = {
  // 专家委员会
  comExp: {
    director: [{ title: '主任', dataIndex: 'name' }, { ...comColumns }],
    viceDirector: [{ title: '副主任（排名不分先后）', dataIndex: 'name' }, { ...comColumns }],
    commissioner: [{ title: '委员（排名不分先后）', dataIndex: 'name' }, { ...comColumns }],
  },
  // 联盟顾问
  advisoryGroup: {
    consultant: [{ title: '顾问（排名不分先后）', dataIndex: 'name' }, { ...comColumns }],
  },
  // 理事会
  council: {
    chairman: [{ title: '理事长', dataIndex: 'name' }, { ...comColumns }],
    viceChairman: [{ title: '副理事长（排名不分先后）', dataIndex: 'name' }, { ...comColumns }],
  },
  // 秘书处
  secretariat: {
    secretaryGeneral: [{ title: '秘书长', dataIndex: 'name' }, { ...comColumns }],
    executiveViceSecretaryGeneral: [
      { title: '常务副秘书长（排名不分先后）', dataIndex: 'name' },
      { ...comColumns },
    ],
    deputySecretaryGeneral: [
      { title: '副秘书长（排名不分先后）', dataIndex: 'name' },
      { ...comColumns },
    ],
  },
};

const FrameWork = () => {
  const [activityIndex, setActivityIndex] = useState(0);

  // 一次性获取到的联盟介绍信息，包括专家委员会、联盟顾问、理事会、秘书处
  const [unionInfo, setUnionInfo] = useState({
    // 专家委员会
    committeeOfExperts: { director: [], viceDirector: [], commissioner: [] },
    // 联盟顾问
    advisoryGroup: { consultant: [] },
    // 理事会
    council: { chairman: [], viceChairman: [] },
    // 秘书处
    secretariat: {
      secretaryGeneral: [], // 秘书长
      executiveViceSecretaryGeneral: [], // 常务副秘书长
      deputySecretaryGeneral: [], // 副秘书长
    },
  });

  useEffect(() => {
    (async () => {
      const res = await frameworkUnionInfo();
      if (res.status === 200) {
        setUnionInfo(res.data);
      }
    })();
  }, []);

  const NavComponents = () => {
    if (activityIndex === 0) {
      return (
        <>
          <CusTable
            columns={unionColumns.comExp.director}
            dataSource={unionInfo.committeeOfExperts.director}
          />
          <CusTable
            columns={unionColumns.comExp.viceDirector}
            dataSource={unionInfo.committeeOfExperts.viceDirector}
          />
          <CusTable
            columns={unionColumns.comExp.commissioner}
            dataSource={unionInfo.committeeOfExperts.commissioner}
          />
        </>
      );
    }
    if (activityIndex === 1) {
      return (
        <>
          <CusTable
            columns={unionColumns.advisoryGroup.consultant}
            dataSource={unionInfo.advisoryGroup.consultant}
          />
        </>
      );
    }
    if (activityIndex === 2) {
      return (
        <>
          <CusTable
            columns={unionColumns.council.chairman}
            dataSource={unionInfo.council.chairman}
          />
          <CusTable
            columns={unionColumns.council.viceChairman}
            dataSource={unionInfo.council.viceChairman}
          />
        </>
      );
    }
    if (activityIndex === 3) {
      return (
        <>
          <CusTable
            columns={unionColumns.secretariat.secretaryGeneral}
            dataSource={unionInfo.secretariat.secretaryGeneral}
          />
          <CusTable
            columns={unionColumns.secretariat.executiveViceSecretaryGeneral}
            dataSource={unionInfo.secretariat.executiveViceSecretaryGeneral}
          />
          <CusTable
            columns={unionColumns.secretariat.deputySecretaryGeneral}
            dataSource={unionInfo.secretariat.deputySecretaryGeneral}
          />
        </>
      );
    }

    return <MemberUnit />;
  };

  return (
    <div className={styles['framework-container']}>
      <div className={styles.banner}>
        <p>联盟组织架构</p>
        <img src={frameworkImg} alt="frameworkImg" />
      </div>
      <ul className={styles.menu}>
        {menuList.map((item, index) => (
          <li className={styles['menu-item']} key={item.key}>
            <Button
              onClick={() => setActivityIndex(index)}
              className={activityIndex === index ? styles['is-active'] : ''}
            >
              <img
                src={activityIndex === index ? item.iconUrlActive : item.iconUrlDefault}
                alt="itemImg"
              />
              {item.label}
            </Button>
          </li>
        ))}
      </ul>
      <div className={styles['nav-components']}>
        <NavComponents />
      </div>
    </div>
  );
};

export default FrameWork;
