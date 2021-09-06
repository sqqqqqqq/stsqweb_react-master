import request, { apiPrefix } from '@/utils/request';

const apiPrefixLib = `${apiPrefix}/lib`;

const apiPrefixLib_warehouse = `${apiPrefixLib}/warehouse`;

interface AllianceNewParamsType {
  size: string;
  status: string;
}

export async function getAllianceNew(params: AllianceNewParamsType) {
  return request.get(`${apiPrefixLib}/trend/recommendations/page`, {
    params,
  });
}

// 首页->联盟成果->创新应用
export async function caseRecommendations(params: AllianceNewParamsType) {
  return request.get(`${apiPrefixLib}/case/recommendations/page`, {
    params,
  });
}

// 首页->联盟成果->白皮书
export async function whitebookRecommend(params: AllianceNewParamsType) {
  return request.get(`${apiPrefixLib}/whiteBook/recommendations/page`, {
    params,
  });
}

// 联盟介绍——联盟组织架构:获取联盟章程介绍文本
export async function unionConstitution() {
  return request.get(`${apiPrefixLib}/case/getUnionConstitution`);
}

// 联盟介绍——联盟组织架构:获取专家委员会、联盟顾问、理事会、秘书处四个信息
export async function frameworkUnionInfo() {
  return request.get(`${apiPrefixLib}/case/getUnionInfo`);
}

// 赛事报名——获取该页面动态编辑的信息
export async function enrollmentPageInfo() {
  return request.get(`${apiPrefixLib}/case/getMatchInfo`);
}

// 搜索——联盟动态
export async function searchTrend(params: { keyWord: string }) {
  return request.get(`${apiPrefixLib}/trend/search`, { params });
}

// 大数据AI赋能页面
export async function getBigDataInfo() {
  return request.get(`${apiPrefixLib}/getBigDataInfo`);
}

// 大数据AI赋能页面导航数据
export async function getBigDataMenuInfo(params: { dataType: string }) {
  return request.get(`${apiPrefixLib}/getMenuInfo`, { params });
}

// AI赋能首页
export async function getAiFunMenuInfo(params: { type: string }) {
  return request.get(`${apiPrefixLib}/findEmpowerment`, { params });
}

//! =================行业应用意向单=================

// 应用仓库行业应用menu数据
export async function getAllDictionaryByClazz() {
  return request(`${apiPrefixLib_warehouse}/getAllDictionaryByClazz`);
}

interface StorageRecommendationsParamType {
  industryId: number;
  size?: string;
  status?: string;
  page?: number;
  currentId?: number;
}

export async function storageRecommendations(params: StorageRecommendationsParamType) {
  return request(`${apiPrefixLib_warehouse}/recommendations/page`, {
    params: { size: '9', status: '3', ...params },
  });
}

// 根据应用仓库的industryId来获取其相关案例，默认3个
export async function getWarehouseRelatedCase(params: StorageRecommendationsParamType) {
  return request(`${apiPrefixLib_warehouse}/recommendations/page`, {
    params: { size: '3', status: '3', page: 1, ...params },
  });
}

// 根据应用仓库的id来获取其detail
export async function getWarehouseDetail(params: { id: string }) {
  return request(`${apiPrefixLib_warehouse}/detail`, { params });
}

// 获取意向单状态
export async function getCheckIntent(params: { warehouseId: string }) {
  return request(`${apiPrefixLib}/checkIntent`, {
    params,
  });
}

// 意向单发送邮箱验证码
export async function getEmailCode(params: { email: string }) {
  return request(`${apiPrefixLib}/sendMailCode`, {
    params,
  });
}

export interface postWishOrderDataType {
  status: '0' | '1'; // "0"是保存，"1"是提交
  id?: string; // 申请单号
  idStr?: string; // 申请单号
  createTimeStr?: string; // 申请日期
  title: string;
  companyName: string; // 合作伙伴名称
  creditCode: string; // 合作伙伴统一社会信用代码
  contactName: string; // 联系人姓名
  contactPhone: string; // 联系人电话
  actualCompanyName: string; // 需求使用客户名称
  actualCreditCode: string; // 需求客户统一社会信用代码
  industry: number; // 所属行业
  productType: number; // 产品类型
  province: any; // 落地省份
  city: any; // 落地地市
  advantage: string[]; // 合作优势
  demandContent: string; // 需求申请内容
  applicationMaterial?: any; // 其他申请材料
  appCode: string; // 具体应用/解决方案

  custManagerName?: string; // 指派的客户经理
  custManagerPhone?: string; // 客户经理联系方式
}

// 行业应用下意向单
export async function postWishOrder(data: postWishOrderDataType) {
  return request(`${apiPrefixLib}/saveIntent`, {
    data,
    method: 'POST',
  });
}

// 行业应用查询意向单
export async function getWishOrder(params: { id: string }) {
  return request(`${apiPrefixLib}/intentDetail`, {
    params,
  });
}

// 获取行业，产品类型，应用值
export async function getIntentEnums(params: { dataType: string }) {
  return request(`${apiPrefixLib}/getIntentEnums`, { params });
}

//! =================搜索=================
// 搜索
interface SearchParamsType {
  keyWord: string | undefined;
  page: number;
  size: number;
}

export async function searchResultAll(params: SearchParamsType) {
  return request(`${apiPrefixLib}/all/search`, {
    params,
  });
}

// 搜索——创新应用
export async function searchResultCase(params: SearchParamsType) {
  return request(`${apiPrefixLib}/case/search`, {
    params,
  });
}

// 搜索——联盟动态
export async function searchResultTrend(params: SearchParamsType) {
  return request(`${apiPrefixLib}/trend/search`, {
    params,
  });
}

// 搜索——白皮书
export async function searchResultWhiteBook(params: SearchParamsType) {
  return request(`${apiPrefixLib}/whiteBook/search`, {
    params,
  });
}

//! =================上传附件=================
export async function uploadFile(data: { infoType: string; file: any }) {
  return request(`${apiPrefixLib}/attach/upload`, {
    method: 'POST',
    data,
  });
}
