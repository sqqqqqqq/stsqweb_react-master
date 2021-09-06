import request from '@/utils/request';
// import { industryListType } from './data.d';

// 查询所有的行业类别
export async function getAllDictionaryByClazz() {
  return request(`/cu5gaia/lib/case/getAllDictionaryByClazz`);
}

// 根据某一行业查看简介
export async function getIndustryInfo(params?: any) {
  return request(`/cu5gaia/lib/case/getIndustryInfo`, { params });
}

// 根据某一行业查看卡片
// 某一行业详情页加载更多
export async function getIndustryReommendations(params?: any) {
  return request(`/cu5gaia/lib/case/recommendations/page`, { params });
}
