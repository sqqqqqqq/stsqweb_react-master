const INDUSTRY = {
  '38': { text: '交通物流' },
  '39': { text: '教育' },
  '40': { text: '文旅' },
  '41': { text: '新媒体' },
  '42': { text: '生态环境' },
  '43': { text: '金融银行' },
  '44': { text: '医疗健康' },
  '45': { text: '冬奥' },
  '46': { text: '工业互联网' },
  '47': { text: '能源' },
  '48': { text: '智慧城市' },
  '49': { text: '数字政府' },
  '50': { text: '其他' },
};

const STATUS = {
  '1': {
    text: '待审核',
    status: 'Processing',
  },
  '2': {
    text: '已保存',
    status: 'Default',
  },
  '3': {
    text: '已上架',
    status: 'Success',
  },
  '4': {
    text: '已下架',
    status: 'Error',
  },
  '5': {
    text: '审核未通过',
    status: 'Error',
  },
};

export default {
  INDUSTRY,
  STATUS,
};
