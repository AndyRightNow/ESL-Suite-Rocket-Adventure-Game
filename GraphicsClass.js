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

//************************
//  General Image Object
//************************
var ImageObject = function(x, y, width, height) {

    //************************
    //  Image Object Images
    //************************
    this.imgFrames = [];
    this.imgIndex = 0;
    this.thisImgFrame = this.imgFrames[this.imgIndex];

    //****************
    //  Coordinates
    //****************
    this.x = x || 0;
    this.y = y || 0;

    //****************
    //  Size
    //****************
    this.width = width || 0;
    this.height = height || 0;
};

//***********************************************
//  Add image frame as animation
//***********************************************
ImageObject.prototype.addImageFrame = function(url) {
    var tmpImg = new Image();
    tmpImg.src = url;
    this.imgFrames.push(tmpImg);
};

//*****************************************************
//  Update the Image Object's coordinates and facing angle
//*****************************************************
ImageObject.prototype.update = function(x, y, angle) {
    this.x = x;
    this.y = y;
    this.thisImgFrame = this.imgFrames[this.imgIndex++ % this.imgFrames.length];
    GraphicsContext.save();
    GraphicsContext.translate(this.getCenterX(), this.getCenterY());
    GraphicsContext.rotate(angle);
    GraphicsContext.translate(-this.getCenterX(), -this.getCenterY());
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

var UIClass = {
    //*******************************************
    //  Show the pause scene, 
    //  i.e. the line of word "Click to start" 
    //  and the gray background
    //*******************************************
    showPauseScene: function(){
        GraphicsContext.save();
        GraphicsContext.canvasCtx.fillStyle = "rgba(0, 0, 0, 0.2)";
        GraphicsContext.canvasCtx.fillRect(0, 0, GraphicsContext.width(), GraphicsContext.height());
        GraphicsContext.restore();
    },

};
