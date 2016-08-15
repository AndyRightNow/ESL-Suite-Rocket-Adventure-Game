/**********************************************************************************

                                    Game Play Barriers

                                    Created By Andy

    Overview:
    Barrier objects declarations

***********************************************************************************/

var GraphicsContext = require('./../../engine/graphics');
var Vector = require('./../../engine/utility/vector');
var Box = require('./../../engine/utility/shape').Box;
var Polygon = require('./../../engine/utility/shape').Polygon;
var ImageObject = require('./gameObjects').ImageObject;

var Barriers = {
    _barriersCount: 11,
    get barriersCount() {
        return this._barriersCount;
    },

    _barriersList: [],
    get barriersList() {
        return this._barriersList;
    },

    BarrierLoading: {
        isDone: function() {
            if (Barriers.barriersList.length === Barriers.barriersCount) {
                return true;
            }
            return false;
        }
    },
    init: function() {
        //  Starting top left position for barriers
        var barriersStartingTopLeftPos = new Vector(GraphicsContext.width() + 1, 0);

        //********************************
        //  Barrier: Rock 1
        //********************************
        var barrierWidth = 65,
            barrierHeight = 85,
            barrierBoundingPoints = [
                new Vector(4, 21),
                new Vector(20, 1),
                new Vector(28, 0),
                new Vector(39, 10),
                new Vector(59, 26),
                new Vector(64, 45),
                new Vector(57, 64),
                new Vector(53, 66),
                new Vector(52, 74),
                new Vector(48, 76),
                new Vector(36, 74),
                new Vector(25, 83),
                new Vector(12, 81),
                new Vector(0, 58),
                new Vector(2, 42)];

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

            barrierFrames = ["../../res/Barriers/1.png"],

            barrier = new ImageObject(
                barriersStartingTopLeftPos.x,
                barriersStartingTopLeftPos.y,
                barrierWidth,
                barrierHeight,
                barrierBounding);
        barrier.flags = [];

        for (var i = 0; i < barrierFrames.length; i++) {
            barrier.addImageFrame(barrierFrames[i]);
        }

        Barriers.barriersList.push(barrier);

        //********************************
        //  Barrier: Earth
        //********************************
        barrierWidth = 200;
        barrierHeight = 200;
        barrierBoundingPoints = [
            new Vector(97, 4),
            new Vector(140, 13),
            new Vector(179, 43),
            new Vector(198, 98),
            new Vector(185, 144),
            new Vector(151, 183),
            new Vector(97, 197),
            new Vector(49, 184),
            new Vector(22, 162),
            new Vector(3, 106),
            new Vector(9, 60),
            new Vector(40, 25)];

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

        barrierFrames = ["../../res/Barriers/2.png"];

        barrier = new ImageObject(
            barriersStartingTopLeftPos.x,
            barriersStartingTopLeftPos.y,
            barrierWidth,
            barrierHeight,
            barrierBounding);
        barrier.flags = [];

        for (var i = 0; i < barrierFrames.length; i++) {
            barrier.addImageFrame(barrierFrames[i]);
        }

        Barriers.barriersList.push(barrier);

        //********************************
        //  Barrier: Moon
        //********************************
        barrierWidth = 100;
        barrierHeight = 100;
        barrierBoundingPoints = [
            new Vector(48, 0),
            new Vector(71, 6),
            new Vector(93, 26),
            new Vector(100, 49),
            new Vector(93, 75),
            new Vector(77, 91),
            new Vector(50, 98),
            new Vector(25, 91),
            new Vector(10, 80),
            new Vector(0, 52),
            new Vector(8, 25),
            new Vector(19, 10)];

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

        barrierFrames = ["../../res/Barriers/4.png"];

        barrier = new ImageObject(
            barriersStartingTopLeftPos.x,
            barriersStartingTopLeftPos.y,
            barrierWidth,
            barrierHeight,
            barrierBounding);
        barrier.flags = [];

        for (var i = 0; i < barrierFrames.length; i++) {
            barrier.addImageFrame(barrierFrames[i]);
        }

        Barriers.barriersList.push(barrier);
        //********************************
        //  Barrier: Plastic bag
        //********************************
        barrierWidth = 150;
        barrierHeight = 172;
        barrierBoundingPoints = [
            new Vector(69, 1),
            new Vector(75, 1),
            new Vector(74, 12),
            new Vector(78, 44),
            new Vector(100, 60),
            new Vector(128, 51),
            new Vector(136, 47),
            new Vector(149, 57),
            new Vector(144, 75),
            new Vector(103, 120),
            new Vector(96, 141),
            new Vector(67, 171),
            new Vector(12, 126),
            new Vector(0, 107),
            new Vector(7, 103),
            new Vector(29, 98),
            new Vector(48, 70),
            new Vector(48, 65),
            new Vector(45, 55),
            new Vector(49, 30),
            new Vector(55, 10)];

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

        barrierFrames = ["../../res/Barriers/5.png"];

        barrier = new ImageObject(
            barriersStartingTopLeftPos.x,
            barriersStartingTopLeftPos.y,
            barrierWidth,
            barrierHeight,
            barrierBounding);
        barrier.flags = [];

        for (var i = 0; i < barrierFrames.length; i++) {
            barrier.addImageFrame(barrierFrames[i]);
        }

        Barriers.barriersList.push(barrier);
        //********************************
        //  Barrier: Spaceship
        //********************************
        barrierWidth = 180;
        barrierHeight = 70;

        barrierBoundingPoints = [
        new Vector(2, 35),
        new Vector(18, 34),
        new Vector(49, 21),
        new Vector(86, 17),
        new Vector(113, 6),
        new Vector(132, 1),
        new Vector(175, 0),
        new Vector(135, 11),
        new Vector(122, 16),
        new Vector(141, 19),
        new Vector(140, 25),
        new Vector(155, 25),
        new Vector(156, 40),
        new Vector(142, 41),
        new Vector(141, 47),
        new Vector(121, 51),
        new Vector(136, 57),
        new Vector(175, 70),
        new Vector(115, 66),
        new Vector(86, 52),
        new Vector(64, 52),
        new Vector(19, 35)];

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

        barrierFrames = ["../../res/Barriers/6.png"];

        barrier = new ImageObject(
            barriersStartingTopLeftPos.x,
            barriersStartingTopLeftPos.y,
            barrierWidth,
            barrierHeight,
            barrierBounding);
        barrier.flags = [];

        for (var i = 0; i < barrierFrames.length; i++) {
            barrier.addImageFrame(barrierFrames[i]);
        }

        barrier.flags = ["No Rotation", "No Y Acceleration"];

        Barriers.barriersList.push(barrier);
        //********************************
        //  Barrier: Spaceship
        //********************************
        barrierWidth = 100;
        barrierHeight = 40;

        barrierBoundingPoints = [
        new Vector(28, 13),
        new Vector(34, 5),
        new Vector(44, 1),
        new Vector(55, 0),
        new Vector(65, 5),
        new Vector(80, 3),
        new Vector(98, 8),
        new Vector(81, 18),
        new Vector(77, 25),
        new Vector(70, 30),
        new Vector(55, 37),
        new Vector(36, 39),
        new Vector(30, 39),
        new Vector(27, 37),
        new Vector(9, 38),
        new Vector(12, 23)];

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

        barrierFrames = ["../../res/Barriers/7.png"];

        barrier = new ImageObject(
            barriersStartingTopLeftPos.x,
            barriersStartingTopLeftPos.y,
            barrierWidth,
            barrierHeight,
            barrierBounding);
        barrier.flags = [];

        for (var i = 0; i < barrierFrames.length; i++) {
            barrier.addImageFrame(barrierFrames[i]);
        }

        barrier.flags = ["No Rotation"];
        Barriers.barriersList.push(barrier);
        //********************************
        //  Barrier: Slipper
        //********************************
        barrierWidth = 70;
        barrierHeight = 32;

        barrierBoundingPoints = [
            new Vector(8, 0),
            new Vector(25, 6),
            new Vector(40, 2),
            new Vector(54, 10),
            new Vector(58, 18),
            new Vector(69, 23),
            new Vector(67, 29),
            new Vector(45, 29),
            new Vector(16, 19),
            new Vector(2, 12),
            new Vector(1, 3)];

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

        barrierFrames = ["../../res/Barriers/8.png"];

        barrier = new ImageObject(
            barriersStartingTopLeftPos.x,
            barriersStartingTopLeftPos.y,
            barrierWidth,
            barrierHeight,
            barrierBounding);
        barrier.flags = [];

        for (var i = 0; i < barrierFrames.length; i++) {
            barrier.addImageFrame(barrierFrames[i]);
        }

        Barriers.barriersList.push(barrier);
        //********************************
        //  Barrier: Bottle
        //********************************

        barrierWidth = 40;
        barrierHeight = 149;
        barrierBoundingPoints = [
            new Vector(26, 3),
            new Vector(31, 56),
            new Vector(37, 64),
            new Vector(38, 145),
            new Vector(2, 145),
            new Vector(2, 67),
            new Vector(9, 55),
            new Vector(13, 0)];

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

        barrierFrames = ["../../res/Barriers/9.png"];

        barrier = new ImageObject(
            barriersStartingTopLeftPos.x,
            barriersStartingTopLeftPos.y,
            barrierWidth,
            barrierHeight,
            barrierBounding);
        barrier.flags = [];

        for (var i = 0; i < barrierFrames.length; i++) {
            barrier.addImageFrame(barrierFrames[i]);
        }

        Barriers.barriersList.push(barrier);
        //********************************
        //  Barrier: Black hole
        //********************************

        barrierWidth = 100;
        barrierHeight = 100;
        barrierBoundingPoints = [
            new Vector(50, 12),
            new Vector(65, 13),
            new Vector(83, 29),
            new Vector(89, 54),
            new Vector(80, 71),
            new Vector(65, 83),
            new Vector(51, 88),
            new Vector(33, 83),
            new Vector(18, 72),
            new Vector(11, 52),
            new Vector(17, 32),
            new Vector(31, 18)];

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

        barrierFrames = ["../../res/Barriers/10.png"];

        barrier = new ImageObject(
            barriersStartingTopLeftPos.x,
            barriersStartingTopLeftPos.y,
            barrierWidth,
            barrierHeight,
            barrierBounding);
        barrier.flags = [];

        for (var i = 0; i < barrierFrames.length; i++) {
            barrier.addImageFrame(barrierFrames[i]);
        }

        Barriers.barriersList.push(barrier);

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

        barrierFrames = ["../../res/Barriers/3.png"];

        barrier = new ImageObject(
            barriersStartingTopLeftPos.x,
            barriersStartingTopLeftPos.y,
            barrierWidth,
            barrierHeight,
            barrierBounding);
        barrier.flags = [];

        for (var i = 0; i < barrierFrames.length; i++) {
            barrier.addImageFrame(barrierFrames[i]);
        }

        Barriers.barriersList.push(barrier);

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

        barrierFrames = ["../../res/Barriers/3.png"];

        barrier = new ImageObject(
            barriersStartingTopLeftPos.x,
            barriersStartingTopLeftPos.y,
            barrierWidth,
            barrierHeight,
            barrierBounding);
        barrier.flags = [];

        for (var i = 0; i < barrierFrames.length; i++) {
            barrier.addImageFrame(barrierFrames[i]);
        }

        Barriers.barriersList.push(barrier);
    }
};

module.exports = Barriers;
