(function($){
  $.fn.extend({
    startLineAnime: function(options) {
      var global = jQuery.shishunki.global;
      
      var defaults = {
        numOfLines: 20,
        lineHeight : 1,
        lineColor : '#000000',
        angle: 'horizon', // or horizon
        collision: false,
        interval: 'even', // or random
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
          var l = undefined;

          // generate DOM
          var className = "shishunkiLine_" + global.numOfInstance;
          var idName = ''
          if(o.angle == 'horizon'){
            l = new jQuery.shishunki.Line(0,(i%2 == 0)?1:-1,$(this));
            idName = className + "_horizon_" + i;
            $(this).append("<div id='" + idName +  "' class='shishunkiLine'></div>");
            $("#" + idName).height(o.lineHeight);
            $("#" + idName).width($(this).width());
            if(o.interval =='even'){
              $("#" + idName).css("top", (($(this).height()) / o.numOfLines)*i );
            }else if(o.interval == 'random'){
              $("#" + idName).css("top", ($(this).height() - o.lineHeight)*Math.random() );
            }
            
          }else if(o.angle == 'vertical'){
            l = new jQuery.shishunki.Line((i%2 == 0)?1:-1,0,$(this));
            idName = className + "_vertical_" + i;
            $(this).append("<div id='" + idName +  "' class='shishunkiLine'></div>");
            $("#" + idName).width(o.lineHeight);
            $("#" + idName).height($(this).height());
            if(o.interval =='even'){
              $("#" + idName).css("left", (($(this).width()) / o.numOfLines)*i );
            }else if(o.interval == 'random'){
              $("#" + idName).css("left", ($(this).width() - o.lineHeight)*Math.random() );
            }
          }
          
          $("#" + idName).css("position", "absolute");
          $("#" + idName).css("background-color", o.lineColor);

          l.elm = $("#" + idName);
          global.lines[global.numOfInstance].push(l);
        }

        (function(gid, baseObj){
          // timer event setting
          $( this ).everyTime( 41 , 'shishunkiTimer'+gid , function(){
            for(var i=0; i<jQuery.shishunki.global.lines[gid].length; i++){
              jQuery.shishunki.global.lines[gid][i].move();
            }
          });
          
          // resize event setting
          if(o.angle == 'horizon'){
            $( window ).bind("resize", function(){
              for(var i=0; i<jQuery.shishunki.global.lines[gid].length; i++){
                jQuery.shishunki.global.lines[gid][i].elm.width( baseObj.width() );
              }
            });
          }else if(o.angle == 'vertical'){
            $( window ).bind("resize", function(){
              for(var i=0; i<jQuery.shishunki.global.lines[gid].length; i++){
                jQuery.shishunki.global.lines[gid][i].elm.height( baseObj.height() );
              }
            });
          }
          
        })(global.numOfInstance, $(this));
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
    }

    if(nx + this.dx < 0){
      this.dx = -this.dx;
    }else if(nx + this.dx + this.elm.width() >= this.parent.width()){
      this.dx = -this.dx;
    }else{
      this.elm.css('left', (nx + this.dx)+'px');
    }
  };

  this.resize = function(){
    //
  }
},

}
});
