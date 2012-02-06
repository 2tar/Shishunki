function Shishunki(numOfLines, lineHeight, selectorStr){
  this.numOfLines = numOfLines;
  this.lineHeight = lineHeight;
  this.baseWidth = undefined;
  this.baseHeight = undefined;
  this.lines = [];
  this.elm = $(selectorStr);
}
Shishunki.prototype.numOfInstance = 0;

Shishunki.prototype.horizon = function(){
  Shishunki.prototype.numOfInstance++;
  
  this.baseWidth = this.elm.width();
  this.baseHeight = this.elm.height();
  
  // generate lines
  for(var i=0; i < this.numOfLines; i++){
    var l = new Line(0,(i%2 == 0)?1:-1,this.elm);
    
    var className = "shishunkiLine_" + Shishunki.prototype.numOfInstance;
    var idName = className + "_horizon_" + i;
    this.elm.append("<div id='" + idName +  "' class='shishunkiLine'></div>");
    $("#" + idName).height(this.lineHeight);
    $("#" + idName).width(this.baseWidth);
    $("#" + idName).css("top", ((this.baseHeight) / this.numOfLines)*i );
    //$("#" + idName).css("top", ((this.baseHeight - this.lineHeight*this.numOfLines) / this.numOfLines)*i );
    
    $("#" + idName).css("position", "absolute");
    $("#" + idName).css("background-color", "black");

    l.elm = $("#" + idName);
    this.lines.push(l);
  }

  $( this ).everyTime( 41 , 'horizonTimer'+this.numOfInstance , function(){
    for(var i=0; i<this.lines.length; i++){
      this.lines[i].move();
    }
  } );
  
//  console.log(Shishunki.prototype.numOfInstance);
//  console.log(this.lines.length);
};

function Line(dx,dy,parent){
  this.dx = dx;
  this.dy = dy;
  this.elm;
  this.parent = parent;
}

Line.prototype.move = function(){
  var ny = this.elm.css('top').replace('px','') * 1;
  var nx = this.elm.css('left').replace('px','') * 1;
  
  if(ny + this.dy < 0){
    this.dy = -this.dy;
  }else if(ny + this.dy + this.elm.height() >= this.parent.height()){
    this.dy = -this.dy;
//    console.log(ny);
  }else{
    this.elm.css('top', (ny + this.dy)+'px');
    this.elm.css('left', (nx + this.dx)+'px');
  }
};

Line.prototype.resize = function(){
  
};

