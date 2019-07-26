<style lang="scss" scoped>

</style>

<template>
  <div class="left-list"
    @click="choiceList"
  >
      <li :class="$store.state.leftStatus === 1 ? 'list-active' : ''" data-mode="1">
        <div class="list-circle" style="background-color: #ED5A5A"></div>
        <span>功能</span>
      </li>
      <li :class="$store.state.leftStatus === 2 ? 'list-active' : ''" data-mode="2">
        <div class="list-circle" style="background-color: #43D7D7"></div>
        <span>逻辑</span>
      </li>
      <li :class="$store.state.leftStatus === 3 ? 'list-active' : ''" data-mode="3">
        <div class="list-circle" style="background-color: #43D791"></div>
        <span>判断</span>
      </li>
      <li :class="$store.state.leftStatus === 4 ? 'list-active' : ''" data-mode="4">
        <div class="list-circle" style="background-color: #FFE046"></div>
        <span>辅助</span>
      </li>
  </div>  
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class LeftList extends Vue {
  choiceList(event: any) {
    if (event.target.tagName.toLowerCase() === 'li' || $(event.target).parent()[0].tagName.toLowerCase() === 'li') {
      let mode = event.target.getAttribute('data-mode') || $(event.target).parent()[0].getAttribute('data-mode');
      this.$store.state.leftStatus = parseInt(mode);
    }
  }
}
</script>
