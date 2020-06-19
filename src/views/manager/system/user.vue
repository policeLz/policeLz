<template>
  <div id="user">
    <el-row>
        <el-col :span="24">
           <div style="float:left">用户管理</div>
           <div style="float:right">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/manager' }">系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
              </el-breadcrumb>
           </div>
        </el-col>
    </el-row>
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

  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
#user
    width 100%
    .el-row
        padding-right 10px
        padding-left 10px
</style>
