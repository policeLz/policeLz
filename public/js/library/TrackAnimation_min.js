var BMapLib = window.BMapLib = BMapLib || {};
(function() {
  var f = 1;
  var e = 55;
  var a = 10000;
  var h = 0;
  var c = true;
  var d = 1;
  var i = 2;
  var b = 0;
  var g = BMapLib.TrackAnimation = function(l, j, k) {
    this._map = l;
    this._polyline = j;
    this._totalPath = j.getPath();
    this._overallView = l.getViewport(j.getPath());
    this._status = i;
    this._opts = {
      zoom: this._getZoom(),
      tilt: e,
      duration: a,
      delay: h,
      overallView: c
    };
    this._initOpts(k);
    this._expandPath = this._addPath(j.getPath())
  };
  g.prototype._getZoom = function() {
    return Math.min(this._overallView.zoom + f, this._map.getMaxZoom())
  };
  g.prototype._updateAniParams = function() {
    this._updatePathAni();
    this._updateViewAni();
    this._polyline.setPath(this._expandPath.slice(0, 1))
  };
  g.prototype._updatePathAni = function() {
    this._expandPath = this._addPath(this._totalPath)
  };
  g.prototype._updateViewAni = function() {
    this._overallView = this._map.getViewport(this._totalPath);
    var o = this._totalPath.length;
    var n = [];
    var p = this._opts.overallView ? this._opts.duration + 2000 : this._opts.duration;
    for (var j = 0; j < o; j++) {
      var m = this._totalPath[j];
      var l = this._pathPercents[j] * (this._opts.duration / p);
      n.push({
        center: new BMapGL.Point(m.lng, m.lat),
        zoom: this._opts.zoom,
        tilt: j === 0 ? 0 : this._opts.tilt,
        heading: 0,
        percentage: l
      })
    }
    if (this._opts.overallView) {
      n.push({
        center: new BMapGL.Point(this._overallView.center.lng, this._overallView.center.lat),
        zoom: this._overallView.zoom - f,
        tilt: 0,
        heading: 0,
        percentage: 1
      })
    }
    var k = {
      duration: p,
      delay: 0,
      interation: 1
    };
    this._viewAni = new BMapGL.ViewAnimation(n, k)
  };
  g.prototype._addPath = function(s) {
    var m = this._opts.duration / 10;
    var k = s.length;
    var q = 0;
    var r = [];
    var n = [];
    for (var o = 1; o < k; o++) {
      var j = this._map.getDistance(s[o - 1], s[o]);
      r.push(j);
      q += j
    }
    var l = [0];
    for (var o = 1; o < k; o++) {
      var p = (r[o - 1] / q).toFixed(2);
      l[o] = l[o - 1] + parseFloat(p, 10);
      n = n.concat(this._getPath(s[o - 1], s[o], p * m))
    }
    this._pathPercents = l;
    return n
  };
  g.prototype._getPath = function(n, k, l) {
    var j = [];
    for (var m = 0; m <= l; m++) {
      j.push(new BMapGL.Point((k.lng - n.lng) / l * m + n.lng, (k.lat - n.lat) / l * m + n.lat))
    }
    return j
  };
  g.prototype._initOpts = function(j) {
    for (var k in j) {
      if (j.hasOwnProperty(k)) {
        this._opts[k] = j[k]
      }
    }
  };
  g.prototype.start = function() {
    var j = this;
    setTimeout(function() {
      j._updateAniParams();
      j._map.removeOverlay(j._polyline);
      j._map.addOverlay(j._polyline);
      j._status = d;
      j._step(performance.now());
      j._map.startViewAnimation(j._viewAni)
    }, this._opts.delay)
  };
  g.prototype.cancel = function() {
    this._status = i;
    b = 0;
    this._map.cancelViewAnimation(this._viewAni)
  };
  g.prototype._step = function(l) {
    if (this._status !== d) {
      b = 0;
      return
    }
    if (!b) {
      b = l
    }
    var k = (l - b) / this._opts.duration;
    var j = Math.round(this._expandPath.length * k);
    this._polyline.setPath(this._expandPath.slice(0, j));
    if (l < b + this._opts.duration) {
      window.requestAnimationFrame(this._step.bind(this))
    } else {
      b = 0
    }
  };
  g.prototype.setZoom = function(j) {
    this._opts.zoom = j
  };
  g.prototype.getZoom = function(j) {
    return this._opts.zoom
  };
  g.prototype.setTilt = function(j) {
    this._opts.tilt = j
  };
  g.prototype.getTilt = function(j) {
    return this._opts.tilt
  };
  g.prototype.setDelay = function(j) {
    this._opts.delay = j
  };
  g.prototype.getDelay = function(j) {
    return this._opts.delay
  };
  g.prototype.setDuration = function(j) {
    this._opts.duration = j
  };
  g.prototype.getDuration = function(j) {
    return this._opts.duration
  };
  g.prototype.enableOverallView = function() {
    this._opts.overallView = true
  };
  g.prototype.disableOverallView = function() {
    this._opts.overallView = false
  };
  g.prototype.setPolyline = function(j) {
    this._polyline = j;
    this._totalPath = j.getPath()
  };
  g.prototype.getPolyline = function() {
    return this._polyline
  }
})();



 