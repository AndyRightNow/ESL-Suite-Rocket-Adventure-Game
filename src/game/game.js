var Engine = require('./../engine/engine');
var Vector = require('./../engine/utility/vector');
var ImageObject = require('./gameplay/gameObjects').ImageObject;
var ImageLoading = require('./gameplay/gameObjects').ImageLoading;
var Box = require('./../engine/utility/shape').Box;
var Polygon = require('./../engine/utility/shape').Polygon;
var GraphicsContext = require('./../engine/graphics');
var InputClass = require('./../engine/input');
var UIClass = require('./ui');
var Timer = require('./../engine/utility/timer');
var BarrierLoading = require('./gameplay/barriers').BarrierLoading;
var colliDetect = require('./../engine/utility/collision');
var BarrierGenerator = require('./gameplay/barrierGenerator');
var Barriers = require('./gameplay/barriers');

var Game = {
    init: function(canvasId) {
        Engine.init(canvasId);
        Barriers.init();

        //******************************
        //  Game background objects
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
                    backSkyPosX, // Fix the border gap
                    0,
                    gameSkyWidth,
                    gameSkyHeight)],

            frontSky = gameSkys[0], //  Front Sky background for alternating
            backSky = gameSkys[1]; //   Back Sky background for alternating

        frontSky.addImageFrame("../../res/Background/Sky.jpg");
        backSky.addImageFrame("../../res/Background/Sky.jpg");

        //******************************
        //  Game sprite
        //******************************
        var spriteWidth = 220,
            spriteHeight = 80,
            spriteTopLeftPos = new Vector(GraphicsContext.width() * 0.05, 0), //    Position at the x% of the canvas width
            spriteCenterY,
            spriteCenterX,
            spriteAngle = 0, // Angle between the direction the sprite is point at and the x axis
            spriteAy = 0, //    Vertical acceleration
            spriteAyCoef = 3.3, //  Acceleration coefficient, used to scale up or down the acceleration

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

            spriteFrames = [ // Use to compose sprite animation
            "../../res/Sprite/1.png",
            "../../res/Sprite/2.png",
            "../../res/Sprite/3.png",
            "../../res/Sprite/4.png",
            "../../res/Sprite/3.png",
            "../../res/Sprite/2.png",
            "../../res/Sprite/1.png"];

        for (var i = 0; i < spriteFrames.length; i++) { //  Add frames to the sprite
            gameSprite.addImageFrame(spriteFrames[i]);
        }

        //*********************************************
        //  Global Game Objects parameters
        //*********************************************
        var g_GameObjectAx = -1,
            g_GameObjectAxDelta = 0.00001;

        //**************************
        //  Game Record and time
        //**************************
        var gameRecord = 0,
            gameRecordCoef = 10,
            highestGameRecord = 0,
            gameTime = 0;

        //  Barriers on the screen
        var barriersVisible = [];

        //  The flag indicating if the game is stopped or paused
        var isStop = true;

        //  The count of game rounds
        var roundCount = 0;

        function resetGame() {
            g_GameObjectAx = -1;
            g_GameObjectAxDelta = 0.00001;

            if (gameRecord > highestGameRecord) {
                highestGameRecord = gameRecord; //  Store the highest record
            }

            gameRecord = 0;
            gameRecordCoef = 10.5;
            gameTime = 0;

            for (var i = 0; i < barriersVisible.length; i++) {
                barriersVisible[i].resetFlagAndPos(GraphicsContext.width(), 0);
            }
            barriersVisible = [];

            BarrierGenerator.reset();

            isStop = true;

            Timer.stop();
        }

        Engine.start(function(){
            //********************************
            //  Check if the user click start
            //********************************
            if (InputClass.clickCount !== 0) {
                isStop = false;
            }
            //  Clear all
            GraphicsContext.clearCanvas();

            //***************************
            //  Get mouse position
            //***************************
            mouseX = InputClass.mouseX;
            mouseY = InputClass.mouseY;

            //*******************************
            //  Show basic game scene
            //*******************************
            spriteCenterY = gameSprite.getCenterY();
            spriteCenterX = gameSprite.getCenterX();

            if (mouseY != spriteCenterY) {
                spriteAy = (mouseY - spriteCenterY) * spriteAyCoef / GraphicsContext.height();
            }

            //  Increase the control sensitivity with time
            spriteAy += g_GameObjectAxDelta;

            spriteAngle = (Math.atan((mouseY - spriteCenterY) / (mouseX - spriteCenterX)) * (180 / Math.PI)) * 0.025;

            gameSprite.update(spriteAngle, 0, spriteAy);
            gameSprite.draw();

            //****************************************************************DEBUG****************************************
            // GraphicsContext.drawPolygon(gameSprite.bounding, "blue");

            //  The drawing below this line will be drawn under whatever is on the canvas
            GraphicsContext.setGlobalComposition("destination-over");

            //**********************************************
            //  Alternate between front and back sky images
            //**********************************************
            frontSky.update(0, g_GameObjectAx, 0);
            frontSky.draw();
            backSky.update(0, g_GameObjectAx, 0);
            backSky.draw();
            if (backSky.x <= 0) { //    Swap front and back sky images
                var tmp = frontSky;
                frontSky = backSky;
                backSky = tmp;
                backSky.x = backSkyPosX;
            }

            //  The drawing below this line will be drawn on top of whatever is on the canvas
            GraphicsContext.setGlobalComposition("source-over");

            //*************************************
            //  Pause or show main game process
            //*************************************

            if (!Barriers.BarrierLoading.isDone() ||
                !ImageLoading.isDone()) {
                //  Show loading scene
                UIClass.showLoadingScene();
            } else {
                if (isStop) {
                    if (roundCount === 0) {
                        UIClass.showPauseScene(); //    Show pause scene
                    } else {
                        UIClass.showRestartScene(highestGameRecord);
                    }
                } else {
                    //*************************************
                    //  Show main game process
                    //*************************************
                    if (!Timer.isRunning()) { //    If the Timer is not started, start the counting
                        Timer.start(); //   Timer only start once per round
                        roundCount++; //  Game run count add one
                    }

                    //********************************
                    //  Compute time and game record
                    //********************************
                    gameTime = Timer.totalTime();
                    gameRecord = parseInt(gameTime * gameRecordCoef);

                    //  Increase the game objects speed
                    g_GameObjectAx -= g_GameObjectAxDelta;

                    //******************************************
                    //  Show barriers based on record
                    //******************************************
                    BarrierGenerator.setLevel(gameRecord);
                    var thisBarrier = BarrierGenerator.getThisBarrier(gameTime, g_GameObjectAx);
                    if (thisBarrier !== null) {
                        barriersVisible.push(thisBarrier); //   If next barrier is available, push to the visible barriers array
                    }

                    for (var i = 0; i < barriersVisible.length; i++) {
                        if (barriersVisible[i].x + barriersVisible[i].width < 0) {
                            barriersVisible[i].resetFlagAndPos(GraphicsContext.width(), 0);
                            barriersVisible.splice(i, 1);
                        }
                        if (typeof barriersVisible[i] === 'undefined') console.log(i, barriersVisible, barriersVisible[i]);
                        barriersVisible[i].r += barriersVisible[i].dr; //   Update rotation of the barrier
                        barriersVisible[i].update(
                            barriersVisible[i].r,
                            barriersVisible[i].ax,
                            barriersVisible[i].ay);
                        barriersVisible[i].draw();
                        if (barriersVisible[i].x <= gameSprite.x + gameSprite.width) { //   If barrier top left x smaller than the sprite right x
                            //**************************************
                            //  If collided then restart the game
                            //**************************************
                            if (colliDetect.detect(gameSprite.bounding, barriersVisible[i].bounding)) {
                                Engine.reset(resetGame);
                            }
                        }
                        //****************************************************************DEBUG****************************************
                        // GraphicsContext.drawPolygon(barriersVisible[i].bounding, "blue");
                    }

                    //***********************************************************
                    //  Show game record at the top right corner of the canvas
                    //  and the highest record at the top left corner
                    //***********************************************************
                    UIClass.showGameRecord(gameRecord, highestGameRecord);
                }
            }
        });
    }
};

module.exports = Game;
