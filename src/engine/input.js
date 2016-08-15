/*************************************************************************************
                                    Input Class

                                Created By Andy Zhou

    Overview:

    Responsible for getting user's input(mouse movements) and sending the
    command to the GraphicsClass to animate the scene.

*************************************************************************************/
var GraphicsContext = require('./graphics');
var Vector = require('./utility/vector');

var InputClass = {
    //  Mouse movement state
    _mouseMove: false,

    //*******************************************
    //  Mouse coordinates relative to the canvas
    //*******************************************
    _mouseX: 0,
    _mouseY: 0,
    _lastMouseX: 0,
    _lastMouseY: 0,

    _keys: [],
    _keyDown: [],

    get mouseX() {
        return this._mouseX;
    },

    get mouseY() {
        return this._mouseY;
    },

    //  The count of clicks on the canvas
    _clickCount: 0,
    _lastClick: new Vector(),

    get clickCount() {
        return this._clickCount;
    },

    get lastClick() {
        return this._lastClick;
    },

    _addMouseEvents: function() {
        //-------------------------------
        //  Get the mouse coordinates
        //-------------------------------
        document.addEventListener("mousemove", function(event) {
            var canvasOffsetLeft = GraphicsContext.offsetLeft();
            var canvasOffsetTop = GraphicsContext.offsetTop();
            if (InputClass._mouseMove) {
                InputClass._mouseX = event.pageX - canvasOffsetLeft;
                InputClass._mouseY = event.pageY - canvasOffsetTop;
                InputClass._lastMouseX = InputClass._mouseX;
                InputClass._lastMouseY = InputClass._mouseY;
            } else {
                InputClass._mouseX = InputClass._lastMouseX;
                InputClass._mouseY = InputClass._lastMouseY;
            }
        });

        //------------------------------
        //  Get the mouse movement state
        //------------------------------
        GraphicsContext.canvas().addEventListener("mouseenter", function(event) {
            InputClass._mouseMove = true;
        });
        GraphicsContext.canvas().addEventListener("mouseout", function(event) {
            InputClass._mouseMove = false;
        });

        //------------------------------
        //  Get clicks count
        //------------------------------
        GraphicsContext.canvas().addEventListener("click", function(event) {
            InputClass._clickCount++;
            InputClass._lastClick.x = InputClass._mouseX;
            InputClass._lastClick.y = InputClass._mouseY;
        });
    },

    addKey: function(keyCode) {
        if (this._keys.indexOf(keyCode) === -1) {
            this._keys.push(keyCode);
            this._keyDown[keyCode] = 0;
        }
    },

    keyPressedCount: function(keyCode) {
        return this._keyDown[keyCode];
    },

    //Listen to the user input and get the members data
    init: function(withMouseEvents) {
        if (withMouseEvents || true) {
            this._addMouseEvents();
        }

        document.addEventListener('keydown', function(e){
            var code = e.keyCode || e.which;
            if (InputClass._keys.indexOf(code) !== -1)
                InputClass._keyStates[code]++;
        });

        document.addEventListener('keyup', function(e){
            var code = e.keyCode || e.which;
            if (InputClass._keys.indexOf(code) !== -1)
                InputClass._keyStates[code]++;
        });
    },

    resetClicks: function() {
        this._clickCount = 0;
        this._lastClick = new Vector();
    }
};

module.exports = InputClass;
