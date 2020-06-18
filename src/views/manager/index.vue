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
                        class="el-menu-vertical-demo"
                        :router=true>
                        <el-submenu v-for="(item) in menus" :index="item.url" :key="item.id">
                            <template slot="title">
                                <i :class="item.icon"></i>
                                <span>{{item.name}}</span>
                            </template>
                            <el-menu-item style="padding-left:48px" :index="item2.url" v-for="item2 in item.children" :key="item2.id">{{item2.name}}</el-menu-item>
                        </el-submenu>
                    </el-menu>
                  </el-col>
                </el-row>
            </el-aside>
            <el-main>
                <div class="main">
                    <router-view></router-view>
                </div>
                <div class="footer">
                    2020&nbsp;©&nbsp;大数据情报指挥综合赋能服务平台
                </div>
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
      menus: [{
        id: 1,
        name: '系统管理',
        icon: 'el-icon-s-tools',
        url: '/manager/system/user',
        children: [
          { 
            id: 11,
            name: '用户管理',
            url: '/manager/system/user'
          },
          { 
            id: 12,
            name: '角色管理',
            url: '/manager/system/role'
          },
          { 
            id: 13,
            name: '权限管理',
            url: '/manager/system/authority'
          }
        ]
      }]
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
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
*
    margin 0
    padding 0
::-webkit-scrollbar 
  width 10px
  height 10px
::-webkit-scrollbar-thumb 
  background-color #a1a3a9
  border-radius 3px
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
        border-right 1px solid rgba(0, 0, 0, 0.05)
    .el-main 
        background-color #E9EEF3
        color #333
        height 100%
        overflow-y auto
        .main
            padding 20px 5px 15px 5px
        .footer
            background #f9f9f9
            border-top 1px solid rgba(0, 0, 0, 0.05)
            padding 20px 30px
            color #58666e
            position absolute
            right 0px
            left 240px
            bottom 0px
</style>