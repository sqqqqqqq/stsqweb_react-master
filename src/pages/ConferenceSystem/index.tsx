import React, { useState, useEffect } from 'react';
import { Steps, Card, Modal, Spin, message, notification } from 'antd';
import type { Dispatch } from 'redux';
import { connect, history } from 'umi';
import backgroundBig from '@/assets/conferenceSystem/background-big@2x.png';
import backgroundSmall from '@/assets/conferenceSystem/background-small@2x.png';
import title from '@/assets/conferenceSystem/title@2x.png';
import {
  searchCreditCodeByPartyCode,
  findConferenceTopBannerInfo,
  findConferenceMeetingTime,
} from '@/services/conferenceSystem';
import env from '@/utils/env';
import RoleModal from './components/RoleModal';
import LiveApplication from './components/LiveApplication';
import PersonnelApplication from './components/PersonnelApplication';
import SuccessInfoModal from './components/SuccessInfoModal';
import SubmitModal from './components/SubmitModal';
import type { ConferenceSystemState } from './model';
import cryptoUtils from '@/utils/crypto';
import styles from './index.less';

const { Step } = Steps;

interface ConferenceSystemProps {
  ConferenceSystemModel: ConferenceSystemState;
  dispatch: Dispatch;
  user: any;
  loading: boolean;
  location: {
    pathname: string;
    query: any;
  };
}

const ConferenceSystem: React.FC<ConferenceSystemProps> = (ConferenceSystemProps) => {
  const { ConferenceSystemModel, dispatch, location, user } = ConferenceSystemProps;

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [bannerData, setBannerData] = useState<any>();
  const { orderId, orderType } = location.query;
  const mode = location.query.mode ? cryptoUtils.aesDecryptUrl(location.query.mode) : '';

  useEffect(() => {
    let meetingTime = '2021-09-01';
    (async () => {
      const res = await findConferenceTopBannerInfo();
      const meetTimeRes = await findConferenceMeetingTime();
      if (res.status === 200) {
        setBannerData(res.data);
      } else {
        notification.error({
          message: 'Error',
          description: res.message,
        });
      }
      if (meetTimeRes.status === 200) {
        meetingTime = meetTimeRes.data.meetingTime;
      } else {
        notification.error({
          message: 'Error',
          description: meetTimeRes.message,
        });
      }
      dispatch({
        type: 'ConferenceSystemModel/updateState',
        payload: {
          meetingTime,
        },
      });
    })();

    dispatch({
      type: 'ConferenceSystemModel/updateState',
      payload: {
        justShow: mode === 'show', // 是否仅展示数据
        initSpinVisible: true,
      },
    });

    if (orderId === undefined) {
      setModalVisible(true);
    } else {
      // 有orderId，查询数据
      dispatch({
        type: 'ConferenceSystemModel/init',
        payload: { orderId, orderType, mode },
      });
    }
  }, [location]);

  useEffect(() => {
    if (ConferenceSystemModel.currentStep === -1) {
      dispatch({
        type: 'ConferenceSystemModel/updateState',
        payload: {
          currentStep: 0,
        },
      });
    }
  }, [ConferenceSystemModel.currentStep]);

  const chooseRole = (role: string) => {
    dispatch({
      type: 'ConferenceSystemModel/updateState',
      payload: {
        applicantOrder: {
          participantList: [{}],
        },
        initCodeList: [],
        currentStep: -1,
        HotelStep: 'SelectHotel',
        isNeedHotel: false,
        isNeedTransfer: false,
        HotelList: [],
        selectedHotel: {},
        liveInfo: {},
        transferInfoList: [],
      },
    });
    if (role === 'manager') {
      dispatch({
        type: 'ConferenceSystemModel/updateState',
        payload: {
          role,
          initSpinVisible: false,
        },
      });
    }
    if (role === 'ordinary') {
      dispatch({
        type: 'ConferenceSystemModel/updateState',
        payload: {
          role,
          initSpinVisible: true,
        },
      });
      const { currentUser } = user;
      if (currentUser.name) {
        dispatch({
          type: 'ConferenceSystemModel/updateState',
          payload: {
            initSpinVisible: false,
          },
        });

        const { stpartyCode } = currentUser;
        if (stpartyCode) {
          searchCreditCodeByPartyCode({ stpartyCode }).then((res) => {
            if (res.status === 200) {
              const { creditCode } = res.data;
              // const oldApplicantOrder = ConferenceSystemModel.applicantOrder;
              dispatch({
                type: 'ConferenceSystemModel/updateState',
                payload: {
                  applicantOrder: {
                    // ...oldApplicantOrder,
                    participantList: [{}],
                    creditCode,
                  },
                  currentStep: -1,
                },
              });
            } else {
              message.error(res.message);
            }
          });
        } else {
          // 未关联企业
          // const oldApplicantOrder = ConferenceSystemModel.applicantOrder;
          dispatch({
            type: 'ConferenceSystemModel/updateState',
            payload: {
              applicantOrder: {
                // ...oldApplicantOrder,
                creditCode: undefined,
                companyName: undefined,
                industry: undefined,
                unitRole: undefined,
                participantList: [{}],
              },
            },
          });
          Modal.confirm({
            title: '提示',
            content: '您未关联企业，请前往用户中心关联企业信息',
            onOk: () => {
              window.location.href = '/partners/flow/task/platform';
            },
            onCancel() {
              setModalVisible(true);
            },
          });
        }
      } else {
        Modal.confirm({
          title: '提示',
          content: '请先登录',
          onOk: () => {
            window.location.href =
              env.loginUrl + history.location.pathname + history.location.search;
          },
          onCancel() {
            setModalVisible(true);
          },
        });
      }
      // (async () => {
      //   const userInfo = await queryUserInfo();
      //   if (userInfo.status === 200) {
      //     // 用户已登录
      //     dispatch({
      //       type: 'ConferenceSystemModel/updateState',
      //       payload: {
      //         initSpinVisible: false,
      //       },
      //     });
      //     const { stpartyCode } = userInfo.data;

      //     if (stpartyCode) {
      //       searchCreditCodeByPartyCode({ stpartyCode }).then((res) => {
      //         if (res.status === 200) {
      //           const { creditCode } = res.data;
      //           const oldApplicantOrder = ConferenceSystemModel.applicantOrder;
      //           dispatch({
      //             type: 'ConferenceSystemModel/updateState',
      //             payload: {
      //               applicantOrder: {
      //                 ...oldApplicantOrder,
      //                 creditCode,
      //               },
      //               currentStep: -1,
      //             },
      //           });
      //         } else {
      //           message.error(res.message);
      //         }
      //       });
      //     } else {
      //       // 未关联企业
      //       const oldApplicantOrder = ConferenceSystemModel.applicantOrder;
      //       dispatch({
      //         type: 'ConferenceSystemModel/updateState',
      //         payload: {
      //           applicantOrder: {
      //             ...oldApplicantOrder,
      //             creditCode: undefined,
      //             companyName: undefined,
      //             industry: undefined,
      //             unitRole: undefined,
      //           },
      //         },
      //       });
      //       Modal.confirm({
      //         title: '提示',
      //         content: '您未关联企业，请前往用户中心关联企业信息',
      //         onOk: () => {
      //           window.location.href = '/partners/flow/task/platform';
      //         },
      //         onCancel() {
      //           setModalVisible(true);
      //         },
      //       });
      //     }
      //   } else {
      //     Modal.confirm({
      //       title: '提示',
      //       content: '请先登录',
      //       onOk: () => {
      //         window.location.href =
      //           env.loginUrl + history.location.pathname + history.location.search;
      //       },
      //       onCancel() {
      //         setModalVisible(true);
      //       },
      //     });
      //   }
      // })();
    }
    setModalVisible(false);
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      <RoleModal chooseRole={chooseRole} visible={modalVisible} />
      {/* Banner */}
      {ConferenceSystemModel.currentStep === 0 || ConferenceSystemModel.currentStep === -1 ? (
        <div className={styles.bannerBig}>
          <img src={backgroundBig} alt="alt" />
          <img className={styles.title} src={title} alt="alt" />
          <div className={styles.text}>
            <p>{bannerData?.meetingTime}</p>
            <p>{bannerData?.meetingPlace}</p>
            <p>{bannerData?.organizer}</p>
          </div>
        </div>
      ) : (
        <div className={styles.bannerSmall}>
          <img src={backgroundSmall} alt="alt" />
          <img className={styles.title} src={title} alt="alt" />
        </div>
      )}
      <Spin spinning={ConferenceSystemModel.initSpinVisible}>
        <Card
          style={{
            width: '60%',
            margin: '0 auto',
            marginBottom: '20px',
            boxShadow: '0px 0px 20px rgba(10, 10, 10, 0.1)',
          }}
        >
          <Steps current={ConferenceSystemModel.currentStep} labelPlacement="vertical">
            <Step title="参会申请" />
            {ConferenceSystemModel.isNeedHotel ? <Step title="入住资料" /> : undefined}
            {ConferenceSystemModel.isNeedTransfer ? <Step title="接送资料" /> : undefined}
            <Step title="提交" />
          </Steps>
        </Card>
        {ConferenceSystemModel.currentStep === 0 ? <PersonnelApplication /> : <></>}
        {ConferenceSystemModel.currentStep !== 0 &&
        (ConferenceSystemModel.isNeedHotel || ConferenceSystemModel.isNeedTransfer) ? (
          <LiveApplication />
        ) : (
          <></>
        )}
      </Spin>
      <SuccessInfoModal />
      <SubmitModal />
    </div>
  );
};

const mapStateToProps = ({
  ConferenceSystemModel,
  loading,
  user,
}: {
  ConferenceSystemModel: ConferenceSystemState;
  loading: { models: Record<string, boolean> };
  user: any;
}) => {
  return {
    ConferenceSystemModel,
    loading: loading.models.ConferenceSystemModel,
    user,
  };
};

export default connect(mapStateToProps)(ConferenceSystem);
