// http://21b97p5647.imwork.net:32799
const IS_DEBUG = process.env.NODE_ENV !== 'production';
export const REMOTE_URL = IS_DEBUG ? 'http://172.16.31.10:8002' : 'http://admin.api.qidianlive.com';
// export const APP_REMOTE_URL = IS_DEBUG ? 'http://192.168.1.10:8012' : 'http://app.api.qidianlive.com';
export const BASE_URL = '';
export const UPDATE_LIVE_COUNT_TIME_INTERVAL = 10;
export default module.exports;
