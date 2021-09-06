import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import styles from './index.less';

const { Item } = Form;

interface PhoneMsgFieldProps {
  getFieldFunc: any;
  sendMsgFunc: any;
  isUnicomChild: boolean;
  setIsUnicomFunc: Function;
  setSendEmailBtnDisabledCallback: (event: boolean) => void;
  isProductWishOrderChild: boolean;
}

const PhoneMsgField = (props: PhoneMsgFieldProps) => {
  // 用输入的手机号码的校验结果控制发送短信按钮的disabled
  const [sendMsgBtnDisabled, setSendMsgBtnDisabled] = useState<boolean>(false);
  // 发送短信的过程中，发送按钮提示“发送中”
  const [sendMsgBtnLoading, setSendMsgBtnLoading] = useState<boolean>(false);

  const [timeCounter, setTimeCounter] = useState<number>(0);

  // const phoneNumPattern = /^1(3[0-2]|5[56]|8[56])\d{8}$/;
  // 先判断是不是手机号
  const phoneNumPattern = /^[1][3-9][0-9]{9}$/;

  // 判断是否为联通号码
  const unicomPhoneNumPattern = /^1(3[0-2]|4[5]|5[56]|6[6]|7[56]|8[56])\d{8}$/;

  const {
    getFieldFunc,
    sendMsgFunc,
    isUnicomChild,
    setIsUnicomFunc,
    setSendEmailBtnDisabledCallback,
    isProductWishOrderChild,
  } = props;

  const validDataPhoneNumFunc = () => {
    if (!phoneNumPattern.test(getFieldFunc('phoneNumber'))) {
      setSendMsgBtnDisabled(true);
    } else if (!isProductWishOrderChild) {
      if (!isUnicomChild) {
        if (
          /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(getFieldFunc('email'))
        ) {
          setSendEmailBtnDisabledCallback(false);
        }
      }
    }
  };

  useEffect(() => {
    if (timeCounter > 0) {
      setTimeout(() => {
        setTimeCounter(timeCounter - 1);
      }, 1000);
    } else {
      // 计数完后再校验一次
      validDataPhoneNumFunc();
    }
  }, [timeCounter]);

  useEffect(() => {
    // 点击重置按钮后校验一次
    validDataPhoneNumFunc();
  }, [getFieldFunc('phoneNumber')]);

  const inputStyle = { maxWidth: '125px' };

  const phoneNumberValidator = ({ getFieldValue }: any) => ({
    validator() {
      const value = getFieldValue('phoneNumber');
      setSendMsgBtnDisabled(true);
      if (!value) {
        setIsUnicomFunc(true);
        return Promise.reject(new Error('请输入联系人手机号码'));
      }
      if (phoneNumPattern.test(value)) {
        if (unicomPhoneNumPattern.test(value)) {
          setIsUnicomFunc(true);
        } else {
          setIsUnicomFunc(false);
        }
      } else {
        setIsUnicomFunc(true);
        return Promise.reject(new Error('请输入正确格式的手机号码'));
      }

      setSendMsgBtnDisabled(false);
      return Promise.resolve();
    },
  });

  const verifyCodeValidator = ({ getFieldValue }: any) => ({
    validator() {
      const value = getFieldValue('textMessageCode');
      const patten = /^.{6}$/;

      if (!value) {
        return Promise.reject(new Error('请输入验证码'));
      }

      if (!patten.test(value)) {
        return Promise.reject(new Error('请输入6位的验证码'));
      }
      return Promise.resolve();
    },
  });

  const formItemConfig = {
    phoneNumberItem: {
      label: '手机号',
      name: 'phoneNumber',
      rules: [phoneNumberValidator, { required: true, message: ' ' }],
    },
    phoneNumberInput: {
      placeholder: '请输入联系人手机',
    },
    verifyCodeItem: {
      name: 'textMessageCode',
      rules: [verifyCodeValidator],
      noStyle: true,
    },
    verifyCodeInput: {
      style: inputStyle,
      className: 'verifyCodeInput',
      placeholder: '请输入验证码',
    },
  };

  const sendMessage = async () => {
    setSendMsgBtnLoading(true);

    const result: { success: boolean; error?: string } = await sendMsgFunc();

    if (result.success) {
      message.success('验证码发送成功');
      setTimeCounter(60);
    } else {
      message.error(`${result.error || ''}`);
    }

    setSendMsgBtnLoading(false);
  };

  return (
    <React.Fragment>
      <Item {...formItemConfig.phoneNumberItem}>
        <Input maxLength={11} {...formItemConfig.phoneNumberInput} />
      </Item>
      {isProductWishOrderChild ? (
        <Item label="验证码" className="verify-code-item-scpip">
          <Item {...formItemConfig.verifyCodeItem}>
            <Input {...formItemConfig.verifyCodeInput} />
          </Item>
          {timeCounter > 0 ? (
            <Button className={styles.sendVerifyCodeBtn} disabled>
              {`${timeCounter}s后重试`}
            </Button>
          ) : (
            <Button
              className={styles.sendVerifyCodeBtn}
              type="primary"
              onClick={sendMessage}
              disabled={sendMsgBtnDisabled}
              loading={sendMsgBtnLoading}
            >
              {sendMsgBtnLoading ? '发送中' : '发送验证码'}
            </Button>
          )}
        </Item>
      ) : (
        <div style={{ width: '33%', display: 'inline-flex' }}>
          {isUnicomChild ? (
            <Item style={{ width: '100%' }} label="验证码" className="verify-code-item-scpip">
              <Item {...formItemConfig.verifyCodeItem}>
                <Input {...formItemConfig.verifyCodeInput} />
              </Item>
              {timeCounter > 0 ? (
                <Button className={styles.sendVerifyCodeBtn} disabled>
                  {`${timeCounter}s后重试`}
                </Button>
              ) : (
                <Button
                  className={styles.sendVerifyCodeBtn}
                  type="primary"
                  onClick={sendMessage}
                  disabled={sendMsgBtnDisabled}
                  loading={sendMsgBtnLoading}
                >
                  {sendMsgBtnLoading ? '发送中' : '发送验证码'}
                </Button>
              )}
            </Item>
          ) : null}
        </div>
      )}
    </React.Fragment>
  );
};

export default PhoneMsgField;
