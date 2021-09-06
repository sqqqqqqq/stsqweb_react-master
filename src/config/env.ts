const baseUrl = '/partners';
const cu5gaia = '/cu5gaia';
const loginUrl = `${baseUrl}/portal/user/index`;
const homeUrl = `${baseUrl}/#/`;
const loginUrlRedirect = `${baseUrl}/portal/user/index?redirect=${cu5gaia}`;
const warehouseEditUrl = '/product/page/admin/warehouse/edit/'; // 应用仓库案例发布地址
const registerUrl = `${baseUrl}/portal/register/toRegister`;
const consoleUrl = `${baseUrl}/flow/task/platform`;
const imageUploadUrl = `${baseUrl}/`;
const imageUploadPath = 'images';

export { baseUrl, cu5gaia, loginUrl, loginUrlRedirect, warehouseEditUrl, registerUrl };

export default {
  baseUrl,
  cu5gaia,
  loginUrl,
  homeUrl,
  loginUrlRedirect,
  consoleUrl,
  registerUrl,
  warehouseEditUrl,
  imageUploadUrl,
  imageUploadPath,
};
