/*
 *
 * Physics Class
 *
 * Physics simulations including collition detection
 *
 */

//------------------------------------
//  Dependencies
//------------------------------------
var Vector = require('./vector');

//***********************************************
//	Collision Detection Helper functions
//***********************************************
var _colliDetectHelper = {
    /*
     * Get the edge for testing SAT
     * Here an edge means the vector perpendicular to the vector formed by
     * subtracting two points
     *
     * @return {Vector} the edge
     * @param {Vector} v1, v2: Two vectors(points) to get from
     */
    getEdge: function(v1, v2) {
        return new Vector(v2.x - v1.x, v2.y - v1.y).perp();
    },

    /*
     * Project all the points of a polygon to a axis
     *
     * @return {Array} an array of two points indicating the axis
     * @param {Polygon} poly: A polygon
     * @param {Vector} axis: The axis to project to
     */
    flattenPolygonOnAxis: function(poly, axis) {
        var minMaxPoints = [
            new Vector(0xffffffff, 0xffffffff),
            new Vector(-0xffffffff, -0xffffffff)];

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

    /*
     * Check if this axis is a separated axis for two polygons
     *
     * @return {Boolean} true or false
     * @param {Polygon} poly1, poly2: Two polygons to test on
     * @param {Vector} axis: The axis to test on
     */
    _isSeparatedAxis: function(poly1, poly2, axis) {
        //----------------------------------------------
        // Project the two polygons twice:
        // 1. First to the axis to test on
        // 2. Second to the x axis for the sake of simplicity
        //---------------------------------------------------
        var poly1Proj = _colliDetectHelper.flattenPolygonOnAxis(poly1, axis)
            .map(function(ele){
                return ele.project(new Vector(1, 0));
            });
        var poly2Proj = _colliDetectHelper.flattenPolygonOnAxis(poly2, axis)
            .map(function(ele){
                return ele.project(new Vector(1, 0));
            });

        //------------------------------
        //  Get which is in the front
        //------------------------------
        var front = poly1Proj, back = poly2Proj;
        if (poly1Proj[0].x < poly2Proj[0].x) {
            front = poly2Proj;
            back = poly1Proj;
        }

        //  Check if the min of the front is greater than the max of the back
        return front[0].x > back[1].x;
    },

    /*
     * Check if two polygons collide and return true if they do
     *
     * @return {Boolean} true if two polygons collide and false if not
     * @param {Polygon} poly1, poly2: Two polygons to test on
     */
    detect: function(poly1, poly2){
        return [poly1.points, poly2.points].every(function(points){
            return points.every(function(ele, i){
                //  If there is one separated axis two polygons won't collide
                return !colliDetect._isSeparatedAxis(poly1, poly2,
                    //  Check every two points as well as the last with the first
                    _colliDetectHelper.getEdge(points[i], points[(i === points.length - 1) ? 0 : i + 1]));
            });
        });
    }
};

//  Exports
module.exports = colliDetect;
