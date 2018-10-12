// import { Commit } from 'vuex';
import { UPDATE_USER_SELECT_TOOLS } from '../mutation-types';
import { USER_SCORING_SELECT_TOOLS_MAP } from '../getters-types';
import Vue from 'vue';

export interface IState {
  selectToolsMap: {[key: string]: string[]};
}
// interface IStore {
//     commit: Commit;
//     state: IAppState;
// }

export default {
  state: {
    selectToolsMap: {},
    // selectTools: [],
  } as IState,
  mutations: {
    [UPDATE_USER_SELECT_TOOLS](state: IState, params: { matchType: string, tools: string[] }) {
      if (typeof params !== 'object') {
        return;
      }
      const { matchType, tools } = params;
      if (typeof matchType !== 'string') {
        return;
      }
      Vue.set(state.selectToolsMap, matchType, tools);
    },
  },
  getters: {
    // [USER_SCORING_SELECT_TOOLS](state: IState) {
    //     return state.selectTools;
    // },
    [USER_SCORING_SELECT_TOOLS_MAP](state: IState) {
      return state.selectToolsMap || {};
    },
  },
};
