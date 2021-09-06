import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { message } from 'antd';
import { Anchor } from 'antd';
import env from '@/config/env';
import { getAiFunMenuInfo } from '@/services/lib';
import Goal from '../Goal';
import Feature from '../Feature';
import Application from '../Application';
import Frame from '../Frame';
import CaseApplica from '../CaseApplica';

const { Link } = Anchor;
export interface CommonDataType {
  title: string;
  detail: string;
  icon: string;
  id: string;
}
const TitleColumns = [
  {
    titleName: '平台展示',
    id: '1',
  },
  {
    titleName: '产品功能',
    id: '2',
  },
  {
    titleName: '产品特点',
    id: '3',
  },
  {
    titleName: '目标客户',
    id: '4',
  },
  {
    titleName: '应用案例',
    id: '5',
  },
];

const MoreDetails: React.FC = (props: any) => {
  const [bannerData, setBannerData] = useState<CommonDataType[]>([]);
  const [framData, setFramData] = useState<CommonDataType[]>([]);
  const [applicaData, setApplicaData] = useState<CommonDataType[]>([]);
  const [featureData, setFeatureData] = useState<CommonDataType[]>([]);
  const [goalData, setGoalData] = useState<CommonDataType[]>([]);
  const [caseData, setCaseData] = useState<CommonDataType[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [titleColumns, setTitleColumns] = useState<any[]>(TitleColumns);

  useEffect(() => {
    (async () => {
      const res = await getAiFunMenuInfo({ type: props.match.params.dataType });
      if (res.status === 200) {
        setBannerData(res.data.banner);
        setFramData(res.data.platformDisplay);
        setApplicaData(res.data.productFunction);
        setFeatureData(res.data.productFeatures);
        setGoalData(res.data.targetCustomers);

        if (res.data?.case) {
          setVisible(true);
          setCaseData(res.data.case);
        } else {
          setTitleColumns(TitleColumns.slice(0, 4));
        }
      } else {
        message.error('加载信息出错，请重试~');
      }
    })();
  }, [props]);

  const DetailsBanner = () => {
    return (
      <div
        className={styles.Detailbanner}
        style={{ backgroundImage: `url(${env.baseUrl + bannerData[0]?.icon})` }}
      >
        <div className={styles.discreIntro}>
          <div className={styles.introContent}>
            <h1>{bannerData[0]?.title}</h1>
            <p>{bannerData[0]?.detail}</p>
            {/* <Button>合作咨询</Button> */}
          </div>
        </div>
        <div className={styles.backgroundTitle}>
          <Anchor
            affix={true}
            offsetTop={60}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <ul>
              {titleColumns.map((item) => (
                <li key={item.id}>
                  <Link key={item.id} href={`#${item.id}`} title={item.titleName} />
                </li>
              ))}
            </ul>
          </Anchor>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.moreDetails}>
      <DetailsBanner />
      <Frame data={framData} />
      <Application data={applicaData} />
      <Feature data={featureData} />
      <Goal data={goalData} />
      {visible ? <CaseApplica data={caseData} /> : null}
    </div>
  );
};
export default MoreDetails;
