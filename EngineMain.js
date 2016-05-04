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
var gameSkyWidth = 1257,
	gameSkyHeight = 400,
	backSkyPosX = gameSkyWidth - 27,

	gameSkys = [
	new ImageObject( 
        0,
        0,
        gameSkyWidth,
        gameSkyHeight),
	
	new ImageObject(
		backSkyPosX,	//	Fix the border gap
		0,
		gameSkyWidth,
		gameSkyHeight)],

	frontSky = gameSkys[0],	//	Front Sky background for alternating
	backSky = gameSkys[1];	//	Back Sky background for alternating


frontSky.addImageFrame("img/Background/Sky.jpg");
backSky.addImageFrame("img/Background/Sky.jpg");

//******************************
//	Game sprite
//******************************
var spriteWidth = 220,
    spriteHeight = 80,
    spriteTopLeftPos = new Vector(GraphicsContext.width() * 0.05, 0),	 //	Position at the x% of the canvas width
    spriteCenterY,
    spriteCenterX,
    spriteAngle = 0, //	Angle between the direction the sprite is point at and the x axis
    spriteAy = 0, //	Vertical acceleration 
    spriteAyCoef = 2.3, //	Acceleration coefficient, used to scale up or down the acceleration

    spriteBoundingPoints = [
					new Vector(71, 11),
					new Vector(99, 8),
					new Vector(113, 21),
					new Vector(152, 21),
					new Vector(184, 22),
					new Vector(201, 27),
					new Vector(216, 39),
					new Vector(203, 51),
					new Vector(187, 58),
					new Vector(148, 59),
					new Vector(114, 59),
					new Vector(100, 71),
					new Vector(71, 69),
					new Vector(87, 57),
					new Vector(85, 24)
    ],
    spriteBoundingBox = new Box(spriteTopLeftPos, spriteWidth, spriteHeight),
    spriteBounding = new Polygon(spriteBoundingPoints, spriteTopLeftPos, spriteBoundingBox),

    gameSprite = new ImageObject(
        spriteTopLeftPos.x,
        spriteTopLeftPos.y,
        spriteWidth,
        spriteHeight,
        spriteBounding),

    spriteFrames = [ //	Use to compose sprite animation
    "img/Sprite/1.png",
    "img/Sprite/2.png",
    "img/Sprite/3.png",
    "img/Sprite/4.png",
    "img/Sprite/3.png",
    "img/Sprite/2.png",
    "img/Sprite/1.png"];

for (var i = 0; i < spriteFrames.length; i++) { //	Add frames to the sprite
    gameSprite.addImageFrame(spriteFrames[i]);
}

//*********************************************
//	Global Game Objects parameters
//*********************************************
var g_GameObjectAx = -1;

var MainGameLoop = setInterval(function() {
    //********************************
    //	Check if the user click start
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
    
    if (mouseY != spriteCenterY) {
        spriteAy = (mouseY - spriteCenterY) * spriteAyCoef / GraphicsContext.height();
    }

    spriteAngle = (Math.atan((mouseY - spriteCenterY) / (mouseX - spriteCenterX))  * (180 / Math.PI))  * 0.025;

    //*************************************************************************DEBUG*******************************************
    // showText(spriteAngle);

    gameSprite.update(spriteAngle, 0, spriteAy);
    gameSprite.draw();

    //	The drawing below this line will be drawn under whatever is on the canvas
    GraphicsContext.setGlobalComposition("destination-over");

    //**********************************************
    //	Alternate between front and back sky images
    //**********************************************
    frontSky.update(0, g_GameObjectAx, 0);
    frontSky.draw();
    backSky.update(0, g_GameObjectAx, 0);
    backSky.draw();
    if (backSky.x <= 0){	//	Swap front and back sky images
    	var tmp = frontSky;
    	frontSky = backSky;
    	backSky = tmp;
    	backSky.x = backSkyPosX;
    }

    //	The drawing below this line will be drawn on top of whatever is on the canvas
    GraphicsContext.setGlobalComposition("source-over");

    //*************************************************************************DEBUG*******************************************
    // GraphicsContext.drawPolygon(gameSprite.bounding, "blue");

    //*************************************
    //	Pause or show main game process
    //*************************************
    if (isStop) {
        //****************************
        //	Show pause scene
        //****************************
        UIClass.showPauseScene();
    } else { 
    	if (!BarrierLoading.isDone()){
    		UIClass.showLoadingScene();
    	}
    }
});

