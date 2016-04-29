/*************************************************************************************
								
							Graphics Class Test

*************************************************************************************/

"use strict";

//***********************************************
//	Test GraphicsContext.drawCircle() method
//***********************************************
// GraphicsContext.drawCircle(canvas.width * 0.5, canvas.height * 0.5, 20, "blue");

//***********************************************
//	Test GraphicsContext.drawRect() method
//***********************************************


//***********************************************
//	Test GraphicsContext.drawImg() method
//***********************************************

//*******************************************************************
//	Test GameObject.init() and GameObject.addImageFrame() methods
//*******************************************************************
var sprite = new GameObject(0, 0, 130, 80);

sprite.addImageFrame("http://1.bp.blogspot.com/-siKMnTg6i1k/TxoF5feuXBI/AAAAAAAAAE0/QnsGu-GbfSs/s1600/rocket-md.png");
show(sprite.getCenterX());
show(sprite.getCenterY());
show(sprite.width);
show(sprite.height);

var background = new GameObject(0, 0, GraphicsContext.width(), GraphicsContext.height());
background.addImageFrame("https://media1.giphy.com/media/hOWdRsPVHmGrK/200_s.gif");

//*************************************************************
//	Test GameObject.update() and GameObject.draw() methods
//*************************************************************
var x = 0,	
    y = 0,
    dy = 0;
InputClass.listen();
setInterval(function() {
	dy = 0;
	if (InputClass.lastMouseY - sprite.getCenterY() != 0){
	dy = (InputClass.lastMouseY - sprite.getCenterY()) / Math.abs(InputClass.lastMouseY - sprite.getCenterY());
	}
	y += dy * 0.5;
    GraphicsContext.clearCanvas();
    var angle = Math.atan((InputClass.lastMouseY - sprite.getCenterY()) / (InputClass.mouseX - sprite.getCenterX()));
    sprite.update(0, y, angle);
    sprite.draw();
    GraphicsContext.setGlobalComposition("destination-over");
    background.update(0, 0, 0);
    background.draw();
    GraphicsContext.setGlobalComposition("source-over");
    console.log(GraphicsContext.canvasCtx.getImageData(sprite.x, sprite.y, sprite.width, sprite.height));
}, 1);


