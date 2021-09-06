import React, { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import { FormTitle, initialFormValue, renderFormItemRow, FormStepBtn } from '@/components/FormItem';
import { enterpriseMsgArr, enterpriseOrgCodeArr } from '../BloomFormMsg';
import { contactMsgArr, projectMsgArr1, projectMsgArr2, unionCompanyMsgArr } from '../BloomFormMsg';
import type { RenderItemConfigOut } from '@/components/FormItem/interface';
import { obtainCompanyInfo, bloomGetUserCompanyInfo, saveCompanyInfo } from '@/services/portal';
import styles from '../../index.less';

const COMPANY_INFO_1 = 'company_info_1';

const FirstPage = (props: { onFinishCallback: () => void }) => {
  const { onFinishCallback } = props;

  const [firstPageInitialValue] = useState({
    ...initialFormValue(enterpriseMsgArr),
  });

  const [form] = Form.useForm();

  const [isLoading1, setIsLoading1] = useState<boolean>(false);

  const [isLoading2, setIsLoading2] = useState<boolean>(false);

  // search配置
  const searchItem: RenderItemConfigOut[] = JSON.parse(JSON.stringify(enterpriseOrgCodeArr));

  searchItem[0].children[0].search = {
    ...searchItem[0].children[0].search,
    loading: isLoading1,
    onSearch: (value) => {
      setIsLoading1(true);
      obtainCompanyInfo({ orgCode: value })
        .then((res) => {
          setIsLoading1(false);
          console.log('统一社会代码查询', res);
          if (res.status === 400) {
            message.error('统一社会信用代码不正确');
          } else {
            form.setFieldsValue(res.companyInfo);
            localStorage.setItem(COMPANY_INFO_1, JSON.stringify(res));
          }
          // setFirstPageInitialValue({
          //   ...initialFormValue(enterpriseMsgArr),
          //   ...res.companyInfo,
          // });
        })
        .catch((e) => {
          setIsLoading1(false);
          console.log('查询社会代码', e);
        });
    },
  };

  useEffect(() => {
    const value = localStorage.getItem('company_info_1');
    if (value) {
      form.setFieldsValue({ ...JSON.parse(value).companyInfo });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = async (value: any) => {
    const storageInfo = JSON.parse(localStorage.getItem(COMPANY_INFO_1) || '{}');
    if (storageInfo.companyInfo) {
      storageInfo.companyInfo = {
        ...storageInfo.companyInfo,
        ...value,
      };
      localStorage.setItem('company_info_1', JSON.stringify({ ...storageInfo }));

      setIsLoading2(true);
      try {
        const result1 = await bloomGetUserCompanyInfo({
          stpartyCode: storageInfo.companyInfo.stpartyCode,
        });
        if (result1.status === 200 || result1.status === 201) {
          // enterpriseImgId是以英文逗号分开的imgUrl
          const param = {
            ...storageInfo.companyInfo,
            enterpriseImgId: [
              '/partners/image/202106/1622788997358/img1.jpg?Expires=1622792597&OSSAccessKeyId=ezFM9xmuC2GGA4Zm&Signature=IqNkxON%2FHwfVyPhPgrhw9fLb3cQ%3D',
            ],
          };
          const result2 = await saveCompanyInfo(param);
          setIsLoading2(false);
          if (result2.companyInfo) {
            onFinishCallback();
          } else {
            message.error('出错了，请重试');
            console.log('saveCompanyInfo接口报错', result2);
          }
        } else {
          setIsLoading2(false);
          message.error('请联系企业管理员审批或者网站管理人员');
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      message.error('未查询到企业信息');
    }
  };

  return (
    <>
      <Form>
        <div className={styles['form-sub-container-style']}>
          <FormTitle title="关联企业" className={styles['form-title']} />
          <div className={styles['form-three-container-style']}>
            {renderFormItemRow(searchItem)}
          </div>
        </div>
      </Form>
      <Form initialValues={firstPageInitialValue} onFinish={onFinish} form={form}>
        <div className={styles['form-sub-container-style']}>
          <FormTitle title="企业基本信息" className={styles['form-title']} />
          <div className={styles['form-three-container-style']}>
            {renderFormItemRow(enterpriseMsgArr)}
            <FormStepBtn
              config={[
                {
                  text: '下一步',
                  htmlType: 'submit',
                  key: '1',
                  type: 'primary',
                  loading: isLoading2,
                  style: { marginTop: '20px' },
                },
              ]}
            />
          </div>
        </div>
      </Form>
    </>
  );
};

const SecondPage = (props: { back: () => void }) => {
  const { back } = props;
  return (
    <Form
      onFinish={(values) => {
        console.log(9, values);
      }}
    >
      <div className={styles['form-sub-container-style']}>
        <FormTitle title="企业填报项目" className={styles['form-title']} />
        <div className={styles['form-three-container-style']}>
          {renderFormItemRow(projectMsgArr1)}
        </div>
      </div>

      <div className={styles['form-sub-container-style']}>
        <FormTitle title="联系人信息" className={styles['form-title']} />
        <div className={styles['form-three-container-style']}>
          {renderFormItemRow(contactMsgArr)}
        </div>
      </div>

      <div className={styles['form-sub-container-style']}>
        <FormTitle title="项目信息" className={styles['form-title']} />
        <div className={styles['form-three-container-style']}>
          {renderFormItemRow(projectMsgArr2)}
        </div>
      </div>

      <div className={styles['form-sub-container-style']}>
        <FormTitle
          title="联合单位信息 (若需要填写，请务必填写完整)"
          className={styles['form-title']}
        />
        <div className={styles['form-three-container-style']}>
          {renderFormItemRow(unionCompanyMsgArr)}
        </div>
      </div>

      <FormStepBtn
        config={[
          {
            text: '返回',
            htmlType: 'button',
            span: 2,
            onClick: back,
            key: '1',
            style: { marginTop: '20px' },
          },
          { text: '下一步', htmlType: 'submit', span: 2, key: '2', style: { marginTop: '20px' } },
        ]}
      />
    </Form>
  );
};

const Enterprise = () => {
  const [currentPage, setCurrentPage] = useState<'1' | '2'>('1');

  useEffect(() => {
    return () => {
      localStorage.removeItem('company_info_1');
    };
  }, []);

  const handleFirstPageSubmit = () => {
    setCurrentPage('2');
  };

  const handleSecondPageBack = () => {
    setCurrentPage('1');
  };

  return currentPage === '1' ? (
    <FirstPage onFinishCallback={handleFirstPageSubmit} />
  ) : (
    <SecondPage back={handleSecondPageBack} />
  );
};

export default Enterprise;
