/*************************************************************************************
									Input Class

								Created By Andy Zhou

	Overview:

	Responsible for getting user's input(mouse movements) and sending the 
	command	to the GraphicsClass to animate the scene.

*************************************************************************************/

"use strict";

var InputClass = {
	//Mouse movement state
    mouseMove: false,

    //*******************************************
    //	Mouse coordinates relative to the canvas    
    //*******************************************
    mouseX: 0,
    mouseY: 0,

    //**************************************
    //	Initializa and shutdown
    //**************************************
    init : function(){},
    shutdown : function(){},

    //Listen to the user input and get the members data
    listen : function(){},

    //************************************************************
    //	Compute the mouse coordinates relative to the canvas
    //************************************************************
    getMouseX : function(){},
    getMouseY : function(){}
};

