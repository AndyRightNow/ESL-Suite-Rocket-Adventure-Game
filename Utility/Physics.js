/*************************************************************************************
										Physics Class

								   Created By Andy Zhou

	Overview:

	Physics simulations including collition detection

*************************************************************************************/

"use strict";

//***********************************************
//	Collision Detection Helper functions
//***********************************************
var colliDetectHelper = {
	_getEdge: function(v1, v2){
		return new Vector(v2.x - v1.x, v2.y - v1.y);
	}
};

var colliDetect = {
	isSeparatedAxis: function(aPos, bPos, aPoints, bPoints){

	}
};