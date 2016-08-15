/*
 *
 * Physics Class
 *
 * Physics simulations including collition detection
 *
 */

var Vector = require('./vector');


//***********************************************
//	Collision Detection Helper functions
//***********************************************
var _colliDetectHelper = {
    getEdge: function(v1, v2) {
        return new Vector(v2.x - v1.x, v2.y - v1.y).perp();
    },

    //****************************************************************
    //	Project all the points of a polygon to a axis
    //	Return an array consisting of min point and max point
    //****************************************************************
    flattenPolygonOnAxis: function(poly, axis) {
        var maxWidth = 0xffffffff,
            maxHeight = 0xffffffff;
        var minMaxPoints = [
        new Vector(maxWidth, maxHeight),
        new Vector(-0xffffffff,
            -0xffffffff)];
        var proj;
        for (var i = 0; i < poly.points.length; i++) {
            proj = poly.points[i].project(axis);
            if (proj.x < minMaxPoints[0].x) {
                minMaxPoints[0] = proj.clone();
            }
            if (proj.x > minMaxPoints[1].x) {
                minMaxPoints[1] = proj.clone();
            }
        }
        return minMaxPoints;
    }
};

var colliDetect = {

    _isSeparatedAxis: function(poly1, poly2, axis) {
        var poly1Proj = _colliDetectHelper.flattenPolygonOnAxis(poly1, axis);
        var poly2Proj = _colliDetectHelper.flattenPolygonOnAxis(poly2, axis);
        poly1Proj = [
        poly1Proj[0].project(new Vector(1, 0)),
        poly1Proj[1].project(new Vector(1, 0))];
        poly2Proj = [
        poly2Proj[0].project(new Vector(1, 0)),
        poly2Proj[1].project(new Vector(1, 0))];
        var front, back;
        if (poly1Proj[0].x < poly2Proj[0].x) {
            front = poly2Proj;
            back = poly1Proj;
        }
        else {
        	front = poly1Proj;
        	back = poly2Proj;
        }
        if (front[0].x <= back[1].x){
        	return false;
        }
        else{
        	return true;
        }
    },

    detect: function(poly1, poly2){
    	var range = poly1.points;
    	var res;
    		var axis;
    	for (var i = 0; i < range.length; i++){
    		if (i === range.length - 1){
    			axis = _colliDetectHelper.getEdge(range[i], range[0]);
    		}
    		else{
    			axis = _colliDetectHelper.getEdge(range[i], range[i + 1]);
    		}
    		res = this._isSeparatedAxis(poly1, poly2, axis);
    		if (res){
    			return false;
    		}
    	}
    	range = poly2.points;
    	for (i = 0; i < range.length; i++){
    		if (i === range.length - 1){
    			axis = _colliDetectHelper.getEdge(range[i], range[0]);
    		}
    		else{
    			axis = _colliDetectHelper.getEdge(range[i], range[i + 1]);
    		}
    		res = this._isSeparatedAxis(poly1, poly2, axis);
    		if (res){
    			return false;
    		}
    	}
    	return true;
    }
};

module.exports = colliDetect;
