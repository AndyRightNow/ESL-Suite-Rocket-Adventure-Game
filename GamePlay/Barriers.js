/**********************************************************************************
                                    
                                    Game Play Barriers

                                    Created By Andy

    Overview:
    Barrier objects declarations
                                
***********************************************************************************/

//  Starting top left position for barriers
var barriersStartingTopLeftPos = new Vector(GraphicsContext.width() + 1, 0);

//  Finish loading flag
var barriersCount = 10;
var BarrierLoading = {
    isDone: function() {
        if (barriersList.length === barriersCount) {
            return true;
        }
        return false;
    }
};

//********************************
//  Barriers list
//********************************
var barriersList = [];

//********************************
//  Barrier: Rock 1
//********************************
var barrierWidth = 135,
    barrierHeight = 87,
    barrierBoundingPoints = [
    new Vector(33, 24),
    new Vector(59, 9),
    new Vector(74, 2),
    new Vector(134, 47),
    new Vector(128, 65),
    new Vector(102, 82),
    new Vector(70, 82),
    new Vector(56, 87),
    new Vector(32, 72),
    new Vector(9, 69),
    new Vector(1, 60),
    new Vector(17, 44),
    new Vector(20, 35),
    new Vector(27, 35)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(barriersStartingTopLeftPos.x, 0);
}

var barrierBoundingBox = new Box(
        barriersStartingTopLeftPos,
        barrierWidth,
        barrierHeight),

    barrierBounding = new Polygon(
        barrierBoundingPoints,
        barriersStartingTopLeftPos,
        barrierBoundingBox),

    barrierFrames = ["img/Barriers/3.png"],

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

//********************************
//  Barrier: Rock 1
//********************************
barrierWidth = 135;
barrierHeight = 87;
barrierBoundingPoints = [
    new Vector(33, 24),
    new Vector(59, 9),
    new Vector(74, 2),
    new Vector(134, 47),
    new Vector(128, 65),
    new Vector(102, 82),
    new Vector(70, 82),
    new Vector(56, 87),
    new Vector(32, 72),
    new Vector(9, 69),
    new Vector(1, 60),
    new Vector(17, 44),
    new Vector(20, 35),
    new Vector(27, 35)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(barriersStartingTopLeftPos.x, 0);
}

barrierBoundingBox = new Box(
    barriersStartingTopLeftPos,
    barrierWidth,
    barrierHeight);

barrierBounding = new Polygon(
    barrierBoundingPoints,
    barriersStartingTopLeftPos,
    barrierBoundingBox);

barrierFrames = ["img/Barriers/3.png"];

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

//********************************
//  Barrier: Rock 1
//********************************
barrierWidth = 135;
barrierHeight = 87;
barrierBoundingPoints = [
    new Vector(33, 24),
    new Vector(59, 9),
    new Vector(74, 2),
    new Vector(134, 47),
    new Vector(128, 65),
    new Vector(102, 82),
    new Vector(70, 82),
    new Vector(56, 87),
    new Vector(32, 72),
    new Vector(9, 69),
    new Vector(1, 60),
    new Vector(17, 44),
    new Vector(20, 35),
    new Vector(27, 35)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(barriersStartingTopLeftPos.x, 0);
}

barrierBoundingBox = new Box(
    barriersStartingTopLeftPos,
    barrierWidth,
    barrierHeight);

barrierBounding = new Polygon(
    barrierBoundingPoints,
    barriersStartingTopLeftPos,
    barrierBoundingBox);

barrierFrames = ["img/Barriers/3.png"];

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
//********************************
//  Barrier: Rock 1
//********************************
barrierWidth = 135;
barrierHeight = 87;
barrierBoundingPoints = [
    new Vector(33, 24),
    new Vector(59, 9),
    new Vector(74, 2),
    new Vector(134, 47),
    new Vector(128, 65),
    new Vector(102, 82),
    new Vector(70, 82),
    new Vector(56, 87),
    new Vector(32, 72),
    new Vector(9, 69),
    new Vector(1, 60),
    new Vector(17, 44),
    new Vector(20, 35),
    new Vector(27, 35)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(barriersStartingTopLeftPos.x, 0);
}

barrierBoundingBox = new Box(
    barriersStartingTopLeftPos,
    barrierWidth,
    barrierHeight);

barrierBounding = new Polygon(
    barrierBoundingPoints,
    barriersStartingTopLeftPos,
    barrierBoundingBox);

barrierFrames = ["img/Barriers/3.png"];

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
//********************************
//  Barrier: Rock 1
//********************************
barrierWidth = 135;
barrierHeight = 87;
barrierBoundingPoints = [
    new Vector(33, 24),
    new Vector(59, 9),
    new Vector(74, 2),
    new Vector(134, 47),
    new Vector(128, 65),
    new Vector(102, 82),
    new Vector(70, 82),
    new Vector(56, 87),
    new Vector(32, 72),
    new Vector(9, 69),
    new Vector(1, 60),
    new Vector(17, 44),
    new Vector(20, 35),
    new Vector(27, 35)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(barriersStartingTopLeftPos.x, 0);
}

barrierBoundingBox = new Box(
    barriersStartingTopLeftPos,
    barrierWidth,
    barrierHeight);

barrierBounding = new Polygon(
    barrierBoundingPoints,
    barriersStartingTopLeftPos,
    barrierBoundingBox);

barrierFrames = ["img/Barriers/3.png"];

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
//********************************
//  Barrier: Rock 1
//********************************
barrierWidth = 135;
barrierHeight = 87;
barrierBoundingPoints = [
    new Vector(33, 24),
    new Vector(59, 9),
    new Vector(74, 2),
    new Vector(134, 47),
    new Vector(128, 65),
    new Vector(102, 82),
    new Vector(70, 82),
    new Vector(56, 87),
    new Vector(32, 72),
    new Vector(9, 69),
    new Vector(1, 60),
    new Vector(17, 44),
    new Vector(20, 35),
    new Vector(27, 35)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(barriersStartingTopLeftPos.x, 0);
}

barrierBoundingBox = new Box(
    barriersStartingTopLeftPos,
    barrierWidth,
    barrierHeight);

barrierBounding = new Polygon(
    barrierBoundingPoints,
    barriersStartingTopLeftPos,
    barrierBoundingBox);

barrierFrames = ["img/Barriers/3.png"];

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
//********************************
//  Barrier: Rock 1
//********************************
barrierWidth = 135;
barrierHeight = 87;
barrierBoundingPoints = [
    new Vector(33, 24),
    new Vector(59, 9),
    new Vector(74, 2),
    new Vector(134, 47),
    new Vector(128, 65),
    new Vector(102, 82),
    new Vector(70, 82),
    new Vector(56, 87),
    new Vector(32, 72),
    new Vector(9, 69),
    new Vector(1, 60),
    new Vector(17, 44),
    new Vector(20, 35),
    new Vector(27, 35)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(barriersStartingTopLeftPos.x, 0);
}

barrierBoundingBox = new Box(
    barriersStartingTopLeftPos,
    barrierWidth,
    barrierHeight);

barrierBounding = new Polygon(
    barrierBoundingPoints,
    barriersStartingTopLeftPos,
    barrierBoundingBox);

barrierFrames = ["img/Barriers/3.png"];

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
//********************************
//  Barrier: Rock 1
//********************************
barrierWidth = 135;
barrierHeight = 87;
barrierBoundingPoints = [
    new Vector(33, 24),
    new Vector(59, 9),
    new Vector(74, 2),
    new Vector(134, 47),
    new Vector(128, 65),
    new Vector(102, 82),
    new Vector(70, 82),
    new Vector(56, 87),
    new Vector(32, 72),
    new Vector(9, 69),
    new Vector(1, 60),
    new Vector(17, 44),
    new Vector(20, 35),
    new Vector(27, 35)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(barriersStartingTopLeftPos.x, 0);
}

barrierBoundingBox = new Box(
    barriersStartingTopLeftPos,
    barrierWidth,
    barrierHeight);

barrierBounding = new Polygon(
    barrierBoundingPoints,
    barriersStartingTopLeftPos,
    barrierBoundingBox);

barrierFrames = ["img/Barriers/3.png"];

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
//********************************
//  Barrier: Rock 1
//********************************
barrierWidth = 135;
barrierHeight = 87;
barrierBoundingPoints = [
    new Vector(33, 24),
    new Vector(59, 9),
    new Vector(74, 2),
    new Vector(134, 47),
    new Vector(128, 65),
    new Vector(102, 82),
    new Vector(70, 82),
    new Vector(56, 87),
    new Vector(32, 72),
    new Vector(9, 69),
    new Vector(1, 60),
    new Vector(17, 44),
    new Vector(20, 35),
    new Vector(27, 35)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(barriersStartingTopLeftPos.x, 0);
}

barrierBoundingBox = new Box(
    barriersStartingTopLeftPos,
    barrierWidth,
    barrierHeight);

barrierBounding = new Polygon(
    barrierBoundingPoints,
    barriersStartingTopLeftPos,
    barrierBoundingBox);

barrierFrames = ["img/Barriers/3.png"];

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
//********************************
//  Barrier: Rock 1
//********************************
barrierWidth = 135;
barrierHeight = 87;
barrierBoundingPoints = [
    new Vector(33, 24),
    new Vector(59, 9),
    new Vector(74, 2),
    new Vector(134, 47),
    new Vector(128, 65),
    new Vector(102, 82),
    new Vector(70, 82),
    new Vector(56, 87),
    new Vector(32, 72),
    new Vector(9, 69),
    new Vector(1, 60),
    new Vector(17, 44),
    new Vector(20, 35),
    new Vector(27, 35)];

for (var i = 0; i < barrierBoundingPoints.length; i++) {
    barrierBoundingPoints[i].translate(barriersStartingTopLeftPos.x, 0);
}

barrierBoundingBox = new Box(
    barriersStartingTopLeftPos,
    barrierWidth,
    barrierHeight);

barrierBounding = new Polygon(
    barrierBoundingPoints,
    barriersStartingTopLeftPos,
    barrierBoundingBox);

barrierFrames = ["img/Barriers/3.png"];

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

//******************************************************DEBUG****************************************
for (var i = 0; i < barriersList.length; i++){
    console.log(
        barriersList[i].bounding.points[0].x,
        barriersList[i].bounding.points[0].y);
}