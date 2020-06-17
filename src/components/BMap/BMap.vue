<template>
  <div>
    <div id="map">
    </div>
    <div class="btnGroup">
      <input value="测距" type="button" @click="getDistance({lon:'120.3054566',lat:'31.570037'},{lon:'120.3154566',lat:'31.5600377'},function(){console.log(123)})">
      <input value="警情上图" type="button" @click="drawMarker(120.3054566,31.570037)">
      <!-- <input value ="轨迹回放" type="button" @click="moveByLine"> -->
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
    btnFunction(){
      
    }
  },
  mounted () {
    //this.createMap()
    //this.getDistance({lon:'120.3054566',lat:'31.570037'},{lon:'120.3154566',lat:'31.5600377'},function(e){console.log(e)});//地图测距
    //this.addOverlay({lon:'120.3054566',lat:'31.570037'},{lon:'120.3154566',lat:'31.5600377'});//地图上添加折线
    //this.drawLine();
    // this.drawGraphical('CIRCLE',function(e){
    //   // MARKER: "marker",     // 鼠标画点模式
    //   // POLYLINE: "polyline",   // 鼠标画线模式
    //   // CIRCLE: "circle",     // 鼠标画圆模式
    //   // RECTANGLE: "rectangle",  // 鼠标画矩形模式
    //   // POLYGON: "polygon"   // 鼠标画多边形模式
    //   console.log(e)
    // })
    //this.moveByLine();
    //this.threePrevention(120.3054566, 31.570037)
   // this.aggregationPoints();
    // this.drawGraphical('CIRCLE',function(e,event){
    //   console.log(event)
    //   var point =new BMap.Point(120.3054566, 31.570037);
    //   console.log(BMapLib.GeoUtils.isPointInCircle(point,event))
    // })
    //this.drawMarker();
  }
}
</script>
<style scoped lang="stylus">
#map
  height:85vh
</style>