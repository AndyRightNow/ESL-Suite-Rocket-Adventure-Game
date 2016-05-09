/*************************************************************************************
                                        Vector Class

                                   Created By Andy Zhou

    Overview:

    Vector and vector operations.

*************************************************************************************/

//************************
//  Constructor
//************************
var Vector = function(x, y){
    this.x = x || 0;
    this.y = y || 0;
};

Vector.prototype.dot = function(v){
    return this.x * v.x + this.y * v.y;
};

Vector.prototype.len2 = function(){
    return this.dot(this);
};

Vector.prototype.len = function(){
    return Math.sqrt(this.len2());
};

Vector.prototype.copy = function(v){
    this.x = v.x;
    this.y = v.y;
    return this;
};

Vector.prototype.clone = function(){
    return new Vector(this.x, this.y);
};

Vector.prototype.perp = function(){
    var x = this.x;
    this.x = this.y;
    this.y = -x;
    return this;
};

Vector.prototype.reverse = function(){
    this.x = -this.x;
    this.y = -this.y;
    return this;
};

Vector.prototype.translate = function(x, y){
    this.x += x;
    this.y += y;
    return this;
};

Vector.prototype.rotate = function(angle){
    var radian = angle * (Math.PI / 180);
    var x = this.x; //  Prevent pre-calculation
    this.x = this.x * Math.cos(radian) + this.y * Math.sin(radian);
    this.y = - x * Math.sin(radian) + this.y * Math.cos(radian);
    return this;
};

Vector.prototype.scale = function(sx, sy){
    this.x *= sx;
    this.y *= sy || sx;
    return this;
};

Vector.prototype.normalize = function(){
    var d = this.len();
    if (d > 0){
        this.x /= d;
        this.y /= d;
    }
    return this;
};

Vector.prototype.add = function(v){
    this.x += v.x;
    this.y += v.y;
    return this;
};

Vector.prototype.sub = function(v){
    this.x -= v.x;
    this.y -= v.y;
    return this;
};

//**********************************
//  No side effect and chaining
//**********************************
Vector.prototype.project = function(axis){
    var cof =  this.dot(axis) / axis.len2();
    return axis.scale(cof);
};

Vector.prototype.projectN = function(axis){
    var cof =  this.dot(axis);
    return axis.scale(cof);
};
/*************************************************************************************
                                        Utility

                                   Created By Andy Zhou

    Overview:

    General utilities.

*************************************************************************************/

"use strict";

//***********************
//  General Utility
//***********************
var Utility = {
    //*********************************************
    //  Get a random index in within a range
    //*********************************************
    getRandIndex: function(upperbound){
        return parseInt((Math.random() * upperbound + Math.random() * upperbound) % upperbound);
    },

    //**************************
    //  Randomly generate -1 or 1
    //**************************
    getPosiOrNega: function(){
        var arr = [1, -1];
        return arr[parseInt((Math.random() * 10 * Math.random() * 10) % 2)];
    }
};
/*************************************************************************************
                                        Time Class

                                   Created By Andy Zhou

    Overview:

    Used to track the passing time of the game

*************************************************************************************/

"use strict";


var Timer = {
    _date: 0,
    _totalTime: 0,
    _startTime: 0,
    _started: false,
    _reset: function(){
        this._startTime = 0;
        this._totalTime = 0;
        this._date = new Date();
    },
    start: function(){
        this._date = new Date();
        var h = this._date.getUTCHours();
        var m = this._date.getUTCMinutes();
        var s = this._date.getUTCSeconds();
        var ms = this._date.getUTCMilliseconds();
        var curTime = h * 60 * 60 * 1000 + m * 60 * 1000 + s * 1000 + ms;
        this._startTime = curTime;
        this._started = true;
    },
    stop: function(){
        this._started = false;
        this._reset();
    },
    totalTime: function(){
        this._date = new Date();
        var h = this._date.getUTCHours();
        var m = this._date.getUTCMinutes();
        var s = this._date.getUTCSeconds();
        var ms = this._date.getUTCMilliseconds();
        var curTime = h * 60 * 60 * 1000 + m * 60 * 1000 + s * 1000 + ms;
        this._totalTime = curTime - this._startTime;
        return this._totalTime;
    },
    isRunning: function(){
        return this._started;
    }
};
/*************************************************************************************
                                        Shape Class

                                   Created By Andy Zhou

    Overview:

    Shapes using vectors to denote the position and size

*************************************************************************************/

//**************************************
//  Circle Object and its operations
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
//  Box Object and its operations
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

Box.prototype._getCenter = function() {
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

Box.prototype.rotate = function(angle) {
    var center = this._getCenter();
    var cx = center.x,
        cy = center.y;
    this.translate(-cx, -cy);
    this.points[0].rotate(angle);
    this.points[1].rotate(angle);
    this.points[2].rotate(angle);
    this.points[3].rotate(angle);
    this.translate(cx, cy);
    return this;
};

Box.prototype.scale = function(x, y) {
    var center = this._getCenter();
    var cx = center.x,
        cy = center.y;
    this.translate(-cx, -cy);
    this.points[0].scale(x, y);
    this.points[1].scale(x, y);
    this.points[2].scale(x, y);
    this.points[3].scale(x, y);
    this.translate(cx, cy);
    return this;
};


//**************************************
//  Polygon Object and its operations
//**************************************
var Polygon = function(points, topLeftPosV, box) {
    this._totalRotation = 0;
    this.points = [];
    //*********************************
    //  Calculate the bounding box
    //*********************************
    var minX = GraphicsContext.width(),
        minY = GraphicsContext.height(),
        maxX = 0,
        maxY = 0,
        w = 0,
        h = 0;
    for (var i = 0; i < arguments[0].length; i++) {
        this.points.push(arguments[0][i]);
        if (arguments[0][i].x < minX) {
            minX = arguments[0][i].x;
        }
        if (arguments[0][i].y < minY) {
            minY = arguments[0][i].y;
        }
        if (arguments[0][i].x > maxX) {
            maxX = arguments[0][i].x;
        }
        if (arguments[0][i].y > maxY) {
            maxY = arguments[0][i].y;
        }
    }
    w = maxX - minX;
    h = maxY - minY;
    this.box = new Box(new Vector(minX, minY), w, h);

    //****************************
    //  Check arguments list
    //****************************
    switch (arguments.length) {
        case 3:
            this.box = box;
            this.translate(-this.box.points[0].x, -this.box.points[0].y);
            this.translate(topLeftPosV.x, topLeftPosV.y);
            break;
        case 2:
            this.translate(-minX, -minY);
            this.translate(topLeftPosV.x, topLeftPosV.y);
            break;
    }
};

Polygon.prototype._getCenter = function() {
    return this.box._getCenter();
};

Polygon.prototype.translate = function(x, y) {
    for (var i = 0; i < this.points.length; i++) {
        this.points[i].translate(x, y);
    }
    this.box.translate(x, y);
    return this;
};

Polygon.prototype.rotate = function(angle) {
    this._totalRotation += angle;
    var center = this._getCenter();
    var cx = center.x,
        cy = center.y;
    this.translate(-cx, -cy);
    for (var i = 0; i < this.points.length; i++) {
        this.points[i].rotate(angle);
    }
    this.box.rotate(angle);
    this.translate(cx, cy);
};

Polygon.prototype.clearRotation = function() {
    this.rotate(-this._totalRotation);
};

Polygon.prototype.scale = function(x, y) {
    var center = this._getCenter();
    var cx = center.x,
        cy = center.y;
    this.translate(-cx, -cy);
    for (var i = 0; i < this.points.length; i++) {
        this.points[i].scale(x, y);
    }
    this.box.scale(x, y);
    this.translate(cx, cy);
    return this;
};
/*************************************************************************************
                                        Physics Class

                                   Created By Andy Zhou

    Overview:

    Physics simulations including collition detection

*************************************************************************************/

"use strict";

//***********************************************
//  Collision Detection Helper functions
//***********************************************
var colliDetectHelper = {
    getEdge: function(v1, v2) {
        return new Vector(v2.x - v1.x, v2.y - v1.y).perp();
    },

    //****************************************************************
    //  Project all the points of a polygon to a axis
    //  Return an array consisting of min point and max point
    //****************************************************************
    flattenPolygonOnAxis: function(poly, axis) {
        var maxWidth = GraphicsContext.width(),
            maxHeight = GraphicsContext.height();
        var minMaxPoints = [
        new Vector(maxWidth, maxHeight), 
        new Vector(-GraphicsContext.width(),
            -GraphicsContext.height())];
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
        var poly1Proj = colliDetectHelper.flattenPolygonOnAxis(poly1, axis);
        var poly2Proj = colliDetectHelper.flattenPolygonOnAxis(poly2, axis);
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
                axis = colliDetectHelper.getEdge(range[i], range[0]);
            }
            else{
                axis = colliDetectHelper.getEdge(range[i], range[i + 1]);
            }
            res = this._isSeparatedAxis(poly1, poly2, axis);
            if (res){
                return false;
            }
        }
        range = poly2.points;
        for (var i = 0; i < range.length; i++){
            if (i === range.length - 1){
                axis = colliDetectHelper.getEdge(range[i], range[0]);
            }
            else{
                axis = colliDetectHelper.getEdge(range[i], range[i + 1]);
            }
            res = this._isSeparatedAxis(poly1, poly2, axis);
            if (res){
                return false;
            }
        }
        return true;
    }
};

/*************************************************************************************
                                    Input Class

                                Created By Andy Zhou

    Overview:

    Responsible for getting user's input(mouse movements) and sending the 
    command to the GraphicsClass to animate the scene.

*************************************************************************************/

"use strict";

var InputClass = {
    //  Mouse movement state
    _mouseMove: false,

    //*******************************************
    //  Mouse coordinates relative to the canvas    
    //*******************************************
    mouseX: 0,
    mouseY: 0,
    _lastMouseX: 0,
    _lastMouseY: 0,

    //  Click the canvas count
    clickCount: 0,
    lastClick: new Vector(),

    //Listen to the user input and get the members data
    listen: function() {
        var canvasOffsetLeft = $(GraphicsContext.canvas).offset().left;
        var canvasOffsetTop = $(GraphicsContext.canvas).offset().top;
        //*******************************
        //  Get the mouse coordinates
        //*******************************
        document.addEventListener("mousemove", function(event) {
            if (InputClass._mouseMove) {
                InputClass.mouseX = event.pageX - canvasOffsetLeft;
                InputClass.mouseY = event.pageY - canvasOffsetTop;
                InputClass._lastMouseX = InputClass.mouseX;
                InputClass._lastMouseY = InputClass.mouseY;
            } else {
                InputClass.mouseX = InputClass._lastMouseX;
                InputClass.mouseY = InputClass._lastMouseY
            }
        });

        //*******************************
        //  Get the mouse movement state
        //*******************************
        canvas.addEventListener("mouseenter", function(event) {
            InputClass._mouseMove = true;
        });
        canvas.addEventListener("mouseout", function(event) {
            InputClass._mouseMove = false;
        });

        //*******************************
        //  Get clicks count
        //*******************************
        canvas.addEventListener("click", function(event) {
            InputClass.clickCount++;
            InputClass.lastClick.x = InputClass.mouseX;
            InputClass.lastClick.y = InputClass.mouseY;
            //*****************************************************************DEBUG***********************************************
            // show(InputClass.lastClick.x + " " + InputClass.lastClick.y);
        });
    },

    resetClicks: function() {
        this.clickCount = 0;
        this.lastClick = new Vector();
    }
};

/*************************************************************************************
                                Graphics Class

                             Created By Andy Zhou

    Overview:
    
    Responsible for drawing the scene, including background, barriers, sprite, 
    .etc.

*************************************************************************************/

"use strict";


//***************************
//  Static Graphics Context
//***************************
var GraphicsContext = {
    //  Get reference to the canvas
    canvas: document.getElementById("canvas"),

    //  Get reference to the canvas context
    canvasCtx: canvas.getContext("2d"),

    //******************************
    //  Returne the size of canvas
    //******************************
    width: function() {
        return this.canvas.width;
    },
    height: function() {
        return this.canvas.height;
    },

    //***************************
    //  Clear the whole canvas
    //***************************
    clearCanvas: function() {
        this.canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    },

    //************************************************
    //  HTML5 Canvas intrinsic functions wrap-ups
    //************************************************
    drawImage: function(imgFrames, x, y, width, height) {
        return this.canvasCtx.drawImage(imgFrames, x, y, width, height);

    },

    drawCircle: function(circle, color) {
        this.canvasCtx.beginPath();
        this.canvasCtx.arc(circle.center.x, circle.center.y, circle.r, 0, Math.PI * 2);
        this.canvasCtx.fillStyle = color;
        this.canvasCtx.fill();
    },

    drawPolygon: function(poly, color) {
        this.canvasCtx.fillStyle = color;
        this.canvasCtx.beginPath();
        for (var i = 0; i < poly.points.length; i++) {
            if (i === 0) {
                this.canvasCtx.moveTo(poly.points[i].x, poly.points[i].y);
            }
            this.canvasCtx.lineTo(poly.points[i].x, poly.points[i].y);
            if (i === poly.points.length - 1) {
                this.canvasCtx.lineTo(poly.points[poly.points.length - 1].x,
                    poly.points[poly.points.length - 1].y);
            }
        }
        this.canvasCtx.fill();
        this.canvasCtx.closePath();
    },

    translate: function(x, y) {
        return this.canvasCtx.translate(x, y);
    },

    rotate: function(angle) {
        return this.canvasCtx.rotate(angle);
    },

    scale: function(x, y) {
        return this.canvasCtx.scale(x, y);
    },

    transfrom: function(a, b, c, d, e, f) {
        return this.canvasCtx.transfrom(a, b, c, d, e, f);
    },

    save: function() {
        return this.canvasCtx.save();
    },

    restore: function() {
        return this.canvasCtx.restore();
    },

    setGlobalComposition: function(type) {
        this.canvasCtx.globalCompositeOperation = type;
    }
};

var UIClass = {
    //*******************************************
    //  Show the pause scene, 
    //  i.e. the line of word "Click to start" 
    //  and the dark background
    //*******************************************
    _showDarkBackground: function(){
        GraphicsContext.canvasCtx.fillStyle = "rgba(0, 0, 0, 0.7)";
        GraphicsContext.canvasCtx.fillRect(0, 0, GraphicsContext.width(), GraphicsContext.height());
    },
    _showText: function(font, baseline, align, style, text, width, height){
        GraphicsContext.canvasCtx.font = font;
        GraphicsContext.canvasCtx.textBaseline = baseline;
        GraphicsContext.canvasCtx.textAlign = align;
        GraphicsContext.canvasCtx.fillStyle = style;
        GraphicsContext.canvasCtx.fillText(
            text,
            width,
            height);
    },
    showPauseScene: function() {
        GraphicsContext.save();
        this._showDarkBackground();
        this._showText(
            "bolder 84px Roboto",
            "middle",
            "center",
            "white",
            "Click to Start",
            GraphicsContext.width() * 0.5,
            GraphicsContext.height() * 0.5);
        GraphicsContext.restore();
    },
    showLoadingScene: function(){
        GraphicsContext.save();
        this._showDarkBackground();
        this._showText(
            "bolder 84px Roboto",
            "middle",
            "center",
            "white",
            "Loading...",
            GraphicsContext.width() * 0.5,
            GraphicsContext.height() * 0.5);
        GraphicsContext.restore();
    },
    showGameRecord: function(record, high){
        GraphicsContext.save();

        //*********************************
        //  Show current real-time record
        //*********************************
        this._showText(
            "bolder 36px Roboto",
            "top",
            "end",
            "white",
            record,
            GraphicsContext.width() * 0.95,
            GraphicsContext.height() * 0.05);

        //*********************************
        //  Show the highest record
        //*********************************
        this._showText(
            "bolder 36px Roboto",
            "top",
            "start",
            "white",
            "Highest: " + high,
            GraphicsContext.width() * 0.05,
            GraphicsContext.height() * 0.05);
        GraphicsContext.restore();
    },
    showRestartScene: function(high){
        GraphicsContext.save();
        this._showDarkBackground();
        this._showText(
            "bolder 48px Roboto",
            "bottom",
            "center",
            "white",
            "Highest: " + high,
            GraphicsContext.width() * 0.5,
            GraphicsContext.height() * 0.4);
        this._showText(
            "bolder 84px Roboto",
            "top",
            "center",
            "white",
            "Click to Restart",
            GraphicsContext.width() * 0.5,
            GraphicsContext.height() * 0.4);
        GraphicsContext.restore();
    }
};

/**********************************************************************************************
                                    Game Play Objects
                                
                                    Created By Andy

    Overview:
    General game object class containing all information necessary

***********************************************************************************************/

//*************************************
//  Check if all images are loaded
//*************************************
var ImageLoading = {
    _imageNum: 0,
    _imageLoaded: 0,
    isDone: function(){
        return this._imageLoaded === this._imageNum;
    },
    addNum: function(){
        this._imageNum++;
    },
    addLoaded: function(){
        this._imageLoaded++;
    }
};



//************************
//  General Image Object
//************************
var ImageObject = function(x, y, width, height, poly) {

    //************************
    //  Image Object Images
    //************************
    this.imgFrames = [];
    this.imgIndex = 0;
    this.thisImgFrame = this.imgFrames[this.imgIndex];

    //**************************
    //  Top left Coordinates
    //**************************
    this.x = x || 0;
    this.y = y || 0;

    //****************
    //  Size
    //****************
    this.width = width || 0;
    this.height = height || 0;

    //*******************
    //  Object bounding
    //*******************
    this.bounding = poly || null;

    //****************************
    //  Accelerations
    //****************************
    this.ax = 0;
    this.ay = 0;

    //***********************************
    //  Rotation angle and delta angle
    //***********************************
    this.r = 0;
    this.dr = 0;

    //********************
    //  Object used flag
    //********************
    this.used = false;

    //  Misc flags
    this.flags = [];
};

//***********************************************
//  Add image frame as animation
//***********************************************
ImageObject.prototype.addImageFrame = function(url) {
    ImageLoading.addNum();
    var tmpImg = new Image();
    tmpImg.src = url;
    this.imgFrames.push(tmpImg);
    tmpImg.addEventListener("load", function(){
        ImageLoading.addLoaded();
    });
};

//*****************************************************
//  Update the Image Object's coordinates and facing angle
//*****************************************************
ImageObject.prototype.update = function(angle, ax, ay) {
    this.x += ax;
    this.y += ay;
    this.imgIndex = (this.imgIndex + 1) % this.imgFrames.length;
    this.thisImgFrame = this.imgFrames[this.imgIndex];
    GraphicsContext.save();
    GraphicsContext.translate(this.getCenterX(), this.getCenterY());
    GraphicsContext.rotate(angle);
    GraphicsContext.translate(-this.getCenterX(), -this.getCenterY());
    if (this.bounding !== null && this.bounding !== undefined){
        this.bounding.clearRotation();
        this.bounding.rotate(-angle * (180 / Math.PI));
        this.bounding.translate(ax, ay);
    }
};

//***********************
//  Draw the Image Object
//***********************
ImageObject.prototype.draw = function() {
    GraphicsContext.drawImage(this.thisImgFrame, this.x, this.y, this.width, this.height);
    GraphicsContext.restore();
};

//**************************************
//  Get Image Object's center coordinates
//**************************************
ImageObject.prototype.getCenterX = function() {
    return this.x + this.width / 2;
};
ImageObject.prototype.getCenterY = function() {
    return this.y + this.height / 2;
};

//**********************************************************
//  Reset the flag and position of the Image Object
//**********************************************************
ImageObject.prototype.resetFlagAndPos = function(x, y){
    this.used = false;
    this.setX(x);
    this.setY(y);
    this.r = 0;
    this.ax = 0;
    this.ay = 0;
};

//**********************************************************
//  Set the coordinates of Image Object
//**********************************************************
ImageObject.prototype.setX = function(x){
    this.x = x;
    if (this.bounding !== null){
        this.bounding.clearRotation();  //  In order to translate uniformly with the Image
        this.bounding.translate(-this.bounding.box.points[0].x, 0);
        this.bounding.translate(x, 0);
    }
};
ImageObject.prototype.setY = function(y){
    this.y = y;
    if (this.bounding !== null){
        this.bounding.clearRotation();  //  In order to translate uniformly with the Image
        this.bounding.translate(0, -this.bounding.box.points[0].y);
        this.bounding.translate(0, y);
    }
};

/***********************************************************************************************
                                        Barrier Generator

                                        Created By Andy

    Overview:
    Barrier generator based on game record and game time

***********************************************************************************************/

var BarrierGenerator = {
    _record: 0,
    _level: 0,
    _lastBarrier: null,
    _lastBarrierIndex: null,
    _lastBarrierIssueTime: 0,
    _gapFromLastBarrier: 0, //  Counting from the top left pos
    _setRandSpeedAndRotation: function(barrier, ax, flags) {
        barrier.ax = ax * (1 + Math.random());
        barrier.ay = ax * (Math.random() * 0.5) * Utility.getPosiOrNega();
        barrier.r = Math.random() * 10;
        barrier.dr = Math.random() * Math.random() * 0.05;

        //***********************************************
        //  Check flags and disable certain attributes
        //***********************************************
        for (var i = 0; i < flags.length; i++) {
            switch (flags[i]) {
                case "No Rotation":
                    barrier.r = 0;
                    barrier.dr = 0;
                    break;
                case "No Y Acceleration":
                    barrier.ay = 0;
                    break;
                case "No X Acceleration":
                    barrier.ax = 0;
                    break;
            }
        }
    },
    _getRandY: function() {
        var randY = (Math.random() * 528314 * Math.random()) % GraphicsContext.height();
        if (this._lastBarrier !== null) {
            var lower = this._lastBarrier.y - this._lastBarrier.height;
            var upper = this._lastBarrier.y + this._lastBarrier.heigtt;
            while (randY >= lower && randY <= upper) {
                randY = (Math.random() * 528314 * Math.random()) % GraphicsContext.height();
            }
        }
        return randY;
    },
    _getRandGapFromLast: function() {
        var HARDNESS = 5000;
        var randGap = 0;
        if (this._lastBarrier !== null) {
            var base = this._lastBarrier.width;
            var levelDevider = this._level;
            randGap = base + Math.random() * HARDNESS / levelDevider;
        }
        return randGap;
    },
    setLevel: function(record) {
        //************************************************
        //  Caluculate level based on certain points
        //************************************************
        var points = 10000;

        this._level = parseInt(record / points) === 0 ? 1 : record / points;
    },
    getThisBarrier: function(time, ax) {

        if (this._lastBarrier !== null) { //    Check if it's the first barrier issued
            var deltaTime = time - this._lastBarrierIssueTime;
            if (deltaTime * Math.abs(ax) <= this._gapFromLastBarrier) {
                return null;
            }
        }
        //******************************************************
        //  Get a barrier unused and different from last one
        //******************************************************
        var thisBarrierIndex = Utility.getRandIndex(barriersList.length);
        if (thisBarrierIndex === this._lastBarrierIndex ||
            barriersList[thisBarrierIndex].used) {
            return null;
        }
        var thisBarrier = barriersList[thisBarrierIndex];
        thisBarrier.used = true;

        this._setRandSpeedAndRotation(thisBarrier, ax, thisBarrier.flags);

        thisBarrier.setY(this._getRandY());
        this._gapFromLastBarrier = this._getRandGapFromLast();

        this._lastBarrier = thisBarrier;
        this._lastBarrierIndex = thisBarrierIndex;
        this._lastBarrierIssueTime = time;

        return thisBarrier;
    },
    reset: function() {
        this._record = 0;
        this._level = 0;
        this._lastBarrier = null;
        this._lastBarrierIndex = null;
        this._lastBarrierIssueTime = 0;
        this._gapFromLastBarrier = 0; //  Counting from the top left pos
    }
};

/**********************************************************************************
                                    
                                    Game Play Barriers

                                    Created By Andy

    Overview:
    Barrier objects declarations
                                
***********************************************************************************/

//  Starting top left position for barriers
var barriersStartingTopLeftPos = new Vector(GraphicsContext.width() + 1, 0);

//  Finish loading flag
var barriersCount = 11;
var BarrierLoading = {
    isDone: function() {
        if (barriersList.length === barriersCount) {
            return true;
        }
        return false;
    }
};


//********************************
//  Barriers list
//********************************
var barriersList = [];

//********************************
//  Barrier: Rock 1
//********************************
var barrierWidth = 65,
    barrierHeight = 85,
    barrierBoundingPoints = [
        new Vector(4, 21),
        new Vector(20, 1),
        new Vector(28, 0),
        new Vector(39, 10),
        new Vector(59, 26),
        new Vector(64, 45),
        new Vector(57, 64),
        new Vector(53, 66),
        new Vector(52, 74),
        new Vector(48, 76),
        new Vector(36, 74),
        new Vector(25, 83),
        new Vector(12, 81),
        new Vector(0, 58),
        new Vector(2, 42)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(barriersStartingTopLeftPos.x, 0);
}

var barrierBoundingBox = new Box(
        barriersStartingTopLeftPos,
        barrierWidth,
        barrierHeight),

    barrierBounding = new Polygon(
        barrierBoundingPoints,
        barriersStartingTopLeftPos,
        barrierBoundingBox),

    barrierFrames = ["https://farm8.staticflickr.com/7731/26555058860_9e6035e3ca_o.png"],

    barrier = new ImageObject(
        barriersStartingTopLeftPos.x,
        barriersStartingTopLeftPos.y,
        barrierWidth,
        barrierHeight,
        barrierBounding);
barrier.flags = [];

for (var i = 0; i < barrierFrames.length; i++) {
    barrier.addImageFrame(barrierFrames[i]);
}




barriersList.push(barrier);

//********************************
//  Barrier: Earth
//********************************
barrierWidth = 200;
barrierHeight = 200;
barrierBoundingPoints = [
    new Vector(97, 4),
    new Vector(140, 13),
    new Vector(179, 43),
    new Vector(198, 98),
    new Vector(185, 144),
    new Vector(151, 183),
    new Vector(97, 197),
    new Vector(49, 184),
    new Vector(22, 162),
    new Vector(3, 106),
    new Vector(9, 60),
    new Vector(40, 25)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(barriersStartingTopLeftPos.x, 0);
}

barrierBoundingBox = new Box(
    barriersStartingTopLeftPos,
    barrierWidth,
    barrierHeight);

barrierBounding = new Polygon(
    barrierBoundingPoints,
    barriersStartingTopLeftPos,
    barrierBoundingBox);

barrierFrames = ["https://farm8.staticflickr.com/7266/26793431536_4a961e12cd_o.png"];

barrier = new ImageObject(
    barriersStartingTopLeftPos.x,
    barriersStartingTopLeftPos.y,
    barrierWidth,
    barrierHeight,
    barrierBounding);
barrier.flags = [];

for (var i = 0; i < barrierFrames.length; i++) {
    barrier.addImageFrame(barrierFrames[i]);
}

barriersList.push(barrier);

//********************************
//  Barrier: Moon
//********************************
barrierWidth = 100;
barrierHeight = 100;
barrierBoundingPoints = [
    new Vector(48, 0),
    new Vector(71, 6),
    new Vector(93, 26),
    new Vector(100, 49),
    new Vector(93, 75),
    new Vector(77, 91),
    new Vector(50, 98),
    new Vector(25, 91),
    new Vector(10, 80),
    new Vector(0, 52),
    new Vector(8, 25),
    new Vector(19, 10)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(barriersStartingTopLeftPos.x, 0);
}

barrierBoundingBox = new Box(
    barriersStartingTopLeftPos,
    barrierWidth,
    barrierHeight);

barrierBounding = new Polygon(
    barrierBoundingPoints,
    barriersStartingTopLeftPos,
    barrierBoundingBox);

barrierFrames = ["https://farm8.staticflickr.com/7624/26223204943_6290653216_o.png"];

barrier = new ImageObject(
    barriersStartingTopLeftPos.x,
    barriersStartingTopLeftPos.y,
    barrierWidth,
    barrierHeight,
    barrierBounding);
barrier.flags = [];

for (var i = 0; i < barrierFrames.length; i++) {
    barrier.addImageFrame(barrierFrames[i]);
}

barriersList.push(barrier);
//********************************
//  Barrier: Plastic bag
//********************************
barrierWidth = 150;
barrierHeight = 172;
barrierBoundingPoints = [
    new Vector(69, 1),
    new Vector(75, 1),
    new Vector(74, 12),
    new Vector(78, 44),
    new Vector(100, 60),
    new Vector(128, 51),
    new Vector(136, 47),
    new Vector(149, 57),
    new Vector(144, 75),
    new Vector(103, 120),
    new Vector(96, 141),
    new Vector(67, 171),
    new Vector(12, 126),
    new Vector(0, 107),
    new Vector(7, 103),
    new Vector(29, 98),
    new Vector(48, 70),
    new Vector(48, 65),
    new Vector(45, 55),
    new Vector(49, 30),
    new Vector(55, 10)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(barriersStartingTopLeftPos.x, 0);
}

barrierBoundingBox = new Box(
    barriersStartingTopLeftPos,
    barrierWidth,
    barrierHeight);

barrierBounding = new Polygon(
    barrierBoundingPoints,
    barriersStartingTopLeftPos,
    barrierBoundingBox);

barrierFrames = ["https://farm8.staticflickr.com/7630/26555058940_f082f28dd5_o.png"];

barrier = new ImageObject(
    barriersStartingTopLeftPos.x,
    barriersStartingTopLeftPos.y,
    barrierWidth,
    barrierHeight,
    barrierBounding);
barrier.flags = [];

for (var i = 0; i < barrierFrames.length; i++) {
    barrier.addImageFrame(barrierFrames[i]);
}

barriersList.push(barrier);
//********************************
//  Barrier: Spaceship
//********************************
barrierWidth = 180;
barrierHeight = 70;

barrierBoundingPoints = [
new Vector(2, 35),
new Vector(18, 34),
new Vector(49, 21),
new Vector(86, 17),
new Vector(113, 6),
new Vector(132, 1),
new Vector(175, 0),
new Vector(135, 11),
new Vector(122, 16),
new Vector(141, 19),
new Vector(140, 25),
new Vector(155, 25),
new Vector(156, 40),
new Vector(142, 41),
new Vector(141, 47),
new Vector(121, 51),
new Vector(136, 57),
new Vector(175, 70),
new Vector(115, 66),
new Vector(86, 52),
new Vector(64, 52),
new Vector(19, 35)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(barriersStartingTopLeftPos.x, 0);
}

barrierBoundingBox = new Box(
    barriersStartingTopLeftPos,
    barrierWidth,
    barrierHeight);

barrierBounding = new Polygon(
    barrierBoundingPoints,
    barriersStartingTopLeftPos,
    barrierBoundingBox);

barrierFrames = ["https://farm8.staticflickr.com/7475/26223204823_d5176e114e_o.png"];

barrier = new ImageObject(
    barriersStartingTopLeftPos.x,
    barriersStartingTopLeftPos.y,
    barrierWidth,
    barrierHeight,
    barrierBounding);
barrier.flags = [];

for (var i = 0; i < barrierFrames.length; i++) {
    barrier.addImageFrame(barrierFrames[i]);
}

barrier.flags = ["No Rotation", "No Y Acceleration"];

barriersList.push(barrier);
//********************************
//  Barrier: Spaceship
//********************************
barrierWidth = 100;
barrierHeight = 40;

barrierBoundingPoints = [
new Vector(28, 13),
new Vector(34, 5),
new Vector(44, 1),
new Vector(55, 0),
new Vector(65, 5),
new Vector(80, 3),
new Vector(98, 8),
new Vector(81, 18),
new Vector(77, 25),
new Vector(70, 30),
new Vector(55, 37),
new Vector(36, 39),
new Vector(30, 39),
new Vector(27, 37),
new Vector(9, 38),
new Vector(12, 23)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(barriersStartingTopLeftPos.x, 0);
}

barrierBoundingBox = new Box(
    barriersStartingTopLeftPos,
    barrierWidth,
    barrierHeight);

barrierBounding = new Polygon(
    barrierBoundingPoints,
    barriersStartingTopLeftPos,
    barrierBoundingBox);

barrierFrames = ["https://farm8.staticflickr.com/7107/26793431736_306b7bcc20_o.png"];

barrier = new ImageObject(
    barriersStartingTopLeftPos.x,
    barriersStartingTopLeftPos.y,
    barrierWidth,
    barrierHeight,
    barrierBounding);
barrier.flags = [];

for (var i = 0; i < barrierFrames.length; i++) {
    barrier.addImageFrame(barrierFrames[i]);
}

barrier.flags = ["No Rotation"];
barriersList.push(barrier);
//********************************
//  Barrier: Slipper
//********************************
barrierWidth = 70;
barrierHeight = 32;

barrierBoundingPoints = [
    new Vector(8, 0),
    new Vector(25, 6),
    new Vector(40, 2),
    new Vector(54, 10),
    new Vector(58, 18),
    new Vector(69, 23),
    new Vector(67, 29),
    new Vector(45, 29),
    new Vector(16, 19),
    new Vector(2, 12),
    new Vector(1, 3)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(barriersStartingTopLeftPos.x, 0);
}

barrierBoundingBox = new Box(
    barriersStartingTopLeftPos,
    barrierWidth,
    barrierHeight);

barrierBounding = new Polygon(
    barrierBoundingPoints,
    barriersStartingTopLeftPos,
    barrierBoundingBox);

barrierFrames = ["https://farm8.staticflickr.com/7036/26555058920_96923d71b1_o.png"];

barrier = new ImageObject(
    barriersStartingTopLeftPos.x,
    barriersStartingTopLeftPos.y,
    barrierWidth,
    barrierHeight,
    barrierBounding);
barrier.flags = [];

for (var i = 0; i < barrierFrames.length; i++) {
    barrier.addImageFrame(barrierFrames[i]);
}

barriersList.push(barrier);
//********************************
//  Barrier: Bottle
//********************************

barrierWidth = 40;
barrierHeight = 149;
barrierBoundingPoints = [
    new Vector(26, 3),
    new Vector(31, 56),
    new Vector(37, 64),
    new Vector(38, 145),
    new Vector(2, 145),
    new Vector(2, 67),
    new Vector(9, 55),
    new Vector(13, 0)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(barriersStartingTopLeftPos.x, 0);
}

barrierBoundingBox = new Box(
    barriersStartingTopLeftPos,
    barrierWidth,
    barrierHeight);

barrierBounding = new Polygon(
    barrierBoundingPoints,
    barriersStartingTopLeftPos,
    barrierBoundingBox);

barrierFrames = ["https://farm8.staticflickr.com/7100/26793431636_6148f8e47a_o.png"];

barrier = new ImageObject(
    barriersStartingTopLeftPos.x,
    barriersStartingTopLeftPos.y,
    barrierWidth,
    barrierHeight,
    barrierBounding);
barrier.flags = [];

for (var i = 0; i < barrierFrames.length; i++) {
    barrier.addImageFrame(barrierFrames[i]);
}

barriersList.push(barrier);
//********************************
//  Barrier: Black hole
//********************************

barrierWidth = 100;
barrierHeight = 100;
barrierBoundingPoints = [
    new Vector(50, 12),
    new Vector(65, 13),
    new Vector(83, 29),
    new Vector(89, 54),
    new Vector(80, 71),
    new Vector(65, 83),
    new Vector(51, 88),
    new Vector(33, 83),
    new Vector(18, 72),
    new Vector(11, 52),
    new Vector(17, 32),
    new Vector(31, 18)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(barriersStartingTopLeftPos.x, 0);
}

barrierBoundingBox = new Box(
    barriersStartingTopLeftPos,
    barrierWidth,
    barrierHeight);

barrierBounding = new Polygon(
    barrierBoundingPoints,
    barriersStartingTopLeftPos,
    barrierBoundingBox);

barrierFrames = ["https://farm8.staticflickr.com/7472/26223204563_7d83da38ae_o.png"];

barrier = new ImageObject(
    barriersStartingTopLeftPos.x,
    barriersStartingTopLeftPos.y,
    barrierWidth,
    barrierHeight,
    barrierBounding);
barrier.flags = [];

for (var i = 0; i < barrierFrames.length; i++) {
    barrier.addImageFrame(barrierFrames[i]);
}

barriersList.push(barrier);

//********************************
//  Barrier: Rock 1
//********************************
barrierWidth = 135;
barrierHeight = 87;
barrierBoundingPoints = [
    new Vector(33, 24),
    new Vector(59, 9),
    new Vector(74, 2),
    new Vector(134, 47),
    new Vector(128, 65),
    new Vector(102, 82),
    new Vector(70, 82),
    new Vector(56, 87),
    new Vector(32, 72),
    new Vector(9, 69),
    new Vector(1, 60),
    new Vector(17, 44),
    new Vector(20, 35),
    new Vector(27, 35)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(barriersStartingTopLeftPos.x, 0);
}

barrierBoundingBox = new Box(
    barriersStartingTopLeftPos,
    barrierWidth,
    barrierHeight);

barrierBounding = new Polygon(
    barrierBoundingPoints,
    barriersStartingTopLeftPos,
    barrierBoundingBox);

barrierFrames = ["https://farm8.staticflickr.com/7344/26793432086_2ecd2bb3bd_o.png"];

barrier = new ImageObject(
    barriersStartingTopLeftPos.x,
    barriersStartingTopLeftPos.y,
    barrierWidth,
    barrierHeight,
    barrierBounding);
barrier.flags = [];

for (var i = 0; i < barrierFrames.length; i++) {
    barrier.addImageFrame(barrierFrames[i]);
}

barriersList.push(barrier);

//********************************
//  Barrier: Rock 1
//********************************
barrierWidth = 135;
barrierHeight = 87;
barrierBoundingPoints = [
    new Vector(33, 24),
    new Vector(59, 9),
    new Vector(74, 2),
    new Vector(134, 47),
    new Vector(128, 65),
    new Vector(102, 82),
    new Vector(70, 82),
    new Vector(56, 87),
    new Vector(32, 72),
    new Vector(9, 69),
    new Vector(1, 60),
    new Vector(17, 44),
    new Vector(20, 35),
    new Vector(27, 35)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(barriersStartingTopLeftPos.x, 0);
}

barrierBoundingBox = new Box(
    barriersStartingTopLeftPos,
    barrierWidth,
    barrierHeight);

barrierBounding = new Polygon(
    barrierBoundingPoints,
    barriersStartingTopLeftPos,
    barrierBoundingBox);

barrierFrames = ["https://farm8.staticflickr.com/7344/26793432086_2ecd2bb3bd_o.png"];

barrier = new ImageObject(
    barriersStartingTopLeftPos.x,
    barriersStartingTopLeftPos.y,
    barrierWidth,
    barrierHeight,
    barrierBounding);
barrier.flags = [];

for (var i = 0; i < barrierFrames.length; i++) {
    barrier.addImageFrame(barrierFrames[i]);
}

barriersList.push(barrier);


/*************************************************************************************
                                ESL Suite Rocket Adventure Game

                                Created By Andy Zhou

*************************************************************************************/

"use strict";

//  Game run count
var gameRunCount = 0;

//  Start to listen to the user input
InputClass.listen();

var isStop = true, //   Game loop start and pause flag

    mouseX, mouseY; //  Mouse position

//******************************
//  Game background objects
//******************************
var gameSkyWidth = 1257,
    gameSkyHeight = 400,
    backSkyPosX = gameSkyWidth - 27,

    gameSkys = [
    new ImageObject(
            0,
            0,
            gameSkyWidth,
            gameSkyHeight),

    new ImageObject(
            backSkyPosX, // Fix the border gap
            0,
            gameSkyWidth,
            gameSkyHeight)],

    frontSky = gameSkys[0], //  Front Sky background for alternating
    backSky = gameSkys[1]; //   Back Sky background for alternating


frontSky.addImageFrame("https://farm8.staticflickr.com/7335/26222395434_cc56e0f39d_o.jpg");
backSky.addImageFrame("https://farm8.staticflickr.com/7335/26222395434_cc56e0f39d_o.jpg");

//******************************
//  Game sprite
//******************************
var spriteWidth = 220,
    spriteHeight = 80,
    spriteTopLeftPos = new Vector(GraphicsContext.width() * 0.05, 0), //    Position at the x% of the canvas width
    spriteCenterY,
    spriteCenterX,
    spriteAngle = 0, // Angle between the direction the sprite is point at and the x axis
    spriteAy = 0, //    Vertical acceleration 
    spriteAyCoef = 3.3, //  Acceleration coefficient, used to scale up or down the acceleration

    spriteBoundingPoints = [
                    new Vector(91, 11),
                    new Vector(119, 8),
                    new Vector(133, 21),
                    new Vector(172, 21),
                    new Vector(204, 22),
                    new Vector(221, 27),
                    new Vector(236, 39),
                    new Vector(223, 51),
                    new Vector(207, 58),
                    new Vector(168, 59),
                    new Vector(134, 59),
                    new Vector(120, 71),
                    new Vector(91, 69),
                    new Vector(107, 57),
                    new Vector(105, 24)
    ],
    spriteBoundingBox = new Box(spriteTopLeftPos, spriteWidth, spriteHeight),
    spriteBounding = new Polygon(spriteBoundingPoints, spriteTopLeftPos, spriteBoundingBox),

    gameSprite = new ImageObject(
        spriteTopLeftPos.x,
        spriteTopLeftPos.y,
        spriteWidth,
        spriteHeight,
        spriteBounding),

    spriteFrames = [ // Use to compose sprite animation
    "https://farm8.staticflickr.com/7283/26793419686_c3a4739e92_o.png",
    "https://farm8.staticflickr.com/7435/26734072542_6a893f327c_o.png",
    "https://farm8.staticflickr.com/7672/26734072482_ab7ce58450_o.png",
    "https://farm8.staticflickr.com/7128/26793419486_e3f075d25d_o.png",
    "https://farm8.staticflickr.com/7672/26734072482_ab7ce58450_o.png",
    "https://farm8.staticflickr.com/7435/26734072542_6a893f327c_o.png",
    "https://farm8.staticflickr.com/7283/26793419686_c3a4739e92_o.png"];

for (var i = 0; i < spriteFrames.length; i++) { //  Add frames to the sprite
    gameSprite.addImageFrame(spriteFrames[i]);
}

//*********************************************
//  Global Game Objects parameters
//*********************************************
var g_GameObjectAx = -1,
    g_GameObjectAxDelta = 0.00001;

//**************************
//  Game Record and time
//**************************
var gameRecord = 0,
    gameRecordCoef = 0.8,
    highestGameRecord = 0,
    gameTime = 0;

//  Barriers on the screen
var barriersVisible = [];

//**************************
//  EngineMain Object
//**************************
var EngineMain = {
    restart: function() {
        isStop = true;
        InputClass.resetClicks();
        g_GameObjectAx = -1;
        g_GameObjectAxDelta = 0.00001;

        if (gameRecord > highestGameRecord) {
            highestGameRecord = gameRecord; //  Store the highest record
        }

        gameRecord = 0;
        gameRecordCoef = 0.5;
        gameTime = 0;

        for (var i = 0; i < barriersVisible.length; i++) {
            barriersVisible[i].resetFlagAndPos(GraphicsContext.width(), 0);
        }
        barriersVisible = [];

        Timer.stop();

        BarrierGenerator.reset();
    }
};

//***********************************************************************
//                              Main game loop
//  Use window.setInterval() in order not to hang the main UI thread 
//***********************************************************************
var MainGameLoop = setInterval(function() {
    //********************************
    //  Check if the user click start
    //********************************
    if (InputClass.clickCount != 0) {
        isStop = false;
    }
    //  Clear all
    GraphicsContext.clearCanvas();

    //***************************
    //  Get mouse position
    //***************************
    mouseX = InputClass.mouseX;
    mouseY = InputClass.mouseY;

    //*******************************
    //  Show basic game scene
    //*******************************
    spriteCenterY = gameSprite.getCenterY();
    spriteCenterX = gameSprite.getCenterX();

    if (mouseY != spriteCenterY) {
        spriteAy = (mouseY - spriteCenterY) * spriteAyCoef / GraphicsContext.height();
    }

    //  Increase the control sensitivity with time
    spriteAy += g_GameObjectAxDelta;

    spriteAngle = (Math.atan((mouseY - spriteCenterY) / (mouseX - spriteCenterX)) * (180 / Math.PI)) * 0.025;

    //*************************************************************************DEBUG*******************************************
    // showText(spriteAngle);

    gameSprite.update(spriteAngle, 0, spriteAy);
    gameSprite.draw();

    //****************************************************************DEBUG****************************************
    // GraphicsContext.drawPolygon(gameSprite.bounding, "blue");

    //  The drawing below this line will be drawn under whatever is on the canvas
    GraphicsContext.setGlobalComposition("destination-over");

    //**********************************************
    //  Alternate between front and back sky images
    //**********************************************
    frontSky.update(0, g_GameObjectAx, 0);
    frontSky.draw();
    backSky.update(0, g_GameObjectAx, 0);
    backSky.draw();
    if (backSky.x <= 0) { //    Swap front and back sky images
        var tmp = frontSky;
        frontSky = backSky;
        backSky = tmp;
        backSky.x = backSkyPosX;
    }

    //  The drawing below this line will be drawn on top of whatever is on the canvas
    GraphicsContext.setGlobalComposition("source-over");

    //*************************************
    //  Pause or show main game process
    //*************************************

    if (!BarrierLoading.isDone() ||
        !ImageLoading.isDone()) {
        //  Show loading scene
        UIClass.showLoadingScene();
    } else {
        if (isStop) {
            if (gameRunCount === 0) {
                UIClass.showPauseScene(); //    Show pause scene
            } else {
                UIClass.showRestartScene(highestGameRecord);
            }
        } else {
            //*************************************
            //  Show main game process
            //*************************************
            if (!Timer.isRunning()) { //    If the Timer is not started, start the counting
                Timer.start(); //   Timer only start once
                gameRunCount++; //  Game run count add one
            }

            //********************************
            //  Compute time and game record
            //********************************
            gameTime = Timer.totalTime();
            gameRecord = parseInt(gameTime * gameRecordCoef);

            //  Increase the game objects speed
            g_GameObjectAx -= g_GameObjectAxDelta;

            //******************************************
            //  Show barriers based on record
            //******************************************
            BarrierGenerator.setLevel(gameRecord);
            var thisBarrier = BarrierGenerator.getThisBarrier(gameTime, g_GameObjectAx);
            if (thisBarrier !== null) {
                barriersVisible.push(thisBarrier); //   If next barrier is available, push to the visible barriers array
            }

            for (var i = 0; i < barriersVisible.length; i++) {
                if (barriersVisible[i].x + barriersVisible[i].width < 0) {
                    barriersVisible[i].resetFlagAndPos(GraphicsContext.width(), 0);
                    barriersVisible.splice(i, 1);
                }
                barriersVisible[i].r += barriersVisible[i].dr; //   Update rotation of the barrier
                barriersVisible[i].update(
                    barriersVisible[i].r,
                    barriersVisible[i].ax,
                    barriersVisible[i].ay);
                barriersVisible[i].draw();
                if (barriersVisible[i].x <= gameSprite.x + gameSprite.width) { //   If barrier top left x smaller than the sprite right x
                    //**************************************
                    //  If collided then restart the game
                    //**************************************
                    if (colliDetect.detect(gameSprite.bounding, barriersVisible[i].bounding)) {
                        EngineMain.restart();
                    }
                }
                //****************************************************************DEBUG****************************************
                // GraphicsContext.drawPolygon(barriersVisible[i].bounding, "blue");
            }

            //***********************************************************
            //  Show game record at the top right corner of the canvas
            //  and the highest record at the top left corner
            //***********************************************************
            UIClass.showGameRecord(gameRecord, highestGameRecord);
        }
    }
}, 1);

