<style lang="scss" scoped>
%clearFloat::after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
}

%flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

$topColor: #fff;
$bgColor: #ED775A;

.header {
  @extend %clearFloat;
  
  width: 100%;

  .header-top {
    @extend %flex-center;

    font-family: 'HYZhuZiMuTouRen';
    position: relative;
    width: 100%;
    height: 0.7rem;
    background-color: $topColor;

    .web-icon {
      position: absolute;
      width: 2.5rem;
      height: 0.8rem;
      left: 0.1rem;
      top: 50%;
      transform: translateY(-50%);

      span {
        display: block;
        line-height: 0.8rem;
        font-size: 0.36rem;
        color: $bgColor;
        letter-spacing: 0.04rem;
      }
    }

    .mode-choice {
      .mode-active {
        background-color: $bgColor;
        color: #fff;
      }

      .mode-normal {
        background-color: $topColor;
        color: #9E9898;
      }

      span {
        cursor: pointer;
        display: block;
        float: left;
        margin-left: 1.2rem;
        width: 1.2rem;
        height: 0.48rem;
        line-height: 0.48rem;
        border-radius: 24px;
        color: #fff;
        margin-left: 0.5rem;
        text-align: center;
        font-size: 0.30rem;
        transition: all 0.75s ease;
      }
      span:hover {
        background-color: $bgColor;
        color: #fff;
      }
    }
  }

  .header-bottom {
    width: 100%;
    height: 0.52rem;
    background-color: $bgColor;

    div {
      float: right;

      .icons-container {
        float: left;
        margin-right: 0.3rem;

        div {
          @extend %flex-center;
          
          float: left;
          width: 0.4rem;
          height: 0.52rem;
          margin: 0 10px;
          
          img {
            cursor: pointer;
            width: 0.32rem;
            height: 0.32rem;
          }
          .restore-icon {
            margin-top: -0.04rem;
          }
        }

        .cut-line {
          img {
            cursor: none;
            width: 0.02rem;
            height: 0.18rem;
          }
        }

        .choice-order {
          float: left;
          width: 3.8rem;

          span {
            cursor: pointer;
            display: block;
            float: left;
            font-size: 0.2rem;
            margin: 0 0.2rem;
            // width: 0.8rem;
            line-height: 0.52rem;
            height: 100%;
          }
          .active {
            color: #fff;
          }
          .normal {
            color: #373f53;
          }
        }
        .search-recommand {
          position: relative;
          width: 3rem;
          height: 0.52rem;

          label {
            position: absolute;
            right: 0.12rem;
            top: 50%;
            transform: translateY(-50%);
            width: 0.32rem;
            height: 0.32rem;

            img {
              width: 100%;
              height: 100%;
            }
          }
          input {
            @extend %flex-center;

            display: block;
            text-indent: 0.1rem;
            width: 100%;
            font-size: 0.24rem;
            color: #fff;
            height: 0.32rem;
            border-radius: 24px;
            border: 2px solid #F7947B;
            background-color: $bgColor;
          }
        }
      }

      .user-operate-container {
        @extend %flex-center;
        
        font-family: 'HYZhuZiMuTouRen';
        float: left;
        width: 2rem;
        height: 0.52rem;
        margin-right: 0.3rem;

        .user-name {
          padding: 0 0.15rem;
          color: #fff;
          font-size: 0.2rem;
        }

        .user-icon {
          cursor: pointer;
          position: relative;
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 50%;
          margin: 0 0.02rem;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .account-operate {
          @extend %flex-center;

          color: #fff;
          font-size: 0.26rem;

          span {
            cursor: pointer;
            display: block;
            margin: 0 0.2rem;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="header">
    <!-- 下面是头部第一行的操作 -->
    <div class="header-top">
      <div class="web-icon">
        <span>编程教育平台</span>
      </div>
      <div class="mode-choice">
        <span :class="$store.state.isCode ? 'mode-active' : 'mode-normal'" @click="changeMode" data-mode="1">编码</span>
        <span :class="$store.state.isCode ? 'mode-normal' : 'mode-active'" @click="changeMode" data-mode="2">推荐</span>
      </div>
    </div>
    <!-- 下面是头部第二行的内容 -->
    <div class="header-bottom">
      <div>
        <!-- 下面是编程界面的图标栏 -->
        <div class="icons-container" v-if="$store.state.isCode">
          <div class="use-help">
            <img src="../../assets/icons/help.png" alt="">
          </div>
          <div class="cut-line">
            <img src="../../assets/icons/cut_line.png" alt="">
          </div>
          <div class="operate-change">
            <img src="../../assets/icons/revoke.png" alt="">
          </div>
          <div class="operate-change">
            <img class="restore-icon" src="../../assets/icons/restore.png" alt="">
          </div>
          <div class="cut-line">
            <img src="../../assets/icons/cut_line.png" alt="">
          </div>
          <div class="share-button">
            <img src="../../assets/icons/share.png" alt="">
          </div>
          <div @click="update" class="update-button">
            <img src="../../assets/icons/save.png" alt="">
          </div>
        </div>
        <!-- 下面是推荐页面的图标栏 -->
        <div class="icons-container" v-if="!$store.state.isCode">
          <div class="choice-order" @click="choiceSortOrder">
            <span data-order='1' :class="$store.state.sortOrder == 1 ? 'active' : 'normal'">最新发布</span>
            <span data-order='2' :class="$store.state.sortOrder == 2 ? 'active' : 'normal'">上升最快</span>
            <span data-order='3' :class="$store.state.sortOrder == 3 ? 'active' : 'normal'">精选方案</span>
          </div>
          <div class="search-recommand">
            <label for="search-input"><img src="../../assets/icons/search.png" autocomplete="off" placeholder="输入方案关键词" alt=""></label>
            <input id="search-input" type="text">
          </div>
        </div>

        <div class="user-operate-container">
          <span class="user-name" v-if="$store.state.isLogin">QG Studio</span>
          <div class="user-icon" v-if="$store.state.isLogin">
            <img src="../../assets/1.png" alt="">
          </div>
          <div class="account-operate" v-if="!$store.state.isLogin">
            <span data-operate="login" @click="showOperate">登陆</span>
            <span data-operate="regist" @click="showOperate">注册</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PubSub from 'pubsub-js'
import { findItem } from '@/utils/shared/vlist-utils'
import { checkData } from '@/utils/shared/common-utils'
import { formatData } from '@/utils/models/view-to-data'
import Component from 'vue-class-component';

@Component
export default class Header extends Vue {
  mounted() {
    let token = PubSub.subscribe('update', (e: any, data: any) => {
      if (data.cancel == true) {
        return ;
      }

      if (this.$store.state.choiceTarget == null) {
        this.$store.state.message = '请选择想要执行的代码块'
        this.$store.state.showMessage = true;
        return ;
      }

      let item = findItem(this.$store.state.choiceTarget, this.$store.state.canvasList);
      let result = formatData(item);
      
      if (checkData(result) == false) {
        this.$store.state.message = '请添加条件'
        this.$store.state.showMessage = true;
          return ;
      }

      if (result.type == 'while') {
        result.type = 'if';
        result.condition = 'True';
      }

      let send = {
        id: 12,
        program: result
      }
      this.$http
        .post('/user/program', send)
        .then((res: any) => {
          let data = res.data;
          if (data.code == '200') {
            this.$store.state.message = '成功提交编程方案，正在给机器人下发指令，请注意机器人的行为！'
            this.$store.state.showMessage = true;
          }
        })
      // console.log(requestData)
      // PubSub.unsubscribe(token);
    })
  }
  
  /**
   * @description 更新操作
   */
  update() {
    this.$store.state.showConfirm = true;
    this.$store.state.confirmMes = '确定上传点击的积木块？'
  }

  // 选择全局的模式
  changeMode(event: any) {
    let mode = event.target.getAttribute('data-mode');
    if (mode === '1') {
      this.$store.state.isCode = true;
    } else {
      this.$store.state.isCode = false;
    }
  }

  // 选择排序的方式
  choiceSortOrder(event: any) {
    if (event.target.tagName.toLowerCase() !== 'span') {
      return ;
    }
    let order = parseInt(event.target.getAttribute('data-order'));
    this.$store.state.sortOrder = order;
  }
  
  showOperate(event: any) {
    let operate = event.target.getAttribute('data-operate');
    if (operate === 'regist') {
      this.$store.state.showRegist = true;
    } else {
      this.$store.state.showLogin = true;
    }
  }
}
</script>
