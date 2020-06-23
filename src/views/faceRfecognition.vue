<template>
  <div id="faceRfecognition">
    <div id="info">
        <div>人脸识别</div>
        <div class="content">
            <div style="width:300px;height:300px;background: rgba(255,255,255,0.09)">
                <video id="video" width="300px" height="300px" autoplay></video>
                <span class="jiao1"></span>
                <span class="jiao2"></span>
                <span class="jiao3"></span>
                <span class="jiao4"></span>
            </div>
            <div style="width: 300px; height: 150px; background: rgba(8,23,52,0.37);margin-top: 11px">
                <div style="height: 100px;width: 100px;position: relative;left: 25px;top: 30px;float: left">
                    <p>识别成功</p>
                    <p>***</p>
                </div>
                <div style="width: 180px; height: 100px;position: relative;left: 0px;top: 35px;float: right">
                    <el-select class="paddingItem" v-model="roleId" style="width:90%" placeholder="请选择角色">
                        <el-option
                            v-for="item in roles"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-button type="primary" style="width: 90%; margin-top: 10px; height: 32px; line-height: 9px">进入系统</el-button>
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
        phone: null,
        roles: [
            {id: 1, name: '领导'},
            {id: 2, name: '总指挥长/总值班长'},
            {id: 3, name: '指挥长/值班长'},
            {id: 4, name: '一级指挥'},
            {id: 5, name: '二级指挥'},
            {id: 6, name: '三级指挥'},
            {id: 7, name: '联勤指挥'},
            {id: 8, name: '接警巡逻'},
            {id: 9, name: '警种联动'},
            {id: 10, name: '社会联动'},
            {id: 11, name: '网格联动'},
            {id: 12, name: '综合管理'},
            {id: 13, name: '其他人员'}
        ],
        roleId: '',
        video: null
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {
      this.openMedia()
  },
  destroyed () {
      this.stopNavigator()
  },
  watch: {

  },
  methods: {
      // 启动摄像头（线上Google需要https协议）
    openMedia () {
        let constraints = {
          video: { width: 300, height: 300},
          audio: false
        }
        this.video = document.getElementById('video')
        // this.thisCancas = document.getElementById('canvasCamera')
        // this.thisContext = this.thisCancas.getContext('2d')
        let promise = navigator.mediaDevices.getUserMedia(constraints)
        promise.then((mediaStream) => {
            this.mediaStreamTrack = mediaStream.getVideoTracks()
            this.video.srcObject = mediaStream
            this.video.play()
        })
    },
    stopNavigator () {
        this.video.srcObject.getTracks()[0].stop()
    }
  },
  components: {

  }
}
</script>

<style>
.paddingItem .el-input__inner {
  height: 32px;
  line-height: 32px;
  font-size: 12px;
}
</style>

<style scoped lang="stylus">
#faceRfecognition
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
        color white
        width 400px
        height 520px
        transform translate(-50%,-50%)
        -webkit-transform translate(-50%,-50%)
        .content
            margin-top 10px
            height 490px
            padding-left 50px
            padding-top 50px
            background rgba(3,15,36,0.2899)
            position relative
            .jiao1
                position absolute
                left 50px
                top 50px
                width 30px
                height 30px
                border-top 2px solid #28B8D0
                border-left 2px solid #28B8D0
            .jiao2
                position absolute
                right 50px
                top 50px
                width 30px
                height 30px
                border-top 2px solid #28b8d0
                border-right 2px solid #28b8d0
            .jiao3
                position absolute
                right 50px
                bottom 190px
                width 30px
                height 30px
                border-bottom 2px solid #28b8d0
                border-right 2px solid #28b8d0
            .jiao4
                position absolute
                left 50px
                bottom 190px
                width 30px
                height 30px
                border-bottom 2px solid #28b8d0
                border-left 2px solid #28b8d0   
</style>
