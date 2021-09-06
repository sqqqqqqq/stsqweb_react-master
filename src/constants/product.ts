// 产品类型，对应名称
const TYPE = {
  ALL: 'ALL',
  SAAS: 'SAAS',
  PAAS: 'PAAS',
  IAAS: 'IAAS',
  SOLU: 'SOLU',
  SERV: 'SERV',
};

const TYPE_NAME = {
  ALL: '全部',
  SAAS: 'SAAS应用类',
  PAAS: 'PAAS平台类',
  IAAS: 'IAAS硬件类',
  SOLU: '解决方案类',
  SERV: '服务支撑类',
};

// 产品类型，对应规格编码开头
// !! 暂不用DDX这种命名，直接以SASS这种来作为开头
// const TYPE_SPEC_PREFIX = {
//   SAAS: 'DDS',
//   PAAS: 'DDP',
//   IAAS: 'DDI',
//   SOLU: 'DDJ',
//   SERV: 'DDW',
// };

const STATUS = {
  ALL: 'ALL',
  UNAUDITED: 'UNAUDITED',
  REJECTED: 'REJECTED',
  PRODUCTPUBLISH: 'PRODUCTPUBLISH',
  ONSHELF: 'ONSHELF',
  OFFSHELF: 'OFFSHELF',
};

const STATUS_NAME = {
  ALL: '全部',
  UNAUDITED: '待审核',
  REJECTED: '审核不通过',
  ONSHELF: '已上架',
  OFFSHELF: '已下架',
};

// 审核结果
const TASK_FLOW = {
  PASS: 'productPublish',
  REJECTED: 'productVerify',
};

// 审核类型
// const TASK_TYPE = {
//   PRODUCTVERIFY: 'productVerify',
//   PRODUCTITEMVERIFY: 'productItemVerify'
// }

export default {
  TYPE,
  TYPE_NAME,
  // TYPE_SPEC_PREFIX,
  STATUS,
  STATUS_NAME,
  TASK_FLOW,
  // TASK_TYPE
};
