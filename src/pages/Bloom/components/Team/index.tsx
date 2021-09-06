import React from 'react';
import { Form } from 'antd';
import { FormTitle, renderFormItemRow, FormStepBtn } from '@/components/FormItem';
import { contactMsgArr, projectMsgArr1, projectMsgArr2, teamInfoMsgArr } from '../BloomFormMsg';
import styles from '../../index.less';

const Team = () => {
  return (
    <Form>
      <div className={styles['form-sub-container-style']}>
        <FormTitle title="团队填报项目" className={styles['form-title']} />
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
        <FormTitle title="团队 (若需要填写，请务必填写完整)" className={styles['form-title']} />
        <div className={styles['form-three-container-style']}>
          {renderFormItemRow(teamInfoMsgArr)}
        </div>
      </div>
      <FormStepBtn
        config={[{ text: '下一步', htmlType: 'submit', key: '1', style: { marginTop: '20px' } }]}
      />
    </Form>
  );
};

export default Team;
