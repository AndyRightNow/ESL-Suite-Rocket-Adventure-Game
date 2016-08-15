/*************************************************************************************
										Time Class

								   Created By Andy Zhou

	Overview:

	Used to track the passing time of the game

*************************************************************************************/


var Timer = {
	_totalTime: 0,
	_isPaused: true,
	_isStopped: true,

	start: function() {
		if (this._isStopped) {
			this._isPaused = false;
			this._isStopped = false;
			this._totalTime = 0;
		}
	},

	tick: function() {
		if (!this._isPaused && !this._isStopped) {
			this._totalTime++;
		}
	},

	pause: function() {
		this._isPaused = true;
	},

	resume: function() {
		this._isPaused = false;
	},

	stop: function() {
		this._isStopped = true;
	},

	totalTime: function() {
		return this._totalTime;
	},

	isRunning: function() {
		return !this._isStopped;
	}
};

module.exports = Timer;
