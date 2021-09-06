import CryptoJS from 'crypto-js';
// import Nopadding from 'crypto-js/pad-nopadding';

const defaultKey = 'pqzDl0ed2ST8cRuC';

const defaultIv = 'ubateubatequanli';

const iv = CryptoJS.enc.Utf8.parse(defaultIv);

const cryptoMode_Padding = {
  mode: CryptoJS.mode.CTR,
  padding: CryptoJS.pad.NoPadding,
  iv,
};

const aesEncryptUrl = (message: any) => {
  const key = CryptoJS.enc.Utf8.parse(defaultKey);
  const srcs = CryptoJS.enc.Utf8.parse(message);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, cryptoMode_Padding);
  const encryptedStr = encrypted.toString();
  const encodeStr = encodeURIComponent(encryptedStr);
  return encodeStr;
};

const aesDecryptUrl = (message: any) => {
  const decodeMessage = decodeURIComponent(message);
  // console.log('dec ', decodeMessage);
  const key = CryptoJS.enc.Utf8.parse(defaultKey);
  // const srcs = CryptoJS.enc.Utf8.parse(message);
  const decrypt = CryptoJS.AES.decrypt(decodeMessage, key, cryptoMode_Padding);
  const decryptStr = decrypt.toString(CryptoJS.enc.Utf8);
  // const encodeStr = encodeURIComponent(encryptedStr);
  return decryptStr;
};

export default {
  aesEncryptUrl,
  aesDecryptUrl,
};
