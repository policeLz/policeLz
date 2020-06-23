<template>
  <div id="login">
    <div id="info">
        <img src="../assets/image/nationalEmblem.png" height="95px" width="96px" />
        <div style="font-weight:bold;color:white;font-size:36px; margin-top: 40px;font-family:Source Han Sans Bold Bold">无锡公安情报指挥赋能实战平台</div>
        <img src="../assets/image/usb.png" @click="verification" height="90px" width="254px"  style=" margin-top: 48px"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {

  },
  data () {
    return {

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
    verification () {
      this.$router.push({path:'/phoneVerification'})
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
#login
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
