<template>
  <div id="map">
  </div>
</template>
 
<script>
import {BMapMixin} from '../mixin/BMap/BMapApi'
export default {
  name: 'Map',
  mixins:[BMapMixin],
  data () {
    return {
      bmap:null,
      layerList:[],
    }
  },
  methods: {
    
  },
  mounted () {
    //this.createMap()
    //this.getDistance({lon:'120.3054566',lat:'31.570037'},{lon:'120.3154566',lat:'31.5600377'},function(e){console.log(e)});//地图测距
    //this.addOverlay({lon:'120.3054566',lat:'31.570037'},{lon:'120.3154566',lat:'31.5600377'});//地图上添加折线
    //this.drawLine();
    this.drawGraphical('CIRCLE',function(e){
      // MARKER: "marker",     // 鼠标画点模式
      // POLYLINE: "polyline",   // 鼠标画线模式
      // CIRCLE: "circle",     // 鼠标画圆模式
      // RECTANGLE: "rectangle",  // 鼠标画矩形模式
      // POLYGON: "polygon"   // 鼠标画多边形模式
      console.log(e)
    })
  }
}
</script>
<style scoped lang="stylus">
#map
  height:85vh
</style>