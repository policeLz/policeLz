<template>
  <div id="register">
    <div id="info">
      <div style="margin-bottom:14px;height:15px">
        <div style="float: left; font-size: 15px">注册账号</div>
        <div style="float: right; font-size: 12px">已有账号，<span @click="phoneLogin" style="color:red">登录</span></div>
      </div>
      <div style="width:520px;height: 471px; background: rgba(3,15,36,0.2899);padding-top: 59px;padding-left: 40px;padding-right:40px">
        <div style="width: 100%; height: 422px;">
          <div style="width: 50%; height: 100%; float: left;border-right:1px solid #1C58BF">
            <video v-if="flag" id="video" width="220px" height="220px" autoplay></video>
            <canvas style="display:none;" id="canvasCamera" width="220px" height="220px" ></canvas>
            <img v-if="!flag" :src="imgSrc" alt="" class="tx_img">
            <el-button type="warning" @click="collection" style="width: 220px;margin-top:100px;">人脸采集</el-button>
            <el-button type="info" @click="reset" style="width: 220px;margin-top:20px;margin-left:0px">重置</el-button>
          </div>
          <div style="width: 49%; height: 100%; float: right">
            <el-form ref="form" :model="form" :rules="rules" label-width="20px">
              <el-form-item prop="name" label=" " class="paddingItem">
                <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item prop="bh" label=" " class="paddingItem">
                <el-input v-model="form.bh" placeholder="请输入身份证号"></el-input>
              </el-form-item>
              <el-form-item style="text-align:left;" class="paddingItem">
                <el-radio-group v-model="form.sex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="phone" label=" " class="paddingItem">
                <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item prop="yzm" label=" " class="paddingItem">
                <el-input v-model="form.name" placeholder="请输入验证码" style="width: 50%; float: left"></el-input>
                <div style="width: 40%; margin-top: 5px; height:32px; line-height:32px; font-size: 12px; float: right; background:rgba(255,255,255,0.2);border-radius:4px;color:white">获取验证码</div>
              </el-form-item>
              <el-form-item prop="d1" label=" " class="paddingItem">
                <el-select v-model="form.d1" style="width:100%" placeholder="请选择所在地区">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="d2" label=" " class="paddingItem">
                <el-select v-model="form.d2" style="width:100%" placeholder="请选择工作单位">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="d3" label=" " class="paddingItem">
                <el-select v-model="form.d3" style="width:100%" placeholder="请选择职务">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" style="width:100%">完成</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
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
        mediaStreamTrack: null,
        video: null,
        imgSrc: null,
        flag: true, // true 摄像头， false 图片
        thisCancas: null,
        thisContext: null,
        thisVideo: null,
        form: {},
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          d1: [
            { required: true, message: '请选择所在地区', trigger: 'change' }
          ]
        }
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {
    this.openMedia()
  },
  watch: {

  },
  methods: {
    // 启动摄像头（线上Google需要https协议）
    openMedia () {
        let constraints = {
          video: { width: 220, height: 220},
          audio: false
        }
        this.video = document.getElementById('video')
        this.thisCancas = document.getElementById('canvasCamera')
        this.thisContext = this.thisCancas.getContext('2d')
        let promise = navigator.mediaDevices.getUserMedia(constraints)
        promise.then((mediaStream) => {
            this.mediaStreamTrack = mediaStream.getVideoTracks()
            this.video.srcObject = mediaStream
            this.video.play()
        })
    },
    // 完成事件
    onSubmit () {},
    // 采集事件
    collection () {
      this.thisContext.drawImage(
        this.video,
        0,
        0,
        220,
        220
      )
      let image = this.thisCancas.toDataURL("image/png");
      this.flag = false
      this.imgSrc = image
    },
    // 重置事件
    reset () {
      this.flag = true
      // this.imgSrc = null
      this.$nextTick(() => {
        this.openMedia()
      })
    },
    // 手机登录
    phoneLogin () {
      this.$router.push({path:'/phoneVerification'})
    }
  },
  components: {

  }
}
</script>

<style>
.paddingItem .el-form-item__label{
  padding:0px !important;
}
.paddingItem .el-input__inner {
  height: 32px;
  line-height: 32px;
  font-size: 12px;
}
.paddingItem .el-radio {
  color: white;
}
.paddingItem .el-form-item__error {
  padding-top: 0px
}
</style>

<style scoped lang="stylus">
.el-form-item
  margin-bottom 8px
#register
    width 100%
    height 100vh
    display -webkit-flex
    background url('../assets/image/loginBg.png') no-repeat center center
    background-size 100% 100%
    -webkit-flex-direction column
    overflow hidden
    text-align left
    color white
    #info
        text-align center
        position absolute
        top 50%
        left 50%
        width 600px
        height 500px
        transform translate(-50%,-60%)
        -webkit-transform translate(-50%,-60%)
</style>
