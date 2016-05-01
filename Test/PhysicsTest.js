/*************************************************************************************
									
									Physics Test	

*************************************************************************************/

"use strict";

//*********************************
//	Get coordinates on the screen
//*********************************
InputClass.listen();
$(GraphicsContext.canvas).click(function() {
    show(InputClass.mouseX + " " + InputClass.mouseY);
});

//****************************
//	Physics Test Environment
//****************************  
function randColor() {
    return "rgb(" + parseInt((Math.random() * 100 * 25 + 255) % 255) + ", " + parseInt((Math.random() * 100 * 25 + 255) % 255) + ", " + parseInt((Math.random() * 100 * 25 + 255) % 255) + ")";

}
var x1 = 200,
    y1 = 100,
    dx1 = 0.1,
    dy1 = 0.4;
var x2 = 200,
    y2 = 200,
    dx2 = 0.3,
    dy2 = 0.5;
var dis;
var poly1;
var poly2;
var poly1Points = [
		new Vector(44, 37),
		new Vector(42, 65),
		new Vector(65, 50)
	];
var poly2Points = [
		new Vector(212, 145),
		new Vector(221, 195),
		new Vector(263, 173),
		new Vector(256, 117)
	];
// setInterval(function() {
//     poly1 = new Polygon(poly1Points, new Vector(InputClass.mouseX, InputClass.mouseY));
//     poly2 = new Polygon(poly2Points);
//     GraphicsContext.clearCanvas();
//     GraphicsContext.drawPolygon(poly1, randColor());
//     GraphicsContext.drawPolygon(poly2, randColor());
// });

//***********************************************************
//	Test colliDetectHelper.flattenPolygonOnAxis() method
//***********************************************************
poly2 = new Polygon(poly2Points);
    GraphicsContext.drawPolygon(poly2, randColor());
var minMaxPoints = colliDetectHelper.flattenPolygonOnAxis(poly2, new Vector(1, 0));
console.log(minMaxPoints);
minMaxPoints[0].translate(0, 20);
minMaxPoints[1].translate(0, 20);
console.log(minMaxPoints);
GraphicsContext.canvasCtx.beginPath();
GraphicsContext.canvasCtx.strokeStyle = "black";
GraphicsContext.canvasCtx.moveTo(minMaxPoints[0].x, minMaxPoints[0].y);
GraphicsContext.canvasCtx.lineTo(minMaxPoints[1].x, minMaxPoints[1].y);
GraphicsContext.canvasCtx.stroke();
GraphicsContext.canvasCtx.closePath();