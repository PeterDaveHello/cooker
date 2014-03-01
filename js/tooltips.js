(function($) {
  "use strict";
  var namespace = 'tooltips'
  var methods = {
  
    init: function(options){
      options = $.extend({
        activeClass: 'tooltips-active'      
      }, options); 
           
      $('body').append('<div class="tooltip fade"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>');
      
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
        
        var action = $this.data('action');
        
        if(action === 'click'){
          $this.off('click.'+namespace).on('click.'+namespace, function(){  
            methods.toggle.apply(_this);
            return false;
          });
          $('body').off('click.'+namespace).on('click.'+namespace, function(){  
            methods.hide.apply(_this);
          });
        } else { //hover
          $this.off('mouseenter.'+namespace).on('mouseenter.'+namespace, function(){
            methods.show.apply(_this);
          })
          $this.off('mouseleave.'+namespace).on('mouseleave.'+namespace, function(){
            methods.hide.apply(_this);
          });        
          $this.off('click.'+namespace).on('click.'+namespace, function(){  
            return false;
          });
        }
      }); // end each
    },
    toggle: function(options){
      var $this = $(this);
      options = $this.data(namespace).options;
      var active = $this.hasClass(options.activeClass);
      var $tipStatus = $('.tooltip').css('visibility');
      
      if ($tipStatus == 'hidden' || !active) {
        methods.show.call(this, options);
      }else{
        methods.hide.call(this, options);
      }
    },
    
    position: function(options){
      var $this = $(this)
      options = $this.data(namespace).options
      var pos = $this.data('position')
      var iWidth = $this.outerWidth();
      var iHeight = $this.outerHeight();
      var iPos = $this.position();
      var $tip = $('.tooltip');
      var $tipArrow = $tip.find('.tooltip-arrow');
      var tipArrowHeight = $tipArrow.outerHeight();
      var tipArrowWidth = $tipArrow.outerWidth();
      var tipWidth = $tip.outerWidth();
      var tipHeight = $tip.outerHeight();      
      var margin = 3;
      var hol = iPos.top - (tipHeight / 2)  + (iHeight / 2);
      var vur = iPos.left - (tipWidth / 2) + (iWidth / 2);
      
      switch(pos) {
        case 'top':
        $tip.css({
          'top': iPos.top - tipHeight - tipArrowHeight - margin,
          'left':vur
        });      
        break;
        case 'bottom':        
        $tip.css({
          'top':iPos.top + iHeight,
          'left':vur
        });      
        break;
        case 'left':        
        $tip.css({
          'top':hol,
          'left':iPos.left - tipWidth - tipArrowWidth - margin
        });      
        break;
        case 'right':    
        $tip.css({
          'top':hol,
          'left':iPos.left + iWidth
        });
      }
    },
    
    show: function(options){
      var $this = $(this);
      options = $this.data(namespace).options;
      var pos = $this.data('position');
      
      methods.hide.call(this, options);
      methods.insert.call(this, options);
      methods.position.call(this, options);
      
      $this.addClass(options.activeClass);
      $('.tooltip').css({'visibility':'visible'}).addClass('in '+ pos);      
    },
    
    hide: function(options){
      var $this = $(this);
      options = $this.data(namespace).options;  
      var posClass = 'in top bottom left right';
      
      $this.removeClass(options.activeClass);
      $('.tooltip').removeClass(posClass).css({'visibility':'hidden'});
    },
    
    insert: function(options){
      var $this = $(this);
      options = $this.data(namespace).options;
      var title = $this.data('title') || $this.attr('title');
      var $tipInner = $('.tooltip').find('.tooltip-inner');
      
      $tipInner.html(title);
    },
    
    destroy: function(){
      return this.each(function(){
        var $this = $(this);
        $(window).unbind('.'+namespace);
        $this.removeData(namespace);
      })
    }
    
  }
  $.fn.tooltips = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+namespace);
    }    
  }
})(jQuery);