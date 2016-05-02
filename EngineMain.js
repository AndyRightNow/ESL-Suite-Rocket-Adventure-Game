/*************************************************************************************
								ESL Suite Game Engine

								Created By Andy Zhou

	Engine Structure:

									Engine Main
										 |
										 |
										 |
					----------------------------------------------------
					|			|				 |					   |
					|			|				 |					   |
					|			|				 |					   |
					|			|				 |					   |
				UIClass-----Utillity--------GraphicsClass---------InputClass
		   	 (DOM + jQuery)					(HTML5 Canvas)			
		   		  /\
				 /  \
				/    \
			   /      \
			 GUI  GameRecord

	Engine Introduction:
	
	Overview:
	It's not a general purpose engine but actually a game prototype. This 
	engine can only make this kind of game with limited functionalities. 
	For the sake of easier maintainence I make a engine instead of dumping
	codes around plainly in the file. The horizontal lines in the diagram 
	mean there is data communication between and vertical lines denote its 
	funtionalities and classes composition.

	Components:
	1. Engine Main
		It's the body of the engine, responsible for initializing and shutting 
		down all the subsystems and components, and of course the main process
		of the game.
	2. UIClass
		Responsible for the GUI and the game record displayed on the game canvas.
		It uses jQuery to manipulate the DOM on the game canvas. 
	3. Utility
		Responsible for game record calculation and collision detection of objects.
		It interacts with both UIClass and GraphicsClass.
	4. GraphicsClass
		Responsible for drawing the scene, including background, barriers, sprite, 
		.etc.
	5. InputClass
		Responsible for getting user's input(mouse movements) and sending the 
		command	to the GraphicsClass to animate the scene.

*************************************************************************************/

"use strict";

//***********************************************************************
//								Main game loop
//	Use window.setInterval() because don't want to hang the 
//	main web page thread.
//***********************************************************************

//	Start to listen to the user input
InputClass.listen();


var isStop = true, //	Game loop start and pause flag

    mouseX, mouseY, //	Mouse position

    //******************************
    //	Game background objects
    //******************************
    gameSky, //	Sky background
    cloudsCount = 3, //	Sky clouds count
    gameSkyClouds = new Array(cloudsCount), //	Sky clouds objects 

    //******************************
    //	Game sprite
    //******************************
    spriteWidth,
    spriteHeight,
    gameSprite = new ImageObject(0, 0, spriteWidth, spriteHeight);

var MainGameLoop = setInterval(function() {
    //********************************
    //	Check if the user clicks
    //********************************
    if (InputClass.clickCount != 0) {
        isStop = false;
    }
    //	Clear all
    GraphicsContext.clearCanvas();

    //*******************************
    //	Show basic game animation
    //*******************************

    if (isStop) {
        //****************************
        //	Show pause scene
        //****************************
        UIClass.showPauseScene();
    } else {
        mouseX = InputClass.mouseX;
        mouseY = InputClass.mouseY;
        showText(mouseX + " " + mouseY);
    }
});

