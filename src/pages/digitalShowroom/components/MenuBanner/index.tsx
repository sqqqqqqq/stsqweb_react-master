import React from 'react';
import styles from './index.less';

import Block1 from '@/assets/digitalShowroom/block1.png';
import Block2 from '@/assets/digitalShowroom/block2.png';
import Block3 from '@/assets/digitalShowroom/block3.png';
import Block4 from '@/assets/digitalShowroom/block4.png';
import Block5 from '@/assets/digitalShowroom/block5.png';
import Block6 from '@/assets/digitalShowroom/block6.png';
import Block7 from '@/assets/digitalShowroom/block7.png';
import Block8 from '@/assets/digitalShowroom/block8.png';
import Block9 from '@/assets/digitalShowroom/block9.png';
import logo from '@/assets/digitalShowroom/5G.png';
import text from '@/assets/digitalShowroom/text.png';

import { history } from 'umi';

const MenuBanner: React.FC = () => {
  const blockList = [
    {
      block: Block1,
      link: '',
    },
    {
      block: Block2,
      link: '/digitalShowroom/ExhibitionHall',
    },
    {
      block: Block3,
      link: '',
    },
    {
      block: Block4,
      link: '',
    },
    {
      block: Block5,
      link: '/digitalShowroom/AIspecial',
    },
    {
      block: Block6,
      link: '',
    },
    {
      block: Block7,
      link: '',
    },
    {
      block: Block8,
      link: '/digitalShowroom/CloudNetWorking',
    },
    {
      block: Block9,
      link: '',
    },
    {
      block: logo,
      link: '',
    },
    {
      block: text,
      link: '',
    },
  ];

  return (
    <div className={styles.menuBanner}>
      <div className={styles.contain}>
        {blockList.map((item) => {
          return (
            <img
              key={item.block}
              src={item.block}
              alt={item.block}
              key={item.block}
              onClick={() => {
                if (item.block === Block2 || item.block === Block8 || item.block === Block5)
                  history.push(item.link);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MenuBanner;
