import request, { apiPrefix } from '@/utils/request';

const cu5gaiaVip = `${apiPrefix}/vip`;
const cu5gaiaLib = `${apiPrefix}/lib`;
const apiPrefixConference = `${cu5gaiaVip}/conference`;

export async function queryUserInfo() {
  return request(`${cu5gaiaVip}/conference/userInfo`, {
    method: 'POST',
  });
}

// Get请求
export async function getHotelList(params: any) {
  return request.get(`${cu5gaiaVip}/conference/getHotelInfoList`, { params });
}

// 统一信用代码查询企业信息
export async function searchByCreditCode(params: any) {
  return request.get(`${cu5gaiaVip}/conference/searchByCreditCode`, { params });
}

// 查询统一信用代码
export async function searchCreditCodeByPartyCode(params: any) {
  return request.get(`${cu5gaiaVip}/conference/searchCreditCodeByPartyCode`, { params });
}

// 校验邀请码
export async function verifyInvitationCode(params: any) {
  return request.get(`${cu5gaiaVip}/conference/verifyInvitationCode`, { params });
}

// 提交
export async function submitConferenceInfo(params: any) {
  return request(`${cu5gaiaVip}/vipParticipant/saveParticipant`, {
    method: 'POST',
    data: params,
  });
}

// 获取详情接口
export async function getConference(params: any) {
  return request(`${cu5gaiaVip}/vipParticipant/orderDetail`, {
    method: 'POST',
    data: params,
  });
}

// 获取酒店订单接口
export async function getHotelOrderList(params?: any) {
  return request(`${apiPrefixConference}/getHotelOrder`, { params });
}

// 获取接送机订单接口
export async function getRideOrderList(params?: any) {
  return request(`${apiPrefixConference}/getPickupOrder`, { params });
}

// 取消订单接口
export async function postCancelOrders(params: any) {
  return request(`${apiPrefixConference}/cancelOrder`, {
    method: 'POST',
    params,
  });
}

// 获取酒店订单详情接口
export async function getHotelOrderDetails(params?: any) {
  return request(`${apiPrefixConference}/getHotelOrderDetail`, { params });
}

// 获取接送车订单详情接口
export async function getPickupOrderDetails(params?: any) {
  return request(`${apiPrefixConference}/getPickupOrderDetail`, { params });
}
// 获取会务系统Banner文字信息接口
export async function findConferenceTopBannerInfo(params?: any) {
  return request(`${cu5gaiaLib}/findConferenceTopBannerInfo`, { params });
}

// 获取会务系统会议时间
export async function findConferenceMeetingTime(params?: any) {
  return request(`${cu5gaiaLib}/findConferenceMeetingTime`, { params });
}
