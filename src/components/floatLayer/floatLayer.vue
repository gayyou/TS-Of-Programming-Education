<template>
  <div class="float-layer" 
    v-if="$store.state.showConfirm || $store.state.showMessage || $store.state.showLogin || $store.state.showRegist"
  >
    <login v-if="$store.state.showLogin"></login>
    <regist v-if="$store.state.showRegist" ></regist>
    <confirm-layer v-if="$store.state.showConfirm"></confirm-layer>
    <message v-if="$store.state.showMessage" ></message>
  </div>  
</template>

<script lang="ts">
import Vue from 'vue'
import login from './login/login.vue'
import regist from './regist/regist.vue'
import confirmLayer from "./confirm/confirm.vue";
import message from './message/message.vue';
import Component from 'vue-class-component';

@Component({
  components: {
    login,
    regist,
    'confirm-layer': confirmLayer,
    message
  }
})
export default class FloatLayer extends Vue {}
</script>

<style lang="scss" scoped>
%flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.float-layer {
  @extend %flex-center;

  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .3);
}
</style>
