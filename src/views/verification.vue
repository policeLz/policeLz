<template>
  <div id="verification">
    <div id="info">
        <img src="../assets/image/nationalEmblem.png" height="95px" width="96px" />
        <div style="font-weight:bold;color:white;font-size:36px; margin-top: 40px;font-family:Source Han Sans Bold Bold">无锡公安情报指挥赋能实战平台</div>
        <div style="margin-top:45px; width:340px; margin-left:15%">
            <el-input v-model="phone" placeholder="请输入手机号" style="width:100%;margin-right:20px;"></el-input>
            <div style="margin-top:20px;"> 
                <el-input v-model="verification" placeholder="请输入验证码" style="width:60%;margin-right:20px;float:left"></el-input>
                <div style="width: 30%; height:40px; line-height:40px; font-size: 16px; float: right; background:rgba(255,255,255,0.2);border-radius:4px;color:white">获取验证码</div>
            </div>
            <el-button type="primary" @click="onSubmit" style="margin-top:20px;width: 100%">登录</el-button>
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
        roleId: null,
        verification: null
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
    // 登录条状页面
    onSubmit () {
      this.$router.push({path:'/faceRfecognition'})
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
#verification
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
