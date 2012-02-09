(function($){
  $.fn.extend({
    startLineAnime: function(options) {
      var global = jQuery.shishunki.global;
      
      var defaults = {
        numOfLines: 20,
        lineHeight : 1,
        lineColor : '#000000'
      }

      var options =  $.extend(defaults, options);
 
      return this.each(function() {
        global.numOfInstance++;
        if(global.id2nOI[$(this).attr('id')] == undefined){
          global.id2nOI[$(this).attr('id')] = [global.numOfInstance];
        }else{
          global.id2nOI[$(this).attr('id')].push(global.numOfInstance);
        }

        var o = options;
        global.lines[global.numOfInstance] = [];

        for(var i=0; i < o.numOfLines; i++){
          var l = new jQuery.shishunki.Line(0,(i%2 == 0)?1:-1,$(this));

          // generate DOM
          var className = "shishunkiLine_" + global.numOfInstance;
          var idName = className + "_horizon_" + i;
          $(this).append("<div id='" + idName +  "' class='shishunkiLine'></div>");
          $("#" + idName).height(o.lineHeight);
          $("#" + idName).width($(this).width());
          $("#" + idName).css("top", (($(this).height()) / o.numOfLines)*i );
    
          $("#" + idName).css("position", "absolute");
          $("#" + idName).css("background-color", o.lineColor);

          l.elm = $("#" + idName);
          global.lines[global.numOfInstance].push(l);
        }

        (function(gid){
          // timer event setting
          $( this ).everyTime( 41 , 'shishunkiTimer'+gid , function(){
            for(var i=0; i<jQuery.shishunki.global.lines[gid].length; i++){
              jQuery.shishunki.global.lines[gid][i].move();
            }
          });
          
          // resize event setting
          $( window ).bind("resize", function(){
            for(var i=0; i<jQuery.shishunki.global.lines[gid].length; i++){
              jQuery.shishunki.global.lines[gid][i].elm.width( $(this).width() );
            }
          });
          
        })(global.numOfInstance);
      });
    },
    
    stopLineAnime: function(){
      var global = jQuery.shishunki.global;
      
      return this.each(function() {
        var ids =   global.id2nOI[ $(this).attr('id') ];
        for(var i=0; i<ids.length; i++){
          $( this ).stopTime('shishunkiTimer' + ids[i]);
        }
        
      });
    },

    restartLineAnime: function(){
      var global = jQuery.shishunki.global;

      return this.each(function() {
        var ids =   global.id2nOI[ $(this).attr('id') ];
        for(var i=0; i<ids.length; i++){
          (function(i){
            $( this ).everyTime( 41 , 'shishunkiTimer'+ids[i] , function(){
              for(var j=0; j<jQuery.shishunki.global.lines[ids[i]].length; j++){
                jQuery.shishunki.global.lines[ids[i]][j].move();
              }
              
            });
          })(i);
        }
      });
    }
  });
})(jQuery);

jQuery.extend({
shishunki:{
global:{
  numOfInstance:0,
  id2nOI:{},
  lines:[],
},

Line:function (dx,dy,parent){
  this.dx = dx;
  this.dy = dy;
  this.elm;
  this.parent = parent;
  
  
  this.move = function(){
    var ny = this.elm.css('top').replace('px','') * 1;
    var nx = this.elm.css('left').replace('px','') * 1;
    
    if(ny + this.dy < 0){
      this.dy = -this.dy;
    }else if(ny + this.dy + this.elm.height() >= this.parent.height()){
      this.dy = -this.dy;
    }else{
      this.elm.css('top', (ny + this.dy)+'px');
      this.elm.css('left', (nx + this.dx)+'px');
    }
  };

  this.resize = function(){
    
  }
},

}
});
