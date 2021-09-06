import React from 'react';
import { Modal, Row, Col, Button } from 'antd';
import type { Dispatch } from 'redux';
import { connect, history } from 'umi';
import { CheckCircleFilled } from '@ant-design/icons';
import type { ConferenceSystemState } from '../../model';
import type { ApplicantOrderType } from '../../data';
import styles from './index.less';

interface SuccessInfoModalProps {
  ConferenceSystemModel: ConferenceSystemState;
  dispatch: Dispatch;
  loading: boolean;
}

const SuccessInfoModal: React.FC<SuccessInfoModalProps> = (props) => {
  const { ConferenceSystemModel, dispatch } = props;
  const returnFirst = () => {
    const oldApplicantOrder: ApplicantOrderType = ConferenceSystemModel.applicantOrder;
    dispatch({
      type: 'ConferenceSystemModel/updateState',
      payload: {
        initCodeList: [],
        currentStep: -1,
        HotelStep: 'SelectHotel',
        isNeedTransfer: false,
        isNeedHotel: false,
        showSuccessInfoModal: false,
        applicantOrder: {
          managerName: oldApplicantOrder.managerName,
          managerContactInformation: oldApplicantOrder.managerContactInformation,
          managerAreaCode: oldApplicantOrder.managerAreaCode,
          managerAreaName: oldApplicantOrder.managerAreaName,
          creditCode: oldApplicantOrder.creditCode,
          participantList: [{}],
          isCouncilMember: oldApplicantOrder.isCouncilMember,
        },
        liveInfo: {},
        transferInfoList: [],
      },
    });
  };
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
        // applicantOrder: {
        //   managerName: oldApplicantOrder.managerName,
        //   managerContactInformation: oldApplicantOrder.managerContactInformation,
        //   managerAreaCode: oldApplicantOrder.managerAreaCode,
        //   managerAreaName: oldApplicantOrder.managerAreaName,
        //   creditCode: oldApplicantOrder.creditCode,
        // },
        // liveInfo: {},
        // transferInfoList: [],
      },
    });
    history.push(`/conferenceSystem/checkOrders`);
  };
  return (
    <Modal
      keyboard={false}
      closable={false}
      footer={false}
      visible={ConferenceSystemModel.showSuccessInfoModal}
    >
      <div className={styles.successInfo}>
        <CheckCircleFilled style={{ color: 'rgb(0, 220, 20)', fontSize: 70 }} />
        <p className={styles.mainTitle}>参会申请已提交</p>
        <p className={styles.subTitle}>谢谢参加</p>
        <Row style={{ width: '100%' }} justify="center">
          <Col>
            <Button onClick={showOrders}>查看我的申请</Button>
          </Col>
          <Col span={1} />
          <Col>
            <Button onClick={returnFirst}>返回首页</Button>
          </Col>
        </Row>
      </div>
    </Modal>
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

export default connect(mapStateToProps)(SuccessInfoModal);
