<template>
  <recommand class="recommand"></recommand>
</template>

<script lang="ts">
import Vue from 'vue'

import recommand from '../components/recommand/recommand.vue'
import Component from 'vue-class-component';

@Component({
  components: {
    recommand
  }
})
export default class Recommand extends Vue {
  
}
</script>

<style lang="scss">
.recommand {
  width: 100%;
  height: 100%;
}
</style>

