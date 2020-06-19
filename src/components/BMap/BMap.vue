<template>
  <div>
    <div id="map">
    </div>
    <div class="btnGroup">
      <input value="测距" type="button" @click="getDistance({lng:'120.3054566',lat:'31.570037'},{lng:'120.3154566',lat:'31.5600377'})">
      <input value="切换地图背景" type="button" @click="changeTheme('midnight')">
      <input value="警情上图" type="button" @click="drawMarker(120.3054566,31.570037)">
      <input value ="轨迹回放" type="button" @click="moveByLine">
      <input value="打点" type="button" @click="drawPoint">
      <input value ="画线" type="button" @click="drawLine">
      <input value ="框选" type="button" @click="drawCircle">
      <input value ="画多边形" type="button" @click="drawPolygon">
      <input value ="三级防控" type="button" @click="threePrevention(120.3054566, 31.570037)">
      <input value ="视频聚合上图" type="button" @click="aggregationPoints">
      <input value ="导航" type="button" @click="nagivate">
      <input value ="开启路况" type="button" @click="trafficOn">
      <!-- <input value ="关闭路况" type="button" @click="trafficOff"> -->
      <input value ="热力图" type="button" @click="showHeatMap">
      <input value ="清除" type="button" @click="clearAll">
      
    </div>
  </div>
</template>
 
<script>
import {BMapMixin} from '../mixin/BMap/BMapApi'
export default {
  name: 'Map',
  mixins:[BMapMixin],
  data () {
    return {
    }
  },
  methods: {
    caseToMap(){

    },
  }
}
</script>
<style scoped lang="stylus">
#map
  height:90vh
</style>