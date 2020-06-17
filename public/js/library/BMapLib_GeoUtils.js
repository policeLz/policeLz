  1 /**
  2  * @fileoverview GeoUtils类提供若干几何算法，用来帮助用户判断点与矩形、
  3  * 圆形、多边形线、多边形面的关系,并提供计算折线长度和多边形的面积的公式。 
  4  * 主入口类是<a href="symbols/BMapLib.GeoUtils.html">GeoUtils</a>，
  5  * 基于Baidu Map API 1.2。
  6  *
  7  * @author Baidu Map Api Group 
  8  * @version 1.2
  9  */
 10 
 11 /** 
 12  * @namespace BMap的所有library类均放在BMapLib命名空间下
 13  */
 14 var BMapLib = window.BMapLib = BMapLib || {};
 15 (function() { 
 16     
 17     /**
 18      * 地球半径
 19      */
 20     var EARTHRADIUS = 6370996.81; 
 21 
 22     /** 
 23      * @exports GeoUtils as BMapLib.GeoUtils 
 24      */
 25     var GeoUtils =
 26     /**
 27      * GeoUtils类，静态类，勿需实例化即可使用
 28      * @class GeoUtils类的<b>入口</b>。
 29      * 该类提供的都是静态方法，勿需实例化即可使用。     
 30      */
 31     BMapLib.GeoUtils = function(){
 32         
 33     }
 34     
 35     /**
 36      * 判断点是否在矩形内
 37      * @param {Point} point 点对象
 38      * @param {Bounds} bounds 矩形边界对象
 39      * @returns {Boolean} 点在矩形内返回true,否则返回false
 40      */
 41     GeoUtils.isPointInRect = function(point, bounds){
 42         //检查类型是否正确
 43         if (!(point instanceof BMap.Point) || 
 44             !(bounds instanceof BMap.Bounds)) {
 45             return false;
 46         }
 47         var sw = bounds.getSouthWest(); //西南脚点
 48         var ne = bounds.getNorthEast(); //东北脚点
 49         return (point.lng >= sw.lng && point.lng <= ne.lng && point.lat >= sw.lat && point.lat <= ne.lat);
 50     }
 51     
 52     /**
 53      * 判断点是否在圆形内
 54      * @param {Point} point 点对象
 55      * @param {Circle} circle 圆形对象
 56      * @returns {Boolean} 点在圆形内返回true,否则返回false
 57      */
 58     GeoUtils.isPointInCircle = function(point, circle){
 59         //检查类型是否正确
 60         if (!(point instanceof BMap.Point) || 
 61             !(circle instanceof BMap.Circle)) {
 62             return false;
 63         }
 64 
 65         //point与圆心距离小于圆形半径，则点在圆内，否则在圆外
 66         var c = circle.getCenter();
 67         var r = circle.getRadius();
 68 
 69         var dis = GeoUtils.getDistance(point, c);
 70         if(dis <= r){
 71             return true;
 72         } else {
 73             return false;
 74         }
 75     }
 76     
 77     /**
 78      * 判断点是否在折线上
 79      * @param {Point} point 点对象
 80      * @param {Polyline} polyline 折线对象
 81      * @returns {Boolean} 点在折线上返回true,否则返回false
 82      */
 83     GeoUtils.isPointOnPolyline = function(point, polyline){
 84         //检查类型
 85         if(!(point instanceof BMap.Point) ||
 86             !(polyline instanceof BMap.Polyline)){
 87             return false;
 88         }
 89 
 90         //首先判断点是否在线的外包矩形内，如果在，则进一步判断，否则返回false
 91         var lineBounds = polyline.getBounds();
 92         if(!this.isPointInRect(point, lineBounds)){
 93             return false;
 94         }
 95 
 96         //判断点是否在线段上，设点为Q，线段为P1P2 ，
 97         //判断点Q在该线段上的依据是：( Q - P1 ) × ( P2 - P1 ) = 0，且 Q 在以 P1，P2为对角顶点的矩形内
 98         var pts = polyline.getPath();
 99         for(var i = 0; i < pts.length - 1; i++){
100             var curPt = pts[i];
101             var nextPt = pts[i + 1];
102             //首先判断point是否在curPt和nextPt之间，即：此判断该点是否在该线段的外包矩形内
103             if (point.lng >= Math.min(curPt.lng, nextPt.lng) && point.lng <= Math.max(curPt.lng, nextPt.lng) &&
104                 point.lat >= Math.min(curPt.lat, nextPt.lat) && point.lat <= Math.max(curPt.lat, nextPt.lat)){
105                 //判断点是否在直线上公式
106                 var precision = (curPt.lng - point.lng) * (nextPt.lat - point.lat) - 
107                     (nextPt.lng - point.lng) * (curPt.lat - point.lat);                
108                 if(precision < 2e-10 && precision > -2e-10){//实质判断是否接近0
109                     return true;
110                 }                
111             }
112         }
113         
114         return false;
115     }
116     
117     /**
118      * 判断点是否多边形内
119      * @param {Point} point 点对象
120      * @param {Polyline} polygon 多边形对象
121      * @returns {Boolean} 点在多边形内返回true,否则返回false
122      */
123     GeoUtils.isPointInPolygon = function(point, polygon){
124         //检查类型
125         if(!(point instanceof BMap.Point) ||
126             !(polygon instanceof BMap.Polygon)){
127             return false;
128         }
129 
130         //首先判断点是否在多边形的外包矩形内，如果在，则进一步判断，否则返回false
131         var polygonBounds = polygon.getBounds();
132         if(!this.isPointInRect(point, polygonBounds)){
133             return false;
134         }
135 
136         var pts = polygon.getPath();//获取多边形点
137         
138         //下述代码来源：http://paulbourke.net/geometry/insidepoly/，进行了部分修改
139         //基本思想是利用射线法，计算射线与多边形各边的交点，如果是偶数，则点在多边形外，否则
140         //在多边形内。还会考虑一些特殊情况，如点在多边形顶点上，点在多边形边上等特殊情况。
141         
142         var N = pts.length;
143         var boundOrVertex = true; //如果点位于多边形的顶点或边上，也算做点在多边形内，直接返回true
144         var intersectCount = 0;//cross points count of x 
145         var precision = 2e-10; //浮点类型计算时候与0比较时候的容差
146         var p1, p2;//neighbour bound vertices
147         var p = point; //测试点
148         
149         p1 = pts[0];//left vertex        
150         for(var i = 1; i <= N; ++i){//check all rays            
151             if(p.equals(p1)){
152                 return boundOrVertex;//p is an vertex
153             }
154             
155             p2 = pts[i % N];//right vertex            
156             if(p.lat < Math.min(p1.lat, p2.lat) || p.lat > Math.max(p1.lat, p2.lat)){//ray is outside of our interests                
157                 p1 = p2; 
158                 continue;//next ray left point
159             }
160             
161             if(p.lat > Math.min(p1.lat, p2.lat) && p.lat < Math.max(p1.lat, p2.lat)){//ray is crossing over by the algorithm (common part of)
162                 if(p.lng <= Math.max(p1.lng, p2.lng)){//x is before of ray                    
163                     if(p1.lat == p2.lat && p.lng >= Math.min(p1.lng, p2.lng)){//overlies on a horizontal ray
164                         return boundOrVertex;
165                     }
166                     
167                     if(p1.lng == p2.lng){//ray is vertical                        
168                         if(p1.lng == p.lng){//overlies on a vertical ray
169                             return boundOrVertex;
170                         }else{//before ray
171                             ++intersectCount;
172                         } 
173                     }else{//cross point on the left side                        
174                         var xinters = (p.lat - p1.lat) * (p2.lng - p1.lng) / (p2.lat - p1.lat) + p1.lng;//cross point of lng                        
175                         if(Math.abs(p.lng - xinters) < precision){//overlies on a ray
176                             return boundOrVertex;
177                         }
178                         
179                         if(p.lng < xinters){//before ray
180                             ++intersectCount;
181                         } 
182                     }
183                 }
184             }else{//special case when ray is crossing through the vertex                
185                 if(p.lat == p2.lat && p.lng <= p2.lng){//p crossing over p2                    
186                     var p3 = pts[(i+1) % N]; //next vertex                    
187                     if(p.lat >= Math.min(p1.lat, p3.lat) && p.lat <= Math.max(p1.lat, p3.lat)){//p.lat lies between p1.lat & p3.lat
188                         ++intersectCount;
189                     }else{
190                         intersectCount += 2;
191                     }
192                 }
193             }            
194             p1 = p2;//next ray left point
195         }
196         
197         if(intersectCount % 2 == 0){//偶数在多边形外
198             return false;
199         } else { //奇数在多边形内
200             return true;
201         }            
202     }
203 
204     /**
205      * 将度转化为弧度
206      * @param {degree} Number 度     
207      * @returns {Number} 弧度
208      */
209     GeoUtils.degreeToRad =  function(degree){
210         return Math.PI * degree/180;    
211     }
212     
213     /**
214      * 将弧度转化为度
215      * @param {radian} Number 弧度     
216      * @returns {Number} 度
217      */
218     GeoUtils.radToDegree = function(rad){
219         return (180 * rad) / Math.PI;       
220     }
221     
222     /**
223      * 将v值限定在a,b之间，纬度使用
224      */
225     function _getRange(v, a, b){
226         if(a != null){
227           v = Math.max(v, a);
228         }
229         if(b != null){
230           v = Math.min(v, b);
231         }
232         return v;
233     }
234     
235     /**
236      * 将v值限定在a,b之间，经度使用
237      */
238     function _getLoop(v, a, b){
239         while( v > b){
240           v -= b - a
241         }
242         while(v < a){
243           v += b - a
244         }
245         return v;
246     }
247 
248     /**
249      * 计算两点之间的距离,两点坐标必须为经纬度
250      * @param {point1} Point 点对象
251      * @param {point2} Point 点对象
252      * @returns {Number} 两点之间距离，单位为米
253      */
254     GeoUtils.getDistance = function(point1, point2){
255         //判断类型
256         if(!(point1 instanceof BMap.Point) ||
257             !(point2 instanceof BMap.Point)){
258             return 0;
259         }
260 
261         point1.lng = _getLoop(point1.lng, -180, 180);
262         point1.lat = _getRange(point1.lat, -74, 74);
263         point2.lng = _getLoop(point2.lng, -180, 180);
264         point2.lat = _getRange(point2.lat, -74, 74);
265         
266         var x1, x2, y1, y2;
267         x1 = GeoUtils.degreeToRad(point1.lng);
268         y1 = GeoUtils.degreeToRad(point1.lat);
269         x2 = GeoUtils.degreeToRad(point2.lng);
270         y2 = GeoUtils.degreeToRad(point2.lat);
271 
272         return EARTHRADIUS * Math.acos((Math.sin(y1) * Math.sin(y2) + Math.cos(y1) * Math.cos(y2) * Math.cos(x2 - x1)));    
273     }
274     
275     /**
276      * 计算折线或者点数组的长度
277      * @param {Polyline|Array<Point>} polyline 折线对象或者点数组
278      * @returns {Number} 折线或点数组对应的长度
279      */
280     GeoUtils.getPolylineDistance = function(polyline){
281         //检查类型
282         if(polyline instanceof BMap.Polyline || 
283             polyline instanceof Array){
284             //将polyline统一为数组
285             var pts;
286             if(polyline instanceof BMap.Polyline){
287                 pts = polyline.getPath();
288             } else {
289                 pts = polyline;
290             }
291             
292             if(pts.length < 2){//小于2个点，返回0
293                 return 0;
294             }
295 
296             //遍历所有线段将其相加，计算整条线段的长度
297             var totalDis = 0;
298             for(var i =0; i < pts.length - 1; i++){
299                 var curPt = pts[i];
300                 var nextPt = pts[i + 1]
301                 var dis = GeoUtils.getDistance(curPt, nextPt);
302                 totalDis += dis;
303             }
304 
305             return totalDis;
306             
307         } else {
308             return 0;
309         }
310     }
311     
312     /**
313      * 计算多边形面或点数组构建图形的面积,注意：坐标类型只能是经纬度，且不适合计算自相交多边形的面积
314      * @param {Polygon|Array<Point>} polygon 多边形面对象或者点数组
315      * @returns {Number} 多边形面或点数组构成图形的面积
316      */
317     GeoUtils.getPolygonArea = function(polygon){
318         //检查类型
319         if(!(polygon instanceof BMap.Polygon) &&
320             !(polygon instanceof Array)){
321             return 0;
322         }
323         var pts;
324         if(polygon instanceof BMap.Polygon){
325             pts = polygon.getPath();
326         }else{
327             pts = polygon;    
328         }
329         
330         if(pts.length < 3){//小于3个顶点，不能构建面
331             return 0;
332         }
333         
334         var totalArea = 0;//初始化总面积
335         var LowX = 0.0;
336         var LowY = 0.0;
337         var MiddleX = 0.0;
338         var MiddleY = 0.0;
339         var HighX = 0.0;
340         var HighY = 0.0;
341         var AM = 0.0;
342         var BM = 0.0;
343         var CM = 0.0;
344         var AL = 0.0;
345         var BL = 0.0;
346         var CL = 0.0;
347         var AH = 0.0;
348         var BH = 0.0;
349         var CH = 0.0;
350         var CoefficientL = 0.0;
351         var CoefficientH = 0.0;
352         var ALtangent = 0.0;
353         var BLtangent = 0.0;
354         var CLtangent = 0.0;
355         var AHtangent = 0.0;
356         var BHtangent = 0.0;
357         var CHtangent = 0.0;
358         var ANormalLine = 0.0;
359         var BNormalLine = 0.0;
360         var CNormalLine = 0.0;
361         var OrientationValue = 0.0;
362         var AngleCos = 0.0;
363         var Sum1 = 0.0;
364         var Sum2 = 0.0;
365         var Count2 = 0;
366         var Count1 = 0;
367         var Sum = 0.0;
368         var Radius = EARTHRADIUS; //6378137.0,WGS84椭球半径 
369         var Count = pts.length;        
370         for (var i = 0; i < Count; i++) {
371             if (i == 0) {
372                 LowX = pts[Count - 1].lng * Math.PI / 180;
373                 LowY = pts[Count - 1].lat * Math.PI / 180;
374                 MiddleX = pts[0].lng * Math.PI / 180;
375                 MiddleY = pts[0].lat * Math.PI / 180;
376                 HighX = pts[1].lng * Math.PI / 180;
377                 HighY = pts[1].lat * Math.PI / 180;
378             }
379             else if (i == Count - 1) {
380                 LowX = pts[Count - 2].lng * Math.PI / 180;
381                 LowY = pts[Count - 2].lat * Math.PI / 180;
382                 MiddleX = pts[Count - 1].lng * Math.PI / 180;
383                 MiddleY = pts[Count - 1].lat * Math.PI / 180;
384                 HighX = pts[0].lng * Math.PI / 180;
385                 HighY = pts[0].lat * Math.PI / 180;
386             }
387             else {
388                 LowX = pts[i - 1].lng * Math.PI / 180;
389                 LowY = pts[i - 1].lat * Math.PI / 180;
390                 MiddleX = pts[i].lng * Math.PI / 180;
391                 MiddleY = pts[i].lat * Math.PI / 180;
392                 HighX = pts[i + 1].lng * Math.PI / 180;
393                 HighY = pts[i + 1].lat * Math.PI / 180;
394             }
395             AM = Math.cos(MiddleY) * Math.cos(MiddleX);
396             BM = Math.cos(MiddleY) * Math.sin(MiddleX);
397             CM = Math.sin(MiddleY);
398             AL = Math.cos(LowY) * Math.cos(LowX);
399             BL = Math.cos(LowY) * Math.sin(LowX);
400             CL = Math.sin(LowY);
401             AH = Math.cos(HighY) * Math.cos(HighX);
402             BH = Math.cos(HighY) * Math.sin(HighX);
403             CH = Math.sin(HighY);
404             CoefficientL = (AM * AM + BM * BM + CM * CM) / (AM * AL + BM * BL + CM * CL);
405             CoefficientH = (AM * AM + BM * BM + CM * CM) / (AM * AH + BM * BH + CM * CH);
406             ALtangent = CoefficientL * AL - AM;
407             BLtangent = CoefficientL * BL - BM;
408             CLtangent = CoefficientL * CL - CM;
409             AHtangent = CoefficientH * AH - AM;
410             BHtangent = CoefficientH * BH - BM;
411             CHtangent = CoefficientH * CH - CM;
412             AngleCos = (AHtangent * ALtangent + BHtangent * BLtangent + CHtangent * CLtangent) / (Math.sqrt(AHtangent * AHtangent + BHtangent * BHtangent + CHtangent * CHtangent) * Math.sqrt(ALtangent * ALtangent + BLtangent * BLtangent + CLtangent * CLtangent));
413             AngleCos = Math.acos(AngleCos);            
414             ANormalLine = BHtangent * CLtangent - CHtangent * BLtangent;
415             BNormalLine = 0 - (AHtangent * CLtangent - CHtangent * ALtangent);
416             CNormalLine = AHtangent * BLtangent - BHtangent * ALtangent;
417             if (AM != 0)
418                 OrientationValue = ANormalLine / AM;
419             else if (BM != 0)
420                 OrientationValue = BNormalLine / BM;
421             else
422                 OrientationValue = CNormalLine / CM;
423             if (OrientationValue > 0) {
424                 Sum1 += AngleCos;
425                 Count1++;
426             }
427             else {
428                 Sum2 += AngleCos;
429                 Count2++;
430             }
431         }        
432         var tempSum1, tempSum2;
433         tempSum1 = Sum1 + (2 * Math.PI * Count2 - Sum2);
434         tempSum2 = (2 * Math.PI * Count1 - Sum1) + Sum2;
435         if (Sum1 > Sum2) {
436             if ((tempSum1 - (Count - 2) * Math.PI) < 1)
437                 Sum = tempSum1;
438             else
439                 Sum = tempSum2;
440         }
441         else {
442             if ((tempSum2 - (Count - 2) * Math.PI) < 1)
443                 Sum = tempSum2;
444             else
445                 Sum = tempSum1;
446         }
447         totalArea = (Sum - (Count - 2) * Math.PI) * Radius * Radius;
448 
449         return totalArea; //返回总面积
450     }
451    
452 })();//闭包结束