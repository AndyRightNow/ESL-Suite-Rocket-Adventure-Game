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
//	Test ImageObject.init() and ImageObject.addImageFrame() methods
//*******************************************************************
var sprite = new ImageObject(0, 0, 130, 80);

sprite.addImageFrame("http://1.bp.blogspot.com/-siKMnTg6i1k/TxoF5feuXBI/AAAAAAAAAE0/QnsGu-GbfSs/s1600/rocket-md.png");
show(sprite.getCenterX());
show(sprite.getCenterY());
show(sprite.width);
show(sprite.height);

var background = new ImageObject(0, 0, GraphicsContext.width(), GraphicsContext.height());
background.addImageFrame("https://media1.giphy.com/media/hOWdRsPVHmGrK/200_s.gif");

//*************************************************************
//	Test ImageObject.update() and ImageObject.draw() methods
//*************************************************************
var x = 0,	
    y = 0,
    dy = 0;
InputClass.listen();
setInterval(function() {
	dy = 0;
	if (InputClass.mouseY - sprite.getCenterY() != 0){
	dy = (InputClass.mouseY - sprite.getCenterY()) / Math.abs(InputClass.mouseY - sprite.getCenterY());
	}
	y += dy * 0.5;
    GraphicsContext.clearCanvas();
    var angle = Math.atan((InputClass.mouseY - sprite.getCenterY()) / (InputClass.mouseX - sprite.getCenterX()));
    sprite.update(0, y, angle);
    sprite.draw();
    GraphicsContext.setGlobalComposition("destination-over");
    background.update(0, 0, 0);
    background.draw();
    GraphicsContext.setGlobalComposition("source-over");
}, 1);


