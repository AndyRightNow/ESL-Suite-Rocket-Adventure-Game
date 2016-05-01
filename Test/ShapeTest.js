/*************************************************************************************
	
										Shape Class Test

*************************************************************************************/

//*****************************
//	Test Circle object
//*****************************
// var cir = new Circle(new Vector(50, 50), 20);
// GraphicsContext.drawCircle(cir, "blue");

//*********************************
//	Test Circle.translate() method
//*********************************
// cir.translate(0, 50);
// GraphicsContext.drawCircle(cir, "blue");

//*********************************
//	Test Circle.scale() method
//*********************************
// cir.scale(5);
// GraphicsContext.drawCircle(cir, "blue");

//*****************************
//	Test Box object
//*****************************
// var box = new Box(new Vector(50, 50), 20, 30);
// GraphicsContext.drawPolygon(box, "blue");

// //*********************************
// //	Test Box.translate() method
// //*********************************
// box.translate(20, 50);
// GraphicsContext.drawPolygon(box, "blue");

//*********************************
//	Test Box._getCenter() method
//*********************************
// console.log(box._getCenter());

//*********************************
//	Test Box.rotate() method
//*********************************

// var angle = 0;
// setInterval(function(){
// 	GraphicsContext.clearCanvas();
// 	box.rotate(angle++ * 0.01);
// 	GraphicsContext.drawPolygon(box, "blue");
// 	if (angle % 360 === 0){
// 		console.log(box.points);
// 	}
// });

//*********************************
//	Test Box.scale() method
//*********************************
// box.translate(20, 10).scale(3, 1);
// GraphicsContext.drawPolygon(box, "blue");

//*****************************
//	Test Polygon object
//*****************************
var points = [
new Vector(0, 0),
new Vector(20, 20),
new Vector(0, 20)];
var poly = new Polygon(points);
GraphicsContext.drawPolygon(poly.box, "red");
GraphicsContext.drawPolygon(poly, "blue");

// //*********************************
// //	Test Polygon.translate() method
// //*********************************
poly.translate(20, 20);
GraphicsContext.drawPolygon(poly.box, "red");
GraphicsContext.drawPolygon(poly, "blue");

//*********************************
//	Test Polygon.rotate() method
//*********************************
poly.translate(20, 20);
poly.rotate(45);
GraphicsContext.drawPolygon(poly.box, "red");
GraphicsContext.drawPolygon(poly, "blue");


//*********************************
//	Test Polygon.rotate() method
//*********************************
poly.translate(20, 20);
poly.scale(3, 2);
GraphicsContext.drawPolygon(poly.box, "red");
GraphicsContext.drawPolygon(poly, "blue");
