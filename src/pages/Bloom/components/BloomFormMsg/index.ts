import type { SelectOptionType, RenderItemConfigOut } from '@/components/FormItem/interface';
import validator from '@/utils/validator';
import styles from '../../index.less';
// 单位性质
const NatureOfUnitArr: SelectOptionType[] = [
  {
    label: '国家行政企业',
    value: '1',
    key: '1',
  },
  {
    label: '公司合作企业',
    value: '2',
    key: '2',
  },
  {
    label: '中外合资企业',
    value: '3',
    key: '3',
  },
  {
    label: '社会组织机构',
    value: '4',
    key: '4',
  },
  {
    label: '国际组织机构',
    value: '5',
    key: '5',
  },
  {
    label: '外资企业',
    value: '6',
    key: '6',
  },
  {
    label: '私营企业',
    value: '7',
    key: '7',
  },
  {
    label: '集体企业',
    value: '8',
    key: '8',
  },
  {
    label: '国防军事企业',
    value: '9',
    key: '9',
  },
];

// 企业信用代码查询
const enterpriseOrgCodeArr: RenderItemConfigOut[] = [
  {
    key: '1',
    children: [
      {
        type: 'search',
        key: '1-1',
        config: {
          label: '统一社会信用代码',
          name: 'orgCodeSearch',
          rules: [{ required: true }],
        },
        search: {
          placeholder: '请输入统一社会信用代码',
        },
      },
    ],
  },
];

// 企业基本信息
const enterpriseMsgArr: RenderItemConfigOut[] = [
  {
    key: '2',
    children: [
      {
        type: 'text',
        key: '2-1',
        config: {
          label: '单位中文名',
          name: 'cooName',
          disabled: true,
        },
      },
      {
        type: 'text',
        key: '2-2',
        config: {
          label: '统一社会信用代码',
          name: 'orgCode',
          disabled: true,
        },
      },
    ],
  },
  {
    key: '3',
    children: [
      {
        type: 'text',
        key: '3-1',
        config: {
          label: '通讯地址',
          name: 'orgAddress',
          disabled: true,
        },
      },
    ],
  },
  {
    key: '4',
    children: [
      {
        type: 'text',
        key: '4-1',
        config: {
          label: '单位成立时间',
          name: 'establishmentTime',
          disabled: true,
        },
      },
      {
        type: 'text',
        key: '4-2',
        config: {
          label: '联系人',
          name: 'contactPerson',
          disabled: true,
        },
      },
    ],
  },
  {
    key: '5',
    children: [
      {
        type: 'text',
        key: '5-1',
        config: {
          label: '联系电话',
          name: 'contactPhone',
          disabled: true,
        },
      },
      {
        type: 'text',
        key: '5-2',
        config: {
          label: '邮箱',
          name: 'contactEmail',
          disabled: true,
        },
      },
    ],
  },
  {
    key: '6',
    children: [
      {
        type: 'select',
        key: '6-1',
        config: {
          label: '单位性质',
          name: 'natureOfUnit',
          rules: [{ required: true }],
        },
        select: {
          option: NatureOfUnitArr,
        },
      },
      {
        type: 'text',
        key: '6-2',
        config: {
          label: '邮政编码',
          name: 'postaCode',
          placeholder: '请填写邮政编码',
          rules: [{ required: true }, validator.postalCode],
        },
      },
    ],
  },
  {
    key: '7',
    children: [
      {
        type: 'uploadFiles',
        key: '7-1',
        config: {
          label: '营业执照',
          name: 'enterpriseImgId',
          rules: [{ required: true, message: '请上传3M以内的图片，最多10张' }],
        },
        uploadFiles: {
          uploadFilesProps: {
            // min: 1,
            multiple: true,
            name: 'file',
            data: { infoType: 'image' },
            maxCount: 10,
            listType: 'picture-card',
            className: styles['avatar-uploader'],
            beforeUploadTip: {
              fileSuffixNames: ['image/jpeg', 'image/png'],
              uploadFailMessage: '只能上传 JPG/PNG 文件!',
              fileMaxSize: 3,
            },
          },
          uploadButton: {
            buttonText: '添加营业执照',
          },
        },
      },
    ],
  },
];

// 赛道信息
const competitionAreaArr: SelectOptionType[] = [
  { label: '工业互联网', value: 1, key: '1' },
  { label: '智慧城市', value: 2, key: '2' },
  { label: '数字政府', value: 3, key: '3' },
  { label: '医疗', value: 4, key: '4' },
  { label: '交通物流', value: 5, key: '5' },
  { label: '教育', value: 6, key: '6' },
  { label: '文旅', value: 7, key: '7' },
  { label: '能源', value: 8, key: '8' },
  { label: '新媒体', value: 9, key: '9' },
  { label: '生态环境', value: 10, key: '10' },
  { label: '冬奥及其他', value: 11, key: '11' },
];

// 应用行业（可多选）
const appIndustryArr: SelectOptionType[] = [
  { label: '智慧城市', value: '1', key: '1' },
  { label: '智慧商业', value: '2', key: '2' },
  { label: '智慧园区', value: '3', key: '3' },
  { label: '教育', value: '4', key: '4' },
  { label: '金融', value: '5', key: '5' },

  { label: '旅游', value: '6', key: '6' },
  { label: '环保', value: '7', key: '7' },
  { label: '娱乐', value: '8', key: '8' },
  { label: '游戏', value: '9', key: '9' },
  { label: '媒体', value: '10', key: '10' },

  { label: '物流', value: '11', key: '11' },
  { label: '安防', value: '12', key: '12' },
  { label: '电子制造', value: '13', key: '13' },
  { label: '家电制造', value: '14', key: '14' },
  { label: '医疗健康', value: '15', key: '15' },

  { label: '汽车制造', value: '16', key: '16' },
  { label: '工程机械', value: '17', key: '17' },
  { label: '钢铁', value: '18', key: '18' },
  { label: '石油石化', value: '19', key: '19' },
  { label: '航空', value: '20', key: '20' },

  { label: '船舶', value: '21', key: '21' },
  { label: '车联网', value: '22', key: '22' },
  { label: '电力', value: '23', key: '23' },
  { label: '港口', value: '24', key: '24' },
  { label: '矿山', value: '25', key: '25' },

  { label: '建筑', value: '26', key: '26' },
  { label: '公安', value: '27', key: '27' },
  { label: '农业', value: '28', key: '28' },
  { label: '其他', value: '29', key: '29' },
];

// 应用技术（可多选）
const appTechnologyArr: SelectOptionType[] = [
  { label: 'AR', value: '1', key: '1' },
  { label: 'VR', value: '2', key: '2' },
  { label: 'MR', value: '3', key: '3' },
  { label: '超高清视频', value: '4', key: '4' },
  { label: '大数据', value: '5', key: '5' },

  { label: '云计算', value: '6', key: '6' },
  { label: '人工智能', value: '7', key: '7' },
  { label: '边缘计算', value: '8', key: '8' },
  { label: '网络切片', value: '9', key: '9' },
  { label: '定位', value: '10', key: '10' },

  { label: '机器人', value: '11', key: '11' },
  { label: '无人机/车/船', value: '12', key: '12' },
  { label: '其他', value: '13', key: '13' },
];

// 应用发展阶段
const appDevelopmentStageArr: SelectOptionType[] = [
  { label: '原型设计阶段', value: '1', key: '1' },
  { label: '应用示范阶段', value: '2', key: '2' },
  { label: '商业推广阶段', value: '3', key: '3' },
];

// 企业填报项目
const projectMsgArr1: RenderItemConfigOut[] = [
  {
    key: '1',
    children: [
      {
        type: 'text',
        key: '1-1',
        config: {
          label: '项目名称',
          placeholder: '请填写项目名称',
          name: 'projectName',
          rules: [{ required: true }],
        },
      },
    ],
  },
  {
    key: '2',
    children: [
      {
        key: '2-1',
        type: 'select',
        config: {
          label: '大赛',
          name: 'competitionSeason',
          rules: [{ required: true }],
        },
        select: {
          option: [{ value: 1, key: 1, label: '绽放杯”5G应用征集大赛专题赛——5G行业专网与应用' }],
        },
      },
    ],
  },
  {
    key: '3',
    children: [
      {
        key: '3-1',
        type: 'select',
        config: {
          label: '赛道',
          name: 'competitionArea',
          rules: [{ required: true, message: '请选择赛道' }],
        },
        select: {
          option: competitionAreaArr,
        },
      },
    ],
  },
];

// 联系人信息
const contactMsgArr: RenderItemConfigOut[] = [
  {
    key: '4',
    children: [
      {
        key: '4-1',
        type: 'text',
        config: {
          label: '联系人姓名',
          name: 'contactName',
          placeholder: '请填写联系人姓名',
          rules: [{ required: true }],
        },
      },
      {
        key: '4-2',
        type: 'select',
        config: {
          label: '性别',
          name: 'contactSex',
          rules: [{ required: true }],
        },
        select: {
          option: [
            { value: 1, label: '男', key: '1' },
            { value: 2, label: '女', key: '2' },
          ],
        },
      },
    ],
  },
  {
    key: '5',
    children: [
      {
        key: '5-1',
        type: 'date',
        config: {
          label: '出生日期',
          name: 'contactBirthday',
          rules: [{ required: true, message: '请选择出生日期' }],
        },
        date: {
          format: 'YYYY-MM-DD',
        },
      },
      {
        key: '5-2',
        type: 'text',
        config: {
          label: '移动电话',
          name: 'contactPhone',
          placeholder: '请填写移动电话',
          rules: [{ required: true }, validator.phone],
        },
      },
    ],
  },
  {
    key: '6',
    children: [
      {
        key: '6-1',
        type: 'text',
        config: {
          label: '固定电话',
          placeholder: '请填写固定电话',
          name: 'contactTelephone',
          rules: [{ required: true }],
        },
      },
      {
        key: '6-2',
        type: 'text',
        config: {
          label: '电子邮箱',
          name: 'contactMailbox',
          placeholder: '请填写电子邮箱',
          rules: [{ required: true, type: 'email' }],
        },
      },
    ],
  },
  {
    key: '7',
    children: [
      {
        key: '7-1',
        type: 'select',
        config: {
          label: '证件类型',
          name: 'documentType',
          rules: [{ required: true, message: '请选择证件类型' }],
        },
        select: {
          option: [{ key: 1, value: 1, label: '身份证' }],
        },
      },
      {
        key: '7-2',
        type: 'text',
        config: {
          label: '证件号码',
          placeholder: '请填写证件号码',
          name: 'documentNumber',
          rules: [{ required: true }, validator.idCardNumber],
        },
      },
    ],
  },
  {
    key: '8',
    children: [
      {
        key: '8-1',
        type: 'uploadFiles',
        config: {
          label: '上传身份证',
          name: 'idCode',
          rules: [{ required: true, message: '请上传身份证' }],
        },
        uploadFiles: {
          uploadFilesProps: {
            multiple: true,
            name: 'file',
            data: { infoType: 'image' },
            maxCount: 2,
            minCount: 2,
            listType: 'picture-card',
            className: styles['avatar-uploader'],
            beforeUploadTip: {
              fileSuffixNames: ['image/jpeg', 'image/png'],
              uploadFailMessage: '只能上传 JPG/PNG 文件!',
              fileMaxSize: 3,
            },
          },
          uploadButton: {
            buttonText: ['身份证第一面', '身份证第二面'],
          },
        },
      },
    ],
  },
];

// 项目信息
const projectMsgArr2: RenderItemConfigOut[] = [
  {
    key: '9',
    children: [
      {
        key: '9-1',
        type: 'checkbox',
        config: {
          label: '应用行业（可多选）',
          name: 'appIndustry',
          rules: [{ required: true, message: '请选择应用行业' }],
        },
        checkbox: {
          options: appIndustryArr,
        },
      },
    ],
  },
  {
    key: '10',
    children: [
      {
        key: '10-1',
        type: 'checkbox',
        config: {
          label: '应用技术（可多选）',
          name: 'appTechnology',
          rules: [{ required: true, message: '请选择应用技术' }],
        },
        checkbox: {
          options: appTechnologyArr,
        },
      },
    ],
  },
  {
    key: '11',
    children: [
      {
        key: '11-1',
        type: 'radio',
        config: {
          label: '应用发展阶段',
          name: 'appDevelopmentStage',
          rules: [{ required: true, message: '请选择应用发展阶段' }],
        },
        radio: {
          options: appDevelopmentStageArr,
        },
      },
    ],
  },
];

// 联合单位信息 (若需要填写，请务必填写完整)
const unionCompanyMsgArr: RenderItemConfigOut[] = [
  {
    key: '12',
    children: [
      {
        key: '12-1',
        type: 'list',
        config: {
          name: 'unionCompany',
        },
        list: [
          {
            key: '12-1-1',
            type: 'text',
            config: {
              name: 'name',
              label: '单位名称',
              placeholder: '请填写单位名称',
              rules: [{ required: true, message: '请填写单位名称' }],
            },
          },
          {
            key: '12-1-2',
            type: 'select',
            config: {
              name: 'type',
              label: '单位类型',
              placeholder: '请选择单位类型',
              rules: [{ required: true, message: '请选择单位类型' }],
            },
            select: {
              option: NatureOfUnitArr,
            },
          },
          {
            key: '12-1-3',
            type: 'text',
            config: {
              name: 'code',
              label: '组织机构代码',
              placeholder: '请填写组织机构代码',
              rules: [{ required: true, message: '请填写组织机构代码' }],
            },
          },
        ],
      },
    ],
  },
];

// 团队信息 (若需要填写，请务必填写完整)
const teamInfoMsgArr: RenderItemConfigOut[] = [
  {
    key: '12',
    children: [
      {
        key: '12-1',
        type: 'list',
        config: {
          name: 'teamInfo',
        },
        list: [
          {
            key: '12-1-1',
            type: 'text',
            config: {
              name: 'contactName',
              label: '姓名',
              placeholder: '请填写姓名',
              rules: [{ required: true }],
            },
          },
          {
            key: '12-1-2',
            type: 'select',
            config: {
              name: 'documentType',
              label: '证件类型',
              placeholder: '请选择证件类型',
              rules: [{ required: true, message: '请选择证件类型' }],
            },
            select: {
              option: [{ key: 1, value: 1, label: '身份证' }],
            },
          },
          {
            key: '12-1-3',
            type: 'text',
            config: {
              name: 'documentNumber',
              label: '证件号码',
              placeholder: '请填写证件号码',
              rules: [{ required: true }, validator.idCardNumber],
            },
          },
        ],
      },
    ],
  },
];

export {
  NatureOfUnitArr,
  enterpriseOrgCodeArr,
  enterpriseMsgArr,
  appIndustryArr,
  appTechnologyArr,
  appDevelopmentStageArr,
  projectMsgArr1,
  contactMsgArr,
  projectMsgArr2,
  unionCompanyMsgArr,
  teamInfoMsgArr,
};
