/*************************************************************************************
								ESL Suite Rocket Adventure Game

								Created By Andy Zhou

*************************************************************************************/

"use strict";

//	Game run count
var gameRunCount = 0;

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
            backSkyPosX, //	Fix the border gap
            0,
            gameSkyWidth,
            gameSkyHeight)],

    frontSky = gameSkys[0], //	Front Sky background for alternating
    backSky = gameSkys[1]; //	Back Sky background for alternating


frontSky.addImageFrame("img/Background/Sky.jpg");
backSky.addImageFrame("img/Background/Sky.jpg");

//******************************
//	Game sprite
//******************************
var spriteWidth = 220,
    spriteHeight = 80,
    spriteTopLeftPos = new Vector(GraphicsContext.width() * 0.05, 0), //	Position at the x% of the canvas width
    spriteCenterY,
    spriteCenterX,
    spriteAngle = 0, //	Angle between the direction the sprite is point at and the x axis
    spriteAy = 0, //	Vertical acceleration 
    spriteAyCoef = 2.3, //	Acceleration coefficient, used to scale up or down the acceleration

    spriteBoundingPoints = [
					new Vector(91, 11),
					new Vector(119, 8),
					new Vector(133, 21),
					new Vector(172, 21),
					new Vector(204, 22),
					new Vector(221, 27),
					new Vector(236, 39),
					new Vector(223, 51),
					new Vector(207, 58),
					new Vector(168, 59),
					new Vector(134, 59),
					new Vector(120, 71),
					new Vector(91, 69),
					new Vector(107, 57),
					new Vector(105, 24)
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
var g_GameObjectAx = -1,
    g_GameObjectAxDelta = 0.00001;

//**************************
//	Game Record and time
//**************************
var gameRecord = 0,
    gameRecordCoef = 0.5,
    highestGameRecord = 0,
    gameTime = 0;

//	Barriers on the screen
var barriersVisible = [];

//**************************
//	EngineMain Object
//**************************
var EngineMain = {
    restart: function() {
        isStop = true;
        InputClass.resetClicks();
        g_GameObjectAx = -1;
        g_GameObjectAxDelta = 0.00001;

        if (gameRecord > highestGameRecord) {
            highestGameRecord = gameRecord;	//	Store the highest record
        }
        
        gameRecord = 0;
        gameRecordCoef = 0.5;
        gameTime = 0;

        for (var i = 0; i < barriersVisible.length; i++) {
            barriersVisible[i].resetFlagAndPos(GraphicsContext.width(), 0);
        }
        barriersVisible = [];

        Timer.stop();

        BarrierGenerator.reset();
    }
};

//***********************************************************************
//								Main game loop
//	Use window.setInterval() in order not to hang the main UI thread 
//***********************************************************************
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

    //	Increase the control sensitivity with time
    spriteAy += g_GameObjectAxDelta;

    spriteAngle = (Math.atan((mouseY - spriteCenterY) / (mouseX - spriteCenterX)) * (180 / Math.PI)) * 0.025;

    //*************************************************************************DEBUG*******************************************
    // showText(spriteAngle);

    gameSprite.update(spriteAngle, 0, spriteAy);
    gameSprite.draw();

    //****************************************************************DEBUG****************************************
    // GraphicsContext.drawPolygon(gameSprite.bounding, "blue");

    //	The drawing below this line will be drawn under whatever is on the canvas
    GraphicsContext.setGlobalComposition("destination-over");

    //**********************************************
    //	Alternate between front and back sky images
    //**********************************************
    frontSky.update(0, g_GameObjectAx, 0);
    frontSky.draw();
    backSky.update(0, g_GameObjectAx, 0);
    backSky.draw();
    if (backSky.x <= 0) { //	Swap front and back sky images
        var tmp = frontSky;
        frontSky = backSky;
        backSky = tmp;
        backSky.x = backSkyPosX;
    }

    //	The drawing below this line will be drawn on top of whatever is on the canvas
    GraphicsContext.setGlobalComposition("source-over");

    //*************************************
    //	Pause or show main game process
    //*************************************
    if (isStop) {
        if (gameRunCount === 0) {
            UIClass.showPauseScene(); //	Show pause scene
        }
        else{
        	UIClass.showRestartScene(highestGameRecord);
        }
    } else {
        if (!BarrierLoading.isDone()) {
            //	Show loading scene
            UIClass.showLoadingScene();
        } else {
            //*************************************
            //	Show main game process
            //*************************************
            if (!Timer.isRunning()) { //	If the Timer is not started, start the counting
                Timer.start(); //	Timer only start once
                gameRunCount++; //	Game run count add one
            }

            //***********************************************************
            //	Show game record at the top right corner of the canvas
            //	and the highest record at the top left corner
            //***********************************************************
            gameTime = Timer.totalTime();
            gameRecord = parseInt(gameTime * gameRecordCoef);
            UIClass.showGameRecord(gameRecord, highestGameRecord);

            //	Increase the game objects speed
            g_GameObjectAx -= g_GameObjectAxDelta;

            //******************************************
            //	Show barriers based on record
            //******************************************
            BarrierGenerator.setLevel(gameRecord);
            var thisBarrier = BarrierGenerator.getThisBarrier(gameTime, g_GameObjectAx);
            if (thisBarrier !== null) {
                barriersVisible.push(thisBarrier); //	If next barrier is available, push to the visible barriers array
            }

            for (var i = 0; i < barriersVisible.length; i++) {
                if (barriersVisible[i].x + barriersVisible[i].width < 0) {
                    barriersVisible[i].resetFlagAndPos(GraphicsContext.width(), 0);
                    barriersVisible.splice(i, 1);
                }
                barriersVisible[i].update(0, g_GameObjectAx, 0);
                barriersVisible[i].draw();
                if (barriersVisible[i].x <= gameSprite.x + gameSprite.width) {
                    //**************************************
                    //	If collided then restart the game
                    //**************************************
                    if (colliDetect.detect(gameSprite.bounding, barriersVisible[i].bounding)) {
                        EngineMain.restart();
                    }
                }
                //****************************************************************DEBUG****************************************
                // GraphicsContext.drawPolygon(barriersVisible[i].bounding, "blue");
            }
        }
    }
}, 1);

