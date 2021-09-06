import request from '@/utils/request';

const apiPrefix = '/portal';

export async function joinTheLeague() {
  const url = `${apiPrefix}/innovationAlliance/joinTheLeague`;
  return request.get(url);
}

// 通过统一社会信用代码查询企业信息
export async function obtainCompanyInfo(params: { orgCode: string }) {
  const url = `${apiPrefix}/bloom/obtainCompanyInfo`;
  return request(url, {
    method: 'POST',
    data: params,
  });
}

// 传递用户公司信息
export async function bloomGetUserCompanyInfo(params: { stpartyCode: string }) {
  const url = `${apiPrefix}/bloom/bloomGetUserCompanyInfo`;
  return request(url, {
    method: 'POST',
    data: params,
  });
}

// 保存用户公司信息
export async function saveCompanyInfo(params: any) {
  const url = `${apiPrefix}/bloom/saveCompanyInfo`;
  return request(url, {
    method: 'POST',
    data: params,
  });
}

// 退出登录后端清空cookie接口
export async function loginOut() {
  return request(`${apiPrefix}/user/delIdentification`);
}
