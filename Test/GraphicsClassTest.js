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
Sprite.init("http://1.bp.blogspot.com/-siKMnTg6i1k/TxoF5feuXBI/AAAAAAAAAE0/QnsGu-GbfSs/s1600/rocket-md.png"
	,0, 0, 130, 80);
show(Sprite.x);
show(Sprite.y);
show(Sprite.width);
show(Sprite.height);
show(Sprite.url);

//***************************************************
//	Test Sprite.update() and Sprite.draw() methods
//***************************************************
Sprite.update(1, 1, 30);
Sprite.draw();

//*************************************
//	Test clearCanvas() method
//*************************************
// GraphicsContext.clearCanvas();
