import React, { useEffect, useState } from 'react';
import type { BannerDataType } from './components/Banner';
import Banner, { BannerDataInit } from './components/Banner';
import Course from './components/Course';
import { enrollmentPageInfo } from '@/services/lib';
import { Menu } from 'antd';
import styles from './index.less';
import iconUrlDefault0 from '@/assets/enrollment/navCourseDefault.png';
import iconUrlActive0 from '@/assets/enrollment/navCourseActive.png';
import iconUrlDefault1 from '@/assets/enrollment/navAnnounceDefault.png';
import iconUrlActive1 from '@/assets/enrollment/navAnnounceActive.png';
import iconUrlDefault2 from '@/assets/enrollment/navIntroduceDefault.png';
import iconUrlActive2 from '@/assets/enrollment/navIntroduceActive.png';
import iconUrlDefault3 from '@/assets/enrollment/navAwardDefault.png';
import iconUrlActive3 from '@/assets/enrollment/navAwardActive.png';
import iconUrlDefault4 from '@/assets/enrollment/navDownloadDefault.png';
import iconUrlActive4 from '@/assets/enrollment/navDownloadActive.png';
import Announcement from './components/Announcement';
import Introduce from './components/Introduce';
import Award from './components/Award';
import Footer from './components/Footer';

interface menuItemType {
  label: string;
  value: string;
  linkId: string;
  iconUrlDefault: any;
  iconUrlActive: any;
}

export interface ComponentComPropsType {
  title: string;
  id: string;
}

const menuArr: menuItemType[] = [
  {
    label: '',
    value: '0',
    linkId: 'course',
    iconUrlDefault: iconUrlDefault0,
    iconUrlActive: iconUrlActive0,
  },
  {
    label: '',
    value: '1',
    linkId: 'announcement',
    iconUrlDefault: iconUrlDefault1,
    iconUrlActive: iconUrlActive1,
  },
  {
    label: '',
    value: '2',
    linkId: 'raceIntroduce',
    iconUrlDefault: iconUrlDefault2,
    iconUrlActive: iconUrlActive2,
  },
  {
    label: '',
    value: '3',
    linkId: 'award',
    iconUrlDefault: iconUrlDefault3,
    iconUrlActive: iconUrlActive3,
  },
  {
    label: '',
    value: '4',
    linkId: 'footer',
    iconUrlDefault: iconUrlDefault4,
    iconUrlActive: iconUrlActive4,
  },
];

const Home: React.FC = () => {
  const [bannerData, setBannerData] = useState<BannerDataType>(BannerDataInit);

  // 轮播的文字
  const [courseText, setCourseText] = useState([]);

  // 联系人
  const [contactPerson, setContactPerson] = useState<string[]>([]);

  const [menu, setMenu] = useState<menuItemType[]>(menuArr);

  const [currentMenuItem, setCurrentMenuItem] = useState<string>(menuArr[0].linkId);

  useEffect(() => {
    let isUnmount = false;

    enrollmentPageInfo()
      .then((res) => {
        if (res.status === 200 && !isUnmount) {
          const resData = res.data;
          const menuTemp = [...menuArr];
          resData.menuText.forEach((item: string, index: number) => {
            menuTemp[index].label = item;
          });
          setMenu(menuTemp);
          setBannerData(resData.banner);
          setCourseText(resData.courseText);
          setContactPerson(resData.contactPerson);
        }
      })
      .catch((e) => console.log(e));

    return () => {
      isUnmount = true;
    };
  }, []);

  const handleClick = (params: any) => {
    const { key } = params;
    setCurrentMenuItem(key);
    document.querySelector(`#${key}`)?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.enrollment}>
      <Banner bannerData={bannerData} />
      <Menu
        onClick={handleClick}
        selectedKeys={[currentMenuItem]}
        mode="horizontal"
        className={styles['menu-nav']}
      >
        {menu.map((item: menuItemType) => {
          return (
            <Menu.Item key={item.linkId}>
              <a>
                <img
                  src={currentMenuItem === item.linkId ? item.iconUrlActive : item.iconUrlDefault}
                  alt=""
                />
                <span>{item.label}</span>
              </a>
            </Menu.Item>
          );
        })}
      </Menu>
      <Course id={menu[0].linkId} courseText={courseText} title={menu[0].label} />
      <Announcement id={menu[1].linkId} title={menu[1].label} />
      <Introduce id={menu[2].linkId} title={menu[2].label} contactPerson={contactPerson} />
      <Award id={menu[3].linkId} title={menu[3].label} />
      <Footer id={menu[4].linkId} btnText={bannerData.btnText} title={menu[4].label} />
    </div>
  );
};

export default Home;
