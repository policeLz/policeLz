<template>
    <div id="caseList">
         <el-tabs v-model="activeName"  @tab-click="handleClick">
            <el-tab-pane label="警情" name="first">
                <CaseList @caseToMap = "caseToMap"></CaseList>
                <div style="width:90%">
                  <el-pagination
                    small
                    layout="prev, pager, next"
                    :total="10000">
                  </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="舆情" name="second">舆情</el-tab-pane>
            <el-tab-pane label="稳情" name="third">稳情</el-tab-pane>
            <el-tab-pane label="更多" name="fourth">更多</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
  import CaseList from './CaseList'
  export default {
    components:{
      CaseList
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      caseToMap(caseItem){
        this.$emit('caseToMap',caseItem)
      }
    }
  };
</script>
<style lang="stylus" >
#caseList
  .el-tabs__nav
    width 100%
    .el-tabs__item
      width 25%
</style>