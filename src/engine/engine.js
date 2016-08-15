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

    init: function(canvasId) {
        GraphicsContext.init(canvasId);
        InputClass.init();
    },

    pause: function() {
        Timer.pause();
        this._isPaused = true;
    },

    resume: function() {
        Timer.resume();
        this._isPaused = false;
    },

    reset: function(gameResetFunc) {
        this._isResetting = true;
        InputClass.resetClicks();
        gameResetFunc();
        this._isResetting = false;
    },

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

    shutdown: function() {
        clearInterval(this._gameLoop);
    }
};

module.exports = Engine;
