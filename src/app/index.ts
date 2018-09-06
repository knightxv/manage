
import formatter from './formatter';
import * as typeDef from './typeDef';

// export default {
//     formatter,
// }
class App {
    install(Vue: any, options: any) {
        Vue.prototype.$app = {
            formatter,
            typeDef,
        };
    }
}

export default new App();
