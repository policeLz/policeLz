export const BMapMixin = {
    data() {
        return {
            myBMap: null,
            layerList: [],
            overlays: [],
            BMAP_DRAWING: {
                MARKER: "marker",     // 鼠标画点模式
                POLYLINE: "polyline",   // 鼠标画线模式
                CIRCLE: "circle",     // 鼠标画圆模式
                RECTANGLE: "rectangle",  // 鼠标画矩形模式
                POLYGON: "polygon"   // 鼠标画多边形模式
            }
        }
    },
    mounted() {
        var map = new BMap.Map("map",{ enableMapClick: false })
        this.myBMap = map
        // 初始化地图,设置中心点坐标和地图级别
        map.centerAndZoom(new BMap.Point(120.3054566, 31.570037), 11)
        //添加地图类型控件
        map.addControl(new BMap.MapTypeControl({
            mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        }))
        // 设置地图显示的城市 此项是必须设置的
        map.setCurrentCity("无锡")
        //开启鼠标滚轮缩放
        map.enableScrollWheelZoom(true)
    },
    methods: {
        getDistance(pointA, pointB,callback) {//测距   单位（米）
            //获取两点间距离
            let _this = this, map = _this.myBMap;
            var pointA = new BMap.Point(pointA.lon, pointA.lat);
            var pointB = new BMap.Point(pointB.lon, pointB.lat);
            console.log('从大渡口区到江北区的距离是：' + (map.getDistance(pointA, pointB)).toFixed(2) + ' 米。');  //获取两点距离,保留小数点后两位
            callback((map.getDistance(pointA, pointB)).toFixed(2))
        },
        // addOverlay(pointA, pointB) {//画直线
        //     let _this = this, map = _this.myBMap;
        //     var pointA = new BMap.Point(pointA.lon, pointA.lat);
        //     var pointB = new BMap.Point(pointB.lon, pointB.lat);
        //     var polyline = new BMap.Polyline([pointA, pointB], { strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.5 });  //定义折线
        //     map.addOverlay(polyline);     //添加折线到地图上
        // },
        clearAll() {//清楚绘制的痕迹
            let _this = this, map = _this.myBMap;
            for (var i = 0; i < overlays.length; i++) {
                map.removeOverlay(overlays[i]);
            }
            overlays.length = 0
        },
        drawGraphical(type,callback){//画图形
            //type 类型    ‘MARKER’
            // MARKER: "marker",     // 鼠标画点模式
            // POLYLINE: "polyline",   // 鼠标画线模式
            // CIRCLE: "circle",     // 鼠标画圆模式
            // RECTANGLE: "rectangle",  // 鼠标画矩形模式
            // POLYGON: "polygon"   // 鼠标画多边形模式
            let _this = this, map = _this.myBMap;
            var overlaycomplete = function (e) {
                 _this.overlays.push(e.overlay);
                 var drawPath = e.overlay.getPath();
                // drawPath.forEach(item=>{
                //     console.log(item.lat)
                //     console.log(item.lng)
                // })
                callback(drawPath)
            };
            var styleOptions = {
                strokeColor: "red",    //边线颜色。
                fillColor: "red",      //填充颜色。当参数为空时，圆形将没有填充效果。
                strokeWeight: 2,       //边线的宽度，以像素为单位。
                strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
                fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
                strokeStyle: 'solid' //边线的样式，solid或dashed。
            }
            //实例化鼠标绘制工具
            var drawingManager = new BMapLib.DrawingManager(map, {
                isOpen: false, //是否开启绘制模式
                enableDrawingTool: false, //是否显示工具栏
                drawingToolOptions: {
                    anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                    offset: new BMap.Size(5, 5), //偏离值
                },
                drawingMode:_this.BMAP_DRAWING[type],
                circleOptions: styleOptions, //圆的样式
                polylineOptions: styleOptions, //线的样式
                polygonOptions: styleOptions, //多边形的样式
                rectangleOptions: styleOptions //矩形的样式
            });
            //添加鼠标绘制工具监听事件，用于获取绘制结果
            drawingManager.addEventListener('overlaycomplete', overlaycomplete);
            //console.log(_this.BMAP_DRAWING.POLYLINE)
           // drawingManager.setDrawingMode(_this.BMAP_DRAWING.POLYLINE);
            drawingManager.open()
        },
        
    },

}