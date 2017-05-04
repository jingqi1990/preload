function preload(imgs){
	this.imgs = imgs;
	this.imgTotal  = imgs.length;
	for (var i = 0; i < imgs.length; i++) {
		this.imgs[i].img = new Image();
	}
	this.imgloaded = 0;
	this.progress = 0;
	self = this;
}

preload.prototype.load = function(callback){
	for (var i = 0; i < this.imgTotal; i++) {
		this.imgs[i].img.src = this.imgs[i].src;
		this.imgs[i].img.id = this.imgs[i].id;
		this.imgs[i].img.onload = function(){
			if(this.complete){
				self.imgloaded++;
				self.progress = self.imgloaded / self.imgTotal;
				self.getProgress(callback);
			}					
		}
		this.imgs[i].img.onerror = function(){
			self.getError(this.id);
		}
	}
}

preload.prototype.getProgress = function(theFunc){
	if(theFunc){
		theFunc(this.progress);
	}
}

preload.prototype.getComplete = function(callback){
	timer = setInterval(function(){
		if(self.imgloaded == self.imgTotal){
			callback();
			clearInterval(timer);
		}
	},100);
}

preload.prototype.getError = function(errorImg){
	console.log(errorImg+'有错误！');
}

preload.prototype.getImgResult = function(id){
	var ResultImg = null;
	this.imgs.forEach(function(ev){ 
    	if(ev.id == id){
    		ResultImg = ev.img;
    		return ev;
    	}
	});
	return ResultImg;
}