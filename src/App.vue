<template>
  <div id="app">
    <head-nav></head-nav>
    <div class="main">
      <!-- <recommand
        class="recommand"
        :style="!$store.state.isCode ? 'z-index: 1' : 'z-index: 0'"
      ></recommand> -->
      <index
        class="index"
        :style="$store.state.isCode ? 'z-index: 1' : 'z-index: 0'"
      ></index>
    </div>
    <float-layer></float-layer>
    <loading></loading>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import tests from './components/svgCanvas/svgCanvas.vue'
import headNav from './components/header/header.vue'
import leftList from './components/list/list.vue'
// import svgCanvas from './components/svgCanvas/svgCanvas.vue'
import loading from './components/loading/loading.vue'
// import recommand from './views/recommand.vue'
import floatLayer from './components/floatLayer/floatLayer.vue'
import index from './views/index.vue'

export default Vue.extend({
  name: 'app',
  components: {
    index,
    // drag,
    // tests,
    'head-nav': headNav,
    'left-list': leftList,
    // 'svg-canvas': drag,
    // recommand,
    loading,
    'float-layer': floatLayer
  }
});
</script>

<style lang="scss">
@font-face {
  font-family: 'SourceHanSansCN-Regular';
  src: url('assets/fonts/SourceHanSansCN-Regular.ttf') format('truetype');
}
@font-face {
  font-family: 'HYZhuZiMuTouRen';
  src: url('assets/fonts/HYZhuZiMuTouRenW-2.ttf') format('truetype');
}
/*
初始化css
*/
body,ol,ul,h1,h2,h3,h4,h5,h6,p,th,td,dl,dd,form,fieldset,legend,textarea,select,button{margin:0; padding:0;} 
body {
    font-size: 15px;
    font-family: 'Microsoft YaHei';   
    font-weight: 500;
    color: #000000;
}
a {
    text-decoration:none;
    resize: none;
    outline: none;
} 
em {
    font-style:normal;
} 
li{
    list-style:none;
} 
img{
    border:0; vertical-align:middle;
} 
table{
    border-collapse:collapse;
    border-spacing:0;
} 
p {
    word-wrap:break-word;
}
input {
    outline: none;
    resize: none;
    border: none 0;
}
button {
    border: none;
    outline: none;
    cursor:pointer;
}

path {
  stroke-width: 1px;
  box-sizing: border-box;
  stroke: rgba($color: #000000, $alpha: .3);
}

%absolute-center {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}

%flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

%clearFloat::after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
}

#app {
  font-family: 'SourceHanSansCN-Regular';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  .main {
    display: flex;
    flex: 1;
    overflow: hidden;

    .left-list {
      width: 1.52rem;
      height: 100%;
    }

    .svg-canvas {
      flex: 1;
      height: 100%;
    }

    .recommand,
    .index {
      position: absolute;
      width: 100%;
      height: 656px;
    }
  }
}
g {
  cursor: pointer;
}
</style>
