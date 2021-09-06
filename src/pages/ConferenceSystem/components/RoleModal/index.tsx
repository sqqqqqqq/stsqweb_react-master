import React, { useEffect, useState } from 'react';
import { Modal, Card, Row, Col, Button } from 'antd';
import manager from '@/assets/conferenceSystem/manager.png';
import ordinary from '@/assets/conferenceSystem/ordinary.png';
import { connect, history } from 'umi';
import type { Dispatch } from 'redux';
import moment from 'moment';
import type { ConferenceSystemState } from '../../model';
import styles from './index.less';

interface RoleModalProps {
  ConferenceSystemModel: ConferenceSystemState;
  dispatch: Dispatch;
  chooseRole: (role: string) => void;
  visible: boolean;
}
const RoleModal: React.FC<RoleModalProps> = (props) => {
  const { chooseRole, visible, ConferenceSystemModel, dispatch } = props;
  const [forbidden, setForbidden] = useState<boolean>(false);

  useEffect(() => {
    const bool = moment().endOf('day') > moment(ConferenceSystemModel.meetingTime);
    setForbidden(bool);
  }, [ConferenceSystemModel.meetingTime]);

  const showOrders = () => {
    dispatch({
      type: 'ConferenceSystemModel/updateState',
      payload: {
        initCodeList: [],
        currentStep: -1,
        HotelStep: 'SelectHotel',
        isNeedTransfer: false,
        isNeedHotel: false,
        showSuccessInfoModal: false,
      },
    });
    history.push(`/conferenceSystem/checkOrders`);
  };

  const returnFirst = () => {
    dispatch({
      type: 'ConferenceSystemModel/updateState',
      payload: {
        initCodeList: [],
        currentStep: -1,
        HotelStep: 'SelectHotel',
        isNeedTransfer: false,
        isNeedHotel: false,
        showSuccessInfoModal: false,
        applicantOrder: {},
        liveInfo: {},
        transferInfoList: [],
        selectedHotel: {},
      },
    });
    history.push(`/home`);
  };

  return (
    <Modal
      keyboard={false}
      closable={false}
      footer={false}
      visible={visible}
      className={styles.roleModal}
      bodyStyle={{ padding: 0 }}
    >
      <div>
        <div className={styles.title}>
          <p>尊敬的用户您好，欢迎进入中国联通5G应用创新生态大会会务填报系统</p>
          <p>为方便填报，请您先进行身份确认</p>
        </div>
        <div className={styles.roleCardList}>
          {forbidden ? (
            <div className={styles.forbiddenCard}>
              <p>很抱歉，报名已截止</p>
              <Row style={{ width: '100%' }} justify="center">
                <Col>
                  <Button onClick={returnFirst}>返回首页</Button>
                </Col>
                <Col span={1} />
                <Col>
                  <Button onClick={showOrders}>查看申请</Button>
                </Col>
              </Row>
            </div>
          ) : (
            <></>
          )}
          <Card
            className={`${styles.roleCard} ${forbidden ? styles.blur : ''}`}
            hoverable
            bodyStyle={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
            onClick={() => {
              if (!forbidden) {
                chooseRole('manager');
              }
            }}
          >
            <img className={styles.img} src={manager} alt="alt" />
            <p className={styles.roleName}>客户经理</p>
            <p className={styles.roleDescription}>联通区域客户经理</p>
          </Card>
          <Card
            className={`${styles.roleCard} ${forbidden ? styles.blur : ''}`}
            hoverable
            bodyStyle={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
            onClick={() => {
              if (!forbidden) {
                chooseRole('ordinary');
              }
            }}
          >
            <img className={styles.img} src={ordinary} alt="alt" />
            <p className={styles.roleName}>普通用户</p>
            <p className={styles.roleDescription}>意向参加本次会议用户</p>
          </Card>
        </div>
      </div>
    </Modal>
  );
};
const mapStateToProps = ({
  ConferenceSystemModel,
  user,
}: {
  ConferenceSystemModel: ConferenceSystemState;
  user: any;
}) => {
  return {
    ConferenceSystemModel,
    user,
  };
};

export default connect(mapStateToProps)(RoleModal);
