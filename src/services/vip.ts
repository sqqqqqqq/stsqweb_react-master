import request, { apiPrefix } from '@/utils/request';

const apiPrefixVip = `${apiPrefix}/vip/vipInfo/`;

// 联盟介绍——联盟组织架构:会员单位信息
export async function frameworkMemberUnitInfo() {
  return request.get(`${apiPrefixVip}/getPartners`);
}

interface sendMsgCodeType {
  phone: string;
}
// 行业应用——意向单验证码
export async function sendVipMsgCode(params: sendMsgCodeType) {
  return request(`${apiPrefixVip}/sendCode`, {
    params,
  });
}
