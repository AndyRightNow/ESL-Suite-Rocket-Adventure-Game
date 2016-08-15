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
		return parseInt((Math.random() * upperbound + Math.random() * upperbound) % upperbound);
	},

	//**************************
	//	Randomly generate -1 or 1
	//**************************
	getPosiOrNega: function(){
		var arr = [1, -1];
		return arr[parseInt((Math.random() * 10 * Math.random() * 10) % 2)];
	}
};

module.exports = Utility;
