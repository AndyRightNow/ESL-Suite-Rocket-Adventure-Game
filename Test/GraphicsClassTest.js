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
// GraphicsContext.drawRect(canvas.width * 0.3, canvas.height * 0.3, 20, 20, "blue");

//***********************************************
//	Test GraphicsContext.drawImg() method
//***********************************************
// GraphicsContext.drawImg("https://mdn.mozillademos.org/files/5395/backdrop.png", 0, 0, 100, 100);


//***************************************************
//	Test Sprite.init() methods
//***************************************************
Sprite.init("http://1.bp.blogspot.com/-siKMnTg6i1k/TxoF5feuXBI/AAAAAAAAAE0/QnsGu-GbfSs/s1600/rocket-md.png", 0, 0, 130, 80);
show(Sprite.getCenterX());
show(Sprite.getCenterY());
show(Sprite.width);
show(Sprite.height);
show(Sprite.url);

//***************************************************
//	Test Sprite.update() and Sprite.draw() methods
//***************************************************
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

//*************************************
//	Test clearCanvas() method
//*************************************
// GraphicsContext.clearCanvas();

