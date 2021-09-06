import React from 'react';
import { Card, Image, Button } from 'antd';
import { EnvironmentTwoTone, ProfileTwoTone } from '@ant-design/icons';
import type { HotelInfoType } from '../../../../data';
import coverImg from '@/assets/coverImg.png';
import styles from './index.less';

interface HotelListProps {
  btnClick: (hotelData: HotelInfoType) => void;
  hotelData: HotelInfoType;
  showSubscribeBtn: boolean;
}
const toBaiduMap = (hotelData: HotelInfoType) => {
  if (hotelData.url) {
    window.open(`${hotelData.url}`);
  } else {
    window.open('https://map.baidu.com');
  }
};
const HotelCard: React.FC<HotelListProps> = (HotelListProps) => {
  const { hotelData, btnClick, showSubscribeBtn } = HotelListProps;

  return (
    <Card
      key={hotelData.id}
      hoverable
      style={{
        marginBottom: '20px',
        cursor: 'default',
        boxShadow: '0px 0px 20px rgba(10, 10, 10, 0.1)',
      }}
    >
      <div className={styles.HotelCard}>
        <Image
          src={hotelData.showImageUrl ? hotelData.showImageUrl : coverImg}
          width="15%"
          height="100%"
          alt="alt"
        />
        <div className={styles.info}>
          <p className={styles.title}>{hotelData.name}</p>
          <p className={styles.address}>
            <EnvironmentTwoTone
              className={styles.environment}
              style={{ marginRight: 10 }}
              onClick={() => {
                toBaiduMap(hotelData);
              }}
            />
            {hotelData.address}
          </p>
          <p className={styles.description} title={hotelData.description}>
            <ProfileTwoTone style={{ marginRight: 10 }} />
            {hotelData.description}
          </p>
          {/* <p className={styles.tips}>
            <InfoCircleTwoTone style={{ marginRight: 10 }} />
            为联通协议酒店，第一天入住需支付房费 ，一旦入住，不可取消
          </p> */}
        </div>
        <div className={styles.subscribe}>
          <p className={styles.title}>协议价</p>
          <p className={styles.price}>{`${hotelData.price}元/晚`}</p>
          {showSubscribeBtn ? (
            <Button
              type="primary"
              style={{ width: 80 }}
              size="middle"
              onClick={() => {
                btnClick(hotelData);
              }}
            >
              预订
            </Button>
          ) : (
            ''
          )}
        </div>
      </div>
    </Card>
  );
};

export default HotelCard;
