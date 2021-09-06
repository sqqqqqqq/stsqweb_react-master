import { Button, Menu } from 'antd';
import React, { useState } from 'react';
import iconUrlDefault0 from '@/assets/introduce/Menu/IntroduceDefault.png';
import iconUrlActive0 from '@/assets/introduce/Menu/IntroduceActive.png';
import iconUrlDefault1 from '@/assets/introduce/Menu/ConstitutionDefault.png';
import iconUrlActive1 from '@/assets/introduce/Menu/ConstitutionActive.png';
import iconUrlDefault2 from '@/assets/introduce/Menu/FrameworkDefault.png';
import iconUrlActive2 from '@/assets/introduce/Menu/FrameworkActive.png';
import styles from './index.less';
import Introduce from './components/Introduce';
import Constitution from './components/Constitution';
import Framework from './components/Framework';
import { handleJoinUsClick } from '../Home/components/Member';

const menu = [
  {
    label: '联盟介绍',
    key: '0',
    componentName: 'Introduce',
    iconUrlDefault: iconUrlDefault0,
    iconUrlActive: iconUrlActive0,
  },
  {
    label: '联盟章程',
    key: '1',
    componentName: 'Constitution',
    iconUrlDefault: iconUrlDefault1,
    iconUrlActive: iconUrlActive1,
  },
  {
    label: '联盟架构',
    key: '2',
    componentName: 'Framework',
    iconUrlDefault: iconUrlDefault2,
    iconUrlActive: iconUrlActive2,
  },
];

const Home: React.FC = () => {
  const [currentKey, setCurrentKey] = useState('0');

  const handleMenuClick = (e: any) => {
    setCurrentKey(e.key);
  };

  const NavComponents = () => {
    if (currentKey === '0') {
      return <Introduce />;
    }
    if (currentKey === '1') {
      return <Constitution />;
    }

    return <Framework />;
  };

  return (
    <div className={styles['introduce-home-container']}>
      <div className={styles.banner}>
        <p>中国联通5G应用创新联盟</p>
        <p>CHINA UNICOM 5G APPLICATIONS INNOVATION ALLIANCE</p>
        <Button type="ghost" onClick={handleJoinUsClick}>
          加入我们
        </Button>
      </div>
      <div className={styles.menu}>
        <Menu mode="horizontal" selectedKeys={[currentKey]} onClick={handleMenuClick}>
          {menu.map((item) => {
            return (
              <Menu.Item key={item.key}>
                <img
                  src={currentKey === item.key ? item.iconUrlActive : item.iconUrlDefault}
                  alt="icon"
                />
                {item.label}
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
      <NavComponents />
    </div>
  );
};

export default Home;
