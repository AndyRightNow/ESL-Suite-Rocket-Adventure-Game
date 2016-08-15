/*************************************************************************************
                                ESL Suite Rocket Adventure Game

                                Created By Andy Zhou

*************************************************************************************/
var InputClass = require('./input');
var GraphicsContext = require('./graphics');
var Timer = require('./utility/timer');

//**************************
//  Engine Object
//**************************
var Engine = {
    _isPaused: false,
    _gameLoop: null,
    _isResetting: false,

    /*
     * Init basic facilities of the engine
     *
     * @param {String} canvasId: The id of the canvas
     */
    init: function(canvasId) {
        GraphicsContext.init(canvasId);
        InputClass.init();
    },

    /*
     * Reset the engine and the game
     *
     * @param {Function} gameResetFunc: The function to reset the game
     */
    reset: function(gameResetFunc) {
        this._isResetting = true;
        InputClass.resetClicks();
        gameResetFunc();
        this._isResetting = false;
    },

    /*
     * Start the game loop with the game
     *
     * @param {Function} gameMainFunc: The main game function
     * @param {Number} interval: The interval between two ticks. It's 1(ms) by default.
     */
    start: function(gameMainFunc, interval) {
        interval = interval || 1;
        interval = interval < 1 ? 1 : interval;

        this._gameLoop = setInterval(function(){
            if (!this._isPaused && !this._isResetting) {
                Timer.tick();
                gameMainFunc();
            }
        }, interval);
    },

    /*
     * Shut down the game loop
     *
     */
    shutdown: function() {
        clearInterval(this._gameLoop);
    }
};

module.exports = Engine;
