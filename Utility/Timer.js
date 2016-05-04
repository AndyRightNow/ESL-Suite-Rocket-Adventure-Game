/*************************************************************************************
										Time Class

								   Created By Andy Zhou

	Overview:

	Used to track the passing time of the game

*************************************************************************************/

"use strict";


var Timer = {
	_date: 0,
	_totalTime: 0,
	_startTime: 0,
	_started: false,
	_reset: function(){
		this._startTime = 0;
		this._totalTime = 0;
		this._date = new Date();
	},
	start: function(){
		this._date = new Date();
		var h = this._date.getUTCHours();
		var m = this._date.getUTCMinutes();
		var s = this._date.getUTCSeconds();
		var ms = this._date.getUTCMilliseconds();
		var curTime = h * 60 * 60 * 1000 + m * 60 * 1000 + s * 1000 + ms;
		this._startTime = curTime;
		this._started = true;
	},
	stop: function(){
		this._started = false;
		this._reset();
	},
	totalTime: function(){
		this._date = new Date();
		var h = this._date.getUTCHours();
		var m = this._date.getUTCMinutes();
		var s = this._date.getUTCSeconds();
		var ms = this._date.getUTCMilliseconds();
		var curTime = h * 60 * 60 * 1000 + m * 60 * 1000 + s * 1000 + ms;
		this._totalTime = curTime - this._startTime;
		return this._totalTime;
	},
	isRunning: function(){
		return this._started;
	}
};