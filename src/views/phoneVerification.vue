<template>
  <div id="phoneVerification">
    <div id="info">
        <img src="../assets/image/nationalEmblem.png" height="95px" width="96px" />
        <div style="font-weight:bold;color:white;font-size:36px; margin-top: 40px;font-family:Source Han Sans Bold Bold">无锡公安情报指挥赋能实战平台</div>
        <div style="margin-top:45px;">
            <el-input v-model="phone" placeholder="请输入手机号" style="width:340px;margin-right:20px"></el-input>
            <img src="../assets/image/jt.png" @click="phoneVerification" style="position: relative;top: 15px;left: 0px;" height="40px" width="40px">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {

  },
  data () {
    return {
        phone: null,
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {

  },
  watch: {

  },
  methods: {
    phoneVerification () {
        // 如果已注册手机号
        this.$router.push({path:'/verification'})
        // 如果未注册手机号
        // this.$router.push({path:'/register'})
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
#phoneVerification
    width 100%
    height 100vh
    display -webkit-flex
    background url('../assets/image/loginBg.png') no-repeat center center
    background-size 100% 100%
    -webkit-flex-direction column
    overflow hidden
    text-align left
    #info
        text-align center
        position absolute
        top 50%
        left 50%
        width 504px
        height 420px
        transform translate(-50%,-70%)
        -webkit-transform translate(-50%,-70%)
</style>
