import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { baseUrl } from '@/config/env';
import { getBigDataInfo, getBigDataMenuInfo } from '@/services/lib';
import WoCloudAi from './components/WoCloudAi';
import BigDataAdvantage from './components/BigDataAdvantage';
import styles from './index.less';
import ComHeader from './components/ComHeader';
import footerBG from '@/assets/bigDataAI/footer.png';

const { TabPane } = Tabs;

interface TitleAndDetailType {
  title: string;
  detail: string;
}

export interface CommonDataType extends TitleAndDetailType {
  icon: string;
}

export interface VideoDataType extends CommonDataType {
  video: string;
}

export interface WoCloudDataType {
  aiAdvantage: CommonDataType[];
  applicationCase: VideoDataType[];
  productCase: VideoDataType[];
}

export interface BigDataType {
  appComponent: CommonDataType[];
  bigDataAdvantage: CommonDataType[];
  devComponent: VideoDataType[];
}

export interface AiCaseMenuType {
  activeIcon: string;
  defaultIcon: string;
  name: string;
  key: string;
}

export interface productCaseMenuType {
  name: string;
  key: string;
}

const AiCaseMenuInit: AiCaseMenuType[] = [
  {
    activeIcon: '',
    defaultIcon: '',
    name: '',
    key: '',
  },
];

const commonDataInit: CommonDataType = {
  title: '',
  icon: '',
  detail: '',
};

const videoDataInit: VideoDataType = {
  ...commonDataInit,
  video: '',
};

const woCloudDataInit: WoCloudDataType = {
  aiAdvantage: [{ ...commonDataInit }],
  applicationCase: [{ ...videoDataInit }],
  productCase: [{ ...videoDataInit }],
};

const BigDataInit: BigDataType = {
  appComponent: [{ ...commonDataInit }],
  bigDataAdvantage: [{ ...commonDataInit }],
  devComponent: [{ ...videoDataInit }],
};

const Home: React.FC = () => {
  const [bannerData, setBannerData] = useState<CommonDataType>(commonDataInit);

  const [woCloudIntroduce, setWoCloudIntroduce] = useState<TitleAndDetailType>({
    title: '',
    detail: '',
  });

  const [woCloudData, setWoCloudData] = useState<WoCloudDataType>(woCloudDataInit);

  const [bigData, setBigData] = useState<BigDataType>(BigDataInit);

  const [productCaseMenu, setProductCaseMenu] = useState<productCaseMenuType[]>([
    { name: '', key: '' },
  ]);

  const [aiCaseMenu, setAiCaseMenu] = useState<AiCaseMenuType[]>(AiCaseMenuInit);

  const [footerText, setFooterText] = useState<string>('');

  useEffect(() => {
    let isUnmount = false;

    const promiseArr = [getBigDataInfo(), getBigDataMenuInfo({ dataType: 'bigDataMenu' })];
    Promise.all(promiseArr)
      .then((res) => {
        if (res[0].status === 200 && !isUnmount) {
          setBannerData(res[0].data.bigData);
          setWoCloudIntroduce(res[0].data.woCloud);
          setWoCloudData(res[0].data.woCloudAdvantage);
          setBigData(res[0].data.bigDataAdvantage);
          setFooterText(res[0].data.bottomText.detail);
        }
        if (res[1].status === 200 && !isUnmount) {
          const productCaseMenuTemp = res[1].data.productCase.map((item: any, index: number) => {
            return { ...item, key: `${index}` };
          });
          const applicationCaseTemp = res[1].data.applicationCase.map(
            (item: any, index: number) => {
              return { ...item, key: `${index}` };
            },
          );
          setProductCaseMenu(productCaseMenuTemp);
          setAiCaseMenu(applicationCaseTemp);
        }
      })
      .catch((e) => console.log(e));

    return () => {
      isUnmount = true;
    };
  }, []);

  return (
    <div className={styles['big-data-ai-container']}>
      <div
        style={{ backgroundImage: `url(${baseUrl + bannerData.icon})` }}
        className={styles.banner}
      >
        <h1>{bannerData.title}</h1>
        <div>{bannerData.detail}</div>
      </div>

      <div className={styles.introduce}>
        <h1>{woCloudIntroduce.title}</h1>
        <div>{woCloudIntroduce.detail}</div>
      </div>

      <Tabs className={styles['big-data-ai-tabs']} defaultActiveKey="1">
        <TabPane tab="新沃云AI能力优势" key="1">
          <WoCloudAi
            woCloudData={woCloudData}
            productCaseMenu={productCaseMenu}
            aiCaseMenu={aiCaseMenu}
          />
        </TabPane>
        <TabPane tab="大数据组件优势" key="2">
          <BigDataAdvantage bigData={bigData} />
        </TabPane>
      </Tabs>

      <div className={styles.footer} style={{ backgroundImage: `url(${footerBG})` }}>
        <ComHeader title="我们为您提供" color="#fff" />
        <h2>{footerText}</h2>
      </div>
    </div>
  );
};

export default Home;
