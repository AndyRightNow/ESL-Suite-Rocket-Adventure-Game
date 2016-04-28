/*************************************************************************************
								Graphics Class

							 Created By Andy Zhou

	Overview:
	
	Responsible for drawing the scene, including background, barriers, sprite, 
	.etc.

*************************************************************************************/

"use strict";


//***************************
//	Static Graphics Context
//***************************
var GraphicsContext = {
    //	Get reference to the canvas
    canvas: document.getElementById("canvas"),

    //	Get reference to the canvas context
    canvasCtx: canvas.getContext("2d"),

    //******************************
    //	Returne the size of canvas
    //******************************
    width: function() {
        return this.canvas.width;
    },
    height: function() {
        return this.canvas.height;
    },

    //***************************
    //	Clear the whole canvas
    //***************************
    clearCanvas: function() {
        this.canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    },

    //************************************************
    //	HTML5 Canvas intrinsic functions wrap-ups
    //************************************************
    drawImage: function(imgFrames, x, y, width, height) {
        return this.canvasCtx.drawImage(imgFrames, x, y, width, height);

    },

    drawCircle: function(x, y, r, color) {
        this.canvasCtx.save();
        this.canvasCtx.beginPath();
        this.canvasCtx.arc(x, y, r, 0, Math.PI * 2);
        this.canvasCtx.fillStyle = color;
        this.canvasCtx.fill();
        this.canvasCtx.restore();
    },

    drawRect: function(x, y, width, height, color) {
        this.canvasCtx.save();
        this.canvasCtx.fillStyle = color;
        this.canvasCtx.fillRect(x, y, width, height);
        this.canvasCtx.restore();
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
//	General Game Object
//************************
var GameObject = function() {

    //************************
    //	Game Object Images
    //************************
    this.imgFrames = [];
    this.thisImgFrame = undefined;
    this.imgIndex = 0;

    //****************
    //	Coordinates
    //****************
    this.x = 0;
    this.y = 0;

    //****************
    //	Size
    //****************
    this.width = 0;
    this.height = 0;

    //********************************************************************
    //	Initialize the Game Object with top left coordinates and size
    //********************************************************************
    this.init = function(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };

    //***********************************************
    //	Add image frame as animation
    //***********************************************
    this.addImageFrame = function(url) {
        var tmpImg = new Image();
        tmpImg.src = url;
        this.imgFrames.push(tmpImg);
    };

    //*****************************************************
    //	Update the Game Object's coordinates and facing angle
    //*****************************************************
    this.update = function(x, y, angle) {
        this.x = x;
        this.y = y;
        this.thisImgFrame = this.imgFrames[this.imgIndex++ % this.imgFrames.length];
        GraphicsContext.save();
        GraphicsContext.translate(this.getCenterX(), this.getCenterY());
        GraphicsContext.rotate(angle);
        GraphicsContext.translate(-this.getCenterX(), -this.getCenterY());
    };

    //***********************
    //	Draw the Game Object
    //***********************
    this.draw = function() {
        GraphicsContext.drawImage(this.thisImgFrame, this.x, this.y, this.width, this.height);
        GraphicsContext.restore();
    };

    //**************************************
    //	Get Game Object's center coordinates
    //**************************************
    this.getCenterX = function() {
        return this.x + this.width / 2;
    };
    this.getCenterY = function() {
        return this.y + this.height / 2;
    };
};

