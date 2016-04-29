/*************************************************************************************
										Utility

								   Created By Andy Zhou

	Overview:

	General utilities.

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
	}
};
