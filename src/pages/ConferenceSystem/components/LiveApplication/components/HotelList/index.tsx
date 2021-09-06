import React, { useState, useEffect } from 'react';
import type { Dispatch } from 'redux';
import { connect } from 'umi';
import { getHotelList } from '@/services/conferenceSystem';
import { Button, Col, Row, Card, Spin, message } from 'antd';
import type { HotelInfoType, ParticipantType } from '../../../../data';
import type { ConferenceSystemState } from '../../../../model';
import HotelCard from '../HotelCard';
import styles from './index.less';

interface HotelListProps {
  ConferenceSystemModel: ConferenceSystemState;
  dispatch: Dispatch;
  loading: boolean;
}

const HotelList: React.FC<HotelListProps> = (HotelListProps) => {
  const { dispatch, ConferenceSystemModel } = HotelListProps;

  const [loadHotelList, setLoadHotelList] = useState<boolean>(true);

  const selectHotel = (hotel: HotelInfoType) => {
    const { applicantOrder } = ConferenceSystemModel;
    const { participantList } = applicantOrder;
    const newParticipantList = participantList.map((participantItem: ParticipantType) => {
      return { ...participantItem, isSelected: false };
    });
    dispatch({
      type: 'ConferenceSystemModel/updateState',
      payload: {
        applicantOrder: {
          ...applicantOrder,
          participantList: newParticipantList,
        },
        selectedHotel: hotel, // 选择酒店
        HotelStep: 'SelectedHotel', // 更新步骤
        liveInfo: { liveStartTime: undefined, liveEndTime: undefined, roomList: [{}] }, // 清空入住信息表单
        transferInfoList: ConferenceSystemModel.isNeedTransfer
          ? ConferenceSystemModel.transferInfoList
          : [],
      },
    });
  };

  useEffect(() => {
    setLoadHotelList(true);
    // 获取酒店列表
    getHotelList({ withImage: true })
      .then((res: any) => {
        if (res.status === 200) {
          dispatch({
            type: 'ConferenceSystemModel/updateState',
            payload: {
              HotelList: res.data,
            },
          });
        } else {
          message.error('酒店信息加载失败，请稍后重试');
        }
      })
      .finally(() => {
        setLoadHotelList(false);
      });
  }, []);

  return (
    <div className={styles.HotelList}>
      <Spin spinning={loadHotelList}>
        {ConferenceSystemModel.HotelList.map((hotel: HotelInfoType) => {
          return (
            <HotelCard key={hotel.id} hotelData={hotel} btnClick={selectHotel} showSubscribeBtn />
          );
        })}
        <Card style={{ boxShadow: '0px 0px 20px rgba(10, 10, 10, 0.1)' }}>
          <Row justify="center" align="middle">
            <Col>
              <Button
                style={{ display: 'block', margin: '0 auto' }}
                onClick={() => {
                  dispatch({
                    type: 'ConferenceSystemModel/updateState',
                    payload: {
                      HotelStep: 'SelectHotel',
                      currentStep: 0,
                      liveInfo: {}, // 清空入住信息表单
                      transferInfoList: [],
                      HotelList: [],
                    },
                  });
                }}
              >
                上一步
              </Button>
            </Col>
          </Row>
        </Card>
      </Spin>
    </div>
  );
};
const mapStateToProps = ({
  ConferenceSystemModel,
  loading,
}: {
  ConferenceSystemModel: ConferenceSystemState;
  loading: { models: Record<string, boolean> };
}) => {
  return {
    ConferenceSystemModel,
    loading: loading.models.ConferenceSystemModel,
  };
};

export default connect(mapStateToProps)(HotelList);
