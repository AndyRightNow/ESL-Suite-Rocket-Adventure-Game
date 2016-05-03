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
var TEST_tmp = new ImageObject(0, 0, 100, 122);
TEST_tmp.addImageFrame("img/Barriers/Barrier2/1.png");

//****************************************
//	Test Mouse Coordinates
//****************************************
setInterval(function() {
TEST_tmp.update(0, 0, 0);
TEST_tmp.draw();
    showText(InputClass.mouseX + " " + InputClass.mouseY);
    if (TEST_lastClickCount != InputClass.clickCount){
    	show(InputClass.mouseX + " " + InputClass.mouseY);
    }
    TEST_lastClickCount = InputClass.clickCount;
});

