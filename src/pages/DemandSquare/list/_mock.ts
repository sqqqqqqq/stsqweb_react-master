const taskListFlow = {
  status: 200,
  message: null,
  data: [
    {
      contactName: '测试',
      companyName: '王雷肖的公司',
      industry: '数字政府',
      id: 310343938674688,
      title: '测试申请单',
      contactPhone: '123456',
      productType: '大数据',
      status: '2',
    },
    {
      contactName: 'ewqewqe',
      companyName: 'wewq',
      industry: '智慧教育',
      id: 2103221626320042,
      title: '测试2',
      contactPhone: '18620028594',
      productType: '云计算',
      status: '1',
    },
  ],
  totalElements: 2,
  totalPages: 1,
  succeed: true,
};

export default {
  'GET /partners/cu5g/lib/getIntentList': taskListFlow,
};
