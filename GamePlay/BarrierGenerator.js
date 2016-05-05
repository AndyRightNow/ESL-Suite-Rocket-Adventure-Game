/***********************************************************************************************
                                        Barrier Generator

                                        Created By Andy

    Overview:
    Barrier generator based on game record and game time

***********************************************************************************************/

var BarrierGenerator = {
    _record: 0,
    _level: 0,
    _lastBarrier: null,
    _lastBarrierIndex: null,
    _lastBarrierIssueTime: 0,
    _gapFromLastBarrier: 0, //  Counting from the top left pos
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
        var HARDNESS = 5000;
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
        var points = 10000;
        
        this._level = parseInt(record / points) === 0 ? 1 : record / points;
    },
    getThisBarrier: function(time, ax) {

        if (this._lastBarrier !== null) { //    Check if it's the first barrier issued
            var deltaTime = time - this._lastBarrierIssueTime;
            if (deltaTime * Math.abs(ax) <= this._gapFromLastBarrier) {
                return null;
            }
        }
        //********************************************
        //  Get a barrier different from last one
        //********************************************
        var thisBarrierIndex = Utility.getRandIndex(barriersList.length);
        if (thisBarrierIndex === this._lastBarrierIndex ||
            barriersList[thisBarrierIndex].used) {
            return null;
        }
        var thisBarrier = barriersList[thisBarrierIndex];
        thisBarrier.used = true;

        thisBarrier.setY(this._getRandY());
        this._gapFromLastBarrier = this._getRandGapFromLast();

        thisBarrier.ax = ax * (1 + Math.random());
        thisBarrier.ay = ax * (Math.random() * 0.5) * Utility.getPosiOrNega();

        thisBarrier.r = Math.random() * 10;
        thisBarrier.dr = Math.random() * Math.random() * 0.01;

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

