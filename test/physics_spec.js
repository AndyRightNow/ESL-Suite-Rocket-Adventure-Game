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

//***********************************************************
//	Test colliDetectHelper.flattenPolygonOnAxis() method
//***********************************************************
// poly2 = new Polygon(poly2Points);
//     GraphicsContext.drawPolygon(poly2, randColor());

// for (var i = 0; i < poly2.points.length; i++) {
//     var axis;
//     if (i === poly2.points.length - 1) {
//         axis = colliDetectHelper.getEdge(poly2.points[i], poly2.points[0]);
//     } 
//     else {
//         axis = colliDetectHelper.getEdge(poly2.points[i], poly2.points[i + 1]);
//     }
//     var minMaxPoints = colliDetectHelper.flattenPolygonOnAxis(poly2, axis);
//     GraphicsContext.canvasCtx.beginPath();
// 	GraphicsContext.canvasCtx.strokeStyle = "black";
// 	GraphicsContext.canvasCtx.moveTo(minMaxPoints[0].x, minMaxPoints[0].y);
// 	GraphicsContext.canvasCtx.lineTo(minMaxPoints[1].x, minMaxPoints[1].y);
// 	GraphicsContext.canvasCtx.stroke();
// 	GraphicsContext.canvasCtx.closePath();
// }



//***********************************************************
//	Test colliDetect._isSeparatedAxis() method
//***********************************************************
// poly2 = new Polygon(poly2Points);
// poly1 = new Polygon(poly1Points, poly2.points[2]);
// GraphicsContext.clearCanvas();
// GraphicsContext.drawPolygon(poly2, randColor());
// GraphicsContext.drawPolygon(poly1, randColor());
// for (var i = 0; i < poly2.points.length; i++) {
//     var axis;
//     if (i === poly2.points.length - 1) {
//         axis = colliDetectHelper.getEdge(poly2.points[i], poly2.points[0]);
//     } else {
//         axis = colliDetectHelper.getEdge(poly2.points[i], poly2.points[i + 1]);
//     }
//     var res = colliDetect._isSeparatedAxis(poly1, poly2, axis);
//     if (res) {
//         show("Is Separated!");
//     }
//     else{
//     	show("Not Separated!");
//     }
// }

//***********************************************************
//	Test colliDetect.detect() method
//***********************************************************
var angle = 0;
poly1 = new Polygon(poly1Points, new Vector());
poly2 = new Polygon(poly2Points);
setInterval(function() {
    GraphicsContext.clearCanvas();
    GraphicsContext.drawPolygon(poly1, randColor());
    GraphicsContext.drawPolygon(poly2, randColor());
    if (colliDetect.detect(poly1, poly2)) {
        // showText("Touch");
    } else {
        // showText("No Touch");
    }
    poly1.translate(-poly1.box.points[0].x, -poly1.box.points[0].y);
    poly1.translate(InputClass.mouseX, InputClass.mouseY);
    poly1.rotate(angle);
    poly2.rotate(angle);
    angle += 0.0001;
});

