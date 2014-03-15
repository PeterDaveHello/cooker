/*!
 * cooker v0.1.4
 * Copyright 2014 TEQ inc.
 * Licensed under MIT
 * http://teq-inc.github.io/cooker/
 */
(function($) {
  var namespace = "switchers";
  var methods = {
    init: function(options) {
      options = $.extend({
        switcherClass: "switcher",
        toggleClass: "switcher-toggle",
        allToggleClass: "switcher-toggle-all",
        activeClass: "switcher-active"
      }, options);
      return this.each(function() {
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        if (!data) {
          options = $.extend({}, options);
          $this.data(namespace, {
            options: options
          });
        }
        var $aToggle = $this.find("." + options.allToggleClass);
        var $iToggle = $this.find("." + options.toggleClass);
        var switcher = options.switcherClass;
        var active = options.activeClass;
        $aToggle.off("click").on("click", function() {
          var $this = $(this);
          var $a = $this.parents("." + namespace).find("." + switcher);
          if ($a.hasClass(active)) {
            $a.removeClass(active);
          } else {
            $a.addClass(active);
          }
        });
        $iToggle.off("click").on("click", function() {
          var $this = $(this);
          var mode = $this.parents("." + namespace).data("mode");
          var $i = $this.parents("." + switcher);
          var $o = $i.siblings();
          if (mode === "accordion") {
            if ($i.hasClass(active)) {
              $o, $i.removeClass(active);
            } else {
              $o.removeClass(active);
              $i.addClass(active);
            }
          } else {
            if ($i.hasClass(active)) {
              $i.removeClass(active);
            } else {
              $i.addClass(active);
            }
          }
        });
      });
    },
    destroy: function() {
      return this.each(function() {
        var $this = $(this);
        $(window).unbind("." + namespace);
        $this.removeData(namespace);
      });
    }
  };
  $.fn.switchers = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist on jQuery." + namespace);
    }
  };
})(jQuery);

(function($) {
  var namespace = "drawer";
  var agent = navigator.userAgent;
  var iphone = agent.search(/iPhone/) != -1;
  var ipad = agent.search(/iPad/) != -1;
  var android = agent.search(/Android/) != -1;
  var touches = iphone || ipad || android;
  var methods = {
    init: function(options) {
      options = $.extend({
        nav: namespace + "-nav",
        navList: namespace + "-nav-list",
        overlay: namespace + "-overlay",
        toggle: namespace + "-toggle",
        openClass: namespace + "-open",
        closeClass: namespace + "-close",
        speed: 200,
        width: 280,
        bottomMargin: 80
      }, options);
      return this.each(function() {
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        if (!data) {
          options = $.extend({}, options);
          $this.data(namespace, {
            options: options
          });
        }
        smY = 0;
        var navListHeight;
        var $window = $(window);
        var $toggle = $("." + options.toggle);
        var $overlay = $("." + options.overlay);
        var $nav = $("." + options.nav);
        var $body = $("body");
        methods.resize.call(_this, "init");
        $window.resize(function() {
          methods.resize.call(_this, "resize");
        });
        if (touches) {
          $toggle.bind("touchstart." + namespace, function(e) {
            methods.toggle.apply(_this);
          });
          $overlay.bind("touchstart." + namespace, function() {
            methods.close.apply(_this);
          });
          $nav.bind("touchstart." + namespace, function() {
            var $this = $(this);
            navListHeight = $("." + options.navList).height();
            sfY = event.touches[0].screenY;
            startTime = new Date().getTime();
            startY = event.changedTouches[0].clientY;
          });
          $nav.bind("touchmove." + namespace, function() {
            var $this = $(this);
            mfY = event.changedTouches[0].screenY;
            moveY = smY + mfY - sfY;
            draggedY = event.changedTouches[0].clientY - startY;
            $this.css({
              "-webkit-transition": "none",
              "-webkit-transform": "translate3d(0px," + moveY + "px,0px)"
            });
          });
          $nav.bind("touchend." + namespace, function() {
            var $this = $(this);
            diffTime = new Date().getTime() - startTime;
            smY = smY + (mfY - sfY);
            if (diffTime < 200 && draggedY > 0) {
              moveY += Math.abs(draggedY / diffTime * 500);
              $this.css({
                "-webkit-transition": "-webkit-transform .7s ease-out",
                "-webkit-transform": "translate3d(0px," + moveY + "px,0px)"
              });
              smY = moveY;
            } else if (diffTime < 200 && draggedY < 0) {
              moveY -= Math.abs(draggedY / diffTime * 500);
              $this.css({
                "-webkit-transition": "-webkit-transform .7s ease-out",
                "-webkit-transform": "translate3d(0px," + moveY + "px,0px)"
              });
              smY = moveY;
            }
            if (moveY > 0) {
              $this.css({
                "-webkit-transition": "-webkit-transform .5s ease-out",
                "-webkit-transform": "translate3d(0px," + 0 + "px,0px)"
              });
              smY = 0;
            } else if (screen.height - navListHeight > moveY + options.bottomMargin) {
              $this.css({
                "-webkit-transition": "-webkit-transform .5s ease-out",
                "-webkit-transform": "translate3d(0px," + (screen.height - navListHeight - options.bottomMargin) + "px,0px)"
              });
              smY = screen.height - navListHeight - options.bottomMargin;
            }
          });
        } else {
          $toggle.off("click." + namespace).on("click." + namespace, function(e) {
            methods.toggle.apply(_this);
          });
          $overlay.off("click." + namespace).on("click." + namespace, function() {
            methods.close.apply(_this);
          });
        }
      });
    },
    resize: function(value) {
      var $this = $(this);
      options = $this.data(namespace).options;
      var windowHeight = $(window).height();
      var $overlay = $("." + options.overlay);
      methods.close.call(this, options);
      $overlay.css({
        "min-height": windowHeight
      });
      console.log(value);
    },
    toggle: function(init, options) {
      var $this = $(this);
      options = $this.data(namespace).options;
      var $body = $("body");
      var open = $body.hasClass(options.openClass);
      if (open) {
        methods.close.call(this, options);
      } else {
        methods.open.call(this, options);
      }
    },
    open: function(init) {
      var $this = $(this);
      options = $this.data(namespace).options;
      var $body = $("body");
      if (touches) {
        $body.on("touchmove." + namespace, function() {
          event.preventDefault();
        });
        event.preventDefault();
      }
      $body.removeClass(options.closeClass).addClass(options.openClass);
    },
    close: function(init) {
      var $this = $(this);
      options = $this.data(namespace).options;
      var $body = $("body");
      if (touches) {
        $body.off("touchmove." + namespace);
      }
      $body.removeClass(options.openClass).addClass(options.closeClass);
    },
    destroy: function() {
      return this.each(function() {
        var $this = $(this);
        $(window).unbind("." + namespace);
        $this.removeData(namespace);
      });
    }
  };
  $.fn.drawer = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist on jQuery." + namespace);
    }
  };
})(jQuery);

(function($) {
  var namespace = "scrollmethod";
  var methods = {
    init: function(options) {
      options = $.extend({
        speed: 800,
        easing: "easeOutExpo"
      }, options);
      return this.each(function() {
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        if (!data) {
          options = $.extend({}, options);
          $this.data(namespace, {
            options: options
          });
          $this.off().on("click", function() {
            var href = $(this).attr("href");
            var $target = $(href === "#" || href === "" ? "html" : href);
            var position = $target.offset().top;
            $("body,html").animate({
              scrollTop: position
            }, options.speed, options.easing);
            return false;
          });
        }
      });
    }
  };
  $.fn.scrollmethod = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist on jQuery." + namespace);
    }
  };
})(jQuery);