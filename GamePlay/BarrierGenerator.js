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
    _gapFromLastBarrier: 0, //	Counting from the top left pos
    _barriersAx: 0,
    _getRandY: function() {
        var randY = (Math.random() * 528314 * Math.random()) % GraphicsContext.height();
        if (this._lastBarrier !== null) {
            var lower = this._lastBarrier.y - this._lastBarrier.height;
            var upper = this._lastBarrier.y + this._lastBarrier.heigth;
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
            var levelDevider = this._level === 0 ? 1 : this._level;
            randGap = base + Math.random() * HARDNESS / levelDevider;
        }
        return randGap;
    },
    setLevel: function(record) {
        //********************************
        //	Reach a new level every 10000
        //********************************
        var level = parseInt(record / 10000);
        switch (level) {
            case 0:
                this._level = 0;
                break;
            case 1:
                this._level = 1;
                break;
            case 2:
                this._level = 2;
                break;
            case 3:
                this._level = 3;
                break;
            case 4:
                this._level = 4;
                break;
            case 5:
                this._level = 5;
                break;
            case 6:
                this._level = 6;
                break;
            case 7:
                this._level = 7;
                break;
            case 8:
                this._level = 8;
                break;
            case 9:
                this._level = 9;
                break;
            case 10:
                this._level = 10;
                break;
            default:
                this._level = 11;
                break;
        }
    },
    getThisBarrier: function(time, ax) {
        this._barriersAx = ax;

        if (this._lastBarrier !== null) { //	Check if it's the first barrier issued
            var deltaTime = time - this._lastBarrierIssueTime;
            if (deltaTime * Math.abs(ax) <= this._gapFromLastBarrier) {
                return null;
            }
        }
        //********************************************
        //	Get a barrier different from last one
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

        this._lastBarrier = thisBarrier;
        this._lastBarrierIndex = thisBarrierIndex;
        this._lastBarrierIssueTime = time;

        return thisBarrier;
    }
};

