<template>
  <div class="list-container" >
    <div class="list-main">
      <svgComponent
        :svgList="svgList"
      ></svgComponent>
    </div>
    <div class="list-info">
      <span class="list-name">{{ name }}</span>
      <span class="list-grade">{{ point }}分</span>
    </div>
    <div class="float-layer" :data-index="index" :data-name="name"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import svgComponent from '../../mainComponent/mainComponent.vue'
import { Prop } from 'vue-property-decorator';

@Component({
  components: {
    svgComponent
  }
})
export default class RecList extends Vue {
  @Prop() name!: any;

  @Prop() point!: any;

  @Prop() svgList!: any;

  @Prop() index!: any;
}
</script>

<style lang="scss" scoped>
%absolute-center {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}

%flex-center {
  display: flex;
  align-items: center;
}

%clear-float::after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
}

.list-container {
  position: relative;
  @extend %clear-float;

  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  width: 4.7rem;
  height: 3.92rem;
  border-radius: 12px;
  margin: 0.46rem 0.675rem 0 0.675rem;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, .1);

  .list-main {
    overflow: hidden;
    width: 100%;
    height: 3.06rem;
    background-color: #373f53;
  }
  .list-info {
    @extend %clear-float;

    overflow: hidden;
    width: 100%;
    height: 0.84rem;

    .list-name {
      float: left;
      display: block;
      max-width: 3rem;
      margin: 0.25rem 0rem 0.25rem 0.32rem;
      font-family: 'SourceHanSansCN-Regular';
      font-size: 0.24rem;
      white-space:nowrap; 
      text-overflow: ellipsis; 
      overflow:hidden;
    }
    .list-grade {
      float: right;
      display: block;
      margin: 0.2rem 0.3rem 0.19rem 0rem;
      font-family: 'HYZhuZiMuTouRen';
      font-size: 0.36rem;
      color: #ed775a;
    }
  }

  .float-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 11;
  }
}
</style>
