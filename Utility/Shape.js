/*************************************************************************************
										Shape Class

								   Created By Andy Zhou

	Overview:

	Shapes using vectors to denote the position and size

*************************************************************************************/

//**************************************
//	Circle Object and its operations
//**************************************
var Circle = function(centerV, r) {
    this.center = centerV;
    this.r = r;
};

Circle.prototype.translate = function(x, y) {
    this.center.translate(x, y);
    return this;
};

Circle.prototype.scale = function(scalar) {
    this.r *= scalar;
    return this;
};

//**************************************
//	Box Object and its operations
//**************************************
var Box = function(topLeftPosV, w, h) {
    this.points = [
    new Vector(topLeftPosV.x, topLeftPosV.y),
	new Vector(topLeftPosV.x + w, topLeftPosV.y),
	new Vector(topLeftPosV.x + w, topLeftPosV.y + h),
	new Vector(topLeftPosV.x, topLeftPosV.y + h)
	];
    this.topLeftPos = this.points[0];
    this.w = w;
    this.h = h;
};

Box.prototype._getCenter = function(){
	return new Vector((this.points[0].x + this.points[2].x) / 2, 
		(this.points[0].y + this.points[2].y) / 2);
};

Box.prototype.translate = function(x, y) {
	this.points[0].translate(x, y);
	this.points[1].translate(x, y);
	this.points[2].translate(x, y);
	this.points[3].translate(x, y);
	return this;
};

Box.prototype.rotate = function(angle){
	var center = this._getCenter();
	var cx = center.x, cy = center.y;
	this.translate(-cx, -cy);
	this.points[0].rotate(angle);
	this.points[1].rotate(angle);
	this.points[2].rotate(angle);
	this.points[3].rotate(angle);
	this.translate(cx, cy);
	return this;
};

Box.prototype.scale = function(x, y){
	var center = this._getCenter();
	var cx = center.x, cy = center.y;
	this.translate(-cx, -cy);
	this.points[0].scale(x, y);
	this.points[1].scale(x, y);
	this.points[2].scale(x, y);
	this.points[3].scale(x, y);
	this.translate(cx, cy);
	return this;
};

//**************************************
//	Polygon Object and its operations
//**************************************
var Polygon = function(points) {
	this.points = [];
    points.forEach(function(){
    	this.points.push(points[0]);
    	points.shift();
    });
    this.topLeftPos = this.points[0];
};


