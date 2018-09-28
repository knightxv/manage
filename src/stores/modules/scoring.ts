// import { Commit } from 'vuex';
import { UPDATE_USER_SELECT_TOOLS } from '../mutation-types';
import { USER_SCORING_SELECT_TOOLS } from '../getters-types';

export interface IState {
    selectTools: string[];
}
// interface IStore {
//     commit: Commit;
//     state: IAppState;
// }

export default {
    state: {
      selectTools: [],
    } as IState,
    mutations: {
        [UPDATE_USER_SELECT_TOOLS](state: IState, newTools: string[]) {
            state.selectTools = newTools;
        },
    },
    // actions: {
        // [TOGGLE_MENU_COLLAPSE]({ commit, state }: IStore) {
        //     console.log(state);
        //     setTimeout(() => {
        //         commit(UPDATE_USER_NAME, 'heihei');
        //     }, 1000);
        // },
    // },
    getters: {
        [USER_SCORING_SELECT_TOOLS](state: IState) {
            return state.selectTools;
        },
    },
};
