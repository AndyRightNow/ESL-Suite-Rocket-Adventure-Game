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

