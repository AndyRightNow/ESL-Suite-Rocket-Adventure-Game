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

Circle.prototype.scale = function(scalar){
	this.r *= scalar;
	return this;
};

