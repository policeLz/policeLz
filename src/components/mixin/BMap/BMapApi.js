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
            },
            threePrevention1: null,
            threePrevention2: null
        }
    },
    mounted() {
        var map = new BMap.Map("map", { enableMapClick: false })
        this.myBMap = map
        // 初始化地图,设置中心点坐标和地图级别
        map.centerAndZoom(new BMap.Point(120.3054566, 31.570037), 14)
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
        getDistance(pointA, pointB, callback) {//测距   单位（米）
            //获取两点间距离
            let _this = this, map = _this.myBMap;
            _this.addOverlay(pointA,pointB)
            map.centerAndZoom(new BMap.Point(pointA.lon, pointA.lat),14)
            var pointA = new BMap.Point(pointA.lon, pointA.lat);
            var pointB = new BMap.Point(pointB.lon, pointB.lat);
            alert('距离是：' + (map.getDistance(pointA, pointB)).toFixed(2) + ' 米。');  //获取两点距离,保留小数点后两位
            //callback((map.getDistance(pointA, pointB)).toFixed(2))
            
        },
        addOverlay(pointA, pointB) {//画直线
            let _this = this, map = _this.myBMap;
            var pointA = new BMap.Point(pointA.lon, pointA.lat);
            var pointB = new BMap.Point(pointB.lon, pointB.lat);
            var polyline = new BMap.Polyline([pointA, pointB], { strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.5 });  //定义折线
            map.addOverlay(polyline);     //添加折线到地图上
            _this.overlays.push(polyline)
        },
        clearAll() {//清楚绘制的痕迹
            let _this = this, map = _this.myBMap;
            for (var i = 0; i < _this.overlays.length; i++) {
                map.removeOverlay(_this.overlays[i]);
            }
            _this.overlays.length = 0
        },
        //画图形
        //@params type : 'MARKER' 点 'POLYLINE'线  'CIRCLE'圆 'RECTANGLE'矩形  'POLYGON'多边形
        drawGraphical(type, callback) {
            //type 类型    ‘MARKER’
            // MARKER: "marker",     // 鼠标画点模式
            // POLYLINE: "polyline",   // 鼠标画线模式
            // CIRCLE: "circle",     // 鼠标画圆模式
            // RECTANGLE: "rectangle",  // 鼠标画矩形模式
            // POLYGON: "polygon"   // 鼠标画多边形模式
            let _this = this, map = _this.myBMap;
            var overlaycomplete = function (e) {
                if (e.overlay instanceof BMap.Circle) {
                    e.overlay.enableEditing();
                    drawingManager.close();
                }
                e.overlay.addEventListener('lineupdate', function() {
                    console.log('圆更新' + '半径' + e.overlay.getRadius());
                    console.log(e.overlay.getCenter());
                });
                _this.overlays.push(e.overlay);
                var drawPath = e.overlay.getPath();
                // drawPath.forEach(item=>{
                //     console.log(item.lat)
                //     console.log(item.lng)
                // })
                callback(drawPath,drawingManager)
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
                drawingMode: _this.BMAP_DRAWING[type],
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
        drawMarker() {//标记点  并弹框
            let _this = this, map = _this.myBMap;
            var pt = new BMap.Point(120.3054566, 31.570037);
            var myIcon = new BMap.Icon(require("../../../assets/image/logo.png"), new BMap.Size(44, 46));
            var marker = new BMap.Marker(pt, { icon: myIcon });  // 创建标注
            map.addOverlay(marker);              // 将标注添加到地图中
            _this.overlays.push(marker)
            var sContent =
                "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>天安门</h4>" +
                `<img style='float:right;margin:4px' id='imgDemo' src='${require("../../../assets/image/logo.png")}' width='100' height='104' title='天安门'/>` +
                "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门...</p>" +
                "</div>";
            var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
            marker.addEventListener("click", function () {

                map.panTo(pt);
                this.openInfoWindow(infoWindow);
                //图片加载完毕重绘infowindow
                document.getElementById('imgDemo').onload = function () {
                    infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
                }
            });
        },
        moveByLine: function () {//沿线运动
            let _this = this, map = _this.myBMap;
            var myP1 = new BMap.Point(120.3054566, 31.570037);    //起点
            var myP2 = new BMap.Point(120.3154566, 31.570037);    //终点
            var myIcon = new BMap.Icon(require("../../../assets/image/logo.png"), new BMap.Size(48, 46), {    //小车图片
                //offset: new BMap.Size(0, -5),    //相当于CSS精灵
                imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
            });
            var driving2 = new BMap.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true } });    //驾车实例
            driving2.search(myP1, myP2);    //显示一条公交线路
            _this.run = function () {
                var driving = new BMap.DrivingRoute(map);    //驾车实例
                driving.search(myP1, myP2);
               // _this.overlays.push(driving.getResults().getPlan(0).getRoute(0).marker)
                driving.setSearchCompleteCallback(function (routes) {
                    
                    

                    var pts = driving.getResults().getPlan(0).getRoute(0).getPath();    //通过驾车实例，获得一系列点的数组
                    var paths = pts.length;    //获得有几个点
                    var carMk = new BMap.Marker(pts[0], { icon: myIcon });
                    map.addOverlay(carMk);
                    _this.overlays.push(carMk)
                    var i = 0;
                    function resetMkPoint(i) {
                        carMk.setPosition(pts[i]);
                        if (i < paths) {
                            setTimeout(function () {
                                i++;
                                resetMkPoint(i);
                            }, 100);
                        }
                    }
                    setTimeout(function () {
                        resetMkPoint(5);
                    }, 100)

                });
            }

            setTimeout(function () {
                _this.run();
            }, 1500);
        },
        //三级防控
        threePrevention(x, y) {
            let _this = this, map = _this.myBMap;
            var points = new BMap.Point(x, y);
            map.removeOverlay(_this.threePrevention1);
            map.removeOverlay(_this.threePrevention2);
            _this.threePrevention1 = new BMap.Circle(points, 3000, {
                strokeColor: "#fc042d",
                fillColor: "#fc042d",
                strokeWeight: 2,
                strokeOpacity: 0.6,
                fillOpacity: 0.4,
                strokeStyle: 'dashed'
            });
            _this.threePrevention2 = new BMap.Circle(points, 5000, {
                strokeColor: "#fc042d",
                fillColor: "#fc042d",
                strokeWeight: 2,
                strokeOpacity: 0.6,
                fillOpacity: 0.2,
                strokeStyle: 'dashed'
            });
            console.log(_this.threePrevention1)
            map.addOverlay(_this.threePrevention1);
            map.addOverlay(_this.threePrevention2);
        },
        //聚合点位上图
        aggregationPoints() {
            let _this = this, map = _this.myBMap;
            var randomCount = 200000;

            var data = [];

            var citys = ["北京", "天津", "上海", "重庆", "石家庄", "太原", "呼和浩特", "哈尔滨", "长春", "沈阳", "济南", "南京", "合肥", "杭州", "南昌", "福州", "郑州", "武汉", "长沙", "广州", "南宁", "西安", "银川", "兰州", "西宁", "乌鲁木齐", "成都", "贵阳", "昆明", "拉萨", "海口"];

            // 构造数据
            while (randomCount--) {
                var cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
                data.push({
                    name: '名称',
                    geometry: {
                        type: 'Point',
                        coordinates: [cityCenter.lng - 5 + Math.random() * 10, cityCenter.lat - 5 + Math.random() * 10]
                    }
                });
            }
            
            var dataSet = new mapv.DataSet(data);
            var img = new Image();
            img.src = require("../../../assets/image/logo.png");
            img.onload = function () {
                var options = {
                    // shadowColor: 'rgba(255, 250, 50, 1)',
                    // shadowBlur: 10,
                    fillStyle: 'rgba(255, 50, 0, 1.0)', // 非聚合点的颜色
                    size: 50 / 3 / 2, // 非聚合点的半径
                    icon: img, // 非聚合点时的icon,可设置为空
                    iconWidth: 50 / 3,
                    iconHeight: 77 / 3,
                    iconOffset: {
                        x: 0,
                        y: 0
                    },
                    minSize: 8, // 聚合点最小半径
                    maxSize: 31, // 聚合点最大半径
                    globalAlpha: 0.8, // 透明度
                    clusterRadius: 150, // 聚合像素半径
                    methods: {
                        click: function (item) {
                            if (item) {
                                var opts = {
                                    width: 100,     // 信息窗口宽度
                                    height: 30,     // 信息窗口高度
                                    title: "", // 信息窗口标题
                                }
                                var text = item.name;
                                if (!text) {
                                    text = '聚合数量：' + item.properties.point_count;
                                }
                                var infoWindow = new BMap.InfoWindow(text, opts);  // 创建信息窗口对象 
                                map.openInfoWindow(infoWindow, new BMap.Point(item.geometry.coordinates[0], item.geometry.coordinates[1])); //开启信息窗口
                            }
                            console.log(item);  // 点击事件
                        }
                    },
                    maxZoom: 19, // 最大显示级别
                    label: { // 聚合文本样式
                        show: true, // 是否显示
                        fillStyle: 'white',
                        // shadowColor: 'yellow',
                        // font: '20px Arial',
                        // shadowBlur: 10,
                    },
                    gradient: { 0: "blue", 0.5: 'yellow', 1.0: "rgb(255,0,0)" }, // 聚合图标渐变色
                    draw: 'cluster'
                }
                var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
            }
        }


    },

}