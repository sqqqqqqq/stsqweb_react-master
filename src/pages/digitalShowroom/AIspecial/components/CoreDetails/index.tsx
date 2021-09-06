import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { List, message } from 'antd';
import { Anchor } from 'antd';
// import Img from '../../../../../assets/digitalShowroom/AIspecial/banner1.png';
import { getAiFunMenuInfo } from '@/services/lib';
import env from '@/config/env';
import ProductForm from '../ProductForm';
import AItitle from '../AItitle';

const { Link } = Anchor;

const CoreDetails: React.FC = (props: any) => {
  const [bannerData, setBannerData] = useState<any>([]);
  const [advantageData, setAdvantageData] = useState<any>([]);
  const [sceneData, setSceneData] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const res = await getAiFunMenuInfo({ type: props.match.params.dataType });
      if (res.status === 200) {
        setBannerData(res.data.banner);
        setAdvantageData(res.data.feature);
        setSceneData(res.data.case);
      } else {
        message.error('加载信息菜单出错，请重试~');
      }
    })();
  }, [props]);

  const TitleColumns = [
    {
      titleName: '能力优势',
      id: 1,
    },
    {
      titleName: '应用场景',
      id: 2,
    },
    {
      titleName: '使用方式',
      id: 3,
    },
  ];

  // banner组件
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
            {/* <Button>能力申请</Button> */}
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
              {TitleColumns.map((item) => (
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

  // 能力优势
  const gridSetting: any = { column: 3, gutter: 24, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 };
  const Advantage = () => {
    return (
      <div id="1" className={styles.advantage}>
        <div className={styles.advantageWrap}>
          <AItitle title="能力优势" />
          <List
            grid={gridSetting}
            dataSource={advantageData}
            renderItem={(item: any) => (
              <List.Item key={item.id}>
                <div className={`${styles.typeCard} hoverCard`}>
                  <img src={env.baseUrl + item.icon} alt="icon" />
                  <div>
                    <span>{item.title}</span>
                    <span>{item.detail}</span>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  };

  const gridSetting1: any = { column: 2, gutter: 24, md: 4, sm: 2, xs: 1 };
  // 应用场景
  const Scene = () => {
    return (
      <div id="2" className={styles.scene}>
        <div className={styles.sceneWrap}>
          <AItitle title="应用场景" />
          <List
            grid={gridSetting1}
            dataSource={sceneData}
            renderItem={(item: any) => (
              <List.Item key={item.id}>
                <div
                  className={`${styles.type} hoverCard`}
                  style={{ backgroundImage: `url(${env.baseUrl + item.icon})` }}
                >
                  <p>{item.title}</p>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.coreDetails}>
      <DetailsBanner />
      <Advantage />
      <Scene />
      <ProductForm />
    </div>
  );
};

export default CoreDetails;
