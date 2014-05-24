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