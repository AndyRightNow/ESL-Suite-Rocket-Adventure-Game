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
	getEdge: function(v1, v2){
		return new Vector(v2.x - v1.x, v2.y - v1.y);
	},

	//****************************************************************
	//	Project all the points of a polygon to a axis
	//	Return an array consisting of min point and max point
	//****************************************************************
	flattenPolygonOnAxis: function(poly, axis){
		var maxWidth = GraphicsContext.width(),
			maxHeight = GraphicsContext.height();
		var minMaxPoints = [new Vector(maxWidth, maxHeight), new Vector()];
		for (var i = 0; i < poly.points.length; i++) {
			poly.points[i].project(axis);
			if (poly.points[i].x < res[0].x) {
				res[0] = poly.points[i];
			}
			if (poly.points[i].x > res[1].x) {
				res[1] = poly.points[i];
			}
		}
		return minMaxPoints;
	}
};

var colliDetect = {
	_isSeparatedAxis: function(aPos, bPos, aPoints, bPoints){

	}
};