import React from 'react';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { BigDataType } from '../..';
import CardList from '../CardList';
import 'video-react/dist/video-react.css'; // import css
import { Player } from 'video-react';
import ComHeader from '../ComHeader';
import styles from './index.less';
import VisibleBgImg from '@/assets/bigDataAI/visibleDevBG.png';
import { baseUrl } from '@/config/env';

export default (props: { bigData: BigDataType }) => {
  const {
    bigData: { bigDataAdvantage, devComponent, appComponent },
  } = props;

  const carouselRef: any = React.createRef();

  return (
    <div>
      <CardList cardListData={bigDataAdvantage} />
      <div
        className={styles['big-data-advantage-video-container']}
        style={{ backgroundImage: `url(${VisibleBgImg})` }}
      >
        <LeftOutlined
          className={styles['left-arrow']}
          onClick={() => carouselRef.current?.prev()}
        />
        <RightOutlined
          className={styles['right-arrow']}
          onClick={() => carouselRef.current?.next()}
        />
        <Carousel ref={carouselRef}>
          {devComponent.map((item) => (
            <div key={item.video}>
              <ComHeader title={item.title} color="#fff" />
              <h3 className={styles.detail}>{item.detail}</h3>
              <Player fluid={false} width={710} height={400} poster={item.icon}>
                <source src={baseUrl + item.video} />
                {/* <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" /> */}
              </Player>
            </div>
          ))}
        </Carousel>
      </div>
      <Carousel>
        {appComponent.map((item) => (
          <div key={item.icon} className={styles['eight-app-component']}>
            <ComHeader title={item.title} color="#333" />
            <img src={baseUrl + item.icon} alt="cover" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
