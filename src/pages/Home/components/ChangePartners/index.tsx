import React, { useState, useEffect } from 'react';
import styles from './index.less';
import ChangeBatch from '@/assets/home/partners/icon.png';
import Logo1 from '@/assets/home/partners/01.png';
import Logo2 from '@/assets/home/partners/02.png';
import Logo3 from '@/assets/home/partners/03.png';
import Logo4 from '@/assets/home/partners/04.png';
import Logo5 from '@/assets/home/partners/05.png';
import Logo6 from '@/assets/home/partners/06.png';
import Logo7 from '@/assets/home/partners/07.png';
import Logo8 from '@/assets/home/partners/08.png';
import Logo9 from '@/assets/home/partners/09.png';
import Logo10 from '@/assets/home/partners/10.png';
import Logo11 from '@/assets/home/partners/11.png';
import Logo12 from '@/assets/home/partners/12.png';
import Logo13 from '@/assets/home/partners/13.png';
import Logo14 from '@/assets/home/partners/14.png';
import Logo15 from '@/assets/home/partners/15.png';
import Logo16 from '@/assets/home/partners/16.png';
import Logo17 from '@/assets/home/partners/17.png';
import Logo18 from '@/assets/home/partners/18.png';
import Logo19 from '@/assets/home/partners/19.png';
import Logo20 from '@/assets/home/partners/20.png';
import Logo21 from '@/assets/home/partners/21.png';
import Logo22 from '@/assets/home/partners/22.png';
import Logo23 from '@/assets/home/partners/23.png';
import Logo24 from '@/assets/home/partners/24.png';
import Logo25 from '@/assets/home/partners/25.png';
import Logo26 from '@/assets/home/partners/26.png';
import Logo27 from '@/assets/home/partners/27.png';
import Logo28 from '@/assets/home/partners/28.png';
import Logo29 from '@/assets/home/partners/29.png';
import Logo30 from '@/assets/home/partners/30.png';
import Logo31 from '@/assets/home/partners/31.png';
import Logo32 from '@/assets/home/partners/32.png';

import { List } from 'antd';

const ChangePartners: React.FC = () => {
  const partnersData = [
    {
      companyPic: Logo1,
      companyName: '中国信息通信研究院',
    },
    {
      companyPic: Logo2,
      companyName: '中国电子科技集团有限公司',
    },
    {
      companyPic: Logo3,
      companyName: '中国商飞上海飞机制造有限公司',
    },
    {
      companyPic: Logo4,
      companyName: '中国航天科工集团有限公司',
    },
    {
      companyPic: Logo5,
      companyName: '中国信息通信科技集团有限公司',
    },
    {
      companyPic: Logo6,
      companyName: '中国中央电视台',
    },
    {
      companyPic: Logo7,
      companyName: '中国第一汽车集团有限公司',
    },
    {
      companyPic: Logo8,
      companyName: '东风汽车集团有限公司',
    },
    {
      companyPic: Logo9,
      companyName: '上海振华重工(集团)股份有限公司',
    },
    {
      companyPic: Logo10,
      companyName: 'SOHO中国有限公司',
    },
    {
      companyPic: Logo11,
      companyName: '东软集团股份有限公司',
    },
    {
      companyPic: Logo12,
      companyName: '复旦大学附属华山医院',
    },
    {
      companyPic: Logo13,
      companyName: '国家数字化学习工程技术研究中心',
    },
    {
      companyPic: Logo14,
      companyName: '阿里巴巴（中国）有限公司',
    },
    {
      companyPic: Logo15,
      companyName: '百度在线网络技术（北京）有限公司',
    },
    {
      companyPic: Logo16,
      companyName: '深圳市腾讯计算机系统有限公司',
    },
    {
      companyPic: Logo17,
      companyName: '京东云计算有限公司',
    },
    {
      companyPic: Logo18,
      companyName: '北京小米科技有限责任公司',
    },
    {
      companyPic: Logo19,
      companyName: '光启',
    },
    {
      companyPic: Logo20,
      companyName: '滴滴出行',
    },
    {
      companyPic: Logo21,
      companyName: '华为技术有限公司',
    },
    {
      companyPic: Logo22,
      companyName: '中兴通讯股份有限公司',
    },
    {
      companyPic: Logo23,
      companyName: '爱立信公司',
    },
    {
      companyPic: Logo24,
      companyName: '上海诺基亚贝尔股份有限公司',
    },
    {
      companyPic: Logo25,
      companyName: '美国高通公司（QUALCOMM)',
    },
    {
      companyPic: Logo26,
      companyName: '中国首钢集团',
    },
    {
      companyPic: Logo27,
      companyName: '科大讯飞股份有限公司',
    },
    {
      companyPic: Logo28,
      companyName: '三一重工股份有限公司',
    },
    {
      companyPic: Logo29,
      companyName: '杭州海康威视数字技术股份有限公司',
    },
    {
      companyPic: Logo30,
      companyName: '戴尔科技集团',
    },
    {
      companyPic: Logo31,
      companyName: '联想集团',
    },

    {
      companyPic: Logo32,
      companyName: '景域国际旅游运营集团',
    },
  ];

  const [current, setCurrent] = useState<number>(0); // 点击次数
  const [sixPartnersData, setSixPartnersData] = useState<any>(partnersData.slice(0, 8));

  useEffect(() => {
    if (current === 0) {
      setSixPartnersData(partnersData.slice(0, 8));
    } else if (current * 8 <= partnersData.length) {
      setSixPartnersData(partnersData.slice(current * 8, 8 + current * 8));
      if (current * 8 === partnersData.length) {
        setCurrent(0);
      }
    } else {
      setSixPartnersData(partnersData.splice(0, Math.floor(partnersData.length / 8) * 8));
      setCurrent(0);
    }
  }, [current]);

  const changePartnersOnclick = () => {
    let timer = null;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      setCurrent(current + 1);
    }, 500);
  };

  return (
    <div className={styles.changePartners}>
      <div className={styles.changeBatch} onClick={changePartnersOnclick}>
        <img src={ChangeBatch} alt="changeBatch" />
        <span>换一批</span>
      </div>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        dataSource={sixPartnersData}
        renderItem={(item: any) => (
          <List.Item>
            <div className={styles.partnerCard}>
              <div>
                <div>
                  <img src={item.companyPic} alt="companyPic" />
                </div>
                <div>
                  <span>{item.companyName}</span>
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ChangePartners;
