//--------------------------------------
//  Dependencies
//--------------------------------------
var GraphicsContext = require('./../engine/graphics');

var UIClass = {
    //*******************************************
    //  Show the pause scene,
    //  i.e. the line of word "Click to start"
    //  and the dark background
    //*******************************************
    _showDarkBackground: function(){
        GraphicsContext.canvasCtx.fillStyle = "rgba(0, 0, 0, 0.7)";
        GraphicsContext.canvasCtx.fillRect(0, 0, GraphicsContext.width(), GraphicsContext.height());
    },
    _showText: function(font, baseline, align, style, text, width, height){
        GraphicsContext.canvasCtx.font = font;
        GraphicsContext.canvasCtx.textBaseline = baseline;
        GraphicsContext.canvasCtx.textAlign = align;
        GraphicsContext.canvasCtx.fillStyle = style;
        GraphicsContext.canvasCtx.fillText(
            text,
            width,
            height);
    },
    showPauseScene: function() {
        GraphicsContext.save();
        this._showDarkBackground();
        this._showText(
            "bolder 84px Roboto",
            "middle",
            "center",
            "white",
            "Click to Start",
            GraphicsContext.width() * 0.5,
            GraphicsContext.height() * 0.5);
        GraphicsContext.restore();
    },
    showLoadingScene: function(){
        GraphicsContext.save();
        this._showDarkBackground();
        this._showText(
            "bolder 84px Roboto",
            "middle",
            "center",
            "white",
            "Loading...",
            GraphicsContext.width() * 0.5,
            GraphicsContext.height() * 0.5);
        GraphicsContext.restore();
    },
    showGameRecord: function(record, high){
        GraphicsContext.save();

        //*********************************
        //  Show current real-time record
        //*********************************
        this._showText(
            "bolder 36px Roboto",
            "top",
            "end",
            "white",
            record,
            GraphicsContext.width() * 0.95,
            GraphicsContext.height() * 0.05);

        //*********************************
        //  Show the highest record
        //*********************************
        this._showText(
            "bolder 36px Roboto",
            "top",
            "start",
            "white",
            "Highest: " + high,
            GraphicsContext.width() * 0.05,
            GraphicsContext.height() * 0.05);
        GraphicsContext.restore();
    },
    showRestartScene: function(high){
        GraphicsContext.save();
        this._showDarkBackground();
        this._showText(
            "bolder 48px Roboto",
            "bottom",
            "center",
            "white",
            "Highest: " + high,
            GraphicsContext.width() * 0.5,
            GraphicsContext.height() * 0.4);
        this._showText(
            "bolder 84px Roboto",
            "top",
            "center",
            "white",
            "Click to Restart",
            GraphicsContext.width() * 0.5,
            GraphicsContext.height() * 0.4);
        GraphicsContext.restore();
    }
};

module.exports = UIClass;
