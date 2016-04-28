/*************************************************************************************
								Graphics Class

							 Created By Andy Zhou

	Overview:
	
	Responsible for drawing the scene, including background, barriers, sprite, 
	.etc.

*************************************************************************************/

"use strict";

var GraphicsContext = {
	//	Get reference to the canvas
	canvas : document.getElementById("canvas"),

	//	Get reference to the canvas context
	canvasCtx : canvas.getContext("2d"),

	//***************************
	//	Clear the whole canvas
	//***************************
	clearCanvas : function(){
		GraphicsContext.canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
	},

	//*******************************************
	//	HTML5 Canvas functions wrap-ups
	//*******************************************
	drawImg : function(url, x, y, width, height){
		var img = new Image();
		img.src = url;
		img.onload = function(){
			GraphicsContext.canvasCtx.drawImage(img, x, y, width, height);
		};
	},

	drawCircle : function(x, y, r, color){
		GraphicsContext.canvasCtx.save();
		GraphicsContext.canvasCtx.beginPath();
		GraphicsContext.canvasCtx.arc(x, y, r, 0, Math.PI * 2);
		GraphicsContext.canvasCtx.fillStyle = color;
		GraphicsContext.canvasCtx.fill();
		GraphicsContext.canvasCtx.restore();
	},

	drawRect : function(x, y, width, height, color){
		GraphicsContext.canvasCtx.save();
		GraphicsContext.canvasCtx.fillStyle = color;
		GraphicsContext.canvasCtx.fillRect(x, y, width, height);
		GraphicsContext.canvasCtx.restore();
	},

	translate : function(x, y){
		return GraphicsContext.canvasCtx.translate(x, y);
	},

	rotate : function(angle){
		return GraphicsContext.canvasCtx.rotate(angle);
	},

	scale : function(x, y){
		return GraphicsContext.canvasCtx.scale(x, y);
	},

	transfrom : function(a, b, c, d, e, f){
		return GraphicsContext.canvasCtx.transfrom(a, b, c, d, e, f);
	},

	save : function(){
		return GraphicsContext.canvasCtx.save();
	},

	restore : function(){
		return GraphicsContext.canvasCtx.restore();
	},
};

//************************************
//	Sprite Object
//************************************
var Sprite = {
	//	Sprite Image url
	url : "",

	//****************
	//	Coordinates
	//****************
	x : 0,
	y : 0,

	//****************
	//	Size
	//****************
	width : 0,
	height : 0,

	init : function(url, x, y, width, height){
		this.url = url;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	},

	update : function(x, y, angle){
		this.x = x;
		this.y = y;
		GraphicsContext.save();
		GraphicsContext.rotate(angle);
	},

	draw : function(){
		GraphicsContext.drawImg(this.url, this.x, this.y, this.width, this.height);
		GraphicsContext.restore();
	}
};

//************************************
//	Barrier Objects
//************************************
