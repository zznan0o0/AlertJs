var Alert = function(){
	this.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	this.windowWidth = document.documentElement.clientWidth;
	this.windowHeight = document.documentElement.clientHeight;

	this.layoutCss = 'padding:10px;margin:0;border:1px solid #ccc; position:fixed; z-index:9999;background:#fff;border-radius:5px;width:600px; height:400px;display:none; cursor:move;';
	this.layoutCss2 = 'padding:10px;margin:0;border:0; position:fixed; z-index:10000;background:rgba(0,0,0,0.5);border-radius:5px; display:none;';

	this.dropDown = false;
	this.imgShow = false;
	this.dropObj = null;

	this.init();
}

//初始化
Alert.prototype.init = function(){
	this.slefSrc = this.getSelfJs();
	this.maske = this.createMaske();
	this.layout = this.createLayout();
	this.whiteDiv = this.createWhiteDiv();
	this.loading = this.createLoding();
	this.prompt = this.createPrompt();
	this.outImg = this.createImgOut();
	this.outDiv = this.createOutDiv();

	this.alert_open();
	this.layoutOff();
	this.drop(this.layout.layout);

	this.imgOutHtmlBind();
	this.clickOutImgHide();

	this.maskeClick();

	this.outDivOff();
	this.drop(this.outDiv.layout);
}

//drop
Alert.prototype.drop = function(element){
	var that = this;

	element.addEventListener('mousedown', function(e){
		that.dropDown = true;
		that.whiteDiv.style.display = 'block';
		that.whiteDiv.style.width = this.clientWidth + 'px';
		that.whiteDiv.style.height = this.clientHeight + 'px';
		that.whiteDiv.style.top = this.style.top;
		that.whiteDiv.style.left = this.style.left;

		element.style.display = 'none';
		that.dropObj = this;

		e.stopPropagation();
	}, false);

	document.body.addEventListener('mousemove', function(e){
		if(that.dropDown){
			var x = e.clientX - document.body.scrollLeft;
			var y = e.clientY - document.body.scrollTop;

			that.whiteDiv.style.top = y + 'px';
			that.whiteDiv.style.left = x + 'px';

			e.stopPropagation();
		}
	}, true);

	that.whiteDiv.onmouseup = function(e){
		that.dropDown = false;

		that.whiteDiv.style.display = 'none';

		that.dropObj.style.top = that.whiteDiv.style.top;
		that.dropObj.style.left = that.whiteDiv.style.left;
		that.dropObj.style.display = 'block';
	}
}

//off
Alert.prototype.layoutOff = function(){
	var that = this;
	this.layout.off.addEventListener('mousedown', function(e){
		that.layout.layout.style.display = 'none';
		that.maske.style.display = 'none';
		e.stopPropagation();
	}, false);
}

//create white
Alert.prototype.createWhiteDiv = function(){
	var whiteDiv = document.createElement('div');
	whiteDiv.style.cssText = 'display:none; border:3px solid #000; background:rgba(255,255,255, 0.3); position: fixed;z-index:20000; cursor:move;'
	document.body.appendChild(whiteDiv);
	return whiteDiv;
}

//点击事件绑定
Alert.prototype.alert_open = function(){
	var alertOpen = this.getAttrAlertOpen();
	var that = this;

	for(var i = 0; i < alertOpen.length; i++){
		var event = alertOpen[i].getAttribute('alert-event') || 'click'

		alertOpen[i].addEventListener(event, function(){
			var layW = this.getAttribute('alert-width') || '600px';
			var layH = this.getAttribute('alert-height') || '400px';

			that.maske.style.display = 'block';
			that.layout.layout.style.display = 'block';
			that.layout.iframe.src = this.getAttribute('alert-open');
			that.layout.layout.style.width = layW;
			that.layout.layout.style.height = layH;
			that.layout.iframe.style.width = layW;
			that.layout.iframe.style.height = layH;

			that.center(that.layout.layout);
		}, false);
	}
}


//layout show
Alert.prototype.layoutShow = function(src, width, height){
	var w = width || '600px';
	var h = height || '400px';

	this.layout.layout.style.width = w;
	this.layout.layout.style.height = h;
	this.layout.iframe.style.width = w;
	this.layout.iframe.style.height = h;
	this.layout.iframe.src = src
	this.maske.style.display = 'block';
	this.layout.layout.style.display = 'block';
	this.center(this.layout.layout);
}

//遮罩层
Alert.prototype.createMaske = function(){
	if(this.maske) return;

	var maske = document.createElement('div');
	maske.style.cssText = 'background:#000;opacity:0.5;position:absolute;  margin:0; padding:0; z-index:999;display:none;top:0;left:0;right:0;bottom:0;';

	document.body.style.position = 'relative';
	document.body.appendChild(maske);

	return this.maske = maske;
}

//居中div
Alert.prototype.createLayoutDiv = function(){
	var layout = document.createElement('div');
	layout.style.cssText = this.layoutCss;

	return 	layout;
}

//定位div
Alert.prototype.createLayoutInnerDiv = function(){
	var div = document.createElement('div');
	div.style.cssText = 'width: 100%;height: 100%; border: 1px solid #ccc; position: relative; margin:0; padding:0; border:0;'

	return div;
}

//关闭按钮
Alert.prototype.createLayoutOff = function(){
	var off = document.createElement('div');
	off.style.cssText = 'width: 20px;height: 20px; background: #000;  border-radius: 15px; font-size: 12px; line-height: 20px; text-align: center; color: #fff; position: absolute;right: -20px; top: -20px; cursor: pointer; margin:0; padding:0;border:5px solid #fff;'
	off.innerHTML = '×';

	return off;
}

//iframe 弹窗创建
Alert.prototype.createLayout = function(){
	var layout = this.createLayoutDiv();
	var div = this.createLayoutInnerDiv();
	
	layout.appendChild(div);

	var off = this.createLayoutOff();
	div.appendChild(off);

	var iframe = document.createElement('iframe');
	iframe.style.cssText = 'margin:0;padding:0; border:0; width:100%; height:100%;';

	div.appendChild(iframe);

	document.body.appendChild(layout);

	return {layout: layout, innerDiv: div, iframe: iframe, off: off}
}

//div 弹窗创建
Alert.prototype.createOutDiv = function(){
	var layout = this.createLayoutDiv();
	var div = this.createLayoutInnerDiv();
	
	layout.appendChild(div);

	var off = this.createLayoutOff();
	div.appendChild(off);

	var div2 = document.createElement('div');
	div2.style.cssText = 'margin:0;padding:0; border:0; position:fixed;cursor:default;';

	div.appendChild(div2);

	document.body.appendChild(layout);

	return {layout: layout, innerDiv: div, div2: div2, off: off}
}

//outDivShow
Alert.prototype.outDivShow = function(context, width, height){
	this.outDiv.div2.innerHTML = context;
	this.outDiv.layout.style.width = width || "600px";
	this.outDiv.layout.style.height = height || "400px";
	this.outDiv.div2.style.width = width || "600px";
	this.outDiv.div2.style.height = height || "400px";
	this.outDiv.layout.style.display = 'block';
	this.maske.style.display = 'block';

	this.center(this.outDiv.layout);
}

//outDivHide
Alert.prototype.outDivOff = function(){
	this.outDiv.off.addEventListener('mousedown', function(e){
		this.maske.style.display = 'none';
		this.outDiv.layout.style.display = 'none';
		e.stopPropagation();
	}.bind(this), false);
}

//loading hide
Alert.prototype.loadingHide = function(){
	this.loading.style.display = 'none';
}

//loading show
Alert.prototype.loadingShow = function(){
	this.loading.onload = function(){
		this.center(this.loading);
		this.loading.style.visibility = 'visible';
	}.bind(this);
}

//loading层
Alert.prototype.createLoding = function(){
	var img = document.createElement('img');
	img.src = this.slefSrc + 'img/loading-0.gif';

	img.style.cssText = 'visibility:hidden;margin:0;padding:0;z-index:10002;position:fixed;';

	document.body.appendChild(img);

	return img;
}
//loading click
Alert.prototype.clickLoadingHide = function(){
	this.loading.onclick = function(){
		this.loadingHide();
	}.bind(this);
}

//文字提示层
Alert.prototype.createPrompt = function(){
	var div = document.createElement('div');
	div.style.cssText = 'padding:10px;border:0;margin:0;border-radius:5px;background:rgba(0,0,0,0.5);font-size:24px;display:none;z-index:20003; color:#fff; position:fixed;';
	document.body.appendChild(div);

	return div;
}

//prompt show
Alert.prototype.promptShow = function(context){
	this.prompt.style.display = 'block';
	this.prompt.innerHTML = context;
	this.center(this.prompt);
}

//prompt hide
Alert.prototype.promptHide = function(context){
	this.prompt.style.display = 'none';
}

//click
Alert.prototype.promptClickHide = function(){
	this.prompt.onclick = function(){
		this.promptHide();
	}.bind(this)
}

//img 层
Alert.prototype.createImgOut = function(){
	var img = document.createElement('img');
	img.style.cssText = 'padding:0; margin:0; border: 5px solod #fff; border-radisu:5px; position:fixed; background: #fff;width:auto;height:auto; max-height:100%;max-width: 100%;z-index:20004;display:none;';
	document.body.appendChild(img);

	return img;
}

Alert.prototype.imgOutShow = function(src, width, height){
	var that = this;
	this.imgShow = true;
	this.outImg.src = src;
	this.outImg.style.width = width;
	this.outImg.style.height = height;
	this.maske.style.display = 'block';
	this.outImg.onload = function(){
		this.style.display = 'block';
		that.center(this);
	}
}


Alert.prototype.imgOutHide = function(){
	this.outImg.style.display = 'none';
	this.maske.style.display = 'none';
}

//img html绑定
Alert.prototype.imgOutHtmlBind = function(){
	var img_open = this.getByAttr('img-open');

	for(var i = 0; i < img_open.length; i++){
		var event = img_open[i].getAttribute("img-event") || 'click';
		var imgOpen = img_open[i].getAttribute('img-open');
		if(imgOpen == 'on'){
			var src = img_open[i].getAttribute('src');
		}
		else{
			var src = imgOpen;
		}
		var width = img_open[i].getAttribute('img-width') || 'auto';
		var height = img_open[i].getAttribute('img-height') || 'auto';

		img_open[i].addEventListener(event, function(e){
			e.stopPropagation();
			this.imgOutShow(src, width, height);
		}.bind(this), false);
	}
}

//click hide img
Alert.prototype.clickOutImgHide = function(){
	this.outImg.onclick = function(){
		if(this.imgShow){
			this.imgOutHide();
			this.imgShow = false;
		}
	}.bind(this);
}
//------------------------------------------------------------------------
// 遮罩层点击事件
Alert.prototype.maskeClick = function(){
	this.maske.onclick = function(){
		if(this.imgShow){
			this.imgOutHide();
			this.imgShow = false;
		}
	}.bind(this);
}

//居中
Alert.prototype.center = function(element){
	element.style.transition = 'transform 0.4s'
	element.style.transform = 'scale(0.5, 0.5)'
	element.style.position = 'fixed';
	element.style.top = (this.windowHeight - element.offsetHeight)/2 + 'px';
	element.style.left = (this.windowWidth - element.offsetWidth)/2 + 'px';
	element.style.transform = 'scale(1, 1)'
}

Alert.prototype.getAttrAlertOpen = function(){
	var allHtml = document.getElementsByTagName('*');
	var alertOpenArr = [];

	for(var i = 0; i < allHtml.length; i++){
		allHtml[i].getAttribute('alert-open') && alertOpenArr.push(allHtml[i]);
	}

	return alertOpenArr;
}

Alert.prototype.getByAttr = function(attr){
	var allHtml = document.getElementsByTagName('*');
	var alertOpenArr = [];

	for(var i = 0; i < allHtml.length; i++){
		allHtml[i].getAttribute(attr) && alertOpenArr.push(allHtml[i]);
	}

	return alertOpenArr;
}

Alert.prototype.getSelfJs = function(){
	var script = document.getElementsByTagName('script');
	var reg = /alert\.js$/, reg2 = /\/alertJs\/alert\.js$/;
	var srcArr = [];


	for(var i = 0; i < script.length; i++){
		if(reg.test(script[i].getAttribute('src'))) srcArr.push(script[i].getAttribute('src'));
	}

	if(srcArr.length == 1){
		return srcArr[0].replace(/alert\.js$/,"");
	}
	else if(srcArr.length > 1){
		for(var i = 0; i < srcArr.length; i++){
			if(reg2.test(srcArr[i])) return srcArr[i].replace(/alert\.js$/,"");
		}
	}
}