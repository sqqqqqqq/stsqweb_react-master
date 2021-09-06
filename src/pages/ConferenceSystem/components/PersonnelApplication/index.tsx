import React, { useEffect } from 'react';
import type { Dispatch } from 'redux';
import { connect } from 'umi';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Space,
  Tooltip,
  Radio,
  Card,
  Cascader,
  message,
} from 'antd';
import { MinusCircleOutlined, QuestionCircleTwoTone } from '@ant-design/icons';
import { emailPattern, phoneNumPattern } from '@/constants/pattern';
import participantIcon from '@/assets/conferenceSystem/participant.png';
import { areasCode, getAreasNameByCode } from '@/constants/area';
import { searchByCreditCode, verifyInvitationCode } from '@/services/conferenceSystem';
import type { ParticipantType } from '../../data';
import type { ConferenceSystemState } from '../../model';
import styles from './index.less';

interface PersonnelApplicationProps {
  ConferenceSystemModel: ConferenceSystemState;
  dispatch: Dispatch;
  loading: boolean;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
    md: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 6 },
  },
};

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
const { Search } = Input;
const PersonnelApplication: React.FC<PersonnelApplicationProps> = (PersonnelApplicationProps) => {
  const { dispatch, ConferenceSystemModel } = PersonnelApplicationProps;
  const [personnelApplicationForm] = Form.useForm();

  useEffect(() => {
    const { participantList } = ConferenceSystemModel.applicantOrder; // 回传的参会人列表
    if (participantList) {
      participantList.map((participant) => {
        if (participant.isLive === '1') {
          dispatch({
            type: 'ConferenceSystemModel/updateState',
            payload: {
              isNeedHotel: true,
            },
          });
        }
        return '';
      });
    }
  }, []);

  useEffect(() => {
    const { creditCode } = ConferenceSystemModel.applicantOrder;
    if (creditCode) {
      // 查询合作伙伴信息
      searchByCreditCode({
        creditCode,
      }).then((res: any) => {
        if (res.status === 200) {
          // 统一信用代码所属公司为会员单位
          const { stpartyCode, unitRole, industry, cooName } = res.data;
          // 填充表单
          personnelApplicationForm.setFieldsValue({
            companyName: cooName,
            industry,
            unitRole,
          });
          const oldApplicantOrder = ConferenceSystemModel.applicantOrder;
          dispatch({
            type: 'ConferenceSystemModel/updateState',
            payload: {
              applicantOrder: {
                ...oldApplicantOrder,
                isCouncilMember: unitRole !== '会员', // 是否理事会成员
                companyId: stpartyCode,
              },
            },
          });
        } else {
          message.error(res.message);
          // 清空表单
          personnelApplicationForm.setFieldsValue({
            creditCode: undefined,
            companyName: undefined,
            industry: undefined,
            unitRole: undefined,
          });
        }
      });
    }
  }, [ConferenceSystemModel.applicantOrder.creditCode]);

  // 更新是否需要接送服务
  const changeTransferService = (e: any) => {
    const isNeedTransfer = e.target?.value === '1';
    dispatch({
      type: 'ConferenceSystemModel/updateState',
      payload: {
        isNeedTransfer,
      },
    });
  };
  const isLiveRadioChange = () => {
    const participantList = personnelApplicationForm.getFieldValue('participantList');
    if (participantList) {
      let isNeedHotel = false;
      participantList.map((participant: ParticipantType) => {
        if (participant.isLive === '1') {
          isNeedHotel = true;
        }
        return '';
      });
      dispatch({
        type: 'ConferenceSystemModel/updateState',
        payload: {
          isNeedHotel,
        },
      });
    }
  };

  const invitationCodeValidator = async (_: any, value: any) => {
    if (value) {
      if (ConferenceSystemModel.initCodeList.indexOf(value) > -1) {
        return Promise.resolve();
      }
      const res = await verifyInvitationCode({ uniqueCode: value });
      if (res.status !== 200) {
        return Promise.reject(new Error(res.message));
      }
      return Promise.resolve();
    }
    return Promise.resolve();
  };

  const uniqueValidator = async (_: any, value: any) => {
    const participantList = personnelApplicationForm.getFieldValue('participantList');
    let count = 0;
    participantList.map((participant: ParticipantType) => {
      if (participant.invitationCode === value) {
        count += 1;
      }
      return '';
    });
    if (count <= 1) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('邀请码不能重复'));
  };

  return (
    <Form
      form={personnelApplicationForm}
      preserve={false}
      className={styles.personnelApplicationForm}
    >
      {ConferenceSystemModel.role === 'manager' ? (
        <Card
          title={
            <span style={{ display: 'flex' }}>
              <img src={participantIcon} alt="alt" style={{ marginRight: 5 }} />
              客户经理信息
            </span>
          }
          style={{
            width: '60%',
            margin: '0 auto',
            marginBottom: '20px',
            boxShadow: '0px 0px 20px rgba(128, 128, 128, 0.1)',
          }}
        >
          <Form.Item
            {...formItemLayout}
            label="姓名"
            name="managerName"
            rules={[{ required: true, message: '请输入姓名' }]}
            initialValue={ConferenceSystemModel.applicantOrder.managerName}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="联系方式"
            name="managerContactInformation"
            rules={[
              { required: true, message: '请输入联系方式' },
              {
                message: '请输入正确的联系方式',
                pattern: phoneNumPattern,
              },
            ]}
            initialValue={ConferenceSystemModel.applicantOrder.managerContactInformation}
          >
            <Input placeholder="请输入联系方式" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="所属省市"
            name="managerAreaCode"
            rules={[{ required: true, message: '请选择所属省市' }]}
            initialValue={ConferenceSystemModel.applicantOrder.managerAreaCode}
          >
            <Cascader options={areasCode} />
          </Form.Item>
        </Card>
      ) : (
        ''
      )}

      <Card
        style={{
          width: '60%',
          margin: '0 auto',
          marginBottom: '20px',
          boxShadow: '0px 0px 20px rgba(10, 10, 10, 0.1)',
        }}
      >
        <Form.Item
          {...formItemLayout}
          label="统一信用代码"
          name="creditCode"
          initialValue={ConferenceSystemModel.applicantOrder.creditCode}
          rules={[{ required: true, message: '请输入统一信用代码' }]}
        >
          <Search
            placeholder="请输入统一信用代码"
            disabled={ConferenceSystemModel.role === 'ordinary'}
            onSearch={(creditCode) => {
              const oldApplicantOrder = ConferenceSystemModel.applicantOrder;
              dispatch({
                type: 'ConferenceSystemModel/updateState',
                payload: {
                  applicantOrder: {
                    ...oldApplicantOrder,
                    creditCode,
                  },
                },
              });
            }}
            onBlur={(e) => {
              const oldApplicantOrder = ConferenceSystemModel.applicantOrder;
              dispatch({
                type: 'ConferenceSystemModel/updateState',
                payload: {
                  applicantOrder: {
                    ...oldApplicantOrder,
                    creditCode: e.target.value,
                  },
                },
              });
            }}
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="公司名称"
          name="companyName"
          initialValue={ConferenceSystemModel.applicantOrder.companyName}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="所属行业"
          name="industry"
          initialValue={ConferenceSystemModel.applicantOrder.industry}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="角色"
          name="unitRole"
          initialValue={ConferenceSystemModel.applicantOrder.unitRole}
        >
          <Input disabled />
        </Form.Item>
      </Card>
      <Form.List
        initialValue={ConferenceSystemModel.applicantOrder.participantList}
        name="participantList"
        rules={[
          {
            validator: async (_, participantList) => {
              if (!participantList || participantList.length < 1) {
                return Promise.reject(new Error('请至少添加一个参会人'));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        {(fields, { add }, { errors }) => (
          <>
            {fields.map((field) => (
              <Form.Item
                // className={styles.participantList}
                required
                key={field.key}
                style={{
                  width: '60%',
                  margin: '0 auto',
                  marginBottom: '20px',
                  backgroundColor: 'white',
                  boxShadow: '0px 0px 20px rgba(10, 10, 10, 0.1)',
                }}
              >
                <Card
                  title={
                    <span style={{ display: 'flex' }}>
                      <img src={participantIcon} alt="alt" style={{ marginRight: 5 }} />
                      参会人{`${fields.indexOf(field) + 1}`}
                    </span>
                  }
                  style={{ width: '100%' }}
                  extra={
                    fields.length > 1 ? (
                      <MinusCircleOutlined
                        style={{ marginLeft: 20 }}
                        className="dynamic-delete-button"
                        onClick={() => {
                          // 默认remove方法会影响后续节点数据，故手动调整
                          const participantList: any[] = personnelApplicationForm.getFieldValue(
                            'participantList',
                          );
                          participantList.splice(field.name, 1);
                          personnelApplicationForm.setFieldsValue({
                            participantList,
                          });
                          // remove(field.name);
                        }}
                      />
                    ) : null
                  }
                >
                  <Space direction="vertical">
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          labelCol={{ span: 3 }}
                          wrapperCol={{ span: 8 }}
                          label="邀请码"
                          name={[field.name, 'invitationCode']}
                          fieldKey={[field.fieldKey, 'invitationCode']}
                          validateTrigger={['onBlur']}
                          rules={[
                            { validator: invitationCodeValidator },
                            { validator: uniqueValidator },
                            { required: true, message: '请输入邀请码' },
                          ]}
                        >
                          <Input
                            placeholder="请输入邀请码"
                            suffix={
                              <Tooltip title="邀请码仅限使用一次">
                                <QuestionCircleTwoTone />
                              </Tooltip>
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...listFormItemLayout}
                          label="姓名"
                          name={[field.name, 'name']}
                          fieldKey={[field.fieldKey, 'name']}
                          rules={[{ required: true, message: '请输入参会人姓名' }]}
                        >
                          <Input placeholder="请输入参会人姓名" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...listFormItemLayout}
                          label="职务"
                          name={[field.name, 'job']}
                          fieldKey={[field.fieldKey, 'job']}
                          rules={[{ required: true, message: '请输入参会人职务' }]}
                        >
                          <Input placeholder="请输入参会人职务" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...listFormItemLayout}
                          label="联系方式"
                          name={[field.name, 'contactInformation']}
                          fieldKey={[field.fieldKey, 'contactInformation']}
                          rules={[
                            { required: true, message: '请输入参会人联系方式' },
                            {
                              message: '请输入正确的联系方式',
                              pattern: phoneNumPattern,
                            },
                          ]}
                        >
                          <Input placeholder="请输入参会人联系方式" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...listFormItemLayout}
                          label="联系邮箱"
                          name={[field.name, 'email']}
                          fieldKey={[field.fieldKey, 'email']}
                          rules={[
                            { required: true, message: '请输入参会人联系邮箱' },
                            {
                              message: '请输入正确的邮箱格式',
                              pattern: emailPattern,
                            },
                          ]}
                        >
                          <Input placeholder="请输入参会人联系邮箱" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...listFormItemLayout}
                          label="是否入住酒店"
                          name={[field.name, 'isLive']}
                          fieldKey={[field.fieldKey, 'isLive']}
                          rules={[{ required: true, message: '请选择是否入住酒店' }]}
                          initialValue="0"
                        >
                          <Radio.Group onChange={isLiveRadioChange}>
                            <Radio value="0">否</Radio>
                            <Radio value="1">是</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...listFormItemLayout}
                          label="是否清真"
                          name={[field.name, 'isMuslim']}
                          fieldKey={[field.fieldKey, 'isMuslim']}
                          rules={[{ required: true, message: '请选择是否入住清真' }]}
                          initialValue="0"
                        >
                          <Radio.Group>
                            <Radio value="0">否</Radio>
                            <Radio value="1">是</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Space>
                </Card>
              </Form.Item>
            ))}
            {ConferenceSystemModel.applicantOrder.isCouncilMember &&
            !ConferenceSystemModel.justShow ? (
              <Card
                style={{
                  width: '60%',
                  margin: '0 auto',
                  marginBottom: 20,
                  boxShadow: '0px 0px 20px rgba(10, 10, 10, 0.1)',
                }}
              >
                * 接送服务：
                <Radio.Group
                  defaultValue={ConferenceSystemModel.isNeedTransfer ? '1' : '0'}
                  onChange={changeTransferService}
                  disabled={ConferenceSystemModel.justShow}
                >
                  <Radio value="0">不需要</Radio>
                  <Radio value="1">需要</Radio>
                </Radio.Group>
              </Card>
            ) : (
              ''
            )}
            <Form.Item
              style={{
                width: '60%',
                margin: '0 auto',
                backgroundColor: 'white',
                padding: '20px',
                boxShadow: '0px 0px 20px rgba(10, 10, 10, 0.1)',
              }}
            >
              <Row justify="center" align="middle">
                <Col>
                  <Button onClick={() => add()}>添加参会人</Button>
                </Col>
                <Col span={2} />
                <Col>
                  <Button
                    type="primary"
                    onClick={() => {
                      personnelApplicationForm
                        .validateFields()
                        .then(() => {
                          console.log(personnelApplicationForm.getFieldsValue());
                          const oldApplicantOrder = ConferenceSystemModel.applicantOrder;
                          const applicantOrder = personnelApplicationForm.getFieldsValue();
                          const { participantList } = applicantOrder;
                          const newParticipantList = participantList.map(
                            (participantItem: ParticipantType) => {
                              return { ...participantItem, isSelected: false };
                            },
                          );
                          let managerAreaName: string[] | undefined;
                          const managerAreaCode = personnelApplicationForm.getFieldValue(
                            'managerAreaCode',
                          );
                          if (ConferenceSystemModel.role === 'manager') {
                            managerAreaName = getAreasNameByCode(managerAreaCode);
                          }
                          const currentStep = ConferenceSystemModel.currentStep + 1;
                          let HotelStep = '';
                          if (ConferenceSystemModel.isNeedHotel) {
                            HotelStep = 'SelectHotel';
                          } else if (ConferenceSystemModel.isNeedTransfer) {
                            HotelStep = 'PickUp';
                          }
                          dispatch({
                            type: 'ConferenceSystemModel/updateState',
                            payload: {
                              applicantOrder: {
                                ...oldApplicantOrder,
                                ...applicantOrder,
                                participantList: newParticipantList,
                                managerAreaName,
                              },
                              currentStep,
                              showSubmitModal: !(
                                ConferenceSystemModel.isNeedHotel ||
                                ConferenceSystemModel.isNeedTransfer
                              ),
                              HotelStep,
                              transferInfoList: ConferenceSystemModel.isNeedTransfer ? [{}] : [],
                            },
                          });
                          // // 不需要入住酒店,提交数据
                          // if (!ConferenceSystemModel.isNeedHotel) {
                          //   dispatch({
                          //     type: 'ConferenceSystemModel/submit',
                          //     payload: {
                          //       step: 'Personnel',
                          //     },
                          //   });
                          // }
                        })
                        .catch((e) => {
                          if (e?.errorFields?.length !== 0) {
                            message.warn('请补全信息');
                          }
                        });
                    }}
                  >
                    {ConferenceSystemModel.isNeedHotel || ConferenceSystemModel.isNeedTransfer
                      ? '下一步'
                      : '提交'}
                  </Button>
                </Col>
              </Row>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
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

export default connect(mapStateToProps)(PersonnelApplication);
