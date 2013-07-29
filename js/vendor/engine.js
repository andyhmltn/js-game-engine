var GameEngineScene = function(width,height,canvas) {
  this.width  = width;
  this.height = height;

  this.canvas = canvas;
  this.ctx    = this.canvas.getContext('2d'); 

  this.objects = [];
  this.clear_canvas = function() {
    this.ctx.clearRect(0,0,this.width,this.height);
  }
}

GameEngineScene.prototype.add_object = function(options) {
  this.objects.push(new GameEngineObject(this.ctx, options));
}

GameEngineScene.prototype.draw = function() {
  _self = this;
  _self.clear_canvas();

  for(var i = 0; i<_self.objects.length; i++) {
    _self.objects[i].draw();
    _self.objects[i].update_position();
  }
}

GameEngineScene.prototype.run = function() {
  var _self = this;

  _self.clear_canvas();
  _self.draw();

  setInterval(function() {
    _self.draw();
  }, 5);
}

var GameEngineObject = function(ctx, options) {
  this.ctx    = ctx;
  this.radius = options.radius;
  this.weight = 2;
  this.velocity = {
    y: 0
  };

  this.bouncy = options.bouncy || false;

  this.x = options.x;
  this.y = options.y;

  this.colliding = false;
  this.bottom    = function() { return this.y + this.radius; }
}

GameEngineObject.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.arc(this.x,
               this.y,
               this.radius,
               0.9,
               1,
               true);
  this.ctx.closePath();
  this.ctx.fill();
}

GameEngineObject.prototype.update_position = function() {
  if(! this.colliding) {
    this.velocity.y += this.weight * 0.01;

    this.y += this.velocity.y;
  }

  if(this.bottom() >= 500) {
    if(this.bouncy)
      this.velocity.y *= -0.95;
    else {
      this.velocity.y = 0;
      this.colliding  = true;
    }
  }

  this.draw();
}