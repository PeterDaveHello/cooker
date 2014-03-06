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