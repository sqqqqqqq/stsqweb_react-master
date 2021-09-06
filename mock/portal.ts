import type { Request, Response } from 'express';

const Prefix = '/partners/portal';

function obtainCompanyInfoMock(req: Request, res: Response) {
  const result = {
    companyInfo: {
      stpartyCode: 32105280003,
      city: null,
      companyPhone: '50477288',
      companyUrl: null,
      contactEmail: null,
      contactPerson: null,
      contactPhone: null,
      cooName: '中国联合网络通信股份有限公司',
      cooType: null,
      country: '中国',
      createTime: 1622192413000,
      creator: null,
      empNumber: null,
      enterprise: '企业',
      establishmentTime: null,
      hzfpartyCode: null,
      industry: null,
      industryChain: null,
      industryCompany: null,
      legalPerson: '王晓初',
      orgAddress: '上海市长宁路1033号25楼',
      orgCode: '91310000710929383P',
      orgType: '3002',
      otherIndustry: null,
      post: null,
      prmpartyCode: 36377993,
      province: null,
      regCapital: null,
      taxpayerType: null,
      unicomWith: null,
      updateTime: null,
      yearLast: null,
      taxNum: null,
      cxbizkey: null,
      natureOfUnit: '1',
      postaCode: '123123',
      dateOfIssue: 1470931200000,
      registrationAuthority: '上海市工商行政管理局',
      businessStatus: null,
      certificateType: null,
      enabe: '1',
    },
    list: [],
  };
  return res.json(result);
}

function bloomGetUserCompanyInfoMock(req: Request, res: Response) {
  return res.json({ status: 200 });
}

// function saveCompanyInfoMock(req: Request, res: Response) {
//   return res.json()
// }

export default {
  [`POST ${Prefix}/bloom/obtainCompanyInfo`]: obtainCompanyInfoMock,
  [`POST ${Prefix}/bloom/bloomGetUserCompanyInfo`]: bloomGetUserCompanyInfoMock,
};
