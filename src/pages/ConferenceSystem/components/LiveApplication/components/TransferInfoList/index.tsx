import React from 'react';
import type { Dispatch } from 'redux';
import { connect } from 'umi';
import moment from 'moment';
import {
  Button,
  Col,
  Row,
  Card,
  Form,
  Select,
  Input,
  InputNumber,
  DatePicker,
  message,
} from 'antd';
import transferIcon from '@/assets/conferenceSystem/transfer.png';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import type { ConferenceSystemState } from '../../../../model';
import type { ParticipantType } from '../../../../data';
import styles from './index.less';

interface TransferInfoListProps {
  ConferenceSystemModel: ConferenceSystemState;
  dispatch: Dispatch;
  loading: boolean;
}

const listFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
    md: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
    md: { span: 16 },
  },
};

const { Option } = Select;
const TransferInfoList: React.FC<TransferInfoListProps> = (TransferInfoListProps) => {
  const { dispatch, ConferenceSystemModel } = TransferInfoListProps;
  const [TransferInfoListForm] = Form.useForm();

  const disabledDate = (current: any) => {
    // Can not select days before today and today
    const tooEarly = current && current <= moment().endOf('day');
    const tooLate = current && current >= moment(ConferenceSystemModel.meetingTime);
    return tooEarly || tooLate;
  };

  return (
    <div
      className={`${styles.transferInfoList} ${
        ConferenceSystemModel.justShow ? `${styles.disable}` : ''
      }`}
    >
      <Form form={TransferInfoListForm} preserve={false}>
        {/* <Card> */}
        <Form.List
          name="transferInfoList"
          initialValue={ConferenceSystemModel.transferInfoList}
          rules={[
            {
              validator: async (_, transferInfoList) => {
                if (!transferInfoList || transferInfoList.length < 1) {
                  return Promise.reject(new Error('至少添加一项接送信息'));
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
                        <img src={transferIcon} alt="alt" style={{ marginRight: 5 }} />
                        接送服务{`${fields.indexOf(field) + 1}`}
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
                            remove(field.name);
                          }}
                        />
                      ) : null
                    }
                  >
                    <Row>
                      <Col span={12}>
                        <Form.Item
                          {...listFormItemLayout}
                          label="联系人"
                          name={[field.name, 'invitationCode']}
                          fieldKey={[field.fieldKey, 'invitationCode']}
                          rules={[{ required: true, message: '请选择联系人' }]}
                        >
                          <Select
                            placeholder="请选择联系人"
                            disabled={ConferenceSystemModel.justShow}
                            style={{ color: 'black' }}
                          >
                            {ConferenceSystemModel.applicantOrder.participantList.map(
                              (participant: ParticipantType) => {
                                // if (participant.isLive === '1') {
                                return (
                                  <Option
                                    key={participant.invitationCode}
                                    value={participant.invitationCode}
                                  >
                                    {participant.name}
                                  </Option>
                                );
                                // }
                                // return null;
                              },
                            )}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...listFormItemLayout}
                          label="人数"
                          name={[field.name, 'numPeople']}
                          fieldKey={[field.fieldKey, 'numPeople']}
                          rules={[{ required: true, message: '请输入人数' }]}
                        >
                          <InputNumber min={1} disabled={ConferenceSystemModel.justShow} />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...listFormItemLayout}
                          label="列车/航班号"
                          name={[field.name, 'tripNumber']}
                          fieldKey={[field.fieldKey, 'tripNumber']}
                          rules={[{ required: true, message: '请输入列车/航班号' }]}
                        >
                          <Input
                            placeholder="请输入列车/航班号"
                            disabled={ConferenceSystemModel.justShow}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...listFormItemLayout}
                          label="时间"
                          name={[field.name, 'pickupTime']}
                          fieldKey={[field.fieldKey, 'pickupTime']}
                          rules={[{ required: true, message: '请选择时间' }]}
                        >
                          <DatePicker
                            showTime
                            disabled={ConferenceSystemModel.justShow}
                            disabledDate={disabledDate}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...listFormItemLayout}
                          label="上车地点"
                          name={[field.name, 'upLocation']}
                          fieldKey={[field.fieldKey, 'upLocation']}
                          rules={[{ required: true, message: '请输入上车地点' }]}
                        >
                          <Input
                            placeholder="请输入上车地点"
                            disabled={ConferenceSystemModel.justShow}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...listFormItemLayout}
                          label="下车地点"
                          name={[field.name, 'offLocation']}
                          fieldKey={[field.fieldKey, 'offLocation']}
                          rules={[{ required: true, message: '请输入下车地点' }]}
                        >
                          <Input
                            placeholder="请输入下车地点"
                            disabled={ConferenceSystemModel.justShow}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
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
                    添加接送信息
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              )}
            </>
          )}
        </Form.List>
        {/* </Card> */}
        {ConferenceSystemModel.justShow ? (
          ''
        ) : (
          <Card style={{ boxShadow: '0px 0px 20px rgba(10, 10, 10, 0.1)' }}>
            <Row justify="center" align="middle">
              <Col>
                <Button
                  style={{ display: 'block', margin: '0 auto' }}
                  onClick={() => {
                    const currentStep = ConferenceSystemModel.currentStep - 1;
                    dispatch({
                      type: 'ConferenceSystemModel/updateState',
                      payload: {
                        HotelStep: ConferenceSystemModel.isNeedHotel ? 'SelectedHotel' : '',
                        currentStep,
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
                    TransferInfoListForm.validateFields()
                      .then(() => {
                        const transferInfoList = TransferInfoListForm.getFieldsValue();
                        console.log(TransferInfoListForm.getFieldsValue());
                        // 修改时间类型
                        // const currentStep = ConferenceSystemModel.currentStep + 1;
                        dispatch({
                          type: 'ConferenceSystemModel/updateState',
                          payload: {
                            // currentStep,
                            transferInfoList: transferInfoList.transferInfoList,
                            showSubmitModal: true,
                          },
                        });
                        // dispatch({
                        //   type: 'ConferenceSystemModel/submit',
                        //   payload: { step: 'TransferInfo' },
                        // });
                      })
                      .catch((e) => {
                        if (e?.errorFields?.length !== 0) {
                          message.warn('请补全信息');
                        }
                      });
                  }}
                >
                  提交
                </Button>
              </Col>
            </Row>
          </Card>
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

export default connect(mapStateToProps)(TransferInfoList);
