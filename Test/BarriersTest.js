/**********************************************************************************
									
									Game Play Barriers Test
								
***********************************************************************************/
console.log(barriersList);
setInterval(function() {
    if (BarrierLoading.isDone()) {
        GraphicsContext.clearCanvas();
        for (var i = 0; i < barriersList.length; i++) {
            barriersList[i].update(0, -Math.random(), 0);
            barriersList[i].draw();
        }
    }
});

