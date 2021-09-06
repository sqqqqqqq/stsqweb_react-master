import React, { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import { FormStepBtn, renderFormItemRow } from '../FormItem';
import styles from './index.less';
import type { FormStepBtnProps, SelectOptionType } from '@/components/FormItem/interface';
import { configArrayDefault } from './config';
import { areasCode, getCityByProvince } from '@/constants/area';
import type { postWishOrderDataType } from '@/services/lib';
import { postWishOrder, getWishOrder, getIntentEnums } from '@/services/lib';
import { searchCreditCodeByPartyCode } from '@/services/conferenceSystem';
import type { CurrentUser } from '@/models/user';
import { connect } from 'react-redux';

// 合作伙伴角色，已关联企业
export const USER_PARTNER = 'partner';

// 尚未关联企业，或者游客
export const USER_GENERAL = 'general';

interface WishOrderProps {
  user: CurrentUser;
  mecParams?: {
    mecId: string;
    mecIndustry: string;
    mecProductType: string;
    mecName: string;
  };
  orderId?: string;
}

const getCityOptionByProvinceValue = (provinceValue: string): SelectOptionType[] => {
  const res = getCityByProvince(provinceValue);
  if (Array.isArray(res)) {
    return res.map((item: SelectOptionType) => ({
      ...item,
      key: item.value,
    }));
  }
  return [{ ...res, key: res.value }];
};

// 处理接口的中间步骤
const handleDataMiddle = (param: { data: any; status: '0' | '1'; isMecType: boolean }) => {
  const { data, status, isMecType } = param;
  return {
    ...data,
    appCode: data.appCode.value,
    status,
    type: isMecType ? 'mec' : '',
    industry: data.industry,
    productType: data.productType,
  };
};

const WishOrder = (props: WishOrderProps) => {
  const [refForm] = Form.useForm();

  const [cityOption, setCityOption] = useState<SelectOptionType[]>([]);

  const [wishOrderData, setWishOrderData] = useState<postWishOrderDataType>();

  const [configArray, setConfigArray] = useState(configArrayDefault());

  const [userType, setUserType] = useState<string>(USER_GENERAL);

  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // 是否从mec过来
  const [isMecType, setIsMecType] = useState(false);

  // 非草稿或新建状态禁止修改
  const [editDisabled, setEditDisabled] = useState(false);

  const { orderId, mecParams, user: currentUser } = props;

  useEffect(() => {
    if (Object.keys(currentUser).length === 0) {
      return;
    }
    if (currentUser.message === '用户未登录') {
      setUserType(USER_GENERAL); // 游客模式
    } else {
      const { stpartyCode } = currentUser;
      if (stpartyCode) {
        setUserType(USER_PARTNER); // 已关联企业
        searchCreditCodeByPartyCode({ stpartyCode }).then((res) => {
          if (res.status === 200) {
            const { creditCode, cooName: companyName } = res.data;
            if (!refForm?.getFieldValue('creditCode')) {
              // creditCode和companyName无值的时候填上值
              refForm?.setFieldsValue({ creditCode, companyName });
            }
          }
        });
      } else {
        setUserType(USER_GENERAL); // 游客模式
      }
    }

    if (orderId?.length === 18) {
      getWishOrder({ id: orderId }).then((res) => {
        if (res.status === 200) {
          const { status } = res.data;
          // 除了草稿状态其他都禁止修改
          if (status !== '草稿') {
            setEditDisabled(true);
          } else {
            setEditDisabled(false);
          }

          setWishOrderData(res.data);
          setCityOption(getCityOptionByProvinceValue(res.data.province.value));
          refForm?.setFieldsValue({
            ...res.data,
            appCode: { label: res.data.appName, value: res.data.appCode },
            applicationMaterialUpload: {
              downloadUrl: res.data.applicationMaterial,
              fileName: res.data.fileName,
            },
          });
        } else {
          refForm?.setFieldsValue({});
          message.error(res.message);
        }
      });
    }
  }, [orderId, currentUser, refForm]);

  useEffect(() => {
    const temp = configArrayDefault(editDisabled);

    // 配置落地省份
    temp[6].children[0].select.option = areasCode
      .slice(1)
      .map((item) => ({ ...item, key: item.value }));

    // 配置落地地市
    if (cityOption) {
      temp[6].children[1].select.option = cityOption;
    }

    if (refForm) {
      // 将表单引用传给uploadFile组件
      if (temp[9].children[0].uploadFiles) {
        temp[9].children[0].uploadFiles.uploadFilesProps.formRef = refForm;
      }

      temp[6].children[0].select.onSelect = (province: SelectOptionType) => {
        refForm.resetFields(['city']);
        setCityOption(getCityOptionByProvinceValue(`${province.value}`));
      };
    }

    // 从mec跳过来，且带有默认参数
    if (mecParams) {
      const { mecId, mecIndustry, mecProductType, mecName } = mecParams;
      setIsMecType(true);
      refForm?.setFieldsValue({
        appCode: { value: mecId, label: mecName },
        industry: mecIndustry,
        productType: mecProductType,
      });

      // 禁止修改
      temp[5].children[0].select.disabled = true;
      temp[5].children[1].select.disabled = true;
      temp[5].children[2].select.disabled = true;
    } else {
      setIsMecType(false);
    }

    (async () => {
      const result = await getIntentEnums({ dataType: 'intentEnum' });
      if (result.status === 200) {
        temp[5].children[0].select.option = result.data.intentIndustry;
        temp[5].children[1].select.option = result.data.intentProductType;
        temp[5].children[2].select.option = result.data.intentApp;
      }

      if (userType === USER_GENERAL) {
        temp[2].children[0].config.label = '企业名称';
        temp[2].children[1].config.label = '企业社会信用代码';
        temp.splice(4, 1);
        temp.splice(6, 1);
        temp.splice(7, 1);
        setConfigArray(temp);
      } else if (userType === USER_PARTNER) {
        setConfigArray(temp);
      }
    })();
  }, [userType, refForm, cityOption, mecParams, editDisabled]);

  const onSave = async () => {
    refForm
      .validateFields()
      .then(async (value) => {
        setSaveLoading(true);
        const result = await postWishOrder(
          handleDataMiddle({ data: value, status: '0', isMecType }),
        );
        setSaveLoading(false);
        if (result.status === 200) {
          message.success(result.message);
        } else {
          message.error(result.message || '出错了');
        }
      })
      .catch((e) => console.log(114, e));
  };

  const onBack = () => {
    window.history.back();
  };

  const onFinish = async (params: any) => {
    const value = handleDataMiddle({ data: params, status: '1', isMecType });
    setSubmitLoading(true);
    const result = await postWishOrder(value);
    setSubmitLoading(false);
    if (result.status === 200) {
      refForm?.resetFields();
      message.success(result.message);
    } else {
      message.error(result.message || '出错了');
    }
  };

  const FormStepBtnArray: FormStepBtnProps = {
    config: [
      { key: '1', text: '返回', type: 'primary', ghost: true, onClick: onBack },
      {
        key: '2',
        text: '保存',
        type: 'primary',
        htmlType: 'button',
        ghost: true,
        style: { margin: '0 16px' },
        onClick: onSave,
        loading: saveLoading,
        disabled: editDisabled,
      },
      {
        key: '3',
        text: '提交',
        type: 'primary',
        htmlType: 'submit',
        loading: submitLoading,
        disabled: editDisabled,
      },
    ],
  };

  return (
    // 最外层容器控制背景色，高度，上边距
    <div className={styles['wish-order-container']}>
      <Form className={styles['wish-form']} onFinish={onFinish} form={refForm}>
        <p className={styles.title}>意向需求单</p>

        <div className={styles['apply-message-outer-container']}>
          {/* apply-message容器需要边框，边框外面还得有背景色，所以需要多一层 */}
          {wishOrderData?.status ? (
            // 意向单状态
            <div className={styles['order-status-container']}>
              <p>{`处理状态：${wishOrderData.status}`}</p>
              <p>{`指派客户经理：${wishOrderData.custManagerName || '暂无'}`}</p>
              <p>{`指派客户经理联系方式：${wishOrderData.custManagerPhone || '暂无'}`}</p>
            </div>
          ) : null}

          <div className={styles['apply-message-inner-container']}>
            <p className={styles['apply-message-title']}>申请信息</p>

            <div className={styles['form-item-container']}>
              {wishOrderData?.id && wishOrderData.createTimeStr ? (
                <p className={styles['order-number-time']}>
                  <span>{`合作申请单单号：${wishOrderData.idStr}`}</span>
                  <span>{`申请日期：${wishOrderData.createTimeStr.slice(
                    0,
                    4,
                  )}年${wishOrderData.createTimeStr.slice(
                    4,
                    6,
                  )}月${wishOrderData.createTimeStr.slice(6)}日`}</span>
                </p>
              ) : null}
              {renderFormItemRow(configArray)}
            </div>
          </div>
        </div>
        <div className={styles['wish-order-step-button-container']}>
          <FormStepBtn {...FormStepBtnArray} />
        </div>
      </Form>
    </div>
  );
};
export default connect(({ user }: any) => ({ currentUser: user.currentUser }))(WishOrder);
