/**********************************************************************************************
                                    Game Play Objects
                                
                                    Created By Andy

    Overview:
    General game object class containing all information necessary and objects declarations

***********************************************************************************************/




//************************
//  General Image Object
//************************
var ImageObject = function(x, y, width, height) {

    //************************
    //  Image Object Images
    //************************
    this.imgFrames = [];
    this.imgIndex = 0;
    this.thisImgFrame = this.imgFrames[this.imgIndex];

    //****************
    //  Coordinates
    //****************
    this.x = x || 0;
    this.y = y || 0;

    //****************
    //  Size
    //****************
    this.width = width || 0;
    this.height = height || 0;
};

//***********************************************
//  Add image frame as animation
//***********************************************
ImageObject.prototype.addImageFrame = function(url) {
    var tmpImg = new Image();
    tmpImg.src = url;
    this.imgFrames.push(tmpImg);
};

//*****************************************************
//  Update the Image Object's coordinates and facing angle
//*****************************************************
ImageObject.prototype.update = function(x, y, angle) {
    this.x = x;
    this.y = y;
    this.thisImgFrame = this.imgFrames[this.imgIndex++ % this.imgFrames.length];
    GraphicsContext.save();
    GraphicsContext.translate(this.getCenterX(), this.getCenterY());
    GraphicsContext.rotate(angle);
    GraphicsContext.translate(-this.getCenterX(), -this.getCenterY());
};

//***********************
//  Draw the Image Object
//***********************
ImageObject.prototype.draw = function() {
    GraphicsContext.drawImage(this.thisImgFrame, this.x, this.y, this.width, this.height);
    GraphicsContext.restore();
};

//**************************************
//  Get Image Object's center coordinates
//**************************************
ImageObject.prototype.getCenterX = function() {
    return this.x + this.width / 2;
};
ImageObject.prototype.getCenterY = function() {
    return this.y + this.height / 2;
};