
import formatter from './formatter';
import * as typeDef from './typeDef';
import * as helps from './helps';
import * as config from './config';
import AppUpload from './component/AppUpload.vue';
import AppNetImg from './component/AppNetImg.vue';
import AppLocalImg from './component/AppLocalImg.vue';
// export default {
//     formatter,
// }
class App {
    install(Vue: any, options: any) {
        Vue.prototype.$app = {
            formatter,
            typeDef,
            config,
            helps,
        };
        Vue.component('app-upload', AppUpload);
        Vue.component('app-net-img', AppNetImg);
        Vue.component('app-local-img', AppLocalImg);
    }
}

export default new App();
