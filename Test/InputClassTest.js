/*************************************************************************************
								
								Input Class Test

*************************************************************************************/

"use strict";

//	Test listen() method
InputClass.listen();

//****************************************
//	Test Mouse Coordinates
//****************************************
setInterval(function() {
    showText(InputClass.lastMouseX + " " + InputClass.lastMouseY);
});

