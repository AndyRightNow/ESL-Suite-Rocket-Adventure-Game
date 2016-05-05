/*************************************************************************************
								
								Input Class Test

*************************************************************************************/

"use strict";

//	Test listen() method
InputClass.listen();

var TEST_lastClickCount = 0;

//********************************
//	Images
//********************************
var TEST_tmp = new ImageObject(0, 0, 100, 100);
TEST_tmp.addImageFrame("img/Barriers/10.png");
show("barrierWidth = " + TEST_tmp.width + ";");
show("barrierHeight = " + TEST_tmp.height + ";");

//****************************************
//	Test Mouse Coordinates
//****************************************
setInterval(function() {
	GraphicsContext.clearCanvas();
TEST_tmp.update(0, 0, 0);
TEST_tmp.draw();
    // showText(InputClass.mouseX + " " + InputClass.mouseY);
    if (TEST_lastClickCount != InputClass.clickCount){
    	show("new Vector(" + InputClass.mouseX + ", " + InputClass.mouseY + "), ");
    }
    TEST_lastClickCount = InputClass.clickCount;
});

