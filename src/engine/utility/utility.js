/*************************************************************************************
										Utility

								   Created By Andy Zhou

	Overview:

	General utilities.

*************************************************************************************/


//***********************
//	General Utility
//***********************
var Utility = {
	//*********************************************
	//	Get a random index in within a range
	//*********************************************
	getRandIndex: function(upperbound){
		return parseInt((Math.random() * upperbound * 10 + Math.random() * upperbound * 10) % upperbound);
	},

	//**************************
	//	Randomly generate -1 or 1
	//**************************
	getPosiOrNega: function(){
		var arr = [1, -1];
		return arr[Utility.getRandIndex(2)];
	}
};

module.exports = Utility;
