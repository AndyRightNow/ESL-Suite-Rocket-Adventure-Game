/**********************************************************************************
									
									Game Play Barriers Test
								
***********************************************************************************/
console.log(barriersList);
setInterval(function() {
    if (BarrierLoading.isDone()) {
        GraphicsContext.clearCanvas();
        for (var i = 0; i < barriersList.length; i++) {
            barriersList[i].update(Math.random(), -Math.random(), 0);
            barriersList[i].draw();
            // GraphicsContext.drawPolygon(barriersList[i].bounding, "blue");
        }
    }
});

