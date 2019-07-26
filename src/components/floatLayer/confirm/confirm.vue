<template>
  <div class="prompt-container" :class="$data.isAnimate ? 'prompt-active' : ''">
    <div class="prompt-head">
      <span>提示</span>
    </div>
    <div class="prompt-value">
      <span>{{ $store.state.confirmMes }}</span>
    </div>
    <div class="prompt-choice">
      <button class="prompt-cancel" @click="cancelOperate">取消</button>
      <button class="prompt-confirm" @click="confirmOperate">确定</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PubSub from 'pubsub-js'
import Component from 'vue-class-component';

@Component
export default class Confirm extends Vue {
  isAnimate: boolean = false;

  mounted() {
    setTimeout(() => {
      this.$data.isAnimate = true;
    }, 10);
  }

  cancelOperate() {
    this.$store.state.showConfirm = false;
    this.$data.isAnimate = false;
    PubSub.publish('checkRecommand', {
      confirm: false,
      cancel: true
    })
    PubSub.publish('update', {
      confirm: false,
      cancel: true
    })
  }

  confirmOperate() {
    this.$store.state.showConfirm = false;
    this.$data.isAnimate = false;
    PubSub.publish('checkRecommand', {
      confirm: true,
      cancel: false
    })
    PubSub.publish('update', {
      confirm: true,
      cancel: false
    })
  }
}
</script>


<style lang="scss" scoped>
$prompt-prefix: "prompt";

%flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

$themeColor: #ed775a;

.#{ $prompt-prefix } {
  &-container {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-100%);
    width: 7rem;
    height: 2.6rem;
    border-radius: 0.12rem;
    background-color: #fff;
    transition: top .75s ease-out;
    border: 1px solid rgba($color: #000000, $alpha: .3);
  }

  &-head {
    @extend %flex-center;

    position: relative;
    width: 100%;
    height: 0.8rem;

    >span {
      display: block;
      font-family: 'HYZhuZiMuTouRen';
      font-size: 34px;
      color: $themeColor;
      letter-spacing: 0.04rem;
    }
  }

  &-value {
    @extend %flex-center;

    width: 100%;
    height: 1rem;

    >span {
      font-size: 20px;
      width: 80%;
      height: 100%;
    }
  }
  
  &-choice {
    @extend %flex-center;

    width: 100%;

    button {
      width: 1.5rem;
      height: 0.45rem;
      margin: 5px 10px;
      border-radius: 0.36rem;
    }
  }

  &-choice::after {
    content: "";
    clear: both;
    display: block;
  }

  &-cancel {
    background-color: #fff;
    border: 0.5px solid rgba($color: #000, $alpha: .3);
  }

  &-confirm {
    background-color: $themeColor;
    color: #fff;
  }

  &-confirm:hover {
    background-color: rgba($color: #ed775a, $alpha: .8)
  }

  &-active {
    top: 35%!important;
  }
}

</style>
