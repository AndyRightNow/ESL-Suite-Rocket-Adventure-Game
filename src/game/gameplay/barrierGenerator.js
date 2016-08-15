/***********************************************************************************************
                                        Barrier Generator

                                        Created By Andy

    Overview:
    Barrier generator based on game record and game time

***********************************************************************************************/
//--------------------------------------
//  Dependencies
//--------------------------------------
var Barriers = require('./barriers');
var Utility = require('./../../engine/utility/utility');
var GraphicsContext = require('./../../engine/graphics');

var BarrierGenerator = {
    _record: 0,
    _level: 0,
    _lastBarrier: null,
    _lastBarrierIndex: null,
    _lastBarrierIssueTime: 0,
    _gapFromLastBarrier: 0, //  Counting from the top left pos

    _setRandSpeedAndRotation: function(barrier, ax, flags) {
        barrier.ax = ax * (1 + Math.random());
        barrier.ay = ax * (Math.random() * 0.5) * Utility.getPosiOrNega();
        barrier.r = Math.random() * 10;
        barrier.dr = Math.random() * Math.random() * 0.05;

        //***********************************************
        //  Check flags and disable certain attributes
        //***********************************************
        for (var i = 0; i < flags.length; i++) {
            switch (flags[i]) {
                case "No Rotation":
                    barrier.r = 0;
                    barrier.dr = 0;
                    break;
                case "No Y Acceleration":
                    barrier.ay = 0;
                    break;
                case "No X Acceleration":
                    barrier.ax = 0;
                    break;
            }
        }
    },

    _getRandY: function() {
        var randY = (Math.random() * 528314 * Math.random()) % GraphicsContext.height();
        if (this._lastBarrier !== null) {
            var lower = this._lastBarrier.y - this._lastBarrier.height;
            var upper = this._lastBarrier.y + this._lastBarrier.heigtt;
            while (randY >= lower && randY <= upper) {
                randY = (Math.random() * 528314 * Math.random()) % GraphicsContext.height();
            }
        }
        return randY;
    },

    _getRandGapFromLast: function() {
        var HARDNESS = 1500;

        var randGap = 0;

        if (this._lastBarrier !== null) {
            var base = this._lastBarrier.width;
            var levelDevider = this._level;
            randGap = base + Math.random() * HARDNESS / levelDevider;
        }
        return randGap;
    },

    setLevel: function(record) {
        //************************************************
        //  Caluculate level based on certain points
        //************************************************
        var points = 3000;

        this._level = parseInt(record / points) === 0 ? 1 : record / points;
    },

    getThisBarrier: function(time, ax) {

        if (this._lastBarrier !== null) { //    Check if it's the first barrier issued
            var deltaTime = time - this._lastBarrierIssueTime;
            if (deltaTime * Math.abs(ax) <= this._gapFromLastBarrier) {
                return null;
            }
        }
        //******************************************************
        //  Get a barrier unused and different from last one
        //******************************************************
        var thisBarrierIndex = Utility.getRandIndex(Barriers.barriersList.length);
        if (thisBarrierIndex === this._lastBarrierIndex ||
            Barriers.barriersList[thisBarrierIndex].used) {
            return null;
        }
        var thisBarrier = Barriers.barriersList[thisBarrierIndex];
        thisBarrier.used = true;

        this._setRandSpeedAndRotation(thisBarrier, ax, thisBarrier.flags);

        thisBarrier.setY(this._getRandY());
        this._gapFromLastBarrier = this._getRandGapFromLast();

        this._lastBarrier = thisBarrier;
        this._lastBarrierIndex = thisBarrierIndex;
        this._lastBarrierIssueTime = time;

        return thisBarrier;
    },
    reset: function() {
        this._record = 0;
        this._level = 0;
        this._lastBarrier = null;
        this._lastBarrierIndex = null;
        this._lastBarrierIssueTime = 0;
        this._gapFromLastBarrier = 0; //  Counting from the top left pos
    }
};

module.exports = BarrierGenerator;
