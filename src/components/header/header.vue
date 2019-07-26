<style lang="scss" scoped>

</style>

<template>
  
</template>

<script lang="ts">
import Vue from 'vue'
import PubSub from 'pubsub-js'
import { findItem } from '@/utils/shared/vlist-utils'
import { checkData } from '@/utils/shared/common-utils'
import { formatData } from '@/utils/models/view-to-data'


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
}
</script>
