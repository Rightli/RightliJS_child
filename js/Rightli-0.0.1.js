/**
 * 站在各种巨人的肩膀上~~
 * Rightli.js
 * https://github.com/Rightli/sixth-apples
 * ----------------------------------------------
 */


var Rightli = Rightli || (function(){
    //缓存容器
    var cacheContainer = {
        "Carousel" : [],
    };

    return{
        revision: "0.0.1",
        getAll: function(name){
            if( !!name ){
                return cacheContainer[name];
            }else{
                return cacheContainer;
            }
        },
        removeAll :function(name){
            if( !!name ){
                cacheContainer[name] = [];
            }else{
                cacheContainer = {};
            }
        },
        add: function(name,item){
            if((!!name) && (!!item)){
                ( !!cacheContainer[name] ) && cacheContainer[name].push(item);
            }
        },
        remove: function(name,item){
            if((!!name) && (!!item)){
                if( !!cacheContainer[name] ){
                    var i = cacheContainer[name].indexOf( item );
                    if( i!==1 ){
                        cacheContainer[name].splice( i,1 );
                    }
                } 
            }
        },
    };

})();

Rightli.modules = {};
Rightli.plugins ={};

//dom选择器部分------------start
Rightli.modules.Sizzle = function( selector ,context ){
            var match ,elem ,m ,nodeType;
            var that = this;
            var rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                arr = [],
                push = arr.push;

            context = context || document;
            var results = [];

            if( !selector || typeof selector!=="string"){
                return results;
            }
            if( (nodeType = context.nodeType )!==1 && nodeType !==9 ){
                return [];
            }
            if( (match = rquickExpr.exec( selector ) ) ){
                if( ( m = match[1] ) ){
                    if( nodeType === 9 ){
                        elem = context.getElementById( m );
                        if( elem && elem.parentNode ){
                            if( elem.id === m ){
                                results.push( elem );
                                return results;
                            }
                        }
                        else{
                            return results;
                        }
                    }
                } 
                else if ( match[2] ) {
                    push.apply( results, context.getElementsByTagName( selector ) );
                    return results;
                } 
                else if ( (m = match[3]) && document.getElementsByClassName && context.getElementsByClassName ) {
                    push.apply( results, context.getElementsByClassName( m ) );
                    return results;
                }
            }
            else if ( document.querySelectorAll ) {
                push.apply( results ,context.querySelectorl( selector ) );
                return results;
            }
    };
Rightli.modules.Sizzle.width = function( el, outer, round ){

            if( arguments.length === 0 ){
                if (window.innerWidth) return window.innerWidth;
                else if (document.documentElement && document.documentElement.clientWidth) return document.documentElement.clientWidth;
            }

            var width = window.getComputedStyle(el, null).getPropertyValue('width');
            var returnWidth = parseFloat(width);

            if (isNaN(returnWidth) || width.indexOf('%') > 0 || returnWidth < 0) {
                returnWidth = el.offsetWidth - parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-left')) - parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-right'));
            }
            if (outer) returnWidth += parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-left')) + parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-right'));
            if (round) return Math.ceil(returnWidth);
            else return returnWidth;
};
Rightli.modules.Sizzle.height = function( el, outer, round ){

            if( arguments.length === 0 ){
                if (window.innerHeight) return window.innerHeight;
                else if (document.documentElement && document.documentElement.clientHeight) return document.documentElement.clientHeight;
            }

            if (outer) return el.offsetHeight;
            var height = window.getComputedStyle(el, null).getPropertyValue('height');
            var returnHeight = parseFloat(height);
            if (isNaN(returnHeight) || height.indexOf('%') > 0 || returnHeight < 0) {
                returnHeight = el.offsetHeight - parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-top')) - parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-bottom'));
            }
            if (outer) returnHeight += parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-top')) + parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-bottom'));
            if (round) return Math.ceil(returnHeight);
            else return returnHeight;
};
Rightli.modules.Sizzle.getOffset = function( el ){
            var box = el.getBoundingClientRect();
            var body = document.body;
            var clientTop  = el.clientTop  || body.clientTop  || 0;
            var clientLeft = el.clientLeft || body.clientLeft || 0;
            var scrollTop  = window.pageYOffset || el.scrollTop;
            var scrollLeft = window.pageXOffset || el.scrollLeft;
            if (document.documentElement && !window.pageYOffset) {
                //IE7-8
                scrollTop  = document.documentElement.scrollTop;
                scrollLeft = document.documentElement.scrollLeft;
            }
            return {
                top: box.top  + scrollTop  - clientTop,
                left: box.left + scrollLeft - clientLeft
            };
};

var $ = Rightli.modules.Sizzle;

//dom选择器部分------------end

//特性支持-------------start
Rightli.modules.support = {
        touch : (window.Modernizr && Modernizr.touch === true) || (function () {
            return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
        })(),

        transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
            var div = document.createElement('div').style;
            return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
        })(),

        transforms : (window.Modernizr && Modernizr.csstransforms === true) || (function () {
            var div = document.createElement('div').style;
            return ('transform' in div || 'WebkitTransform' in div || 'MozTransform' in div || 'msTransform' in div || 'MsTransform' in div || 'OTransform' in div);
        })(),

        transitions : (window.Modernizr && Modernizr.csstransitions === true) || (function () {
            var div = document.createElement('div').style;
            return ('transition' in div || 'WebkitTransition' in div || 'MozTransition' in div || 'msTransition' in div || 'MsTransition' in div || 'OTransition' in div);
        })(),

        classList : (function () {
            var div = document.createElement('div').style;
            return 'classList' in div;
        })(),
        browser : {
            ie8 : (function () {
                var rv = -1; // Return value assumes failure.
                if (navigator.appName === 'Microsoft Internet Explorer') {
                    var ua = navigator.userAgent;
                    var re = new RegExp(/MSIE ([0-9]{1,}[\.0-9]{0,})/);
                    if (re.exec(ua) !== null)
                        rv = parseFloat(RegExp.$1);
                }
                return rv !== -1 && rv < 9;
            })(),

            ie10 : window.navigator.msPointerEnabled,
            ie11 : window.navigator.pointerEnabled
        }
};

$.support = Rightli.modules.support;

//特性支持-------------end


//事件单元--------------start
Rightli.modules.eventUtil = {
       addEventListener : function (el, event, listener, useCapture) {
            'use strict';
            if (typeof useCapture === 'undefined') {
                useCapture = false;
            }

            if (el.addEventListener) {
                el.addEventListener(event, listener, useCapture);
            }
            else if (el.attachEvent) {
                el.attachEvent('on' + event, listener);
            }
        },

        removeEventListener : function (el, event, listener, useCapture) {
            'use strict';
            if (typeof useCapture === 'undefined') {
                useCapture = false;
            }

            if (el.removeEventListener) {
                el.removeEventListener(event, listener, useCapture);
            }
            else if (el.detachEvent) {
                el.detachEvent('on' + event, listener);
            }
        },
        getEvent : function( event ){
            return event ? event : window.event ;
        },
        getTarget : function( event ){
            return event.target || event.srcElement ;
        },
        preventDefault : function( event ){
            if( event.preventDefault ){
                event.preventDefault();
            }else{
                event.returnValue = false;
            }
        },
        stopPropagation : function(){
            if( event.stopPropagation ){
                event.stopPropagation();
            }else{
                event.cancelBubble = true;
            }
        }
};

$.bind = Rightli.modules.eventUtil.addEventListener;
$.unbind = addEventListener.removeEventListener;

//事件单元--------------end

//轮播图插件-----start
Rightli.plugins.Carousel = function (selector, params) {

    if (typeof selector === 'undefined') return;

    if (!(selector.nodeType)) {
        if ($(selector).length === 0) return;
    }
   
    var _this = this;

    _this.touches = {
        start: 0,
        startX: 0,
        startY: 0,
        current: 0,
        currentX: 0,
        currentY: 0,
        diff: 0,
        abs: 0
    };
    _this.positions = {
        start: 0,
        abs: 0,
        diff: 0,
        current: 0
    };
    _this.times = {
        start: 0,
        end: 0
    };

    _this.id = (new Date()).getTime();
    _this.container = (selector.nodeType) ? selector : $(selector)[0];
    _this.isTouched = false;//控制器
    _this.isMoved = false;
    _this.activeIndex = 0;//当前显示的slide的index
   
    _this.isAndroid = navigator.userAgent.toLowerCase().indexOf('android') >= 0;
    var wrapper, slideSize, wrapperSize, direction, isScrolling, containerSize;

    var defaults = {
        eventTarget: 'wrapper', // or 'container'
        mode : 'horizontal', // or 'vertical'
        speed : 300,//transition的速度 
        simulateTouch : true,//表示支持mouseclick，mousemove，mouseend事件
        followFinger : true,//??
        shortSwipes : true,//控制短时间的touch事件处理
        longSwipesRatio: 0.5,//长事件touch事件：移动距离超过一半才下一页
        resistance : true, // or false or 100%阻力
        initialSlide: 0,
        useCSS3Transforms : true,
        loop: true,//控制回路
        loopAdditionalSlides: 0,
        roundLengths: false,//控制是Math.ceil还是Math.abs
        cssWidthAndHeight: false, // or true or 'width' or 'height'控制
        visibilityFullFit : false,
        DOMAnimation : true,
        swipeToPrev: true,
        swipeToNext: true,
        slideClass: 'carousel-slide',
        slideActiveClass: 'carousel-slide-active',
        slideVisibleClass: 'carousel-slide-visible',
        slideDuplicateClass: 'carousel-slide-duplicate',
        wrapperClass: 'carousel-wrapper',
    };
    params = params || {};
    for (var prop in defaults) {
        if (prop in params && typeof params[prop] === 'object') {
            for (var subProp in defaults[prop]) {
                if (! (subProp in params[prop])) {
                    params[prop][subProp] = defaults[prop][subProp];
                }
            }
        }
        else if (! (prop in params)) {
            params[prop] = defaults[prop];
        }
    }
    _this.params = params;
    if (params.loop) {
        params.resistance = '100%';
    }
    var isH = params.mode === 'horizontal';

    var desktopEvents = ['mousedown', 'mousemove', 'mouseup'];
    if ($.support.browser.ie10) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
    if ($.support.browser.ie11) desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];

    _this.touchEvents = {
        touchStart : $.support.touch || !params.simulateTouch  ? 'touchstart' : desktopEvents[0],
        touchMove : $.support.touch || !params.simulateTouch ? 'touchmove' : desktopEvents[1],
        touchEnd : $.support.touch || !params.simulateTouch ? 'touchend' : desktopEvents[2]
    };

    for (var i = _this.container.childNodes.length - 1; i >= 0; i--) {
        if (_this.container.childNodes[i].className) {
            var _wrapperClasses = _this.container.childNodes[i].className.split(/\s+/);
            for (var j = 0; j < _wrapperClasses.length; j++) {
                if (_wrapperClasses[j] === params.wrapperClass) {
                    wrapper = _this.container.childNodes[i];
                }
            }
        }
    }

    _this.wrapper = wrapper;
   
    _this.calcSlides = function (forceCalcSlides) {
        var oldNumber = _this.slides ? _this.slides.length : false;
        _this.slides = [];
        _this.displaySlides = [];
        for (var i = 0; i < _this.wrapper.childNodes.length; i++) {
            if (_this.wrapper.childNodes[i].className) {
                var _className = _this.wrapper.childNodes[i].className;
                var _slideClasses = _className.split(/\s+/);
                for (var j = 0; j < _slideClasses.length; j++) {
                    if (_slideClasses[j] === params.slideClass) {
                        _this.slides.push(_this.wrapper.childNodes[i]);
                    }
                }
            }
        }
       
        if (oldNumber === false) return;
        if (oldNumber !== _this.slides.length || forceCalcSlides) {

            _this.updateActiveSlide();
        }
    };

    
    _this.initialized = false;
    _this.init = function (force, forceCalcSlides) {
        var _width = $.width(_this.container, false, params.roundLengths);
        var _height = $.height(_this.container, false, params.roundLengths);
        if (_width === _this.width && _height === _this.height && !force) return;
        
        _this.width = _width;
        _this.height = _height;

        var slideWidth, slideHeight, slideMaxHeight, wrapperWidth, wrapperHeight, slideLeft;
        var i; // loop index variable to avoid JSHint W004 / W038
        containerSize = isH ? _width : _height;
        var wrapper = _this.wrapper;
            slideHeight = isH ? _this.height : _this.height / 1;
            if (params.roundLengths) slideHeight = Math.ceil(slideHeight);
            wrapperHeight = isH ? _this.height : _this.slides.length * slideHeight;
            slideWidth = isH ? _this.width / 1 : _this.width;
            if (params.roundLengths) slideWidth = Math.ceil(slideWidth);
            wrapperWidth = isH ? _this.slides.length * slideWidth : _this.width;
            slideSize = isH ? slideWidth : slideHeight;
            wrapperSize = isH ? wrapperWidth : wrapperHeight;
            if (parseFloat(wrapperWidth) > 0 && (!params.cssWidthAndHeight || params.cssWidthAndHeight === 'height')) {
                wrapper.style.width = wrapperWidth + 'px';
            }
            if (parseFloat(wrapperHeight) > 0 && (!params.cssWidthAndHeight || params.cssWidthAndHeight === 'width')) {
                wrapper.style.height = wrapperHeight + 'px';
            }
            for (i = 0; i < _this.slides.length; i++) {
                if (parseFloat(slideWidth) > 0 && (!params.cssWidthAndHeight || params.cssWidthAndHeight === 'height')) {
                    _this.slides[i].style.width = slideWidth + 'px';
                }
                if (parseFloat(slideHeight) > 0 && (!params.cssWidthAndHeight || params.cssWidthAndHeight === 'width')) {
                    _this.slides[i].style.height = slideHeight + 'px';
                }
            }
        _this.initialized = true;
    };

   
    function maxWrapperPosition() {
        var a = (wrapperSize - containerSize);
        if (params.freeMode) {
            a = wrapperSize - containerSize;
        }
        if (a < 0) a = 0;
        return a;
    }

    function initEvents() {
        //var bind = Rightli.modules.eventUtil.addEventListener;
        var eventTarget = params.eventTarget === 'wrapper' ? _this.wrapper : _this.container;
        //Touch Events
        if (! ($.support.browser.ie10 || $.support.browser.ie11)) {
            if ($.support.touch) {
                $.bind(eventTarget, 'touchstart', onTouchStart);
                $.bind(eventTarget, 'touchmove', onTouchMove);
                $.bind(eventTarget, 'touchend', onTouchEnd);
            }
            if (params.simulateTouch) {
                $.bind(eventTarget, 'mousedown', onTouchStart);
                $.bind(document, 'mousemove', onTouchMove);
                $.bind(document, 'mouseup', onTouchEnd);
            }
        }
        else {
            $.bind(eventTarget, _this.touchEvents.touchStart, onTouchStart);
            $.bind(document, _this.touchEvents.touchMove, onTouchMove);
            $.bind(document, _this.touchEvents.touchEnd, onTouchEnd);
        }
     }

    //Remove Event Listeners
    _this.destroy = function () {
        //var unbind = Rightli.modules.eventUtil.removeEventListener;
        var eventTarget = params.eventTarget === 'wrapper' ? _this.wrapper : _this.container;
        //Touch Events
        if (! ($.support.browser.ie10 || $.support.browser.ie11)) {
            if ($.support.touch) {
                $.unbind(eventTarget, 'touchstart', onTouchStart);
                $.unbind(eventTarget, 'touchmove', onTouchMove);
                $.unbind(eventTarget, 'touchend', onTouchEnd);
            }
            if (params.simulateTouch) {
                $.unbind(eventTarget, 'mousedown', onTouchStart);
                $.unbind(document, 'mousemove', onTouchMove);
                $.unbind(document, 'mouseup', onTouchEnd);
            }
        }
        else {
            $.unbind(eventTarget, _this.touchEvents.touchStart, onTouchStart);
            $.unbind(document, _this.touchEvents.touchMove, onTouchMove);
            $.unbind(document, _this.touchEvents.touchEnd, onTouchEnd);
        }

        _this = null;
    };
   
    var isTouchEvent = false;
    function onTouchStart(event) {
       
         var eventTarget = event.target || event.srcElement;
        var formTagNames = ('input select textarea').split(' ');

        _this.isTouched = true;
        isTouchEvent = event.type === 'touchstart';

        if (!isTouchEvent && "which" in event && event.which === 3) return false;

            if (!isTouchEvent && !_this.isAndroid && formTagNames.indexOf(eventTarget.tagName.toLowerCase()) < 0) {

                if (event.preventDefault) event.preventDefault();
                else event.returnValue = false;
            }

            var pageX = isTouchEvent ? event.targetTouches[0].pageX : (event.pageX || event.clientX);
            var pageY = isTouchEvent ? event.targetTouches[0].pageY : (event.pageY || event.clientY);

            _this.touches.startX = _this.touches.currentX = pageX;
            _this.touches.startY = _this.touches.currentY = pageY;

            _this.touches.start = _this.touches.current = isH ? pageX : pageY;
            _this.setWrapperTransition(0);

            //Get Start Translate Position
            _this.positions.start = _this.positions.current = _this.getWrapperTranslate();
            _this.setWrapperTranslate(_this.positions.start);
            _this.times.start = (new Date()).getTime();
            isScrolling = undefined;
    }
    var velocityPrevPosition, velocityPrevTime;
    function onTouchMove(event) {
        // If slider is not touched - exit
        if (!_this.isTouched || params.onlyExternal) return;
        if (isTouchEvent && event.type === 'mousemove') return;

        var pageX = isTouchEvent ? event.targetTouches[0].pageX : (event.pageX || event.clientX);
        var pageY = isTouchEvent ? event.targetTouches[0].pageY : (event.pageY || event.clientY);

            if (!_this.isMoved) {
                if (params.loop) {
                    _this.fixLoop();
                    _this.positions.start = _this.getWrapperTranslate();
                }
            }
            _this.isMoved = true;

            if (event.preventDefault) event.preventDefault();
            else event.returnValue = false;

            _this.touches.current = isH ? pageX : pageY;

            _this.positions.current = (_this.touches.current - _this.touches.start)  + _this.positions.start;

            _this.setWrapperTranslate(_this.positions.current);
           
            return false;
    }
    function onTouchEnd(event) {
        _this.isTouched = false;

        if (!_this.positions.current && _this.positions.current !== 0) {
            _this.positions.current = _this.positions.start;
        }

        if (params.followFinger) {
            _this.setWrapperTranslate(_this.positions.current);
        }
        _this.times.end = (new Date()).getTime();

        _this.positions.diff = _this.positions.current - _this.positions.start;
        _this.positions.abs = Math.abs(_this.positions.diff);

        var diff = _this.positions.diff;
        var diffAbs = _this.positions.abs;
        var timeDiff = _this.times.end - _this.times.start;

        _this.isMoved = false;
        direction = diff < 0 ? 'toNext' : 'toPrev';

        //Short Touches
        if (direction === 'toNext' && (timeDiff <= 300)) {
            if (diffAbs < 30 || !params.shortSwipes) _this.swipeReset();
            else _this.swipeNext(true);
        }

        if (direction === 'toPrev' && (timeDiff <= 300)) {
            if (diffAbs < 30 || !params.shortSwipes) _this.swipeReset();
            else _this.swipePrev(true);
        }

        if (direction === 'toNext' && (timeDiff > 300)) {
            if (diffAbs >= slideSize * params.longSwipesRatio) {
                _this.swipeNext(true);
            }
            else {
                _this.swipeReset();
            }
        }
        if (direction === 'toPrev' && (timeDiff > 300)) {
            if (diffAbs >= slideSize * params.longSwipesRatio) {
                _this.swipePrev(true);
            }
            else {
                _this.swipeReset();
            }
        }
    }


 
    function addClassToHtmlString(klass, outerHtml) {
        var par = document.createElement('div');
        var child;

        par.innerHTML = outerHtml;
        child = par.firstChild;
        child.className += ' ' + klass;

        return child.outerHTML;
    }


    _this.swipeNext = function (internal) {
        if (!internal && params.loop) _this.fixLoop();
        var currentPosition = _this.getWrapperTranslate();
        var newPosition = currentPosition;
        var groupSize = slideSize * 1;
        newPosition = -(Math.floor(Math.abs(currentPosition) / Math.floor(groupSize)) * groupSize + groupSize);
        if (newPosition < -maxWrapperPosition()) {
            newPosition = -maxWrapperPosition();
        }

        if (newPosition === currentPosition) return false;
        swipeToPosition(newPosition, 'next');
        return true;
    };
    _this.swipePrev = function (internal) {
         if (!internal && params.loop) _this.fixLoop();

        var currentPosition = Math.ceil(_this.getWrapperTranslate());
        var newPosition;
        
        var groupSize = slideSize * 1;
            newPosition = -(Math.ceil(-currentPosition / groupSize) - 1) * groupSize;
        if (newPosition > 0) newPosition = 0;

        if (newPosition === currentPosition) return false;
        swipeToPosition(newPosition, 'prev');
        return true;

    };
    _this.swipeReset = function () {
        var currentPosition = _this.getWrapperTranslate();
        var groupSize = slideSize * 1;
        var newPosition;
        var maxPosition = -maxWrapperPosition();
            newPosition = currentPosition < 0 ? Math.round(currentPosition / groupSize) * groupSize : 0;
            if (currentPosition <= -maxWrapperPosition()) newPosition = -maxWrapperPosition();
       
        if (newPosition === currentPosition) return false;

        swipeToPosition(newPosition, 'reset');
        return true;
    };

    _this.swipeTo = function (index, speed, runCallbacks) {
        index = parseInt(index, 10);
        if (params.loop) index = index + _this.loopedSlides;
        var currentPosition = _this.getWrapperTranslate();
        if (index > (_this.slides.length - 1) || index < 0) return;
        var newPosition;
            newPosition = -index * slideSize;
        if (newPosition < - maxWrapperPosition()) {
            newPosition = - maxWrapperPosition();
        }

        if (newPosition === currentPosition) return false;

        runCallbacks = runCallbacks === false ? false : true;
        swipeToPosition(newPosition, 'to', {index: index, speed: speed, runCallbacks: runCallbacks});
        return true;
    };

    function swipeToPosition(newPosition, action, toOptions) {
        var speed = (action === 'to' && toOptions.speed >= 0) ? toOptions.speed : params.speed;
        var timeOld = + new Date();

        function anim() {
            var timeNew = + new Date();
            var time = timeNew - timeOld;
            // currentPosition += animationStep * time / (1000 / 60);
            currentPosition += animationStep * time / (1000 / 60);
            condition = direction === 'toNext' ? currentPosition > newPosition : currentPosition < newPosition;
            if (condition) {
                _this.setWrapperTranslate(Math.ceil(currentPosition));
                _this._DOMAnimating = true;
                window.setTimeout(function () {
                    anim();
                }, 1000 / 60);
            }
            else {
                if (params.onSlideChangeEnd) {
                    if (action === 'to') {
                        if (toOptions.runCallbacks === true) _this.fireCallback(params.onSlideChangeEnd, _this, direction);
                    }
                    else {
                        _this.fireCallback(params.onSlideChangeEnd, _this, direction);
                    }
                    
                }
                _this.setWrapperTranslate(newPosition);
                _this._DOMAnimating = false;
            }
        }

        if ($.support.transitions || !params.DOMAnimation) {
            _this.setWrapperTranslate(newPosition);
            _this.setWrapperTransition(speed);
        }
        else {
            //Try the DOM animation
            var currentPosition = _this.getWrapperTranslate();
            var animationStep = Math.ceil((newPosition - currentPosition) / speed * (1000 / 60));
            var direction = currentPosition > newPosition ? 'toNext' : 'toPrev';
            var condition = direction === 'toNext' ? currentPosition > newPosition : currentPosition < newPosition;
            if (_this._DOMAnimating) return;

            anim();
        }

        _this.updateActiveSlide(newPosition);
        
    }
    
    _this.updateActiveSlide = function (position) {
        if (!_this.initialized) return;
        if (_this.slides.length === 0) return;
        if (typeof position === 'undefined') position = _this.getWrapperTranslate();
        if (position > 0) position = 0;
        var i;

        _this.activeIndex = Math[params.visibilityFullFit ? 'ceil' : 'round'](-position / slideSize);

        if (_this.activeIndex === _this.slides.length) _this.activeIndex = _this.slides.length - 1;
        if (_this.activeIndex < 0) _this.activeIndex = 0;
        if (!_this.slides[_this.activeIndex]) return;

        _this.calcVisibleSlides(position);

        if ($.support.classList) {
            var slide;
            for (i = 0; i < _this.slides.length; i++) {
                slide = _this.slides[i];
                slide.classList.remove(params.slideActiveClass);
                if (_this.visibleSlides.indexOf(slide) >= 0) {
                    slide.classList.add(params.slideVisibleClass);
                } else {
                    slide.classList.remove(params.slideVisibleClass);
                }
            }
            _this.slides[_this.activeIndex].classList.add(params.slideActiveClass);
        } else {
            var activeClassRegexp = new RegExp('\\s*' + params.slideActiveClass);
            var inViewClassRegexp = new RegExp('\\s*' + params.slideVisibleClass);

            for (i = 0; i < _this.slides.length; i++) {
                _this.slides[i].className = _this.slides[i].className.replace(activeClassRegexp, '').replace(inViewClassRegexp, '');
                if (_this.visibleSlides.indexOf(_this.slides[i]) >= 0) {
                    _this.slides[i].className += ' ' + params.slideVisibleClass;
                }
            }
            _this.slides[_this.activeIndex].className += ' ' + params.slideActiveClass;
        }
    };
  
    _this.calcVisibleSlides = function (position) {
        var visibleSlides = [];
        var _slideLeft = 0, _slideSize = 0, _slideRight = 0;

        for (var i = 0; i < _this.slides.length; i++) {
            _slideLeft += _slideSize;
             _slideSize = slideSize;

            _slideRight = _slideLeft + _slideSize;
            var isVisibile = false;
            if (params.visibilityFullFit) {
                if (_slideLeft >= -position && _slideRight <= -position + containerSize) isVisibile = true;
                if (_slideLeft <= -position && _slideRight >= -position + containerSize) isVisibile = true;
            }
            else {
                if (_slideRight > -position && _slideRight <= ((-position + containerSize))) isVisibile = true;
                if (_slideLeft >= -position && _slideLeft < ((-position + containerSize))) isVisibile = true;
                if (_slideLeft < -position && _slideRight > ((-position + containerSize))) isVisibile = true;
            }

            if (isVisibile) visibleSlides.push(_this.slides[i]);

        }
        if (visibleSlides.length === 0) visibleSlides = [_this.slides[_this.activeIndex]];

        _this.visibleSlides = visibleSlides;
    };

   
    _this.loopCreated = false;

    //要循环回路，就需要createloop
    _this.createLoop = function () {
        if (_this.slides.length === 0) return;

        _this.loopedSlides = 1 + params.loopAdditionalSlides;

        if (_this.loopedSlides > _this.slides.length) {
            _this.loopedSlides = _this.slides.length;
        }

        var slideFirstHTML = '',
            slideLastHTML = '',
            i;
        var slidesSetFullHTML = '';
       
        var numSlides = _this.slides.length;
            slideLastHTML += addClassToHtmlString(params.slideDuplicateClass, _this.slides[0].outerHTML);
            slideFirstHTML += addClassToHtmlString(params.slideDuplicateClass, _this.slides[numSlides-1].outerHTML);
        
        var slides = slideFirstHTML + slidesSetFullHTML + wrapper.innerHTML + slidesSetFullHTML + slideLastHTML;
        wrapper.innerHTML = slides;

        _this.loopCreated = true;
        _this.calcSlides();
    };

    _this.fixLoop = function () {
        var newIndex;
        if (_this.activeIndex < _this.loopedSlides) {
            newIndex = _this.slides.length - _this.loopedSlides * 3 + _this.activeIndex;
            _this.swipeTo(newIndex, 0, false);
        }
            else if ((params.slidesPerView === 'auto' && _this.activeIndex >= _this.loopedSlides * 2) || (_this.activeIndex > _this.slides.length - 1 * 2)) {
            newIndex = -_this.slides.length + _this.activeIndex + _this.loopedSlides;
            _this.swipeTo(newIndex, 0, false);
        }
    };

   
    function makeSwiper() {
        _this.calcSlides();
        if (params.loop) {
            _this.createLoop();
        }
        _this.init();
        initEvents();
        if (params.loop || params.initialSlide > 0) {
            _this.swipeTo(params.initialSlide, 0, false);
        }
        else {
            _this.updateActiveSlide(0);
        }
        if (params.autoplay) {
            _this.startAutoplay();
        }
       
    }

    makeSwiper();
};

Rightli.plugins.Carousel.prototype = {
    getWrapperTranslate : function (axis) {
        'use strict';
        var el = this.wrapper,
            matrix, curTransform, curStyle, transformMatrix;

        // automatic axis detection
        if (typeof axis === 'undefined') {
            axis = this.params.mode === 'horizontal' ? 'x' : 'y';
        }

        if ($.support.transforms && this.params.useCSS3Transforms) {
            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                // Some old versions of Webkit choke when 'none' is passed; pass
                // empty string instead in this case
                transformMatrix = new WebKitCSSMatrix(curStyle.webkitTransform === 'none' ? '' : curStyle.webkitTransform);
            }
            else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }

            if (axis === 'x') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m41;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[12]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[4]);
            }
            if (axis === 'y') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m42;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[13]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[5]);
            }
        }
        else {
            if (axis === 'x') curTransform = parseFloat(el.style.left, 10) || 0;
            if (axis === 'y') curTransform = parseFloat(el.style.top, 10) || 0;
        }
        return curTransform || 0;
    },

    setWrapperTranslate : function (x, y, z) {
        'use strict';
        var es = this.wrapper.style,
            coords = {x: 0, y: 0, z: 0},
            translate;

        // passed all coordinates
        if (arguments.length === 3) {
            coords.x = x;
            coords.y = y;
            coords.z = z;
        }

        // passed one coordinate and optional axis
        else {
            if (typeof y === 'undefined') {
                y = this.params.mode === 'horizontal' ? 'x' : 'y';
            }
            coords[y] = x;
        }

        if ($.support.transforms && this.params.useCSS3Transforms) {
            translate = $.support.transforms3d ? 'translate3d(' + coords.x + 'px, ' + coords.y + 'px, ' + coords.z + 'px)' : 'translate(' + coords.x + 'px, ' + coords.y + 'px)';
            es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = translate;
        }
        else {
            es.left = coords.x + 'px';
            es.top  = coords.y + 'px';
        }
        //this.callPlugins('onSetWrapperTransform', coords);
        if (this.params.onSetWrapperTransform) this.fireCallback(this.params.onSetWrapperTransform, this, coords);
    },

    setWrapperTransition : function (duration) {
        'use strict';
        var es = this.wrapper.style;
        es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = (duration / 1000) + 's';
        //this.callPlugins('onSetWrapperTransition', {duration: duration});
        if (this.params.onSetWrapperTransition) this.fireCallback(this.params.onSetWrapperTransition, this, duration);

    },
    setTransform : function (el, transform) {
        'use strict';
        var es = el.style;
        es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = transform;
    },
    setTranslate : function (el, translate) {
        'use strict';
        var es = el.style;
        var pos = {
            x : translate.x || 0,
            y : translate.y || 0,
            z : translate.z || 0
        };
        var transformString = $.support.transforms3d ? 'translate3d(' + (pos.x) + 'px,' + (pos.y) + 'px,' + (pos.z) + 'px)' : 'translate(' + (pos.x) + 'px,' + (pos.y) + 'px)';
        es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = transformString;
        if (!$.support.transforms) {
            es.left = pos.x + 'px';
            es.top = pos.y + 'px';
        }
    },
    setTransition : function (el, duration) {
        'use strict';
        var es = el.style;
        es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = duration + 'ms';
    }
};

//轮播图插件-----end
