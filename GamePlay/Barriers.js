/**********************************************************************************
									
									Game Play Barriers

									Created By Andy

	Overview:
	Barrier objects declarations
								
***********************************************************************************/

//	Starting top left position for barriers
var barriersStartingTopLeftPos = new Vector(GraphicsContext.width() + 100, 0);

//	Finish loading flag
var barriersCount = 2;
var BarrierLoading = {
    isDone: function() {
        if (barriersList.length === barriersCount) {
            return true;
        }
        return false;
    }
};

//********************************
//	Barriers list
//********************************
var barriersList = [];

//********************************
//	Barrier: Trump
//********************************
var barrierWidth = 150,
    barrierHeight = 162,
    barrierBoundingPoints = [
		new Vector(53, 2),
		new Vector(74, 0),
		new Vector(113, 11),
		new Vector(149, 59),
		new Vector(83, 157),
		new Vector(53, 160),
		new Vector(11, 112),
		new Vector(1, 91),
		new Vector(10, 71),
		new Vector(18, 42)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(GraphicsContext.width() + 100, 0);
}

var barrierBoundingBox = new Box(
        barriersStartingTopLeftPos,
        barrierWidth,
        barrierHeight),

    barrierBounding = new Polygon(
        barrierBoundingPoints,
        barriersStartingTopLeftPos,
        barrierBoundingBox),

    barrierFrames = ["img/Barriers/Barrier1/1.png"];

var barrier = new ImageObject(
    barriersStartingTopLeftPos.x,
    barriersStartingTopLeftPos.y,
    barrierWidth,
    barrierHeight,
    barrierBounding);

for (var i = 0; i < barrierFrames.length; i++) {
    barrier.addImageFrame(barrierFrames[i]);
}

barriersList.push(barrier);

//********************************
//	Barrier: Hillary
//********************************
barrierWidth = 100;
barrierHeight = 122;
barrierBoundingPoints = [
	new Vector(21, 5),
	new Vector(49, 2),
	new Vector(52, 6),
	new Vector(62, 3),
	new Vector(83, 14),
	new Vector(97, 32),
	new Vector(100, 83),
	new Vector(95, 116),
	new Vector(75, 104),
	new Vector(60, 118),
	new Vector(45, 122),
	new Vector(27, 110),
	new Vector(18, 120),
	new Vector(9, 108),
	new Vector(9, 104),
	new Vector(0, 83),
	new Vector(4, 61),
	new Vector(2, 39)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(GraphicsContext.width() + 100, 0);
}

barrierBoundingBox = new Box(
    barriersStartingTopLeftPos,
    barrierWidth,
    barrierHeight);

barrierBounding = new Polygon(
    barrierBoundingPoints,
    barriersStartingTopLeftPos,
    barrierBoundingBox);

barrierFrames = ["img/Barriers/Barrier2/1.png"];

barrier = new ImageObject(
    barriersStartingTopLeftPos.x,
    barriersStartingTopLeftPos.y,
    barrierWidth,
    barrierHeight,
    barrierBounding);

for (var i = 0; i < barrierFrames.length; i++) {
    barrier.addImageFrame(barrierFrames[i]);
}

barriersList.push(barrier);

