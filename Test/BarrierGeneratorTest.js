/***********************************************************************************************
										
										Barrier Generator Test

***********************************************************************************************/
Timer.start();
var time = 0;
var barrierOnTheScreen = [];
var ax = -1;
BarrierGenerator.setLevel(1000000);
setInterval(function(){
	GraphicsContext.clearCanvas();
	time = Timer.totalTime();
	var thisBarrier = BarrierGenerator.getThisBarrier(time, ax);
	if (thisBarrier !== null){
		barrierOnTheScreen.push(thisBarrier);
	}
		for (var i = 0; i < barrierOnTheScreen.length; i++){
			if (barrierOnTheScreen[i].x + barrierOnTheScreen[i].width < 0){
				barrierOnTheScreen[i].used = false;
				barrierOnTheScreen[i].x = GraphicsContext.width() + 1;
				barrierOnTheScreen.splice(i, 1);
			}
			barrierOnTheScreen[i].update(0, ax, 0);
			barrierOnTheScreen[i].draw();
		}
}, 1);