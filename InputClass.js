/*************************************************************************************
									Input Class

								Created By Andy Zhou

	Overview:

	Responsible for getting user's input(mouse movements) and sending the 
	command	to the GraphicsClass to animate the scene.

*************************************************************************************/

"use strict";

var InputClass = {
	//	Mouse movement state
    mouseMove: false,

    //*******************************************
    //	Mouse coordinates relative to the canvas    
    //*******************************************
    mouseX: 0,
    mouseY: 0,

    //Listen to the user input and get the members data
    listen : function(){

    	//*******************************
    	//	Get the mouse coordinates
    	//*******************************
    	document.addEventListener("mousemove", function(event){
    		InputClass.mouseX = InputClass.mouseMove ? event.pageX - $(canvas).offset().left : 0;
    		InputClass.mouseY = InputClass.mouseMove ? event.pageY - $(canvas).offset().top : 0;
    	});

    	//*******************************
    	//	Get the mouse movement state
    	//*******************************
    	canvas.addEventListener("mouseenter", function(event){
    		InputClass.mouseMove = true;
    	});
    	canvas.addEventListener("mouseout", function(event){
    		InputClass.mouseMove = false;
    	});
    }
};

