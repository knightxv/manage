// http://21b97p5647.imwork.net:32799
const IS_DEBUG = process.env.NODE_ENV === 'development';
export const REMOTE_URL = IS_DEBUG ? 'http://192.168.1.10:8002' : 'http://admin.api.qidianlive.com';
export const BASE_URL = '';
export default module.exports;
