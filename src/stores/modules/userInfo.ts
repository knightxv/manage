import { Commit } from 'vuex';
// import { UPDATE_USER_NAME } from '../mutation-types';
import { MY_USER_NAME } from '../getters-types';
import { UPDATE_USER_NAME_ASYNC } from '../action-types';

export interface IUserInfoState {
    userName: string;
}
interface IStore {
    commit: Commit;
    state: IUserInfoState;
}

export default {
    state: {
        userName: 'knight',
    } as IUserInfoState,
    mutations: {
        // [UPDATE_USER_NAME](state: IUserInfoState, newUserName: string) {
        //     state.userName = newUserName;
        // },
    },
    actions: {
        [UPDATE_USER_NAME_ASYNC]({ commit, state }: IStore) {
            console.log(state);
            setTimeout(() => {
                // commit(UPDATE_USER_NAME, 'heihei');
            }, 1000);
        },
    },
    getters: {
        [MY_USER_NAME](state: IUserInfoState) {
            return state.userName + '233';
        },
    },
};
