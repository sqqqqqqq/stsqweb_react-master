import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { List, Tabs, Button, message } from 'antd';
import { history } from 'umi';
import env from '@/utils/env';
import Img from '../../../assets/digitalShowroom/AIspecial/banner.jpg';
import HoverButton from '@/pages/appStorage/components/HoverButton';
import { getAiFunMenuInfo } from '@/services/lib';
import AItitle from './components/AItitle';

const { TabPane } = Tabs;

export interface CommonDataType {
  title: string;
  detail: string;
  icon: string;
  id: string;
}

const AIspecial: React.FC = () => {
  const [featureData, setFeatureData] = useState<CommonDataType[]>([]);
  const [aiPowerData, setAiPowerData] = useState<CommonDataType[]>([]);
  const [solutionsData, setSolutionsData] = useState<CommonDataType[]>([]);
  const [moreProductData, setMoreProductData] = useState<CommonDataType[]>([]);
  const [documentData, setDocumentData] = useState<CommonDataType[]>([]);
  // const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const res = await getAiFunMenuInfo({ type: 'aiData' });
      if (res.status === 200) {
        setFeatureData(res.data.feature);
        setAiPowerData(res.data.aiPower);
        setSolutionsData(res.data.solution);
        setMoreProductData(res.data.moreProduct);
        setDocumentData(res.data.sdk);
      } else {
        message.error('加载信息菜单出错，请重试~');
      }
    })();
  }, []);

  const downloadClick = (item: any) => {
    window.open(
      `${env.baseUrl}/cu5gaia/lib/whiteBook/download?fileKey=${item.video}&type=attachment&id=${item.id}`,
      '_self',
    );
  };

  const detailClick = (temp: any[], item: any, index: number) => {
    if (index !== temp.length - 1) {
      history.push(`/digitalShowroom/solutionID=${item.dataType}`);
    } else {
      history.push(`/square/order`);
    }
  };
  const AIhomeHeader = () => {
    return (
      <div className={styles.header} style={{ backgroundImage: `url(${Img})` }}>
        <div className={styles.headerWrap}>
          <p>打造具备“职业技能”的行业AI</p>
          <p>支撑行业数字化转型和智能化升级</p>
        </div>
      </div>
    );
  };

  // 赋能特性
  const gridSetting: any = { column: 3, gutter: 24, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 };
  const AIhomeFunc = () => {
    return (
      <div className={styles.Func}>
        <div className={styles.FuncWrap}>
          <AItitle title="AI赋能特性" />
          <List
            grid={gridSetting}
            dataSource={featureData}
            renderItem={(item: any) => (
              <List.Item key={item.id}>
                <div className={`${styles.FuncType} hoverCard`}>
                  <img src={env.baseUrl + item.icon} alt="icon" />
                  <div>
                    <p>{item.title}</p>
                    <p>{item.detail}</p>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  };

  // 核心能力
  const AIhomeCore = () => {
    return (
      <div className={styles.Core}>
        <div className={styles.CoreWrap}>
          <AItitle title="核心能力介绍" />
          <div className={styles.Coredetail}>
            <Tabs tabPosition="left">
              {aiPowerData.map((pane: any) => (
                <TabPane tab={pane.title} key={pane.id}>
                  <div>
                    <span>{pane.title}</span>
                    <span>{pane.detail}</span>
                    <Button
                      onClick={() => {
                        history.push(`/digitalShowroom/coreID=${pane.dataType}`);
                      }}
                    >
                      查看详情
                    </Button>
                  </div>
                  <img src={env.baseUrl + pane.icon} alt="img" />
                </TabPane>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    );
  };

  // 解决方案
  const gridSetting1: any = { column: 3, gutter: 24, md: 3, sm: 2, xs: 1 };
  const AIhomeSolution = () => {
    return (
      <div className={styles.Solution}>
        <div className={styles.SolutionWrap}>
          <AItitle title="行业AI解决方案" />
          <List
            grid={gridSetting1}
            dataSource={solutionsData}
            renderItem={(item: any, index) => (
              <List.Item onClick={() => detailClick(solutionsData, item, index)}>
                <div className={`${styles.SolutionType} hoverCard`}>
                  <div>
                    <img src={env.baseUrl + item.icon} alt="img" />
                    {/* <div className={styles.mask}>
                      <img src={item.icon} alt="icon" />
                      <p>{item.detail}</p>
                    </div> */}
                  </div>
                  <div>{item.title}</div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  };

  // 更多产品介绍
  const gridSetting2: any = { column: 5, gutter: 24, md: 3, sm: 2, xs: 1 };
  const AIhomeModel = () => {
    return (
      <div className={styles.Model}>
        <div className={styles.ModelWrap}>
          <AItitle title="更多产品介绍" />
          <List
            grid={gridSetting2}
            dataSource={moreProductData}
            renderItem={(item: any) => (
              <List.Item
                onClick={() => {
                  history.push(`/digitalShowroom/moreID=${item.dataType}`);
                }}
              >
                <div className={`${styles.ModelType} hoverCard`}>
                  <img src={env.baseUrl + item.icon} alt="icon" />
                  <div>
                    <p>{item.title}</p>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  };

  // 产品文档
  const Document = () => {
    return (
      <div className={styles.document}>
        <div className={styles.doConent}>
          <h3>技术支持</h3>
          <ul>
            {documentData.map((item: any) => (
              <li key={item.id}>
                <a onClick={() => downloadClick(item)} key={item.id}>
                  <p>{item.title}</p>
                  {/* <p>{item.detail}</p>  */}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.banner}>
      <AIhomeHeader />
      <AIhomeFunc />
      <AIhomeCore />
      <AIhomeSolution />
      <AIhomeModel />
      <Document />
      <HoverButton />
    </div>
  );
};

export default AIspecial;
