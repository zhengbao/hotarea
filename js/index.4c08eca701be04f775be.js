! function(t) {
    function i(s) {
        if (e[s]) return e[s].exports;
        var n = e[s] = { exports: {}, id: s, loaded: !1 };
        return t[s].call(n.exports, n, n.exports, i), n.loaded = !0, n.exports
    }
    var e = {};
    return i.m = t, i.c = e, i.p = "//imgcache.qq.com/qcloud/main/scripts/", i(0)
}([function(t, i, e) {
    "use strict";
    var s = e(1);
    ! function() {
        function t() {
            return !($(window).width() > 414)
        }

        function i(t) { this.mapId = t.mapId, this.imgId = t.imgId, this.canvasOpt = t.canvasOpt || {}, this.canvasCss = t.canvasCss || {}, this.dataId = t.dataId, this.init() }

        function e(t) { this.modMap = [], this.sectionMod = t.sectionMod, this.navbar = t.navbar, this.currentMod = "", this.minScrollPos = 0, this.isShow = !1, this.init() }

        function n(t) {
            var i = _.getResponsiveMode($(window).width());
            if ("slider-product" != t || "mobile" != i) {
                var e = $("#" + t);
                if (!(e.length < 1)) {
                    this.container = e, this.id = t, this.sliderFooter = e.parent().find(".section-footer"), this.pointsList = this.sliderFooter.find("ul"), this.itemContainer = e.find(".vertical-list"), this.itemList = e.find(".vertical-item"), this.slideBtn = e.find(".section-slide").hide(), this.leftBtn = this.slideBtn.find(".section-slide-left").removeClass("section-dis-slide-left"), this.rightBtn = this.slideBtn.find(".section-slide-right").removeClass("section-dis-slide-right");
                    var n = this.getSliderLen();
                    this.itemContainer.css("width", n * this.itemList.outerWidth(!0)), this.scrollComponent = new s("#" + t, { eventPassthrough: "vertical", scrollX: !0, scrollY: !1, bounce: !0, preventDefault: !0, deceleration: .001, snap: "li", momentum: !1, freeScroll: !1, preventDefaultException: { tagName: /^(A|IMG)$/ }, fixX: "slider-product" == this.id ? -10 : 0 }), this.requestSlider(), this.bindEvent()
                }
            }
        }

        function a() {
            var t = _.getResponsiveMode($(window).width()),
                i = $("#slider-case"),
                e = i.find(".section-slide"),
                s = i.find("ul");
            switch (t) {
                case "pc":
                    i.css("height", "auto"), e.show(), y && (A.show(), A.show(), y.step = $("#slider-case li").outerWidth(!0)), s.css({ width: s.find("li").outerWidth(!0) * s.find("li").length }), $('[data-mod="customerCase"]').find("li:gt(3)").show();
                    break;
                case "pad":
                case "mobile":
                    E = 0, y && y.locate(E), y && F(E), A && A.hide(), B.addClass("section-dis-slide-left"), O.removeClass("section-dis-slide-right"), i.css("height", "auto"), $('[data-mod="customerCase"]').find("li:gt(3)").hide(), s.css({ width: "auto" }), e.hide()
            }
        }

        function o(t, i) {
            var e, s = !0;
            return function t(i, n) {
                i.each(function() {
                    if (0 === $(this).height()) return s = !1, !1
                }), s ? (clearTimeout(e), n()) : (s = !0, e = setTimeout(function() { t(i, n) }, 200))
            }(t, i)
        }
        t();
        i.prototype = {
            init: function() {
                return !(!this.imgId || !this.mapId) && ($.browser.msie && $.browser.version < 9 ? this.hasCanvas = !1 : (this.hasCanvas = !0, this.initCanvas("hover"), this.initCanvas("click")), void this.bindEvent())
            },
            bindEvent: function() {
                var t = this,
                    i = $("#" + this.mapId).find("area");
                i.bind("mouseover", function() { t.renderCanvas($(this), t.hoverRenderArea, ["stroke"]) }), i.bind("mouseout", function() { t.clearCanvas("hover") });
                var e = 0;
                $(".section-framework").bind("click", function(i) {
                    var s = i.target,
                        n = $('[data-content="' + t.dataId + '"]');
                    t.clearCanvas("click");
                    var a = n.find(".vertical-list");
                    if ("area" == s.nodeName.toLowerCase()) {
                        t.renderCanvas($(s), t.clickRenderArea, ["stroke", "fill"]);
                        var o = $(s).index() + 1;
                        $(a[e]).css("display", "none"), $(a[o]).css("display", "inline-block"), e = o
                    } else $(a[e]).css("display", "none"), $(a[0]).css("display", "inline-block"), e = 0
                }), $(".right-bg").bind("click", function(t) { t.stopPropagation() })
            },
            initCanvas: function(t) {
                var i = $("#" + this.imgId),
                    e = i.parent(),
                    s = "canvas" + Math.ceil(1e3 * Math.random());
                e.append($('<canvas id="' + s + '"></canvas>'));
                var n = $("#" + s);
                this.canvasCss.left = i.position().left + "px", this.canvasCss.top = i.position().top + "px", this.canvasCss.zIndex && (this.canvasCss.zIndex += 1), n.css(this.canvasCss).attr({ width: i.width() + "px", height: i.height() + "px" });
                var a = n[0];
                this[t + "Canvas"] = a, this[t + "RenderArea"] = a.getContext("2d");
                var o = this.canvasOpt;
                for (var r in o) this[t + "RenderArea"][r] = o[r]
            },
            renderCanvas: function(t, i, e) {
                if (!this.hasCanvas) return !1;
                var s = t.attr("coords"),
                    n = t.attr("shape");
                this[n + "Render"] ? this[n + "Render"](i, s, e) : ""
            },
            rectRender: function(t) {
                if (!this.hasCanvas) return !1;
                var i = t.split(","),
                    e = parseInt(i[0]),
                    s = parseInt(i[1]),
                    n = parseInt(i[2]) - e,
                    a = parseInt(i[3]) - s;
                this.canvasRenderArea.fillRect(e, s, n, a)
            },
            circRender: function(t) {
                if (!this.hasCanvas) return !1;
                var i = t.split(","),
                    e = i[0],
                    s = i[1],
                    n = i[2],
                    a = this.canvasRenderArea;
                a.beginPath(), a.arc(e, s, n, 0, 2 * Math.PI), a.fill(), a.closePath()
            },
            polyRender: function(t, i, e) {
                if (!this.hasCanvas) return !1;
                var s = i.split(",");
                t.beginPath(), t.moveTo(s[0], s[1]);
                for (var n = 2; n < s.length; n += 2) t.lineTo(s[n], s[n + 1]);
                t.lineTo(s[0], s[1]);
                for (var a = 0; a < e.length; a++) t[e[a]]();
                t.closePath()
            },
            clearCanvas: function(t) {
                if (!this.hasCanvas) return !1;
                var i = $(this[t + "Canvas"]);
                this[t + "RenderArea"].clearRect(0, 0, i.width(), i.height())
            }
        }, e.prototype = {
            init: function() { this.initModMap(), this.initNavbar(), this.hideNavbar(), this.navbarHandler(), this.bindEvent() },
            showNavbar: function() { $("#" + this.navbar).css("display", "block"), this.isShow = !0 },
            hideNavbar: function() { $("#" + this.navbar).css("display", "none"), this.isShow = !1 },
            initNavbar: function() {
                var t = $("#" + this.navbar),
                    i = window.location.href.split("#").pop(),
                    e = this;
                t.find("li.current").removeClass("current"), t.find('[data-nav="' + i + '"]').addClass("current"), e.currentMod = i
            },
            initModMap: function() {
                var t = this,
                    i = $("#" + t.navbar).outerHeight(),
                    e = 0;
                $("." + t.sectionMod).each(function() {
                    var s = $(this).attr("data-mod");
                    if (s) {
                        var n = { posY: $(this).offset().top - i, height: $(this).outerHeight(), modId: s };
                        t.modMap.push(n), 0 == e && (t.minScrollPos = n.posY), e += 1
                    }
                })
            },
            navbarHandler: function() {
                var t = this,
                    i = $(window).scrollTop(),
                    e = t.modMap;
                if (i > t.minScrollPos) {
                    t.isShow || t.showNavbar();
                    for (var s = 0; s < e.length; s++) {
                        var n = e[s];
                        if (n.posY < i && n.height + n.posY > i) {
                            var a = $("#" + t.navbar);
                            a.find("li.current").removeClass("current"), a.find('[data-nav="' + n.modId + '"]').addClass("current"), t.currentMod = n.modId
                        }
                    }
                } else t.isShow && t.hideNavbar()
            },
            bindEvent: function() {
                var t = this;
                $(window).on("scroll", function(i) {
                    var e = _.getResponsiveMode($(window).width());
                    return "pc" == e && void t.navbarHandler()
                })
            }
        }, n.prototype = {
            requestSlider: function() {
                var t = this,
                    i = _.getResponsiveMode($(window).width()),
                    e = this.getSliderLen();
                switch (i) {
                    case "pc":
                        t.itemContainer.css("width", e * t.itemList.outerWidth(!0)), t.useSlider();
                        break;
                    case "pad":
                        t.itemContainer.css("width", e * t.itemList.outerWidth(!0)), t.isPC() ? t.useSlider() : t.disableSlider();
                        break;
                    case "mobile":
                        "slider-product" == t.id ? (t.scrollComponent.iScrollStopTag = !0, t.pointsList.hide(), t.itemContainer.removeAttr("style")) : (t.isPC() ? t.useSlider() : t.disableSlider(), t.itemContainer.css("width", e * t.itemList.outerWidth(!0)))
                }
                t.isPC() && (this.scrollComponent.iScrollStopTag = !0)
            },
            useSlider: function() { this.scrollComponent.iScrollStopTag = !0, this.initSlider() },
            disableSlider: function() { this.scrollComponent.iScrollStopTag = !1, this.pointsList.hide() },
            initSlider: function(t) {
                var i = this.itemList.outerWidth(!0),
                    e = this.container.width(),
                    s = this.perPage = Math.round(e / i),
                    n = this.getSliderLen(),
                    a = this.pages = Math.ceil(n / s),
                    o = [];
                if (a > 1)
                    for (var r = 0; r < a; r++) {
                        var d = 0 == r ? " point-active" : "";
                        o.push('<li data-ix="' + r + '" class="point' + d + '"></li>')
                    }
                this.pointsList.html(o.join("")), t || (this.pointsList.show(), this.sliderFooter.show()), this.changeLRBtnStatus(), this.skip(0, !0)
            },
            getSliderLen: function() {
                return this.listLen ? this.listLen : this.listLen = this.itemList.length
            },
            doSkip: function(t) {
                var i = this.listLen,
                    e = t * this.perPage;
                this.skip(e), this.skipPoint(t), "slider-channel" == this.id && (t + this.perPage >= i ? this.itemContainer.css({ "margin-left": "10px" }) : this.itemContainer.css({ "margin-left": "-10px" })), this.changeLRBtnStatus()
            },
            skip: function(t, i) {
                var e = t / this.perPage,
                    s = this.getCurrentIndex();
                if (i) this.scrollComponent.goToPage(t, 0, 0);
                else if (this.id = "slider-product") {
                    var n = this.scrollComponent.gotoPageWidthoutScroll(t, 0);
                    e - s > 0 ? this.scrollComponent.scrollTo(n - 10, 0, 800) : this.scrollComponent.scrollTo(n, 0, 800)
                } else this.scrollComponent.goToPage(t, 0, 800)
            },
            skipPoint: function(t) {
                var i = this.pointsList.find("li");
                i.removeClass("point-active"), $(i[t]).addClass("point-active")
            },
            changeLRBtnStatus: function() {
                var t = this.getCurrentIndex();
                t < 1 ? this.leftBtn.addClass("section-dis-slide-left") : this.leftBtn.removeClass("section-dis-slide-left"), t >= this.pages - 1 ? this.rightBtn.addClass("section-dis-slide-right") : this.rightBtn.removeClass("section-dis-slide-right")
            },
            getCurrentIndex: function() {
                return this.pointsList.find(".point-active").data("ix") || 0
            },
            isPC: function() {
                var t = navigator.userAgent;
                return !/AppleWebKit.*Mobile/i.test(t) && !/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(t)
            },
            bindEvent: function() {
                var t = this;
                this.pointsList.on("click", "li", function() {
                    var i = (t.pointsList.find("li"), $(this)),
                        e = parseInt(i.data("ix"), 10) || 0;
                    t.doSkip(e)
                }), this.container.on("mouseover", function() { t.scrollComponent.iScrollStopTag && (t.pages > 1 ? t.slideBtn.show() : t.slideBtn.hide()) }), this.container.on("mouseout", function() { t.slideBtn.hide() }), this.leftBtn.on("click", function() { $(this).hasClass("section-dis-slide-left") || t.doSkip(t.getCurrentIndex() - 1) }), this.rightBtn.on("click", function() { $(this).hasClass("section-dis-slide-right") || t.doSkip(t.getCurrentIndex() + 1) }), $(window).on("resize", function() { t.timer && (window.clearTimeout(t.timer), t.timer = 0), t.timer = setTimeout(function() { t.initSlider(!0), t.scrollComponent.refresh(), t.requestSlider() }, 400), t.requestSlider() })
            },
            initPosPoints: function() {
                for (var t = (this.itemContainer.width(), this.slider.count), i = [], e = 0; e < t; e++) {
                    var s = 0 == e ? " point-active" : "";
                    i.push('<li class="point' + s + '"></li>')
                }
                this.pointsList.html(i.join(""))
            }
        };
        var r, d, h = function(t, i, e, s) { this.dom = t, this.step = parseInt(i) || 0, this.count = parseInt(e) || 0, this.itemIndex = 0, this.curDistance = 0, this.distance = 0, this.preDistance = 0, this.curDistance = 0, this.handlers = {}, this.status = c.READY, this.enableSwitch = !1, this.option = x(s), this._init() },
            c = { READY: 1, TOUCH_START: 2, TOUCH_MOVE: 3, TOUCH_END: 4, ANIMATING: 5 },
            l = { X: "X", Y: "Y" },
            u = document,
            f = window,
            m = "",
            p = "",
            v = ["webkit", "ms", "o", "moz"],
            g = u.createElement("div"),
            b = g.style,
            C = "transform";
        d = C.charAt(0).toUpperCase() + C.substr(1);
        for (var w, T, I = 0; w = v[I]; I++)
            if (T = w + d, T in b) {
                p = w;
                break
            }
        C in b || (m = p);
        var k = function() {
                return f.requestAnimationFrame || f.webkitRequestAnimationFrame || f.mozRequestAnimationFrame || f.oRequestAnimationFrame || f.msRequestAnimationFrame || function(t) { f.setTimeout(t, 1e3 / 60) }
            }(),
            x = function(t) {
                var i = { transformProperty: "translateX", nextRatio: .4, speedThreshold: 4, disableBoundaryMove: !1, boundaryAnimationName: "", disableTouch: !1, touchArea: u.documentElement, autoAnimationDuration: 200, slideRatio: 2 / 3, lockOnAnimating: !1, preventDefault: "auto" };
                return t && (t.transformProperty !== r && (i.transformProperty = t.transformProperty), t.disableTouch !== r && (i.disableTouch = t.disableTouch), t.touchArea !== r && (i.touchArea = t.touchArea), t.disableBoundaryMove !== r && (i.disableBoundaryMove = t.disableBoundaryMove), t.boundaryAnimationName !== r && (i.boundaryAnimationName = t.boundaryAnimationName), t.nextRatio !== r && (i.nextRatio = t.nextRatio), t.speedThreshold !== r && (i.speedThreshold = t.speedThreshold), t.autoAnimationDuration !== r && (i.autoAnimationDuration = t.autoAnimationDuration), t.slideRatio !== r && (i.slideRatio = t.slideRatio), t.lockOnAnimating !== r && (i.lockOnAnimating = t.lockOnAnimating), t.preventDefault !== r && (i.preventDefault = t.preventDefault)), i
            };
        h.prototype = {
            link: function(t) { t instanceof h && (this.on("touchmove", function(i, e) { t.move(e) }), this.on("locate", function(i) { t.locate(i) }), this.on("animationinterrupt", function() { t.animationInterrupt() })) },
            locate: function() {
                var t, i, e = !0,
                    s = 0;
                if ("boolean" == typeof arguments[0] && (e = arguments[0], s++), t = arguments[s], i = arguments[s + 1], t === r && (t = this.itemIndex), t = parseInt(t) || 0, this._isCircleLayout || (t < 0 && (t = 0), t > this.count - 1 && (t = this.count - 1)), this.lastDistance = this.curDistance, this.curDistance = 0 - this.step * t, e) {
                    var n = this;
                    if ("ms" == p) return void $(this.dom).stop(!0, !0).animate({ marginLeft: this.curDistance }, 300, function() { i && i(t), n._emit("locateEnd", [t]) });
                    this._animate(this._makeTransformValue(this.curDistance), function() { i && i(t), n._emit("locateEnd", [t]) })
                } else {
                    if ("ms" == p) return void $(this.dom).css("marginLeft", this.curDistance);
                    this._transform(this._makeTransformValue(this.curDistance))
                }
                this.lastItemIndex = this.itemIndex, this.itemIndex = t, this._emit("locate", [t])
            },
            next: function() { this.locate(this.itemIndex + 1) },
            prev: function() { this.locate(this.itemIndex - 1) },
            disable: function() { this.enableSwitch = !1 },
            enable: function() { this.enableSwitch = !0 },
            move: function(t) {
                var i, e = 0;
                t = parseFloat(t), i = Math.abs(t), i >= 1 ? e = t : i > 0 && (e = parseInt(this.step * t) || 0), e && this._move(function() { this._transform(this._makeTransformValue(this.curDistance + e / 2)), e = r })
            },
            updateStep: function(t) { t = parseInt(t), t && (this.step = t, this.locate(!1)) },
            animationInterrupt: function() {
                var t = this._getCurrentDistance();
                return this._transform(this._makeTransformValue(t)), this._animateEnd(), t
            },
            on: function(t, i) { this.handlers[t] || (this.handlers[t] = []), this.handlers[t].push(i) },
            _emit: function(t, i) {
                var e = this.handlers[t];
                if (e && e.length)
                    for (var s, n = 0; s = e[n]; n++) s.apply && s.apply(this, i || [])
            },
            _init: function() {
                this._transform({ translate3d: "0,0,0" }), this._initTransformProperty(), this.option.disableTouch || this._initAnimation();
                var t = this,
                    i = this.option.touchArea,
                    e = function() { t.areaDistance = t.direction == l.Y ? i.offsetHeight : i.offsetWidth, t.areaDistance || (t.areaDistance = t.direction == l.Y ? f.innerHeight : f.innerWidth) };
                f.addEventListener("resize", e, !1), e()
            },
            _initAnimation: function() {
                var t = this,
                    i = this.option.touchArea;
                f.navigator.msPointerEnabled ? (i.addEventListener("MSPointerDown", function(i) { i.pointerType == i.MSPOINTER_TYPE_TOUCH && t._touchStart(i, i) }, !1), i.addEventListener("MSPointerMove", function(i) { i.pointerType == i.MSPOINTER_TYPE_TOUCH && t._touchMove(i, i) }, !1), i.addEventListener("MSPointerUp", function(i) { i.pointerType == i.MSPOINTER_TYPE_TOUCH && t._touchEnd(i) }, !1)) : (i.addEventListener("touchstart", function(i) { t._touchStart(i, i.targetTouches[0]) }, !1), i.addEventListener("touchmove", function(i) { t._touchMove(i, i.targetTouches[0]) }, !1), i.addEventListener("touchend", function(i) { t._touchEnd(i) }, !1))
            },
            _initTransformProperty: function() {
                var t, i, e = this.option.transformProperty,
                    s = l.X,
                    n = !1,
                    a = this,
                    o = function(t) {
                        var i = (a.curDistance + a.lastDistance) / 2,
                            e = i % 360;
                        e > 180 ? e -= 360 : e < -180 && (e += 360);
                        var s = t - e;
                        return i + s
                    };
                switch (e) {
                    default:
                        case "translateX":
                        e = "translate3d",
                    t = "{val}px,0,0",
                    i = function(t) {
                        return 6 == t.length ? parseInt(t[4]) : 16 == t.length ? parseInt(t[12]) : void 0
                    };
                    break;
                    case "translateY":
                            e = "translate3d",
                        t = "0,{val}px,0",
                        s = l.Y,
                        i = function(t) {
                            return 6 == t.length ? parseInt(t[5]) : 16 == t.length ? parseInt(t[13]) : void 0
                        };
                        break;
                    case "translateZ":
                            e = "translate3d",
                        t = "0,0,{val}px",
                        i = function(t) {
                            return parseInt(t[14])
                        };
                        break;
                    case "rotateX":
                            t = "{val}deg",
                        s = l.Y,
                        n = !0,
                        i = function(t) {
                            var i = parseFloat(t[5]).toFixed(2),
                                e = parseFloat(t[6]),
                                s = Math.acos(i) / Math.PI * 180,
                                n = e >= 0 ? s : 0 - s;
                            return o(n)
                        };
                        break;
                    case "rotateY":
                            t = "{val}deg",
                        n = !0,
                        i = function(t) {
                            var i = parseFloat(t[0]).toFixed(2),
                                e = parseFloat(t[8]),
                                s = Math.acos(i) / Math.PI * 180,
                                n = e >= 0 ? s : 0 - s;
                            return o(n)
                        };
                        break;
                    case "rotateZ":
                            t = "{val}deg",
                        n = !0,
                        i = function(t) {
                            var i = 0,
                                e = 0;
                            6 == t.length ? (i = parseFloat(t[0]).toFixed(2), e = parseFloat(t[1])) : 16 == t.length;
                            var s = Math.acos(i) / Math.PI * 180,
                                n = e >= 0 ? s : 0 - s;
                            return o(n)
                        }
                }
                this._makeTransformValue = function(i) {
                    var s = {};
                    return s[e] = t.replace("{val}", i), s
                }, this._getCurrentDistance = function() {
                    var t = D(this.dom, "transform");
                    t = t.replace(/^matrix(?:3d)?\((.+)\)$/, "$1");
                    var e = t.split(",") || [];
                    return i(e)
                }, this.DPI = P()[s], this.direction = s, this._isCircleLayout = n
            },
            _transform: function(t) {
                this._curTransformObj || (this._curTransformObj = {});
                for (var i in t) this._curTransformObj[i] = t[i];
                var e = [];
                for (var s in this._curTransformObj) e.push(s, "(", this._curTransformObj[s], ")");
                e.length && D(this.dom, "transform", e.join(""))
            },
            _parseDistance: function(t) {
                return parseInt(parseFloat(t) / this.areaDistance * this.step)
            },
            _touchStart: function(t, i) {
                if (this.enableSwitch) {
                    var e = this.curDistance;
                    if (this.status == c.ANIMATING) {
                        if (this.boundaryMode || this.option.lockOnAnimating) return;
                        e = this.animationInterrupt(), this._emit("animationinterrupt")
                    }
                    this.oriDistance = 0, this.distance = 0, this.preDistance = e - this.curDistance, this.status = c.TOUCH_START, this.startTime = new Date, this.motionable = !0, this.touchDirection = 0, this.startPos = { X: i.pageX, Y: i.pageY }, this.startValue = this.startPos[this.direction], this._emit("touchstart", [t])
                }
            },
            _touchMove: function(t, i) {
                if (this.enableSwitch) {
                    if ("auto" === this.option.preventDefault) {
                        if (!this.touchDirection) {
                            var e = Math.abs(i.pageX - this.startPos.X),
                                s = Math.abs(i.pageY - this.startPos.Y);
                            0 == e && 0 == s || (this.touchDirection = e > s ? l.X : l.Y)
                        }
                        if (this.touchDirection != this.direction) return;
                        t.preventDefault()
                    } else this.option.preventDefault === !0 && t.preventDefault();
                    if (this.motionable) {
                        var n = i["page" + this.direction];
                        this.oriDistance = n - this.startValue, this.status != c.TOUCH_START && this.status != c.TOUCH_MOVE || this.oriDistance && (this.distance = this._parseDistance(this.oriDistance) + this.preDistance / this.option.slideRatio, this.timeSpan = new Date - this.startTime, this._move(function() {
                            var t = !0;
                            if (0 === this.itemIndex && this.distance > 0 || this.itemIndex == this.count - 1 && this.distance < 0)
                                if (this.option.disableBoundaryMove) t = !1;
                                else {
                                    var i = h.ext.boundaryAnimation[this.option.boundaryAnimationName];
                                    i && i.touchMove && (this.boundaryMode = !0, i.touchMove.call(this), t = !1)
                                }
                            t && (this.boundaryMode = !1, this.option.slideRatio && (this.status = c.TOUCH_MOVE, this._transform(this._makeTransformValue(this.curDistance + this.distance * this.option.slideRatio))))
                        }), this._emit("touchmove", [t, this.distance]))
                    }
                }
            },
            _touchEnd: function(t) {
                if (this.enableSwitch && this.motionable) {
                    if (this.motionable = !1, this.boundaryMode) {
                        var i = h.ext.boundaryAnimation[this.option.boundaryAnimationName];
                        i && i.touchEnd && i.touchEnd.call(this)
                    } else if (0 !== this.distance || 0 !== this.preDistance) {
                        var e = this.itemIndex;
                        this.oriDistance && (Math.abs(this.oriDistance / this.DPI) / this.timeSpan * 1e3 > this.option.speedThreshold || Math.abs(this.oriDistance) > this.areaDistance * this.option.nextRatio) && (this.oriDistance < 0 ? e++ : e--), this.locate(e)
                    } else this.status == c.READY;
                    this._emit("touchend", [t])
                }
            },
            _move: function(t) {
                if (this._curFrameFn = t, !this.moveFrameFilled) {
                    this.moveFrameFilled = !0;
                    var i = this;
                    k(function() { i.moveFrameFilled = !1, i.status != c.ANIMATING && i._curFrameFn && i._curFrameFn.call(i), i._curFrameFn = r })
                }
            },
            _animate: function(t, i) {
                this.status = c.ANIMATING, D(this.dom, "transition", [M("transform"), " ", this.option.autoAnimationDuration, "ms ease-out"].join(""));
                var e = this,
                    s = this.dom.endFn = function(t) { t && t.target !== e.dom || (e._animateEnd(), t && t.stopPropagation(), i && i()) };
                this.dom.addEventListener("transitionEnd", s, !1), this.dom.addEventListener(S("transitionEnd"), s, !1), this.dom.animationTimer = setTimeout(s, this.option.autoAnimationDuration + 50), this._transform(t)
            },
            _animateEnd: function() { this.status = c.READY, D(this.dom, "transition", ""), this.dom.removeEventListener("transitionEnd", this.dom.endFn, !1), this.dom.removeEventListener(S("transitionEnd", !0), this.dom.endFn, !1), clearTimeout(this.dom.animationTimer), this.dom.endFn = null }
        }, h.prototype.constructor = h;
        var M = function(t, i) {
                return p ? i ? p + t.charAt(0).toUpperCase() + t.substr(1) : ["-", p, "-", t].join("") : t
            },
            S = function(t) {
                return m + t.charAt(0).toUpperCase() + t.substr(1)
            },
            D = function(t, i, e) {
                return e === r ? u.defaultView.getComputedStyle(t, null)[M(i, !0)] : void(t.style[M(i, !0)] = e)
            },
            P = function() {
                var t = 0,
                    i = 0;
                return f.screen.deviceXDPI !== r ? (t = f.screen.deviceXDPI, i = f.screen.deviceYDPI) : (g.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden", u.body.appendChild(g), t = parseInt(g.offsetWidth), i = parseInt(g.offsetHeight), g.parentNode.removeChild(g)), { X: t, Y: i }
            };
        h.ext = {};
        var L = h.ext.boundaryAnimation = {};
        L.pudding = {
            touchMove: function() {
                var t = Math.abs(this.curDistance) + (this.oriDistance > 0 ? 0 : this.step);
                this.direction == l.X ? (D(this.dom, "transformOrigin", t + "px 50%"), this._transform({ scaleX: 1 + Math.abs(this.distance) / 250 * .15 })) : (D(this.dom, "transformOrigin", "50% " + t + "px"), this._transform({ scaleY: 1 + Math.abs(this.distance) / 250 * .15 }))
            },
            touchEnd: function() {
                var t = this,
                    i = this.direction == l.X ? { scaleX: 1 } : { scaleY: 1 };
                this._animate(i, function() { D(t.dom, "transformOrigin", "") })
            }
        };
        var y, A, _ = {
                currentWidth: $(window).width(),
                banner: $(".banner-img"),
                handleResize: function(i) {
                    var e = $(window).width();
                    if (e !== this.currentWidth || i) {
                        t();
                        var s = this.getResponsiveMode(e);
                        this[s + "Render"](), this.currentWidth = e, "pc" == s && (W || window.loadPCFramework())
                    }
                },
                mobileRender: function() { this.banner.attr("src", this.banner.data("smurl")), window.fixedBar && window.fixedBar.hideNavbar(), window.frameworkSublist.hide(), this.hideBannerBtn() },
                padRender: function() { this.banner.attr("src", this.banner.data("bgurl")), window.fixedBar && window.fixedBar.hideNavbar(), window.frameworkSublist.hide(), this.isPhone() ? this.hideBannerBtn() : this.showBannerBtn() },
                pcRender: function() {
                    this.banner.attr("src", this.banner.data("bgurl")), window.fixedBar && window.fixedBar.navbarHandler();
                    var t = $("#tab-list").find("li.current").data("sub");
                    $("#" + t).show(), this.showBannerBtn()
                },
                showBannerBtn: function() { $(".banner a").css("display", "inline-block") },
                hideBannerBtn: function() { $(".banner a").hide() },
                getResponsiveMode: function(t) {
                    return t <= 414 ? "mobile" : t > 414 && t <= 768 ? "pad" : t > 768 ? "pc" : void 0
                },
                isPhone: function() {
                    var t = navigator.userAgent;
                    return !(!/AppleWebKit.*Mobile/i.test(t) && !/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(t) || /iPad/i.test(t))
                }
            },
            E = 0,
            R = $("#slider-case li").length - 4,
            B = $("#slider-case").find(".section-slide-left").css("visibility", "hidden").addClass("section-dis-slide-left"),
            O = $("#slider-case").find(".section-slide-right").css("visibility", "hidden"),
            F = function(t) { 0 == t ? B.addClass("section-dis-slide-left") : B.removeClass("section-dis-slide-left"), t == R ? O.addClass("section-dis-slide-right") : O.removeClass("section-dis-slide-right"), A.find("li").eq(Math.ceil(t / 4)).addClass("point-active").siblings().removeClass("point-active") };
        if (R > 0) {
            for (var N = Math.ceil($("#slider-case li").length / 4), J = [], I = 0; I < N; I++) J.push('<li class="point"></li>');
            A = $("#slider-case").next("div").find(".section-slide-point-list").html(J.join("")), A.find("li:eq(0)").addClass("point-active"), A.on("click", function(t) {
                var i = $(t.target),
                    e = i.index();
                i.hasClass("point-active") || (E = Math.min(R, 4 * e), y.locate(E), i.addClass("point-active").siblings().removeClass("point-active"), F(E))
            }), $("#slider-case").find("ul").css({ width: $("#slider-case li").outerWidth(!0) * $("#slider-case li").length }), y = new h($("#slider-case").find("ul")[0], $("#slider-case li").outerWidth(!0), R + 1, { disableTouch: !0, autoAnimationDuration: 500 }), B.on("click", function() { E <= 0 || (E = Math.max(E - 4, 0), y.locate(E), F(E)) }), O.on("click", function() { E >= R || (E = Math.min(E + 4, R), y.locate(E), F(E)) }), $("#slider-case").on("mouseenter", function() { B.css("visibility", ""), O.css("visibility", "") }).on("mouseleave", function() { B.css("visibility", "hidden"), O.css("visibility", "hidden") })
        }
        var H = {
                $wikiList: $(".J-menu-links"),
                $arrBtns: $(".J-links-title"),
                $tabOn: null,
                init: function() {
                    var t = this;
                    t.$wikiList.length < 1 || t.$arrBtns.length < 1 || (t.changeDisplayMode(), t.$arrBtns.on("click", function(i) { t.changeTabs($(this).index(".J-links-title")) }))
                },
                changeTabs: function(t) {
                    var i = this.$wikiList.eq(t),
                        e = i.hasClass("arr-down");
                    this.$wikiList.removeClass("arr-up").addClass("arr-down"), this.$tabOn = null, e && (i.removeClass("arr-down").addClass("arr-up"), this.$tabOn = i), this.handleLastTab()
                },
                handleLastTab: function() { this.$tabOn && this.$tabOn.index(".J-menu-links") == this.$wikiList.length - 1 ? this.$arrBtns.last().removeClass("border-bt-none") : this.$arrBtns.last().addClass("border-bt-none") },
                changeDisplayMode: function(t) {
                    var i = $(window).width();
                    this.onDisplayIndex = 0, i <= 700 && this.$wikiList.removeClass("arr-up").addClass("arr-down"), this.handleLastTab()
                }
            },
            Y = {
                $architectsList: $(".J-architectsList"),
                $architectsSlider: $(".J-architectsSlider"),
                $arTabList: $(".J-architectsTab"),
                $arTabContent: $(".J-architectsContent"),
                $moreBtn: $(".J-more-btn"),
                $arrBtns: $(".list-content-head"),
                $tabDesc: $(".J-artab-desc"),
                perPage: 3,
                init: function() {
                    var t = this;
                    t.$architectsList.length < 1 || (t.setMode(), t.initList(), t.initTabs(), t.bindEvent())
                },
                initList: function() {
                    var t = this;
                    t.toggleItems(!0), t.$architectsList.css({ height: "auto", left: "auto", display: "block", overflow: "hidden" }), this.$architectsList.each(function(i, e) {
                        var s = $(e),
                            n = s.find("li"),
                            a = n.length;
                        if (t.isPC()) {
                            var o = n.outerWidth(!0),
                                r = a * o,
                                d = o * t.perPage,
                                h = Math.ceil(r / d);
                            s.css("width", r), s.parent().find(".J-slide-left").addClass("section-dis-slide-left"), s.parent().find(".J-slide-right").removeClass("section-dis-slide-right"), s.data({ pages: h, step: d, outer: r, current: 0 })
                        } else {
                            t.toggleItems(!0);
                            var c = 0,
                                l = s.height();
                            t.$arTabList.length < 1 && (c = t.getMinDisplayHeight(n), t.toggleItems(!1)), s.css({ height: 0 === c ? "auto" : c, width: "auto" }).data({ maxheight: l, minheight: c }), t.$moreBtn.html("\u5c55\u793a\u5168\u90e8")
                        }
                    })
                },
                initTabs: function() {
                    if (this.$arTabList.length < 1 || this.$arTabContent.length < 1) return !1;
                    var t = this;
                    this.$arTabContent.each(function(i, e) {
                        var s = $(e);
                        t.isPC() ? t.$arTabList.eq(i).hasClass("current") ? s.show() : s.hide() : (s.show(), t.$arTabList.eq(i).hasClass("current") ? s.find(".list-content-head").removeClass("arr-down").addClass("arr-up") : (s.find(".list-content-head").removeClass("arr-up").addClass("arr-down"), s.find(".J-architectsList").hide()))
                    })
                },
                handleSlider: function(t, i) {
                    var e = i.parent().find(".J-architectsList"),
                        s = (parseInt(e.data("pages"), 10), parseInt(e.data("step"), 10)),
                        n = parseInt(e.data("outer"), 10),
                        a = parseInt(e.data("current"), 10),
                        o = a + t,
                        r = i.find(".J-slide-left"),
                        d = i.find(".J-slide-right"),
                        h = o * s;
                    o <= 0 ? (h = 0, r.addClass("section-dis-slide-left")) : r.removeClass("section-dis-slide-left"), h + s >= n ? (h = n - s, d.addClass("section-dis-slide-right")) : d.removeClass("section-dis-slide-right"), e.animate({ left: -h }, "fast").data({ current: o })
                },
                toggleItems: function(t) {
                    var i = this;
                    this.$architectsList.each(function(e, s) { $(s).find("li").each(function(e, s) { e >= i.perPage && (t ? $(s).show() : $(s).hide()) }) })
                },
                setMode: function() { this.usePC = $(window).width() > 768 },
                isPC: function() {
                    return this.usePC
                },
                getMinDisplayHeight: function(t) {
                    var i = this,
                        e = 0;
                    return t.each(function(t, s) { t < i.perPage && (e += $(s).height()) }), e
                },
                handleDisplayMore: function(t) {
                    var i = t.parent().parent(),
                        e = i.find(".J-architectsList"),
                        s = e.height(),
                        n = parseInt(e.data("maxheight"), 10),
                        a = parseInt(e.data("minheight"), 10);
                    s < n ? (e.css("height", n), this.toggleItems(!0), t.html("\u6536\u8d77")) : (e.css("height", a), this.toggleItems(!1), t.html("\u5c55\u793a\u5168\u90e8"))
                },
                handleTabClick: function(t, i) {
                    var e = $(window),
                        s = e.scrollTop(),
                        n = this.$arrBtns.closest(".arr-up"),
                        a = t.offset().top;
                    n.removeClass("arr-up").addClass("arr-down"), this.$arTabList.removeClass("current").eq(i).addClass("current"), t.removeClass("arr-down").addClass("arr-up"), this.$architectsList.each(function(t, e) {
                        var s = $(e);
                        if (i == t) {
                            s.data("maxheight");
                            s.show().css("height", "auto")
                        } else s.css("height", 0)
                    });
                    var o = t.offset().top;
                    e.scrollTop(s - a + o)
                },
                bindEvent: function() {
                    var t = this,
                        i = this.$architectsList.parent();
                    i.on("mouseenter", function() { t.isPC() && $(this).find(".J-architectsSlider").show() }), i.on("mouseleave", function() { t.isPC() && $(this).find(".J-architectsSlider").hide() }), this.$architectsSlider.on("click", ".J-slide-left", function() {
                        var i = $(this);
                        return !i.hasClass("section-dis-slide-left") && void t.handleSlider(-1, i.parent())
                    }), this.$architectsSlider.on("click", ".J-slide-right", function() {
                        var i = $(this);
                        return !i.hasClass("section-dis-slide-right") && void t.handleSlider(1, i.parent())
                    }), this.$moreBtn.on("click", function() { t.handleDisplayMore($(this)) }), this.$arTabList.on("click", function() {
                        var i = $(this);
                        i.hasClass("current") || t.changeTabs(i.index())
                    }), this.$arrBtns.on("click", function() {
                        var i = $(this);
                        i.hasClass("arr-up") || t.handleTabClick(i, i.index(".list-content-head"))
                    }), $(window).on("resize", function() { t.setMode(), t.initList(), t.initTabs() })
                },
                changeTabs: function(t) {
                    var i = this.$arTabList.eq(t),
                        e = i.find("a").data("title") || "";
                    this.$arTabList.removeClass("current"), i.addClass("current"), this.$arTabContent.hide().eq(t).show(), this.$tabDesc.html(e)
                }
            },
            W = !1;
        $(window).ready(function() {
            function t(t, i) {
                t.addClass("current"), W && $('[data-map="' + i + '"]').css("display", "block"), $('[data-content="' + i + '"]').css("display", "block");
                var e = i.split("-")[0];
                $('[data-mfw="' + e + '"]').show()
            }

            function s(t, i) {
                l[i] && l[i].clearCanvas("click"), t.find('[data-item="' + i + '"]').removeClass("current"), W && $('[data-map="' + i + '"]').css("display", "none"), $('[data-content="' + i + '"]').css("display", "none");
                var e = i.split("-")[0];
                $('[data-mfw="' + e + '"]').hide()
            }
            $(window).on("resize", function() { a() }).resize();
            var r, d = $("#tab-list").find(".current"),
                h = d.attr("data-item"),
                c = d.attr("data-sub");
            c && (r = $(".J-tab-sublist").find(".current").attr("data-item"));
            for (var l = {}, u = $('[data-role="module"]'), f = $("#fixbar-list li a"), m = u.length, p = 0; p < m; p++) {
                var v = $(f[p]),
                    g = $(u[p]).attr("data-mod");
                v.attr("href", "#" + g), v.parent().attr("data-nav", g)
            }
            window.loadPCFramework = function() {
                o($(".img-content"), function() {
                    $(".J-fw-img").each(function() {
                        var t = $(this).find(".img-content").attr("id"),
                            e = $(this).find("map").attr("id"),
                            s = $(this).attr("data-map");
                        if (l[s] = new i({ mapId: e, imgId: t, dataId: s, canvasOpt: { fillStyle: "rgba(255,184,0,0.2)", strokeStyle: "rgba(255,184,0,1)", lineWidth: 2 }, canvasCss: { position: "absolute", zIndex: 11 } }), t) {
                            var n = r ? r : h;
                            $(this).attr("data-map") != n && $(this).css("display", "none")
                        }
                    }), window.fixedBar = new e({ sectionMod: "section", navbar: "fixbar-list" })
                }), W = !0
            }, window.frameworkSublist = $(".J-tab-sublist");
            var b = $(".J-tab-sublist");
            b.length > 0 ? ($("#tab-list").delegate("li", "click", function(i) {
                var e = $(this),
                    n = e.attr("data-item"),
                    a = e.parent(),
                    o = e.attr("data-sub"),
                    d = $('[data-item="' + h + '"]'),
                    c = d.attr("data-sub"),
                    l = _.getResponsiveMode($(window).width());
                if ("pc" == l && b.each(function() { $(this).attr("id") != o ? $(this).hide() : $(this).show() }), c ? (s(b, r), d.removeClass("current")) : s(a, h), o) {
                    var u = $("#" + o),
                        f = u.find("li").first();
                    e.addClass("current"), r = f.attr("data-item"), t(f, r)
                } else t(e, n);
                h = n
            }), $(".J-tab-sublist").delegate("li", "click", function(i) {
                var e = $(this),
                    n = $(this).attr("data-item"),
                    a = $(this).parent();
                s(a, r), t(e, n), r = n
            })) : $("#tab-list").delegate("li", "click", function(i) {
                var e = $(this),
                    n = e.attr("data-item"),
                    a = e.parent();
                s(a, h), t(e, n), h = n
            }), window.pross = new n("slider-product"), new n("slider-content2"), new n("slider-channel"), new n("slider-scene"), new n("slider-scenario1"), $(".tip-area a").bind("mouseover", function(t) { $(this).parent().find(".tip-all").css({ display: "block" }) }), $(".tip-area a").bind("mouseout", function(t) { $(this).parent().find(".tip-all").css("display", "none") }), $("#slider-product li").bind("click", function() { $(this).find(".vertical-item-footer a").is(":visible") || $(this).find(".vertical-item-footer a").length && (location.href = $(this).find(".vertical-item-footer a").attr("href")) }), $('[data-mod="customerCase"] li.vertical-item').bind("click", function() { $(this).find("a.links").is(":visible") || $(this).find("a.links").length && (location.href = $(this).find("a.links").attr("href")) }), setTimeout(function() { _.handleResize(!0) }, 200), $(window).on("resize", function() { _.handleResize(!0), H.changeDisplayMode() }), $(".section-banner").on("mouseenter", ".op a.tc-15-btn", function() { $(this).css("color", $(this).closest(".section-banner").css("backgroundColor")).css("backgroundColor", "#FFF") }).on("mouseleave", ".op a.tc-15-btn", function() { $(this).css("color", "#fff").css("backgroundColor", "") }), H.init(), Y.init()
        }), window.solutionDebugTool = {}
    }(), void

    function() {
        var t = $(window),
            i = $(".J-cloudProductModule");
        if (i.length) {
            var e = i.find(".J-tabContainer"),
                n = i.find(".J-listContainer"),
                a = i.find(".J-indicatorContainer"),
                o = a.find(".J-prev"),
                r = a.find(".J-next"),
                d = e.children(),
                h = n.children(),
                c = h.children(),
                l = h.find(".vertical-item"),
                u = l.outerWidth(!0),
                f = (u - l.outerWidth(), l.length);
            f += 4 - c.last().find(".vertical-item").length, h.css("width", f * u);
            var m = { eventPassthrough: "vertical", scrollX: !0, scrollY: !1, bounce: !0, snap: ".game-unit-box", click: !0, momentum: !1, freeScroll: !1, preventDefault: !0 },
                p = navigator.userAgent.toLowerCase(),
                v = !(~p.indexOf("android") || ~p.indexOf("iphone") || ~p.indexOf("ipad") || ~p.indexOf("windows phone"));
            v && ($.extend(m, { useTransform: !1, useTransition: !1, HWCompositing: !1, disablePointer: !0, disableTouch: !0 }), n.on("mousemove", !1));
            var g = new s(n.get(0), m),
                b = c.length,
                C = !0;
            g.$scrollEndHandler = function() {
                var t;
                switch (C ? (C = !1, t = this.$pageIndex) : t = this.currentPage.pageX, t) {
                    case 0:
                        o.addClass("section-dis-slide-left"), r.removeClass("section-dis-slide-right");
                        break;
                    case b - 1:
                        o.removeClass("section-dis-slide-left"), r.addClass("section-dis-slide-right");
                        break;
                    default:
                        o.removeClass("section-dis-slide-left"), r.removeClass("section-dis-slide-right")
                }
                d.removeClass("select").eq(t).addClass("select"), c.removeClass("select").eq(t).addClass("select")
            }, g.$gotoPage = function(t, i) {
                return t = Math.max(0, Math.min(t || 0, b - 1)), this.$pageIndex = t, this.goToPage(t, 0, null == i ? 300 : i), this
            }, g.on("scrollEnd", g.$scrollEndHandler), e.on("click", "a", function() { g.$gotoPage($(this).index()) }), o.on("click", function() { g.$gotoPage(g.$pageIndex - 1) }), r.on("click", function() { g.$gotoPage(g.$pageIndex + 1) }), n.on("click", ".J-itemTitle", function() {
                var i = $(this),
                    e = t.scrollTop(),
                    s = i.offset().top;
                C = !0, g.$gotoPage(i.parent().index(), 0).$scrollEndHandler();
                var n = i.offset().top;
                t.scrollTop(e - s + n)
            }), v && n.parent().hover(function() { a.css("display", "") }, function() { a.css("display", "none") });
            var w = null;
            t.on("resize.cloud-product-module", function() { clearTimeout(w), w = setTimeout(function() { n.find(".J-itemTitle").is(":visible") || (g.refresh(), g.$gotoPage(g.$pageIndex, 0), g.$scrollEndHandler()) }, 40) }).trigger("resize.cloud-product-module"), g.$gotoPage(0, 0).$scrollEndHandler()
        }
    }(), window.onload = function() {
        var t = !1,
            i = $("#shield"),
            e = $(".section-shield-bg");
        $("#shield .icon").on("click", function(s) {
            s.stopPropagation();
            var n = $(this),
                a = n.data("item"),
                o = a + "-now";
            t || (i.removeClass("shield-hide").addClass("shield-show"), e.removeClass("section-shield-bg-hide").addClass("section-shield-bg-show"), $(".shield-box").addClass("shield-box-info"), t = !0), $(".item-info").each(function(t, i) {
                var e = $(i).data("content"),
                    s = e + "-now";
                e == a ? ($(i).show().addClass("item-info-show").removeClass("item-info-hide"), n.addClass(o)) : ($(i).hide().addClass("item-info-hide").removeClass("item-info-show"), $("." + s).removeClass(s))
            })
        }), $("#shield").on("click", function(s) { t && (i.addClass("shield-hide").removeClass("shield-show"), e.removeClass("section-shield-bg-show").addClass("section-shield-bg-hide"), setTimeout(function() { $(".shield-box").removeClass("shield-box-info") }, 900), $(".item-info").hide().removeClass("item-info-show").addClass("item-info-hide"), t = !1) })
    }
}, function(t, i) { t.exports = IScroll }]); /*  |xGv00|c061274e35de310de736831297d845a4 */
