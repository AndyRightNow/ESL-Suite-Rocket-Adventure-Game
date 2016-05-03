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
var spriteWidth = 180,
    spriteHeight = 80,
    spriteTopLeftPos = new Vector(GraphicsContext.width() * 0.05, 0),	 //	Position at the x% of the canvas width
    spriteCenterY,
    spriteCenterX,
    spriteAngle = 0, //	Angle between the direction the sprite is point at and the x axis
    spriteTotalRotation = 0,
    spriteAy = 0, //	Vertical acceleration 
    spriteAyCoef = 1.7, //	Acceleration coefficient, used to scale up or down the acceleration

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
        spriteTopLeftPos.y,
        spriteTopLeftPos.y,
        spriteWidth,
        spriteHeight),

    spriteFrames = [ //	Use to compose sprite animation
    "https://farm8.staticflickr.com/7577/26692103932_d9cbb46af4_o.png",
    "https://farm8.staticflickr.com/7474/26513247190_8b60583227_o.png",
    "https://farm8.staticflickr.com/7594/26692103992_19c74bf01b_o.png",
    "https://farm8.staticflickr.com/7574/26182211423_5021619ef1_o.png"];

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
    if (mouseY != spriteCenterY) {
        spriteAy = (mouseY - spriteCenterY) * spriteAyCoef / GraphicsContext.height();
    }

    spriteTopLeftPos.y += spriteAy;

    spriteAngle = (Math.atan((mouseY - spriteCenterY) / (mouseX - spriteCenterX))  * (180 / Math.PI))  * 0.025;
    spriteTotalRotation += spriteAngle;

    //*************************************************************************DEBUG*******************************************
    // showText(spriteAngle);

    gameSprite.update(spriteTopLeftPos.x, spriteTopLeftPos.y, spriteAngle);
	spriteBounding.clearRotation();
	spriteBounding.rotate(-spriteAngle * (180 / Math.PI));
    spriteBounding.translate(0, spriteAy);	//	No horizontal translation happening

    gameSprite.draw();

    //	The drawing below this line will be drawn under whatever is on the canvas
    GraphicsContext.setGlobalComposition("destination-over");

    gameSky.update(0, 0, 0);

    gameSky.draw();

    //	The drawing below this line will be drawn on top of whatever is on the canvas
    GraphicsContext.setGlobalComposition("source-over");

    //*************************************************************************DEBUG*******************************************
    // GraphicsContext.drawPolygon(spriteBounding, "blue");

    //*************************************
    //	Pause or show main game process
    //*************************************
    if (isStop) {
        //****************************
        //	Show pause scene
        //****************************
        UIClass.showPauseScene();
    } else {
        // showText(mouseX + " " + mouseY);
    }
});

