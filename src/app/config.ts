// export default {
//   REMOTE_URL: 'http://192.168.1.10:8002',
// };
const IS_DEBUG = process.env.NODE_ENV === 'development';
export const REMOTE_URL = IS_DEBUG ? 'http://192.168.1.10:8002' : 'http://21b97p5647.imwork.net:32799';

export default module.exports;
