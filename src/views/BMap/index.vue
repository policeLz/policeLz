<template>
  <div>
    <BMap ref="BMap" @showCaseInfo = "showCaseInfo"></BMap>
    <div style="position:fixed;left:0;top:0;width:20%;height:100vh;background:#fff" class="  ">
        <LeftDrawer @caseToMap = 'caseToMap'></LeftDrawer>
    </div>
    <div v-if="isShowCaseInfo" style="position:fixed;right:0;top:0;width:20%;height:100vh;background:#fff" class="  ">
        <RightDrawer @caseToMap = 'caseToMap'></RightDrawer>
    </div>
    <!--<Record class="recordTools"></Record> -->
    
  </div>
</template>

<script>
import BMap from '../../components/BMap/BMap'
import Record from '../../components/Tools/Record'
import LeftDrawer from '../../components/BMap/LeftDrawer'
import RightDrawer from '../../components/BMap/RightDrawer'
export default {
  name: 'Main',
  components: {
    // topNav,
    BMap,
    LeftDrawer,
    RightDrawer,
    //Record,
  },
  data(){
    return{
      isShowCaseInfo:false
    }
  },
  mounted(){
  },
  methods:{
    caseToMap(caseItem){
      this.$refs.BMap.drawMarker(caseItem)
    },
    showCaseInfo(){
      this.isShowCaseInfo =true
    },
  }
}
</script>

<style scoped lang ="stylus">
.recordTools
  width 100px
  height 100px
  position fixed
  bottom 0
  right 10px

</style>
