/*************************************************************************************

										Vector Class Test

*************************************************************************************/

var d = function(){
	return GraphicsContext.canvasCtx;
};
$("<input type='text'>").appendTo('body');

//************************************************
//	Draw a coordinates positioned at the center
//************************************************
var originX = GraphicsContext.width() * 0.5, 
originY = GraphicsContext.height() * 0.5;
d().beginPath();
d().moveTo(0, originY);
d().lineTo(GraphicsContext.width(), originY);
d().moveTo(originX, 0);
d().lineTo(originX, GraphicsContext.height());
d().stroke();
d().closePath();

//**************************
//	Draw Vector
//**************************
function drawVector(v) {
	d().save();
    d().beginPath();
    d().moveTo(originX, originY);
    d().lineTo(originX + v.x * 5, originY - v.y * 5);
    var randColor = "rgb(" 
    + parseInt((Math.random() * 100 * 25 + 255) % 255) +", " 
    + parseInt((Math.random() * 100 * 25 + 255) % 255) +", " 
    + parseInt((Math.random() * 100 * 25 + 255) % 255) +")";
    d().strokeStyle = randColor;
    d().stroke();
    d().closePath();
	d().restore();
}

//*******************
//	Original Vector
//*******************
var v = new Vector(10, 10);
drawVector(v);

//**************************
//	Test Vector.translate()
//**************************
// $("input").change(function(event){
// 	var arr = $(event.target).val().split(" ");
// 	drawVector(v.translate(parseInt(arr[0]), parseInt(arr[1])));
// });

//**************************
//	Test Vector.translate()
//**************************
// $("input").change(function(event){
// 	var angle = parseInt($(event.target).val());
// 	drawVector(v.rotate(angle));
// });

//**************************
//	Test Vector.scale()
//**************************
// $("input").change(function(event){
// 	var arr = $(event.target).val().split(" ");
// 	drawVector(v.scale(parseInt(arr[0]), parseInt(arr[1])));
// });

//**************************
//	Test Vector.dot()
//**************************
// $("input").change(function(event){
// 	var arr = $(event.target).val().split(" ");
// 	show(v.dot(new Vector(parseInt(arr[0]), parseInt(arr[1]))));
// });

//**************************
//	Test Vector.len2()
//**************************
// show(v.len2());

//**************************
//	Test Vector.len()
//**************************
// show(v.len());

//**************************
//	Test Vector.perp()
//**************************
// drawVector(v.perp());

//**************************
//	Test Vector.normalize()
//**************************
// drawVector(v.normalize());
// show(Math.round(v.len()));

//**************************
//	Test Vector.add()
//**************************
// $("input").change(function(event){
// 	var arr = $(event.target).val().split(" ");
// 	drawVector(v.add(new Vector(parseInt(arr[0]), parseInt(arr[1]))));
// });

//**************************
//	Test Vector.sub()
//**************************
// $("input").change(function(event){
// 	var arr = $(event.target).val().split(" ");
// 	drawVector(v.sub(new Vector(parseInt(arr[0]), parseInt(arr[1]))));
// });

//**************************
//	Test Vector.project()
//**************************
// $("input").change(function(event){
// 	var arr = $(event.target).val().split(" ");
// 	drawVector(v.project(new Vector(parseInt(arr[0]), parseInt(arr[1]))));
// });

//**************************
//	Test Vector.projectN()
//**************************
// $("input").change(function(event){
// 	var arr = $(event.target).val().split(" ");
// 	drawVector(v.projectN(new Vector(parseInt(arr[0]), parseInt(arr[1]))));
// });

