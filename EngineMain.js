/*************************************************************************************
								ESL Suite Rocket Adventure Game

								Created By Andy Zhou

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

    mouseX, mouseY; //	Mouse position

//******************************
//	Game background objects
//******************************
var gameSky = new ImageObject( //	Sky background
        0,
        0,
        GraphicsContext.width(),
        GraphicsContext.height()),

    cloudsCount = 3, //	Sky clouds count

    gameSkyClouds = new Array(cloudsCount); //	Sky clouds objects 

gameSky.addImageFrame("http://orig11.deviantart.net/81b0/f/2013/353/5/b/on_a_clear_night_sky__background__by_oakfur422-d6yl3xc.png");

//******************************
//	Game sprite
//******************************
var spriteWidth = 130,
    spriteHeight = 80,
    spriteTopLeftPosX = GraphicsContext.width() * 0.05,	//	Position at the x% of the canvas width
    spriteTopLeftPosY = 0,
    spriteCenterY,
    spriteCenterX,
    spriteAngle,	//	Angle between the direction the sprite is point at and the x axis
    spriteAy = 0,	//	Vertical acceleration 
    spriteAyCoef = 1.35,	//	Acceleration coefficient, used to scale up or down the acceleration

    gameSprite = new ImageObject(
    	spriteTopLeftPosY, 
    	spriteTopLeftPosY, 
    	spriteWidth, 
    	spriteHeight),

    spriteFrames = [ //	Use to compose sprite animation
    "http://1.bp.blogspot.com/-siKMnTg6i1k/TxoF5feuXBI/AAAAAAAAAE0/QnsGu-GbfSs/s1600/rocket-md.png"];

for (var i = 0; i < spriteFrames.length; i++) { //	Add frames to the sprite
    gameSprite.addImageFrame(spriteFrames[i]);
}

var MainGameLoop = setInterval(function() {
    //********************************
    //	Check if the user clicks
    //********************************
    if (InputClass.clickCount != 0) {
        isStop = false;
    }
    //	Clear all
    GraphicsContext.clearCanvas();

    //***************************
    //	Get mouse position
    //***************************
    mouseX = InputClass.mouseX;
    mouseY = InputClass.mouseY;

    //*******************************
    //	Show basic game scene
    //*******************************

    spriteCenterY = gameSprite.getCenterY();
    spriteCenterX = gameSprite.getCenterX();
    if (mouseY != spriteCenterY){
    	spriteAy = (mouseY - spriteCenterY) * spriteAyCoef / GraphicsContext.height();
    }

    spriteTopLeftPosY += spriteAy;

    spriteAngle = Math.atan((mouseY - spriteCenterY) / (mouseX - spriteCenterX));

    gameSprite.update(spriteTopLeftPosX, spriteTopLeftPosY, spriteAngle);

    gameSprite.draw();

    //	The drawing below this line will be drawn under whatever is on the canvas
    GraphicsContext.setGlobalComposition("destination-over");

    gameSky.update(0, 0, 0);

    gameSky.draw();

    //	The drawing below this line will be drawn on top of whatever is on the canvas
    GraphicsContext.setGlobalComposition("source-over");

    //*************************************
    //	Pause or show main game process
    //*************************************
    if (isStop) {
        //****************************
        //	Show pause scene
        //****************************
        UIClass.showPauseScene();
    } else {
        showText(mouseX + " " + mouseY);
    }
});

