import React, { useState, useEffect } from 'react';
import type { Dispatch } from 'redux';
import { connect } from 'umi';
import moment from 'moment';
import { Form, Card, Button, Row, Col, DatePicker, Radio, message } from 'antd';
import { PlusOutlined, MinusCircleOutlined, InfoCircleTwoTone } from '@ant-design/icons';
import roomIcon from '@/assets/conferenceSystem/room.png';
import type { HotelInfoType, LiveRoomInfoType, ParticipantType } from '../../../../data';
import type { ConferenceSystemState } from '../../../../model';
import HotelCard from '../HotelCard';
import ParticipantCardList from '../ParticipantCardList';
import styles from './index.less';

interface LiveInfoListProps {
  ConferenceSystemModel: ConferenceSystemState;
  dispatch: Dispatch;
  loading: boolean;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
    md: { span: 4, offset: 1 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    md: { span: 16 },
  },
};

const { RangePicker } = DatePicker;

const LiveInfoList: React.FC<LiveInfoListProps> = (LiveInfoListProps) => {
  const { dispatch, ConferenceSystemModel } = LiveInfoListProps;
  const [liveDays, setLiveDays] = useState<number>();
  const [LiveInfoListForm] = Form.useForm();

  const disabledDate = (current: any) => {
    // Can not select days before today and today
    const tooEarly = current && current <= moment().endOf('day');
    const tooLate = current && current >= moment(ConferenceSystemModel.meetingTime);
    return tooEarly || tooLate;
  };
  const onCalendarChange = (dates: any) => {
    const startTime = dates?.[0];
    const leaveTime = dates?.[1];
    setLiveDays(leaveTime?.diff(startTime, 'days'));
  };

  // 更新model中参会人信息中isSelected数值
  const changeModelData = (invitationCodeList: string[]) => {
    dispatch({
      type: 'ConferenceSystemModel/updateParticipantList',
      payload: {
        invitationCodeList,
      },
    });
  };

  useEffect(() => {
    const dates = LiveInfoListForm.getFieldValue('liveTime');
    onCalendarChange(dates);
  }, []);

  return (
    <div
      className={`${styles.liveInfoList} ${
        ConferenceSystemModel.justShow ? `${styles.disable}` : ''
      }`}
    >
      <HotelCard
        hotelData={ConferenceSystemModel.selectedHotel}
        btnClick={() => {}}
        showSubscribeBtn={false}
      />

      <Form form={LiveInfoListForm} preserve={false}>
        <Card style={{ marginBottom: 20, boxShadow: '0px 0px 20px rgba(10, 10, 10, 0.1)' }}>
          <Row>
            <Col>
              <Form.Item
                label="入住时间"
                name="liveTime"
                rules={[{ required: true, message: '请选择入住时间' }]}
                initialValue={
                  ConferenceSystemModel.liveInfo?.liveStartTime !== undefined &&
                  ConferenceSystemModel.liveInfo?.liveEndTime !== undefined
                    ? [
                        moment(ConferenceSystemModel.liveInfo.liveStartTime),
                        moment(ConferenceSystemModel.liveInfo.liveEndTime),
                      ]
                    : undefined
                }
                style={{ marginBottom: 0 }}
              >
                <RangePicker
                  disabledDate={disabledDate}
                  placeholder={['入住时间', '离店时间']}
                  onCalendarChange={onCalendarChange}
                  disabled={ConferenceSystemModel.justShow}
                />
              </Form.Item>
            </Col>
            <Col span={2} style={{ alignItems: 'center', display: 'inline-flex', marginLeft: 10 }}>
              <p style={{ marginBottom: 0 }}>共{Number.isInteger(liveDays) ? liveDays : ' ? '}晚</p>
            </Col>
          </Row>
        </Card>
        <Form.List
          name="roomList"
          initialValue={ConferenceSystemModel.liveInfo?.roomList}
          rules={[
            {
              validator: async (_, roomList) => {
                if (!roomList || roomList.length < 1) {
                  return Promise.reject(new Error('至少添加一个入住信息'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field) => (
                <Form.Item required key={field.key}>
                  <Card
                    title={
                      <span style={{ display: 'flex' }}>
                        <img src={roomIcon} alt="alt" style={{ marginRight: 5 }} />
                        房间{`${fields.indexOf(field) + 1}`}
                      </span>
                    }
                    style={{ width: '100%', boxShadow: '0px 0px 20px rgba(10, 10, 10, 0.1)' }}
                    extra={
                      fields.length > 1 &&
                      field.fieldKey === fields.length - 1 &&
                      !ConferenceSystemModel.justShow ? (
                        <MinusCircleOutlined
                          style={{ marginLeft: 20 }}
                          className="dynamic-delete-button"
                          onClick={() => {
                            const roomList = LiveInfoListForm.getFieldValue('roomList');
                            if (
                              roomList[field.fieldKey] !== undefined &&
                              roomList[field.fieldKey].invitationCodeList !== undefined
                            ) {
                              dispatch({
                                type: 'ConferenceSystemModel/updateParticipantList',
                                payload: {
                                  invitationCodeList: roomList[field.fieldKey].invitationCodeList,
                                },
                              });
                            }
                            remove(field.name);
                          }}
                        />
                      ) : null
                    }
                  >
                    <Form.Item
                      {...formItemLayout}
                      label="房型"
                      name={[field.name, 'hotelInfoId']}
                      fieldKey={[field.fieldKey, 'hotelInfoId']}
                      rules={[{ required: true, message: '请选择房型' }]}
                    >
                      <Radio.Group disabled={ConferenceSystemModel.justShow}>
                        {ConferenceSystemModel.selectedHotel.children.map((item: HotelInfoType) => {
                          return (
                            <Radio.Button key={item.id} value={item.id}>
                              {item.name}
                            </Radio.Button>
                          );
                        })}
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout}
                      label="入住人"
                      name={[field.name, 'invitationCodeList']}
                      fieldKey={[field.fieldKey, 'invitationCodeList']}
                      rules={[{ required: true, message: '请选择入住人' }]}
                    >
                      <ParticipantCardList
                        participantList={ConferenceSystemModel.applicantOrder.participantList}
                        changeModelData={changeModelData}
                        disabled={ConferenceSystemModel.justShow}
                      />
                    </Form.Item>
                  </Card>
                </Form.Item>
              ))}
              {ConferenceSystemModel.justShow ? (
                ''
              ) : (
                <Form.Item>
                  <Button
                    style={{ margin: '0 auto' }}
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    添加入住信息
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              )}
            </>
          )}
        </Form.List>
        <p>
          <InfoCircleTwoTone style={{ marginRight: 10 }} />
          为联通协议酒店，第一天入住需支付房费 ，一旦入住，不可取消
        </p>

        {ConferenceSystemModel.justShow ? (
          ''
        ) : (
          <Form.Item
            style={{
              margin: '0 auto',
              backgroundColor: 'white',
              padding: '20px',
              boxShadow: '0px 0px 20px rgba(10, 10, 10, 0.1)',
            }}
          >
            <Row justify="center" align="middle">
              <Col>
                <Button
                  style={{ display: 'block', margin: '0 auto' }}
                  onClick={() => {
                    dispatch({
                      type: 'ConferenceSystemModel/updateState',
                      payload: {
                        HotelStep: 'SelectHotel',
                        HotelList: [],
                      },
                    });
                  }}
                >
                  上一步
                </Button>
              </Col>
              <Col span={2} />
              <Col>
                <Button
                  style={{ display: 'block', margin: '0 auto' }}
                  type="primary"
                  onClick={() => {
                    LiveInfoListForm.validateFields()
                      .then(() => {
                        const liveInfo = LiveInfoListForm.getFieldsValue();

                        console.log(liveInfo);
                        const { liveTime, roomList } = liveInfo;
                        let num: number = 0;
                        roomList.map((room: LiveRoomInfoType) => {
                          num += room.invitationCodeList.length;
                          return '';
                        });

                        ConferenceSystemModel.applicantOrder.participantList.map(
                          (participant: ParticipantType) => {
                            if (participant.isLive === '1') {
                              num -= 1;
                            }
                            return '';
                          },
                        );
                        if (num !== 0) {
                          message.warn('有部分入住人未选择房间信息');
                        } else {
                          const liveStartTime = moment(liveTime?.[0].valueOf()).format(
                            'YYYY-MM-DD',
                          );
                          const liveEndTime = moment(liveTime?.[1].valueOf()).format('YYYY-MM-DD');
                          const currentStep = ConferenceSystemModel.currentStep + 1;
                          dispatch({
                            type: 'ConferenceSystemModel/updateState',
                            payload: {
                              currentStep: ConferenceSystemModel.isNeedTransfer
                                ? currentStep
                                : ConferenceSystemModel.currentStep,
                              HotelStep: ConferenceSystemModel.isNeedTransfer
                                ? 'PickUp'
                                : 'SelectedHotel',
                              transferInfoList: ConferenceSystemModel.isNeedTransfer
                                ? ConferenceSystemModel.transferInfoList
                                : [],
                              liveInfo: {
                                liveStartTime,
                                liveEndTime,
                                roomList,
                              },
                              showSubmitModal: !ConferenceSystemModel.isNeedTransfer,
                            },
                          });
                          // if (!ConferenceSystemModel.isNeedTransfer) {
                          //   dispatch({
                          //     type: 'ConferenceSystemModel/submit',
                          //     payload: { step: 'LiveInfo' },
                          //   });
                          // }
                        }
                      })
                      .catch((e) => {
                        if (e?.errorFields?.length !== 0) {
                          message.warn('请补全信息');
                        }
                      });
                  }}
                >
                  {ConferenceSystemModel.isNeedTransfer ? '下一步' : '提交'}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        )}
      </Form>
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

export default connect(mapStateToProps)(LiveInfoList);
