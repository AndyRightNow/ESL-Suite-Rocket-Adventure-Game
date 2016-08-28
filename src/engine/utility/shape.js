/*************************************************************************************
                                        Shape Class

                                   Created By Andy Zhou

    Overview:

    Shapes using vectors to denote the position and size

*************************************************************************************/

var Vector = require('./vector');

/*
 * Circle class constructor
 *
 * @param {Vector} centerV: The center vector
 * @param {Number} r: The radius
 */
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

/*
 * Box class constructor
 *
 * @param {Vector} topLeftPosV: The top left vector
 * @param {Number} w, h: The width and the height
 */
var Box = function(topLeftPosV, w, h) {
    this.points = [
        new Vector(topLeftPosV.x, topLeftPosV.y),
        new Vector(topLeftPosV.x + w, topLeftPosV.y),
        new Vector(topLeftPosV.x + w, topLeftPosV.y + h),
        new Vector(topLeftPosV.x, topLeftPosV.y + h)];

    this.topLeftPos = topLeftPosV;

    this.w = w;
    this.h = h;
};

/*
 * Get the center vector of the box
 *
 * @return {Vector} the center vector of the box
 */
Box.prototype._getCenter = function() {
    return new Vector((this.points[0].x + this.points[2].x) / 2,
        (this.points[0].y + this.points[2].y) / 2);
};

/*
 * translate the box by x on x axis and y on y axis
 *
 * @return {Box} itself for chaining
 *
 * @param {Number} x, y: The distance to translate
 */
Box.prototype.translate = function(x, y) {
    this.points.map(function(e){
        return e.translate(x, y);
    });
    return this;
};

/*
 * Rotate the box by an angle(degree)
 *
 * @return {Box} itself for chaining
 *
 * @param {Number} angle: The angle to rotate
 */
Box.prototype.rotate = function(angle) {
    var center = this._getCenter();
    var cx = center.x,
        cy = center.y;

    //--------------------------
    // Move it to the origin of
    // the canvas, rotate and move
    // it back
    //--------------------------
    this.translate(-cx, -cy);
    this.points.map(function(e){
        return e.rotate(angle);
    });
    this.translate(cx, cy);

    return this;
};

/*
 * Scale the box by factor x on x axis and factor y on y axis
 *
 * @return {Box} itself for chaining
 *
 * @param {Number} x, y: The factor to scale
 */
Box.prototype.scale = function(x, y) {
    var center = this._getCenter();
    var cx = center.x,
        cy = center.y;

    //--------------------------
    // Move it to the origin of
    // the canvas, scale and move
    // it back
    //--------------------------
    this.translate(-cx, -cy);
    this.points.map(function(e){
        return e.scale(x, y);
    });
    this.translate(cx, cy);

    return this;
};

/*
 * Polygon class constructor
 *
 * @param {Array} points: The points of the polygon
 * @param {Vector} topLeftPosV: The top left corner position of the polygon on the canvas.
 * @param {Box} box(Optional): The bounding box
 */
var Polygon = function(points, topLeftPosV, box) {
    this._totalRotation = 0;
    this.points = points;

    //--------------------------------
    //  Assign the bounding box if
    //  provided
    //--------------------------------
    if (typeof box !== 'undefined') {
        this.box = box;
    }
    else {
        //--------------------------------
        //  The boudning box is not provided.
        //  Calculate the bounding box.
        //--------------------------------
        var minX = 0xffffffff,
            minY = 0xffffffff,
            maxX = 0,
            maxY = 0,
            w = 0,
            h = 0;
        for (var i = 0; i < points.length; i++) {
            if (points[i].x < minX) {
                minX = points[i].x;
            }
            if (points[i].y < minY) {
                minY = points[i].y;
            }
            if (points[i].x > maxX) {
                maxX = points[i].x;
            }
            if (points[i].y > maxY) {
                maxY = points[i].y;
            }
        }
        w = maxX - minX;
        h = maxY - minY;
        this.box = new Box(new Vector(minX, minY), w, h);
    }

    //-------------------------------
    //  Move to the given position
    //-------------------------------
    this.translate(-this.box.points[0].x, -this.box.points[0].y);
    this.translate(topLeftPosV.x, topLeftPosV.y);
};

/*
 * Get the center vector of the bounding box
 *
 * @return {Vector} The center of the bounding box
 */
Polygon.prototype._getCenter = function() {
    return this.box._getCenter();
};

/*
 * Translate the polygon and the bounding box
 *
 * @return {Polygon} itself for chaining
 * @param {Number} x, y: The distance to translate
 */
Polygon.prototype.translate = function(x, y) {
    this.points.map(function(e){
        return e.translate(x, y);
    });
    this.box.translate(x, y);

    return this;
};

/*
 * Rotate the polygon and the bounding box
 *
 * @return {Polygon} itself for chaining
 * @param {Number} angle: The angle to Rotate
 */
Polygon.prototype.rotate = function(angle) {
    this._totalRotation += angle;

    var center = this._getCenter();
    var cx = center.x,
        cy = center.y;

    this.translate(-cx, -cy);
    this.points.map(function(e){
        return e.rotate(angle);
    });
    this.box.rotate(angle);
    this.translate(cx, cy);
};

/*
 * Rotate back to the origin angle
 *
 */
Polygon.prototype.clearRotation = function() {
    this.rotate(-this._totalRotation);
};

Polygon.prototype.scale = function(x, y) {
    var center = this._getCenter();
    var cx = center.x,
        cy = center.y;

    this.translate(-cx, -cy);
    this.points.map(function(e){
        return e.scale(x, y);
    });
    this.box.scale(x, y);
    this.translate(cx, cy);

    return this;
};

//  Exports
module.exports = {
    'Circle': Circle,
    'Box': Box,
    'Polygon': Polygon
};
