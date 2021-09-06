import React from 'react';
import type { Dispatch } from 'redux';
import { connect } from 'umi';
import { Modal, Spin, Button, Row, Col } from 'antd';
import type { ConferenceSystemState } from '../../model';

interface SubmitModalProps {
  ConferenceSystemModel: ConferenceSystemState;
  dispatch: Dispatch;
}

const SubmitModal: React.FC<SubmitModalProps> = (props) => {
  const { dispatch, ConferenceSystemModel } = props;
  const onCancel = () => {
    dispatch({
      type: 'ConferenceSystemModel/updateState',
      payload: {
        showSubmitModal: false,
      },
    });
  };
  const onOk = () => {
    dispatch({
      type: 'ConferenceSystemModel/updateState',
      payload: {
        submiting: true,
      },
    });
    dispatch({
      type: 'ConferenceSystemModel/submit',
      payload: {},
    });
  };
  return (
    <Modal
      title="提示"
      keyboard={false}
      visible={ConferenceSystemModel.showSubmitModal}
      footer={false}
      bodyStyle={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Spin spinning={ConferenceSystemModel.submiting}>
        <span style={{ fontSize: 20, color: 'gray' }}>是否提交会务申请？</span>
        <div style={{ width: '100%', marginTop: 20, marginBottom: 10 }}>
          <Row justify="center" align="middle">
            <Col>
              <Button onClick={onCancel} style={{ width: 80 }}>
                取消
              </Button>
            </Col>
            <Col span={1} />
            <Col>
              <Button onClick={onOk} type="primary" style={{ width: 80 }}>
                确定
              </Button>
            </Col>
          </Row>
        </div>
      </Spin>
    </Modal>
  );
};

const mapStateToProps = ({
  ConferenceSystemModel,
}: {
  ConferenceSystemModel: ConferenceSystemState;
}) => {
  return {
    ConferenceSystemModel,
  };
};

export default connect(mapStateToProps)(SubmitModal);
