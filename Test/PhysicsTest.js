/*************************************************************************************
									
									Physics Test	

*************************************************************************************/

"use strict";

//****************************
//	Physics Test Environment
//****************************    
var randColor = "rgb(" + parseInt((Math.random() * 100 * 25 + 255) % 255) + ", " + parseInt((Math.random() * 100 * 25 + 255) % 255) + ", " + parseInt((Math.random() * 100 * 25 + 255) % 255) + ")";
var x1 = 200,
    y1 = 100,
    dx1 = 0.1,
    dy1 = 0.4;
var x2 = 200,
    y2 = 200,
    dx2 = 0.3,
    dy2 = 0.5;
    var dis;
setInterval(function() {
var v1 = new Vector(x1, y1),
    v2 = new Vector(x2, y2);
    GraphicsContext.clearCanvas();
    GraphicsContext.drawCircle(x1, y1, 20, randColor);
    GraphicsContext.drawCircle(x2, y2, 20, randColor);
    x1 += dx1;
    y1 += dy1;
    x2 += dx2;
    y2 += dy2;
    if (x1 <= 20 || x1 >= GraphicsContext.width() - 20) {
        dx1 = -dx1;
    }
    if (y1 <= 20 || y1 >= GraphicsContext.height() - 20) {
        dy1 = -dy1;
    }
    if (x2 <= 20 || x2 >= GraphicsContext.width() - 20) {
        dx2 = -dx2;
    }
    if (y2 <= 20 || y2 >= GraphicsContext.height() - 20) {
        dy2 = -dy2;
    }
});

