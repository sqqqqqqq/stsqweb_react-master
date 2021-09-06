const validator = {
  phone: (/* { getFieldValue } */) => ({
    validator(_: any, value: string) {
      const pattern = /^1\d{10}$/;
      if (value === '' || value === undefined || value === null) {
        return Promise.reject();
      }
      if (!pattern.test(value)) {
        return Promise.reject(new Error('格式错误'));
      }
      return Promise.resolve();
    },
  }),
  idCardNumber: () => ({
    validator(_: any, value: string) {
      const pattern = /(^\d{15}$)|(^\d{17}[\d|X|x]{1})/;
      if (value === '' || value === undefined || value === null) {
        return Promise.reject();
      }
      if (!pattern.test(value)) {
        return Promise.reject(new Error('请输入15位或18位的身份证号'));
      }
      return Promise.resolve();
    },
  }),
  postalCode: () => ({
    validator(_: any, value: string) {
      const pattern = /^\d{6}$/;
      if (value === '' || value === undefined || value === null) {
        return Promise.reject();
      }
      if (!pattern.test(value)) {
        return Promise.reject(new Error('请输入6位数字的邮政编码'));
      }
      return Promise.resolve();
    },
  }),
  // 统一社会信用代码
  // 统一社会信用代码由18位数字或者大写字母组成，但是字母不包括 I、O、Z、S、V
  // 一共由五部分组成
  // 第一部分：登记管理部门代码1位 (数字或大写英文字母)
  // 第二部分：机构类别代码1位 (数字或大写英文字母)
  // 第三部分：登记管理机关行政区划码6位 (数字)
  // 第四部分：主体标识码（组织机构代码）9位 (数字或大写英文字母)
  // 第五部分：校验码1位 (数字或大写英文字母)
  creditCode: () => ({
    validator(_: any, value: string) {
      // 弱校验，18或15位
      const pattern = /^([\dA-Z]{2}\d{6}[\dA-Z]{10}|[\dA-Z]{15})$/;
      if (!value) {
        return Promise.reject();
      }
      if (!pattern.test(value)) {
        return Promise.reject(new Error('请输入18位或15位的代码'));
      }
      return Promise.resolve();
    },
  }),
};

export default validator;
