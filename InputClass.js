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
    _lastMouseX: 0,
    _lastMouseY: 0,

    //Listen to the user input and get the members data
    listen: function() {
    	var canvasOffsetLeft = $(GraphicsContext.canvas).offset().left;
    	var canvasOffsetTop = $(GraphicsContext.canvas).offset().top;
        //*******************************
        //	Get the mouse coordinates
        //*******************************
        document.addEventListener("mousemove", function(event) {
            if (InputClass.mouseMove) {
                InputClass.mouseX = event.pageX - canvasOffsetLeft;
                InputClass.mouseY = event.pageY - canvasOffsetTop;
                InputClass._lastMouseX = InputClass.mouseX;
                InputClass._lastMouseY = InputClass.mouseY;
            } else {
                InputClass.mouseX = InputClass._lastMouseX;
                InputClass.mouseY = InputClass._lastMouseY
            }
        });

        //*******************************
        //	Get the mouse movement state
        //*******************************
        canvas.addEventListener("mouseenter", function(event) {
            InputClass.mouseMove = true;
        });
        canvas.addEventListener("mouseout", function(event) {
            InputClass.mouseMove = false;
        });
    }
};

