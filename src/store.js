import Vue from 'vue'
import Vuex from 'vuex'

/* Added separate files for state, mutations, actions */
import state from './vuex_files/state';
import actions from './vuex_files/actions';
import mutations from './vuex_files/mutations';

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions
})