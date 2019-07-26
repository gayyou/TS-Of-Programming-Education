import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userID: null,
    userName: null,
    name: null,
    userHeadImg: null,
    isStart: true,
    isRenew: false,
    point: '',
    close: true,
    loadingFadeIn: false,
    str: '正在云编译中',
    showLogin: false,
    showRegist: false,
    showConfirm: false,
    showMessage: false,
    message: '',
    isLogin: false,
    isInput: {
      type: null,
      id: null,
      index: null,
      value: 0
    },
    isCode: true,
    elCount: 0,
    comCount: 0,
    moveTarget: null,
    fakeTarget: null,
    model: {
      x: null,
      y: null,
      type: null,
      value: null
    },
    // 下面是存储拖拽时候，外壳的大小

    containInfo: {
      width: 0,
      height: 0,
      id: null,
      isUsed: true,
      x: 0,
      y: 0
    },

    // 分割线
    bashX: 0,
    bashY: 0,
    mouse: {
      x: null,
      y: null,
    },
    canvasList: {
      
    },
    choiceTarget: null,
    // 编辑模式左边选择框的模式，一共有 1 2 3 4
    leftStatus: 1,

    // 下面是推荐模式所独有的store

    // 1是按照最新发布排序  2 是按照最快上升排序  3 是按照评分高的排序
    sortOrder: 1,
    cdnInfo: null
  },
  mutations: {

  },
  actions: {

  }
})
