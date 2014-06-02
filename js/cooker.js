/*!
 * cooker v0.4.0
 * 
 * Licensed under MIT
 * Copyright 2013-2014 
 * 
 */
(function($) {
  var namespace = 'switchers';
  var methods = {
  
    init: function(options){
      options = $.extend({
        switcher:   'switcher',
        toggle:     'switcher-toggle',
        toggleAll:  'switcher-toggle-all',
        open:       'switcher-open',
        close:      'switcher-close'
      }, options);
      return this.each(function(){
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        if (!data) {
          options = $.extend({
          }, options);
          $this.data(namespace, {
              options: options
          });
        }
        var $aToggle = $this.find('.'+options.toggleAll);
        var $iToggle = $this.find('.'+options.toggle);
        $aToggle.off('click.'+namespace).on('click.'+namespace, function(){
            methods.toggleAll.apply(_this)
        });
        $iToggle.off('click.'+namespace).on('click.'+namespace, function(){
            methods.toggle.apply(_this)
        });                
      }); // end each
    },
    
    toggleAll: function(){
      var $this = $(this)
      options = $this.data(namespace).options
      var open =  options.open;  
      var close = options.close;    
      var $a = $this.find('.'+options.switcher);
      var statusOpen = $a.hasClass(options.open)
      //var $aToggle = $a.find('.'+options.toggleAll);
      if(statusOpen){
        $a.removeClass(open).addClass(close);
      }else{
        $a.removeClass(close).addClass(open);
      }
      console.log('methods.toggleAll')
    },
    
    toggle: function(){
      var $this = $(this)
      options = $this.data(namespace).options
      //var open =  options.open;  
      //var close = options.close;    
      var $i = $(event.target).parents('.'+options.switcher);
      var statusOpen = $i.hasClass(options.open)
      if(statusOpen){
        methods.close.call(this)
      }else{
        methods.open.call(this)        
      }
      console.log('methods.toggle')
    },
    
    open: function(){
      var $this = $(this)
      options = $this.data(namespace).options
      var open =  options.open;  
      var close = options.close;    
      var mode = $this.data('mode');
      var $i = $(event.target).parents('.'+options.switcher);
      var $o = $i.siblings();          
      if(mode === 'accordion'){
        $o.removeClass(open).addClass(close);
        $i.removeClass(close).addClass(open);
      }else{
        $i.removeClass(close).addClass(open);
      }
      console.log('methods.open')      
    },

    close: function(){
      var $this = $(this)
      options = $this.data(namespace).options    
      var open =  options.open;  
      var close = options.close;    
      var mode = $this.data('mode');
      var $i = $(event.target).parents('.'+options.switcher);
      var $o = $i.siblings();          
      if(mode === 'accordion'){
        $o,$i.removeClass(open).addClass(close);
      }else{
        $i.removeClass(open).addClass(close);
      }
      console.log('methods.close')      
    },
    
    destroy: function(){
      return this.each(function(){
        var $this = $(this);
        $(window).unbind('.'+namespace);
        $this.removeData(namespace);
      });
    },
    
  };
  $.fn.switchers = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+namespace);
    }    
  };
})(jQuery);

(function($) {
  var namespace = 'scrollmethod';
  var methods = {
    init: function(options){
      options = $.extend({
        speed:   800,
        easing:  'easeOutExpo',
      }, options);
      return this.each(function(){
        //var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        if (!data) {        
          options = $.extend({
          }, options);
          $this.data(namespace, {
            options: options
          });          
          $this.off().on('click',function() {
            var href= $(this).attr('href');
            var $target = $(href === '#' || href === '' ? 'html' : href);
            var position = $target.offset().top;
            $('body,html').animate({scrollTop:position}, options.speed, options.easing);
            return false;
          });
        }
      }); // end each
    },
  };
  $.fn.scrollmethod = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+namespace);
    }    
  };
})(jQuery);
(function($) {
  var namespace = 'inputcounter';
  var methods = {
    init: function(options){
      options = $.extend({
        warningClass:     'warning',
        errorClass:       'error',
        warningCounter:   60,
        errorCounter:     65,
        maxCounter:       ''
      }, options);
      return this.each(function(){
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        if (!data) {        
          options = $.extend({
          }, options);
          $this.data(namespace, {
            options: options
          });
          
          methods.check.apply(_this);
          
          $this.bind('keydown keyup keypress change', function(){
            methods.check.apply(_this);
          });
        
        }        
      }); // end each
    },
    check: function(){
      var $this = $(this);
      options = $this.data(namespace).options;
      
      var val = $this.val(), length = val.length;
      $this.removeClass(options.errorClass);
      $this.removeClass(options.warningClass);
      if(options.errorCounter <= length){
        $this.addClass(options.errorClass);
      } else if(options.warningCounter <= length){
        $this.addClass(options.warningClass);
      }
    },
    destroy: function(){
      return this.each(function(){
        var $this = $(this);
        $(window).unbind('.'+namespace);
        $this.removeData(namespace);
      });
    }
  };
  $.fn.inputcounter = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+namespace);
    }    
  };
})(jQuery);

(function($) {
  var namespace = 'slidebar';
  var methods = {
    init: function(options){
      options = $.extend({
        position: 'left',
        speed: 500,
        easing: 'easeOutExpo',
        minSize: 10,
      }, options);
      return this.each(function(){
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        if (!data) {
          options = $.extend({
            width: $this.data('width'),
            height: $this.data('height')
          }, options);
          $this.data(namespace, {
            options: options
          });
          $this.find('.slidebar-toggle')
            .unbind('click.'+namespace)
            .bind('click.'+namespace, function(){
              methods.toggle.apply(_this);
            });
          $this.find('.slidebar-open')
            .unbind('click.'+namespace)
            .bind('click.'+namespace, function(){
              methods.open.apply(_this);
            });
          $this.find('.slidebar-close')
            .unbind('click.'+namespace)
            .bind('click.'+namespace, function(){
              methods.close.apply(_this);
            });
          $this.find('.slidebar-resize').mousedown(function(e) {
            var mx = e.pageX;
            var my = e.pageY;
            $(document).on('mousemove.'+namespace, function(e) {
              var $body = $this.find('.slidebar-body');
              var params = {};
              var f_close = false;
              switch(options.position) {
                case 'top':
                case 'bottom':
                params.height = $body.height() + my - e.pageY;
                if (params.height <= options.minSize) {
                  f_close = true;
                  params.height = 0;
                }
                break;
                case 'right':
                case 'left':
                params.width = $body.width() + mx - e.pageX;
                if (params.width <= options.minSize) {
                  f_close = true;
                  params.width = 0;
                }
              }
              if (f_close) {
                $this
                  .removeClass('slidebar-open')
                  .addClass('slidebar-close');
              } else {
                $this
                  .removeClass('slidebar-close')
                  .addClass('slidebar-open');
              }
              $body.css(params);
              mx = e.pageX;
              my = e.pageY;
              return false;
            }).one('mouseup', function() {
              $(document).off('mousemove.'+namespace);
              f_slide = true;
            });
            return false;
          });
        }
      }); // end each
    },
    destroy: function(){
      return this.each(function(){
        var $this = $(this);
        $(window).unbind('.'+namespace);
        $this.removeData(namespace);
      });
    },
    open: function(options){
      var $this = $(this);
      options = $.extend($this.data(namespace).options, options);
      var params = {};
      switch(options.position) {
      case 'top':
        params.height = options.height;
        break;
      case 'bottom':
        params.height = options.height;
        break;
      case 'right':
      case 'left':
        params.width = options.width;
      }
      $this
        .removeClass('slidebar-close')
        .addClass('slidebar-open');
      $this.find('.slidebar-body')
        .stop()
        .animate(params, options.speed, options.easing);
    },
    close: function(options){
      var $this = $(this);
      options = $.extend($this.data(namespace).options, options);
      var params = {};
      switch(options.position) {
      case 'top':
        params.height = 0;
        break;
      case 'bottom':
        params.height = 0;
        break;
      case 'right':
      case 'left':
        params.width = 0;
      }
      $this
        .removeClass('slidebar-open')
        .addClass('slidebar-close');
      $this.find('.slidebar-body')
        .stop()
        .animate(params, options.speed, options.easing);
    },
    toggle: function(options){
      var $this = $(this);
      if ($this.hasClass('slidebar-open')) {
        methods.close.call(this, options);
      } else {
        methods.open.call(this, options);
      }
    }
  };
  $.fn.slidebar = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+namespace);
    }    
  };
})(jQuery);
(function($) {
  var namespace = 'drilldown';
  var status_open = 'dd-open';
  var status_close = 'dd-close';
  var body = 'drilldown-body';
  var cls_body = '.'+body;
  var toggle = 'drilldown-toggle';
  var open_all = 'drilldown-open-all';
  var close_all = 'drilldown-close-all';
  var data_level = 'level';
  var clickOpen = function(options){
    var $this = $(this);
    $this
      .removeClass(status_close)
      .addClass(status_open);
    var level = $this.data(data_level) || 1;
    $this.nextAll(cls_body).each(function(){
      if ($(this).data(data_level) <= level) {
        return false;
      }
      if ($(this).data(data_level) > level + 1) {
        return true;
      }
      $(this)
        .stop()
        .show(options.speed);
    });
  };
  var clickClose = function(options){
    var $this = $(this);
    $this
      .removeClass(status_open)
      .addClass(status_close);
    var level = $this.data(data_level) || 1;
    $this.nextAll(cls_body).each(function(){
      if ($(this).data(data_level) <= level) {
        return false;
      }
      if ($(this).hasClass(body)) {
        $(this)
          .removeClass(status_open)
          .addClass(status_close);
      }
      $(this)
        .stop()
        .hide(options.speed);
    });
  };
  var clickToggle = function(options){
    var $this = $(this).closest(cls_body);
    if ($this.hasClass(status_open)) {
      clickClose.call($this, options);
    } else {
      clickOpen.call($this, options);
    }
  };
  var methods = {
    init: function(options){
      options = $.extend({
        speed: 'fast'
      }, options);
      return this.each(function(){
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        if (!data) {
          options = $.extend({
          }, options);
          $this.data(namespace, {
            options: options
          });
        }
        $this
          .find('.'+toggle)
          .unbind('click.'+namespace)
          .bind('click.'+namespace, function(){
            var options = $this.data(namespace).options;
            clickToggle.call(this, options);
          });
        $this
          .find('.'+open_all)
          .unbind('click.'+namespace)
          .bind('click.'+namespace, function(){
            methods.openAll.call(_this);
          });
        $this.find('.'+close_all)
          .unbind('click.'+namespace)
          .bind('click.'+namespace, function(){
            methods.closeAll.call(_this);
          });
      }); // end each
    },
    destroy: function(){
      return this.each(function(){
        var $this = $(this);
        $(window).unbind('.'+namespace);
        $this.removeData(namespace);
      });
    },
    openAll: function(options){
      var $this = $(this);
      options = $.extend($this.data(namespace).options, options);
      $this.find(cls_body).each(function(){
        if ($(this).data(data_level) == 1) {
          clickOpen.call($(this), options);
        }
      });
    },
    closeAll: function(options){
      var $this = $(this);
      options = $.extend($this.data(namespace).options, options);
      $this.find(cls_body).each(function(){
        if ($(this).data(data_level) == 1) {
          clickClose.call($(this), options);
        }
      });
    }
  };
  $.fn.drilldown = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.drilldown' );
    }    
  };
})(jQuery);
