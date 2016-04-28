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

//***************************************************
//	Test Sprite.init() methods
//***************************************************
var Sprite = new GameObject();

Sprite.init(0, 0, 130, 80);
Sprite.addImageFrame("http://1.bp.blogspot.com/-siKMnTg6i1k/TxoF5feuXBI/AAAAAAAAAE0/QnsGu-GbfSs/s1600/rocket-md.png");
Sprite.addImageFrame("http://i0.wp.com/peetlee.com/wp-content/uploads/2015/08/RocketSprite.png?resize=162%2C78");
show(Sprite.getCenterX());
show(Sprite.getCenterY());
show(Sprite.width);
show(Sprite.height);
show(Sprite.url);

//*******************************************************************************
//	Test Sprite.update() and Sprite.draw() methods
//*******************************************************************************
var x = 0,	
    y = 0,
    dy = 0;
InputClass.listen();
setInterval(function() {
	dy = 0;
	if (InputClass.lastMouseY - Sprite.getCenterY() != 0){
	dy = (InputClass.lastMouseY - Sprite.getCenterY()) / Math.abs(InputClass.lastMouseY - Sprite.getCenterY());
	}
	y += dy * 0.5;
    GraphicsContext.clearCanvas();
    var angle = Math.atan((InputClass.lastMouseY - Sprite.getCenterY()) / (InputClass.mouseX - Sprite.getCenterX()));
    showText(InputClass.lastMouseY - Sprite.getCenterY());
    Sprite.update(0, y, angle);
    Sprite.draw();
}, 1);


