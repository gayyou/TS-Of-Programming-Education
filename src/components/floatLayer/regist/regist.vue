<template> 
  <div class="regist-container">
    <div class="regist-close"><img src="@/assets/icons/close.png" alt="" @click="closeLayer"></div>
    <div class="regist-title">
      <span> 加入我们</span>
      <span>创造出你的方案</span>
    </div>
    <div class="regist-cutline"></div>
    <div class="regist-name">
      <div class="tips" :style="$data.nameIsOK ? 'opacity: 0' : 'opacity: 1'">请填写正确名字</div>
      <label for="regist-name"><span>名字</span></label>
      <input id="regist-name" type="text" v-model="$data.name" ref="name">
    </div>
    <div class="regist-account">
      <div class="tips" :style="$data.accIsOK ? 'opacity: 0' : 'opacity: 1'">请填写正确的手机号</div>
      <label for="regist-account"><span>手机号</span></label>
      <input id="regist-account" type="text" v-model="$data.account" ref="account">
    </div>
    <div class="regist-password">
      <div class="tips" :style="$data.passIsOK ? 'opacity: 0' : 'opacity: 1'">请填写正确的密码</div>
      <label for="regist-password"><span>密码</span></label>
      <input id="regist-password" type="password" v-model="$data.password" ref="password">
    </div>
    <button class="regist-button" id="regist-button" @click="regist">注册</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Watch, Component } from 'vue-property-decorator';

@Component
export default class Regist extends Vue {
  account: string = '';
  password: string = '';
  name: string = '';
  accIsOK: boolean = true;
  passIsOK: boolean = true;
  nameIsOK: boolean = true;

  closeLayer() {
    this.$store.state.showRegist = false;
  }

  regist() {
    let accReg = new RegExp(/^1[3456789]\d{9}$/),
        passReg = new RegExp(/^.{0,18}$/),
        nameReg = new RegExp(/^.{0,18}$/)
    
    if (!accReg.test(this.$data.account)) {
      this.$data.accIsOK = false;
      (<HTMLInputElement>this.$refs.account).focus();
      return ;
    }
    if (!passReg.test(this.$data.password)) {
      this.$data.passIsOK = false;
      (<HTMLInputElement>this.$refs.password).focus();
      return ;
    }

    this.$http
    .post('/user/register', {
      userName: this.$data.account,
      password: this.$data.password,
      name: this.$data.name
    })
    .then((res: any) => {
      let data = res.data;
      
      switch(data.code) {
        case '200': {
          if (data.data) {
            // 登陆成功
            this.$store.state.message = '注册成功'
          } else {
            // this.$emit('message', '登陆失败,请检测账号和密码')
            this.$store.state.message = '注册失败,账号已经注册'
            // 登陆失败
          }
          break;
        }
        case '500': {
          this.$emit('message', '请求失败，请检查你的网络状况')
          this.$store.state.message = '请求失败，请检查你的网络状况'
          break;
        }
      }
      this.$store.state.showMessage = true;
    })
    .catch((err: string) => {
      throw new Error(err);
      // console.log('异常了')
    })
  }

  @Watch('account')
  handleAccount(newVal: string) {
    let reg = new RegExp(/^1[3456789]\d{9}$/);

    if (reg.test(this.$data.account)) {
      this.$data.accIsOK = true;
    } else {
      this.$data.accIsOK = false;
    }

    if (newVal.length > 11) {
      this.$data.account = newVal.slice(0, 11);
    }
  }

  @Watch('password')
  handlePassword(newVal: string) {
    let reg = new RegExp(/^.{0,18}$/);

    if (reg.test(this.$data.password)) {
      this.$data.passIsOK = true;
    } else {
      this.$data.passIsOK = false;
    }

    if (newVal.length > 18) {
      this.$data.password = newVal.slice(0, 18);
    }
  }

  @Watch('name')
  handleName(newVal: string) {
    let reg = new RegExp(/^.{0,15}$/);

    if (reg.test(this.$data.name)) {
      this.$data.nameIsOK = true;
    } else {
      this.$data.nameIsOK = false;
    }

    if (newVal.length > 18) {
      this.$data.name = newVal.slice(0, 18);
    }
  } 
}
</script>


<style lang="scss" scoped>
%clear-float::after {
  content: "";
  display: block;
  clear: both;
}
$themeColor: #ed775a;

.regist-container {

  width: 5.66rem;
  height: 7.1rem;
  background-color: #fff;
  border-radius: 36px;

  .tips {
    position: absolute;
    top: 0.45rem;
    right: -1.5rem;
    width: 1.8rem;
    padding: 0.05rem 0.1rem;
    background-color: #fff;
    transition: opacity .75s ease;
    border: 1px solid rgba($color: #000000, $alpha: 0.3);
    border-radius: 0.08rem;
    box-shadow: 0 0 8px rgba($color: #000000, $alpha: 0.1);
  }
  .tips::after {
    position: absolute;
    display: block;
    content: "";
    transform: rotate(45deg);
    left: -0.069rem;
    top: 0.12rem;
    background-color: #fff;
    width: 0.1rem;
    height: 0.1rem;
    border-left: 1px solid rgba($color: #000000, $alpha: 0.3);
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.3);
  }

  .regist-close {
    width: 100%;
    height: 0.44rem;
    img {
      cursor: pointer;
      display: block;
      width: 0.44rem;
      height: 0.44rem;
      float: right;
      margin-right: 0.2rem;
      margin-top: 0.1rem
    }
  }

  .regist-title {
    @extend %clear-float;
    display: block;
    width: 100%;
    font-family: 'HYZhuZiMuTouRen';
    font-size: 0.6rem;
    color: $themeColor;

    span {
      white-space: pre;
      display: block;
      width: 5rem;
      margin: 0 auto;
      text-align: center;
      // margin-left: 0.3rem;
    }
  }

  .regist-cutline {
    width: 5.06rem;
    margin: 0.15rem auto 0.25rem auto;
    height: 1.5px;
    background-color: #f1f1f1;
  }

  .regist-account, .regist-password, .regist-name {
    position: relative;
    font-family: 'SourceHanSansCN-Regular';
    margin-top: 0.2rem;
    width: 100%;

    label {
      display: block;
      width: 2rem;
      margin-left: 0.2rem;
      margin-top: 0.15rem;

      span {
        font-size: 0.24rem;
        color: #373f53;
      }
    }

    input {
      width: 4rem;
      height: 0.55rem;
      margin: 0 auto;
      border-radius: 24px;
      text-indent: 0.2rem;
      border: 2px solid #f1f1f1;
      transition: all .5s ease;
      font-size: 0.24rem;
    }

    input:focus {
      border: 2px solid #F7947B;
    }
  }

  .regist-password,
  .regist-name {
    label {
      margin-left: 0.1rem; 
    }
  }

  .regist-button {
    font-family: 'SourceHanSansCN-Regular';
    display: block;
    font-size: 0.28rem;
    color: #fff;
    background-color: $themeColor;
    width: 2.1rem;
    height: 0.72rem;
    border-radius: 0.36rem;
    margin: 0.4rem auto;
    transition: all .5s ease;
  }
  .regist-button:hover {
    opacity: 0.5;
  }
}
</style>
