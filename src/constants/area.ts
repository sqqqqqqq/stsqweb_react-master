const provinceName = {
  '99': '全国',
  '11': '北京',
  '31': '上海',
  '51': '广东',
  '10': '内蒙古',
  '13': '天津',

  '17': '山东',
  '18': '河北',
  '19': '山西',
  '30': '安徽',
  '34': '江苏',

  '36': '浙江',
  '38': '福建',
  '50': '海南',
  '59': '广西',
  '70': '青海',

  '71': '湖北',
  '74': '湖南',
  '75': '江西',
  '76': '河南',
  '79': '西藏',

  '81': '四川',
  '83': '重庆',
  '84': '陕西',
  '85': '贵州',
  '86': '云南',

  '87': '甘肃',
  '88': '宁夏',
  '89': '新疆',
  '90': '吉林',
  '91': '辽宁',

  '97': '黑龙江',
};

const areasCode = [
  {
    value: '99',
    label: '全国',
    children: [],
  },
  {
    value: '11',
    label: '北京',
    children: [],
  },
  {
    value: '13',
    label: '天津',
    children: [],
  },
  {
    value: '18',
    label: '河北',
    children: [
      {
        label: '沧州',
        value: '180',
      },
      {
        label: '唐山',
        value: '181',
      },
      {
        label: '秦皇岛',
        value: '182',
      },
      {
        label: '廊坊',
        value: '183',
      },
      {
        label: '张家口',
        value: '184',
      },
      {
        label: '邢台',
        value: '185',
      },
      {
        label: '邯郸',
        value: '186',
      },
      {
        label: '保定',
        value: '187',
      },
      {
        label: '石家庄',
        value: '188',
      },
      {
        label: '承德',
        value: '189',
      },
      {
        label: '衡水',
        value: '720',
      },
      {
        label: '雄安新区',
        value: '728',
      },
    ],
  },
  {
    value: '19',
    label: '山西',
    children: [
      {
        label: '太原',
        value: '190',
      },
      {
        label: '晋中',
        value: '191',
      },
      {
        label: '阳泉',
        value: '192',
      },
      {
        label: '大同',
        value: '193',
      },
      {
        label: '晋城',
        value: '194',
      },
      {
        label: '长治',
        value: '195',
      },
      {
        label: '运城',
        value: '196',
      },
      {
        label: '临汾',
        value: '197',
      },
      {
        label: '忻州',
        value: '198',
      },
      {
        label: '朔州',
        value: '199',
      },
      {
        label: '吕梁',
        value: '200',
      },
    ],
  },
  {
    value: '10',
    label: '内蒙古',
    children: [
      {
        label: '呼和浩特',
        value: '101',
      },
      {
        label: '包头',
        value: '102',
      },
      {
        label: '乌兰察布盟',
        value: '103',
      },
      {
        label: '鄂尔多斯',
        value: '104',
      },
      {
        label: '巴彦淖尔',
        value: '105',
      },
      {
        label: '乌海',
        value: '106',
      },
      {
        label: '赤峰',
        value: '107',
      },
      {
        label: '呼伦贝尔',
        value: '108',
      },
      {
        label: '通辽',
        value: '109',
      },
      {
        label: '锡林郭勒',
        value: '111',
      },
      {
        label: '兴安盟',
        value: '113',
      },
      {
        label: '阿拉善盟',
        value: '114',
      },
    ],
  },
  {
    value: '91',
    label: '辽宁',
    children: [
      {
        label: '沈阳',
        value: '910',
      },
      {
        label: '铁岭',
        value: '911',
      },
      {
        label: '鞍山',
        value: '912',
      },
      {
        label: '抚顺',
        value: '913',
      },
      {
        label: '本溪',
        value: '914',
      },
      {
        label: '丹东',
        value: '915',
      },
      {
        label: '锦州',
        value: '916',
      },
      {
        label: '营口',
        value: '917',
      },
      {
        label: '阜新',
        value: '918',
      },
      {
        label: '辽阳',
        value: '919',
      },
      {
        label: '朝阳',
        value: '920',
      },
      {
        label: '盘锦',
        value: '921',
      },
      {
        label: '葫芦岛',
        value: '922',
      },
      {
        label: '大连',
        value: '940',
      },
    ],
  },
  {
    value: '90',
    label: '吉林',
    children: [
      {
        label: '长春',
        value: '901',
      },
      {
        label: '四平',
        value: '903',
      },
      {
        label: '松原',
        value: '904',
      },
      {
        label: '通化',
        value: '905',
      },
      {
        label: '辽源',
        value: '906',
      },
      {
        label: '白城',
        value: '907',
      },
      {
        label: '白山',
        value: '908',
      },
      {
        label: '延边',
        value: '909',
      },
    ],
  },
  {
    value: '97',
    label: '黑龙江',
    children: [
      {
        label: '哈尔滨',
        value: '971',
      },
      {
        label: '齐齐哈尔',
        value: '973',
      },
      {
        label: '佳木斯',
        value: '976',
      },
      {
        label: '大庆',
        value: '981',
      },
      {
        label: '牡丹江',
        value: '988',
      },
      {
        label: '绥化',
        value: '989',
      },
      {
        label: '黑河',
        value: '990',
      },
      {
        label: '鸡西',
        value: '991',
      },
      {
        label: '七台河',
        value: '992',
      },
      {
        label: '鹤岗',
        value: '993',
      },
      {
        label: '双鸭山',
        value: '994',
      },
      {
        label: '大兴安岭',
        value: '995',
      },
      {
        label: '伊春',
        value: '996',
      },
    ],
  },
  {
    value: '31',
    label: '上海',
    children: [],
  },
  {
    value: '34',
    label: '江苏',
    children: [
      {
        label: '无锡',
        value: '330',
      },
      {
        label: '南京',
        value: '340',
      },
      {
        label: '镇江',
        value: '343',
      },
      {
        label: '连云港',
        value: '346',
      },
      {
        label: '盐城',
        value: '348',
      },
      {
        label: '宿迁',
        value: '349',
      },
      {
        label: '徐州',
        value: '350',
      },
      {
        label: '淮安',
        value: '354',
      },
      {
        label: '南通',
        value: '358',
      },
      {
        label: '扬州',
        value: '430',
      },
      {
        label: '常州',
        value: '440',
      },
      {
        label: '泰州',
        value: '445',
      },
      {
        label: '苏州',
        value: '450',
      },
    ],
  },
  {
    value: '36',
    label: '浙江',
    children: [
      {
        label: '杭州',
        value: '360',
      },
      {
        label: '湖州',
        value: '362',
      },
      {
        label: '嘉兴',
        value: '363',
      },
      {
        label: '舟山',
        value: '364',
      },
      {
        label: '绍兴',
        value: '365',
      },
      {
        label: '金华',
        value: '367',
      },
      {
        label: '宁波',
        value: '370',
      },
      {
        label: '衢州',
        value: '468',
      },
      {
        label: '丽水',
        value: '469',
      },
      {
        label: '温州',
        value: '470',
      },
      {
        label: '台州',
        value: '476',
      },
    ],
  },
  {
    value: '30',
    label: '安徽',
    children: [
      {
        label: '马鞍山',
        value: '300',
      },
      {
        label: '蚌埠',
        value: '301',
      },
      {
        label: '安庆',
        value: '302',
      },
      {
        label: '芜湖',
        value: '303',
      },
      {
        label: '六安',
        value: '304',
      },
      {
        label: '合肥',
        value: '305',
      },
      {
        label: '阜阳',
        value: '306',
      },
      {
        label: '淮南',
        value: '307',
      },
      {
        label: '铜陵',
        value: '308',
      },
      {
        label: '巢湖',
        value: '309',
      },
      {
        label: '宣城',
        value: '311',
      },
      {
        label: '滁州',
        value: '312',
      },
      {
        label: '宿州',
        value: '313',
      },
      {
        label: '淮北',
        value: '314',
      },
      {
        label: '黄山',
        value: '316',
      },
      {
        label: '池州',
        value: '317',
      },
      {
        label: '亳州',
        value: '318',
      },
    ],
  },
  {
    value: '38',
    label: '福建',
    children: [
      {
        label: '福州',
        value: '380',
      },
      {
        label: '龙岩',
        value: '384',
      },
      {
        label: '莆田',
        value: '385',
      },
      {
        label: '宁德',
        value: '386',
      },
      {
        label: '南平',
        value: '387',
      },
      {
        label: '三明',
        value: '389',
      },
      {
        label: '厦门',
        value: '390',
      },
      {
        label: '漳州',
        value: '395',
      },
      {
        label: '泉州',
        value: '480',
      },
    ],
  },
  {
    value: '75',
    label: '江西',
    children: [
      {
        label: '景德镇',
        value: '740',
      },
      {
        label: '南昌',
        value: '750',
      },
      {
        label: '吉安',
        value: '751',
      },
      {
        label: '赣州',
        value: '752',
      },
      {
        label: '新余',
        value: '753',
      },
      {
        label: '鹰潭',
        value: '754',
      },
      {
        label: '九江',
        value: '755',
      },
      {
        label: '宜春',
        value: '756',
      },
      {
        label: '上饶',
        value: '757',
      },
      {
        label: '萍乡',
        value: '758',
      },
      {
        label: '抚州',
        value: '759',
      },
    ],
  },
  {
    value: '17',
    label: '山东',
    children: [
      {
        label: '淄博',
        value: '150',
      },
      {
        label: '滨州',
        value: '151',
      },
      {
        label: '威海',
        value: '152',
      },
      {
        label: '临沂',
        value: '153',
      },
      {
        label: '日照',
        value: '154',
      },
      {
        label: '潍坊',
        value: '155',
      },
      {
        label: '东营',
        value: '156',
      },
      {
        label: '枣庄',
        value: '157',
      },
      {
        label: '济宁',
        value: '158',
      },
      {
        label: '菏泽',
        value: '159',
      },
      {
        label: '莱芜',
        value: '160',
      },
      {
        label: '烟台',
        value: '161',
      },
      {
        label: '青岛',
        value: '166',
      },
      {
        label: '济南',
        value: '170',
      },
      {
        label: '泰安',
        value: '172',
      },
      {
        label: '德州',
        value: '173',
      },
      {
        label: '聊城',
        value: '174',
      },
    ],
  },
  {
    value: '76',
    label: '河南',
    children: [
      {
        label: '郑州',
        value: '760',
      },
      {
        label: '洛阳',
        value: '761',
      },
      {
        label: '开封',
        value: '762',
      },
      {
        label: '焦作',
        value: '763',
      },
      {
        label: '新乡',
        value: '764',
      },
      {
        label: '许昌',
        value: '765',
      },
      {
        label: '漯河',
        value: '766',
      },
      {
        label: '安阳',
        value: '767',
      },
      {
        label: '商丘',
        value: '768',
      },
      {
        label: '平顶山',
        value: '769',
      },
      {
        label: '周口',
        value: '770',
      },
      {
        label: '驻马店',
        value: '771',
      },
      {
        label: '三门峡',
        value: '772',
      },
      {
        label: '濮阳',
        value: '773',
      },
      {
        label: '鹤壁',
        value: '774',
      },
      {
        label: '济源',
        value: '775',
      },
      {
        label: '信阳',
        value: '776',
      },
      {
        label: '南阳',
        value: '777',
      },
    ],
  },
  {
    value: '71',
    label: '湖北',
    children: [
      {
        label: '武汉',
        value: '710',
      },
      {
        label: '宜昌',
        value: '711',
      },
      {
        label: '荆州',
        value: '712',
      },
      {
        label: '江汉',
        value: '713',
      },
      {
        label: '黄冈',
        value: '714',
      },
      {
        label: '黄石',
        value: '715',
      },
      {
        label: '襄阳',
        value: '716',
      },
      {
        label: '孝感',
        value: '717',
      },
      {
        label: '鄂州',
        value: '718',
      },
      {
        label: '咸宁',
        value: '719',
      },
      {
        label: '十堰',
        value: '721',
      },
      {
        label: '神农架',
        value: '722',
      },
      {
        label: '随州',
        value: '723',
      },
      {
        label: '荆门',
        value: '724',
      },
      {
        label: '恩施',
        value: '727',
      },
    ],
  },
  {
    value: '74',
    label: '湖南',
    children: [
      {
        label: '长沙',
        value: '741',
      },
      {
        label: '株州',
        value: '742',
      },
      {
        label: '湘潭',
        value: '743',
      },
      {
        label: '衡阳',
        value: '744',
      },
      {
        label: '岳阳',
        value: '745',
      },
      {
        label: '益阳',
        value: '747',
      },
      {
        label: '郴州',
        value: '748',
      },
      {
        label: '常德',
        value: '749',
      },
      {
        label: '娄底',
        value: '791',
      },
      {
        label: '邵阳',
        value: '792',
      },
      {
        label: '湘西自治州',
        value: '793',
      },
      {
        label: '张家界',
        value: '794',
      },
      {
        label: '怀化',
        value: '795',
      },
      {
        label: '永州',
        value: '796',
      },
    ],
  },
  {
    value: '51',
    label: '广东',
    children: [
      {
        label: '广州',
        value: '510',
      },
      {
        label: '湛江',
        value: '520',
      },
      {
        label: '汕尾',
        value: '525',
      },
      {
        label: '揭阳',
        value: '526',
      },
      {
        label: '梅州',
        value: '528',
      },
      {
        label: '佛山',
        value: '530',
      },
      {
        label: '潮州',
        value: '531',
      },
      {
        label: '清远',
        value: '535',
      },
      {
        label: '肇庆',
        value: '536',
      },
      {
        label: '云浮',
        value: '538',
      },
      {
        label: '深圳',
        value: '540',
      },
      {
        label: '江门',
        value: '550',
      },
      {
        label: '中山',
        value: '556',
      },
      {
        label: '韶关',
        value: '558',
      },
      {
        label: '汕头',
        value: '560',
      },
      {
        label: '阳江',
        value: '565',
      },
      {
        label: '茂名',
        value: '568',
      },
      {
        label: '惠州',
        value: '570',
      },
      {
        label: '东莞',
        value: '580',
      },
      {
        label: '珠海',
        value: '620',
      },
      {
        label: '河源',
        value: '670',
      },
    ],
  },
  {
    value: '59',
    label: '广西',
    children: [
      {
        label: '贺州',
        value: '588',
      },
      {
        label: '贵港',
        value: '589',
      },
      {
        label: '防城港',
        value: '590',
      },
      {
        label: '南宁',
        value: '591',
      },
      {
        label: '桂林',
        value: '592',
      },
      {
        label: '柳州',
        value: '593',
      },
      {
        label: '梧州',
        value: '594',
      },
      {
        label: '玉林',
        value: '595',
      },
      {
        label: '百色',
        value: '596',
      },
      {
        label: '钦州',
        value: '597',
      },
      {
        label: '河池',
        value: '598',
      },
      {
        label: '北海',
        value: '599',
      },
      {
        label: '崇左',
        value: '600',
      },
      {
        label: '来宾',
        value: '601',
      },
    ],
  },
  {
    value: '50',
    label: '海南',
    children: [
      {
        label: '三亚',
        value: '502',
      },
      {
        label: '儋州',
        value: '503',
      },
      {
        label: '海口',
        value: '504',
      },
    ],
  },
  {
    value: '83',
    label: '重庆',
    children: [],
  },
  {
    value: '81',
    label: '四川',
    children: [
      {
        label: '成都',
        value: '810',
      },
      {
        label: '雅安',
        value: '811',
      },
      {
        label: '凉山',
        value: '812',
      },
      {
        label: '攀枝花',
        value: '813',
      },
      {
        label: '乐山',
        value: '814',
      },
      {
        label: '泸州',
        value: '815',
      },
      {
        label: '内江',
        value: '816',
      },
      {
        label: '宜宾',
        value: '817',
      },
      {
        label: '自贡',
        value: '818',
      },
      {
        label: '眉山',
        value: '819',
      },
      {
        label: '达州',
        value: '820',
      },
      {
        label: '遂宁',
        value: '821',
      },
      {
        label: '南充',
        value: '822',
      },
      {
        label: '广安',
        value: '823',
      },
      {
        label: '绵阳',
        value: '824',
      },
      {
        label: '德阳',
        value: '825',
      },
      {
        label: '广元',
        value: '826',
      },
      {
        label: '巴中',
        value: '827',
      },
      {
        label: '甘孜',
        value: '828',
      },
      {
        label: '阿坝',
        value: '829',
      },
      {
        label: '资阳',
        value: '830',
      },
    ],
  },
  {
    value: '85',
    label: '贵州',
    children: [
      {
        label: '铜仁',
        value: '785',
      },
      {
        label: '黔东南',
        value: '786',
      },
      {
        label: '遵义',
        value: '787',
      },
      {
        label: '黔南',
        value: '788',
      },
      {
        label: '安顺',
        value: '789',
      },
      {
        label: '贵阳',
        value: '850',
      },
      {
        label: '毕节',
        value: '851',
      },
      {
        label: '黔西南',
        value: '852',
      },
      {
        label: '六盘水',
        value: '853',
      },
      {
        label: '贵安',
        value: '854',
      },
    ],
  },
  {
    value: '86',
    label: '云南',
    children: [
      {
        label: '德宏',
        value: '730',
      },
      {
        label: '保山',
        value: '731',
      },
      {
        label: '文山',
        value: '732',
      },
      {
        label: '临沧',
        value: '733',
      },
      {
        label: '怒江',
        value: '734',
      },
      {
        label: '迪庆',
        value: '735',
      },
      {
        label: '西双版纳',
        value: '736',
      },
      {
        label: '昆明',
        value: '860',
      },
      {
        label: '红河',
        value: '861',
      },
      {
        label: '大理',
        value: '862',
      },
      {
        label: '丽江',
        value: '863',
      },
      {
        label: '楚雄',
        value: '864',
      },
      {
        label: '玉溪',
        value: '865',
      },
      {
        label: '曲靖',
        value: '866',
      },
      {
        label: '昭通',
        value: '867',
      },
      {
        label: '普洱',
        value: '869',
      },
    ],
  },
  {
    value: '79',
    label: '西藏',
    children: [
      {
        label: '拉萨',
        value: '790',
      },
      {
        label: '日喀则',
        value: '797',
      },
      {
        label: '山南',
        value: '798',
      },
      {
        label: '林芝',
        value: '799',
      },
      {
        label: '昌都',
        value: '800',
      },
      {
        label: '那曲',
        value: '801',
      },
      {
        label: '阿里',
        value: '802',
      },
    ],
  },
  {
    value: '84',
    label: '陕西',
    children: [
      {
        label: '宝鸡',
        value: '840',
      },
      {
        label: '西安',
        value: '841',
      },
      {
        label: '延安',
        value: '842',
      },
      {
        label: '渭南',
        value: '843',
      },
      {
        label: '咸阳',
        value: '844',
      },
      {
        label: '榆林',
        value: '845',
      },
      {
        label: '铜川',
        value: '846',
      },
      {
        label: '商洛',
        value: '847',
      },
      {
        label: '安康',
        value: '848',
      },
      {
        label: '汉中',
        value: '849',
      },
    ],
  },
  {
    value: '87',
    label: '甘肃',
    children: [
      {
        label: '兰州',
        value: '870',
      },
      {
        label: '定西',
        value: '871',
      },
      {
        label: '平凉',
        value: '872',
      },
      {
        label: '庆阳',
        value: '873',
      },
      {
        label: '武威',
        value: '874',
      },
      {
        label: '张掖',
        value: '875',
      },
      {
        label: '嘉峪关',
        value: '876',
      },
      {
        label: '天水',
        value: '877',
      },
      {
        label: '临夏',
        value: '878',
      },
      {
        label: '白银',
        value: '879',
      },
      {
        label: '金昌',
        value: '930',
      },
      {
        label: '酒泉',
        value: '931',
      },
      {
        label: '陇南',
        value: '960',
      },
      {
        label: '甘南',
        value: '961',
      },
    ],
  },
  {
    value: '70',
    label: '青海',
    children: [
      {
        label: '西宁',
        value: '700',
      },
      {
        label: '海东',
        value: '701',
      },
      {
        label: '格尔木',
        value: '702',
      },
      {
        label: '海西州',
        value: '704',
      },
      {
        label: '海南州',
        value: '705',
      },
      {
        label: '海北州',
        value: '706',
      },
      {
        label: '黄南州',
        value: '707',
      },
      {
        label: '果洛州',
        value: '708',
      },
      {
        label: '玉树州',
        value: '709',
      },
    ],
  },
  {
    value: '88',
    label: '宁夏',
    children: [
      {
        label: '银川',
        value: '880',
      },
      {
        label: '吴忠',
        value: '883',
      },
      {
        label: '石嘴山',
        value: '884',
      },
      {
        label: '固原',
        value: '885',
      },
      {
        label: '中卫',
        value: '886',
      },
    ],
  },
  {
    value: '89',
    label: '新疆',
    children: [
      {
        label: '乌鲁木齐',
        value: '890',
      },
      {
        label: '昌吉',
        value: '891',
      },
      {
        label: '奎屯',
        value: '892',
      },
      {
        label: '石河子',
        value: '893',
      },
      {
        label: '吐鲁番',
        value: '894',
      },
      {
        label: '巴州',
        value: '895',
      },
      {
        label: '阿克苏',
        value: '896',
      },
      {
        label: '喀什',
        value: '897',
      },
      {
        label: '伊犁',
        value: '898',
      },
      {
        label: '克拉玛依',
        value: '899',
      },
      {
        label: '哈密',
        value: '900',
      },
      {
        label: '博乐',
        value: '951',
      },
      {
        label: '塔城',
        value: '952',
      },
      {
        label: '阿勒泰',
        value: '953',
      },
      {
        label: '克州',
        value: '954',
      },
      {
        label: '和田',
        value: '955',
      },
    ],
  },
  {
    value: '22',
    label: '澳门',
    children: [],
  },
];

// 为areasCode每一项配置key值(TreeSelect组件需要key值)
const treeSelectData = areasCode.map((item: any) => {
  const itemCopy = { ...item, key: item.value };
  itemCopy.children = itemCopy.children.map((childrenItem: any) => {
    return { ...childrenItem, key: childrenItem.value };
  });
  return { ...itemCopy };
});

// 根据地市编码值获取对应的名称，如传入['51', '11', '180']，返回[ '广东', '北京', '沧州' ]
const getAreasNameByCode = (codeArray: string[]): string[] => {
  const areasName = [];
  // 遍历codeArray
  for (let i = 0; i < codeArray.length; i += 1) {
    // 遍历treeSelectData
    for (let j = 0; j < treeSelectData.length; j += 1) {
      // 比对codeArray[i]是否包含treeSelectData[j]的value
      if (codeArray.indexOf(treeSelectData[j].value) > -1) {
        // 包含的话，则判断是否等，等的话就返回label，继续下一次遍历
        if (codeArray[i] === treeSelectData[j].value) {
          areasName.push(treeSelectData[j].label);
          break;
        } else {
          // 不等的话，说明treeSelectData[j]的children中含有codeArray[i]，找到他并得到他的label
          for (let k = 0; k < treeSelectData[j].children.length; k += 1) {
            if (codeArray[i] === treeSelectData[j].children[k].value) {
              areasName.push(treeSelectData[j].children[k].label);
              break;
            }
          }
        }
      }
    }
  }
  return areasName;
};

// 根据地市名称获取对应的编码值，如传入[ '广东省', '北京', '沧州' ]，返回['51', '11', '180']
const getAreasCodeByName = (nameArray: string[]): string[] => {
  const areasValue = [];
  // 遍历nameArray
  for (let i = 0; i < nameArray.length; i += 1) {
    // 遍历treeSelectData
    for (let j = 0; j < treeSelectData.length; j += 1) {
      // 比对nameArray[i]是否包含treeSelectData[j]的label，考虑到传入的可能是广东省而不是广东，所以不直接判等
      if (nameArray[i].indexOf(treeSelectData[j].label) > -1) {
        areasValue.push(treeSelectData[j].value);
        break;
      } else if (treeSelectData[j].children) {
        // 继续遍历其children(如果有)
        for (let k = 0; k < treeSelectData[j].children.length; k += 1) {
          if (nameArray[i].indexOf(treeSelectData[j].children[k].label) > -1) {
            areasValue.push(treeSelectData[j].children[k].value);
            break;
          }
        }
      }
    }
  }
  return areasValue;
};

// 根据省份获取对应的地市
const getCityByProvince = (provinceString: string): any => {
  let result: any = [];
  for (let i = 0; i < areasCode.length; i += 1) {
    if (areasCode[i].value === provinceString) {
      // children不为空时返回children,否则返回省份本身
      if (areasCode[i].children.length > 0) {
        result = areasCode[i].children;
      } else {
        result = areasCode[i];
      }
      break;
    }
  }
  return result;
};

// 配置areaList，后端需要这个字段
const getAreaList = (areas: string[]) => {
  return areas.map((item: string) => {
    const areaListItem = {
      type: '1',
      provinceCode: item,
      cityCode: '',
    };

    // item的长度为3时，即市级
    if (item.length === 3) {
      areaListItem.type = '2';
      areaListItem.cityCode = item;
      areaListItem.provinceCode = item.slice(0, 2);
    }

    return areaListItem;
  });
};
export default {
  provinceName,
};
export {
  areasCode,
  treeSelectData,
  getAreasNameByCode,
  getAreasCodeByName,
  getCityByProvince,
  getAreaList,
};
