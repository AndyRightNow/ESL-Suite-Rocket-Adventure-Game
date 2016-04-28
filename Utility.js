/*************************************************************************************
										Utility

								   Created By Andy Zhou

	Overview:

	Responsible for game record calculation, collision detection of objects, barrier 
	generation and other computations. It interacts with both UIClass and GraphicsClass.

*************************************************************************************/

"use strict";

//***********************
//	General Utility
//***********************
var Utility = {
	//*********************************************
	//	Get a random index in within a range
	//*********************************************
	getRandIndex: function(upperbound){
		return parseInt((Math.random() * upperbound + Math.random() * upperbound) % upperbound);
	},

	colliDetect: function(obj1, obj2){

	}
};

//**********************
//	Game Timer
//**********************
var Timer = {
	lastTick: 0,
	currTick: 0,
	start: function(){},
	stop: function(){},
	reset: function(){},
	tick: function(){}
};

