/*************************************************************************************
                                Graphics Class

                             Created By Andy Zhou

    Overview:

    Responsible for drawing the scene, including background, barriers, sprite,
    .etc.

*************************************************************************************/


//***************************
//  Static Graphics Context
//***************************
var GraphicsContext = {
    //  Get reference to the canvas
    _canvas: null,

    //  Get reference to the canvas context
    canvasCtx: null,

    init: function(canvasId) {
        this._canvas = document.getElementById(canvasId);

        if (this._canvas) {
            this.canvasCtx = this._canvas.getContext("2d");
        }
    },

    //******************************
    //  Returne the size of canvas
    //******************************
    width: function() {
        return this._canvas.clientWidth;
    },
    height: function() {
        return this._canvas.clientHeight;
    },

    offsetTop: function() {
        return this._canvas.offsetTop;
    },

    offsetLeft: function() {
        return this._canvas.offsetLeft;
    },

    canvas: function() {
        return this._canvas;
    },

    //***************************
    //  Clear the whole canvas
    //***************************
    clearCanvas: function() {
        this.canvasCtx.clearRect(0, 0, this.width(), this.height());
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
        this.canvasCtx.fillStyle = color;
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

module.exports = GraphicsContext;
