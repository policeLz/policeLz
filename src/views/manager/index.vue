<template>
  <div id="managerIndex">
    <el-container>
        <el-header style="height:70px;line-height:70px">
            <div style="float:left;font-size:18px;font-weight:bold">大数据情报指挥综合赋能服务平台</div>
            <div style="float:right">admin</div>
        </el-header>
        <el-container>
            <el-aside width="240px">
                <el-row>
                  <el-col :span="24">
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>导航一</span>
                            </template>
                            <el-menu-item-group>
                                <template slot="title">分组一</template>
                                <el-menu-item index="1-1">选项1</el-menu-item>
                                <el-menu-item index="1-2">选项2</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1-4">
                                <template slot="title">选项4</template>
                                <el-menu-item index="1-4-1">选项1</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">导航二</span>
                        </el-menu-item>
                        <el-menu-item index="3" disabled>
                            <i class="el-icon-document"></i>
                            <span slot="title">导航三</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                    </el-menu>
                  </el-col>
                </el-row>
            </el-aside>
            <el-main>
            </el-main>
        </el-container>
    </el-container>
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
    // 菜单打开事件
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    // 菜单关闭事件
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
*
    margin 0
    padding 0
#managerIndex
    width 100%
    height 100vh
    display -webkit-flex
    -webkit-flex-direction column
    overflow hidden
    text-align left
    .el-header
        background-color #409EFF
        color white
        padding 0px 15px
        box-shadow 0px 1px 3px #808080
        margin-bottom 3px
    .el-aside 
        background-color white
        color #333
    .el-main 
        background-color #E9EEF3
        color #333
        height 100%
        overflow-y auto
</style>