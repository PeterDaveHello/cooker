/*!
 * cooker v0.0.0
 * Copyright 2014 TEQ inc.
 * Licensed under ,, (,,)
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
        var $action = $this.data("action");
        var active = options.activeClass;
        if ($action === "hover") {
          $iToggle.off("mouseover." + namespace).on("mouseover." + namespace, function() {
            var $this = $(this);
            var $i = $this.parents("." + options.switcherClass);
            if ($i.hasClass(active)) {
              $i.removeClass(active);
            } else {
              $i.addClass(active);
            }
          });
          $iToggle.off("mouseout." + namespace).on("mouseout." + namespace, function() {
            var $this = $(this);
            var $i = $this.parents("." + options.switcherClass);
            if ($i.hasClass(active)) {
              $i.removeClass(active);
            } else {
              $i.addClass(active);
            }
          });
        } else {
          $aToggle.off("click." + namespace).on("click." + namespace, function() {
            var $this = $(this);
            var $a = $this.parents("." + namespace).find("." + options.switcherClass);
            if ($a.hasClass(active)) {
              $a.removeClass(active);
            } else {
              $a.addClass(active);
            }
          });
          $iToggle.off("click." + namespace).on("click." + namespace, function() {
            var $this = $(this);
            var mode = $this.parents("." + namespace).data("mode");
            var $i = $this.parents("." + options.switcherClass);
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
        }
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
  var namespace = "slidebar";
  var methods = {
    init: function(options) {
      options = $.extend({
        position: "left",
        speed: 500,
        easing: "easeOutExpo",
        minSize: 10,
        parentClass: ".tab-content"
      }, options);
      return this.each(function() {
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        if (!data) {
          options = $.extend({
            width: $this.data("width"),
            height: $this.data("height")
          }, options);
          $this.data(namespace, {
            options: options
          });
          $this.find(".slidebar_toggle").unbind("click." + namespace).bind("click." + namespace, function() {
            methods.toggle.apply(_this);
          });
          $this.find(".slidebar_open").unbind("click." + namespace).bind("click." + namespace, function() {
            methods.open.apply(_this);
          });
          $this.find(".slidebar_close").unbind("click." + namespace).bind("click." + namespace, function() {
            methods.close.apply(_this);
          });
          $this.find(".slidebar_resize").mousedown(function(e) {
            var mx = e.pageX;
            var my = e.pageY;
            $(document).on("mousemove." + namespace, function(e) {
              var $body = $this.find(".slidebar_body");
              var params = {};
              var f_close = false;
              switch (options.position) {
               case "top":
               case "bottom":
                params.height = $body.height() + my - e.pageY;
                if (params.height <= options.minSize) {
                  f_close = true;
                  params.height = 0;
                }
                break;

               case "right":
               case "left":
                params.width = $body.width() + mx - e.pageX;
                if (params.width <= options.minSize) {
                  f_close = true;
                  params.width = 0;
                }
              }
              if (f_close) {
                $this.removeClass("slidebar_open").addClass("slidebar_close");
              } else {
                $this.removeClass("slidebar_close").addClass("slidebar_open");
              }
              $body.css(params);
              mx = e.pageX;
              my = e.pageY;
              return false;
            }).one("mouseup", function(e) {
              $(document).off("mousemove." + namespace);
              f_slide = true;
            });
            return false;
          });
        }
      });
    },
    destroy: function() {
      return this.each(function() {
        var $this = $(this);
        $(window).unbind("." + namespace);
        $this.removeData(namespace);
      });
    },
    open: function(options) {
      var $this = $(this);
      options = $.extend($this.data(namespace).options, options);
      var params = {};
      switch (options.position) {
       case "top":
        params.height = options.height;
        break;

       case "bottom":
        $this.parents(options.parentClass).find(".slidebar_bottom_prev").removeClass("slidebar_close").addClass("slidebar_open");
        params.height = options.height;
        break;

       case "right":
       case "left":
        params.width = options.width;
      }
      $this.removeClass("slidebar_close").addClass("slidebar_open");
      $this.find(".slidebar_body").stop().animate(params, options.speed, options.easing);
    },
    close: function(options) {
      var $this = $(this);
      options = $.extend($this.data(namespace).options, options);
      var params = {};
      switch (options.position) {
       case "top":
        params.height = 0;
        break;

       case "bottom":
        $this.parents(options.parentClass).find(".slidebar_bottom_prev").removeClass("slidebar_open").addClass("slidebar_close");
        params.height = 0;
        break;

       case "right":
       case "left":
        params.width = 0;
      }
      $this.removeClass("slidebar_open").addClass("slidebar_close");
      $this.find(".slidebar_body").stop().animate(params, options.speed, options.easing);
    },
    toggle: function(options) {
      var $this = $(this);
      if ($this.hasClass("slidebar_open")) {
        methods.close.call(this, options);
      } else {
        methods.open.call(this, options);
      }
    }
  };
  $.fn.slidebar = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist on jQuery.Slidebar");
    }
  };
})(jQuery);

(function($) {
  var namespace = "inputcounter";
  var methods = {
    init: function(options) {
      options = $.extend({
        warningClass: "warning",
        errorClass: "error",
        warningCounter: "60",
        errorCounter: "65",
        maxCounter: ""
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
          methods.check.apply(_this);
          $this.bind("keydown keyup keypress change", function() {
            methods.check.apply(_this);
          });
        }
      });
    },
    check: function() {
      var $this = $(this);
      options = $this.data(namespace).options;
      var val = $this.val(), length = val.length;
      $this.removeClass(options.errorClass);
      $this.removeClass(options.warningClass);
      if (options.errorCounter <= length) {
        $this.addClass(options.errorClass);
      } else if (options.warningCounter <= length) {
        $this.addClass(options.warningClass);
      }
    },
    destroy: function() {
      return this.each(function() {
        var $this = $(this);
        $(window).unbind("." + namespace);
        $this.removeData(namespace);
      });
    }
  };
  $.fn.inputcounter = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist on jQuery." + namespace);
    }
  };
})(jQuery);