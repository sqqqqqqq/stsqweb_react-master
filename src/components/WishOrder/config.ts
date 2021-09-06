import type { RenderItemConfigOut } from '@/components/FormItem/interface';
import { baseUrl, cu5gaia } from '@/config/env';
import validator from '@/utils/validator';
import styles from './index.less';

const configArrayDefault = (allDisabled?: boolean): RenderItemConfigOut[] => {
  return [
    {
      key: '0',
      children: [
        {
          key: '0-1',
          type: 'none',
          config: {
            name: 'idStr',
          },
        },
      ],
    },
    {
      key: '1',
      children: [
        {
          key: '1-1',
          type: 'text',
          span: 16,
          config: {
            name: 'title',
            disabled: allDisabled,
            label: '合作申请标题',
            placeholder: '请输入',
            className: styles['wish-order-label1'],
            rules: [{ required: true, message: '请输入标题' }],
          },
        },
      ],
    },
    {
      key: '2',
      gutter: 16,
      children: [
        {
          key: '2-1',
          type: 'text',
          span: 8,
          config: {
            name: 'companyName',
            disabled: allDisabled,
            label: '合作伙伴名称(意向单发起方)',
            placeholder: '请输入',
            className: styles['wish-order-label1'],
            rules: [{ required: true, message: '请输入合作伙伴名称' }],
          },
        },
        {
          key: '2-2',
          type: 'text',
          style: { paddingRight: 0 },
          span: 8,
          config: {
            name: 'creditCode',
            placeholder: '请输入',
            disabled: allDisabled,
            label: '合作伙伴统一社会信用代码',
            className: styles['wish-order-label2'],
            labelCol: { span: 8 },
            rules: [{ required: true, message: '请输入统一社会信用代码' }, validator.creditCode],
          },
        },
      ],
    },
    {
      key: '3',
      gutter: 16,
      children: [
        {
          key: '3-1',
          type: 'text',
          span: 8,
          config: {
            name: 'contactName',
            disabled: allDisabled,
            label: '联系人姓名',
            placeholder: '请输入',
            className: styles['wish-order-label1'],
            rules: [{ required: true, message: '请输入姓名' }],
          },
        },
        {
          key: '3-2',
          type: 'text',
          span: 8,
          style: { paddingRight: 0 },
          config: {
            name: 'contactPhone',
            disabled: allDisabled,
            label: '联系人电话',
            placeholder: '请输入',
            labelCol: { span: 8 },
            rules: [{ required: true, message: '请输入电话' }, validator.phone],
          },
        },
        {
          key: '3-3',
          type: 'text',
          span: 8,
          config: {
            name: 'contactEmail',
            disabled: allDisabled,
            label: '联系人邮箱',
            placeholder: '请输入',
            labelCol: { span: 8 },
            rules: [
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '邮箱格式错误' },
            ],
          },
        },
      ],
    },
    {
      key: '4',
      gutter: 16,
      children: [
        {
          key: '4-1',
          type: 'text',
          span: 8,
          config: {
            name: 'actualCompanyName',
            disabled: allDisabled,
            label: '需求最终落地企业名称',
            placeholder: '如为自发需求填写自身企业名称',
            className: styles['wish-order-label1'],
            rules: [{ required: true, message: '请输入客户名称' }],
          },
        },
        {
          key: '4-2',
          type: 'text',
          span: 8,
          style: { paddingRight: 0 },
          config: {
            name: 'actualCreditCode',
            disabled: allDisabled,
            placeholder: '如为自发需求填写自身企业代码',
            label: '需求最终落地企业统一信用代码',
            labelCol: { span: 8 },
            className: styles['wish-order-label2'],
            rules: [{ required: true, message: '请输入统一社会信用代码' }, validator.creditCode],
          },
        },
      ],
    },
    {
      key: '5',
      gutter: 16,
      children: [
        {
          key: '5-1',
          type: 'select',
          span: 8,
          select: {
            option: [],
            disabled: allDisabled,
          },
          config: {
            name: 'industry',
            label: '所属行业',
            className: styles['wish-order-label1'],
            rules: [{ required: true, message: '请选择所属行业' }],
          },
        },
        {
          key: '5-2',
          type: 'select',
          span: 8,
          style: { paddingRight: 0 },
          select: {
            option: [],
            disabled: allDisabled,
          },
          config: {
            name: 'productType',
            label: '产品类型',
            labelCol: { span: 8 },
            rules: [{ required: true, message: '请选择产品类型' }],
          },
        },
        {
          key: '5-3',
          type: 'select',
          span: 8,
          select: {
            labelInValue: true,
            option: [],
            disabled: allDisabled,
          },
          config: {
            name: 'appCode',
            className: styles['wish-order-label3'],
            label: '具体应用/解决方案',
            labelCol: { span: 8 },
            rules: [{ required: true, message: '请选择' }],
          },
        },
      ],
    },
    {
      key: '6',
      gutter: 16,
      children: [
        {
          key: '6-1',
          type: 'select',
          span: 8,
          select: {
            option: [{ value: '1', label: '', key: '' }],
            labelInValue: true,
            disabled: allDisabled,
          },
          config: {
            name: 'province',
            label: '落地省份',
            className: styles['wish-order-label1'],
            rules: [{ required: true, message: '请选择落地省份' }],
          },
        },
        {
          key: '6-2',
          type: 'select',
          span: 8,
          style: { paddingRight: 0 },
          select: {
            option: [{ value: '1', label: '', key: '' }],
            labelInValue: true,
            placeholder: '请先选择落地省份',
            disabled: allDisabled,
          },
          config: {
            name: 'city',
            label: '落地地市',
            labelCol: { span: 8 },
            rules: [{ required: true, message: '请选择落地地市' }],
          },
        },
        {
          key: '6-3',
          type: 'select',
          span: 8,
          select: {
            option: [
              { value: '10万以下', label: '10万以下', key: 1 },
              { value: '10-50万', label: '10-50万', key: 2 },
              { value: '50-100万', label: '50-100万', key: 3 },
              { value: '100-500万', label: '100-500万', key: 4 },
              { value: '500万以上', label: '500万以上', key: 5 },
            ],
            disabled: allDisabled,
          },
          config: {
            name: 'investmentScale',
            label: '预计投资规模',
            labelCol: { span: 8 },
            rules: [{ required: true, message: '请选择预计投资规模' }],
          },
        },
      ],
    },
    {
      key: '7',
      children: [
        {
          key: '7-1',
          type: 'checkbox',
          span: 24,
          checkbox: {
            options: [
              { value: '关系优势', label: '关系优势' },
              { value: '地域优势', label: '地域优势' },
              { value: '服务优势', label: '服务优势' },
              { value: '其他优势', label: '其他优势' },
            ],
            disabled: allDisabled,
          },
          config: {
            name: 'advantageList',
            label: '合作优势',
            className: styles['wish-order-label1'],
            rules: [{ required: true, message: '请选择合作优势' }],
          },
        },
      ],
    },
    {
      key: '8',
      children: [
        {
          key: '8-1',
          type: 'textarea',
          span: 24,
          textarea: {
            placeholder: '请输入（字数限制2000字）',
            maxLength: 2000,
            showCount: true,
            rows: 4,
            disabled: allDisabled,
          },
          config: {
            name: 'demandContent',
            label: '需求申请内容',
            className: styles['wish-order-label1'],
            rules: [{ required: true, message: '请输入需求申请内容' }],
          },
        },
      ],
    },
    {
      key: '9',
      children: [
        {
          key: '9-1',
          type: 'uploadFiles',
          span: 24,
          config: {
            name: 'applicationMaterialUpload',
            label: '其他申请材料',
            className: styles['wish-order-label1'],
          },
          uploadFiles: {
            uploadFilesProps: {
              name: 'file',
              action: `${baseUrl}${cu5gaia}/lib/attach/upload?infoType=intent`,
              maxCount: 1,
              listType: 'text',
              openDownload: true,
              beforeUploadTip: {
                fileSuffixNames: [
                  'application/zip',
                  'application/x-tar',
                  'image/jpeg',
                  'image/png',
                  'rar',
                  'docx',
                  'doc',
                  'pdf',
                  'jpg',
                  'jpeg',
                  'png',
                ],
                uploadFailMessage: '支持附件格式（不超过10M）：.rar .zip .doc .docx .pdf .jpg .png',
                fileMaxSize: 10,
              },
              formFieldName: 'applicationMaterial',
            },
            uploadButton: {
              buttonText: '上传文件',
              type: 'primary',
              ghost: true,
              disabled: allDisabled,
            },
          },
        },
        {
          key: '9-2',
          type: 'none',
          config: {
            name: 'applicationMaterial',
          },
        },
      ],
    },
  ];
};

export { configArrayDefault };
